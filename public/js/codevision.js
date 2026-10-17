"use strict";

(() => {
  const $ = (id) => document.getElementById(id);
  const editorHost = $("editor");
  const fileTree = $("fileTree");
  const tabsBar = $("tabsBar");
  const toast = $("toast");
  const fileInput = $("fileInput");
  const folderInput = $("folderInput");
  const newFileDialog = $("newFileDialog");
  const newFileName = $("newFileName");
  const runBtn = $("runBtn");
  const saveState = $("saveState");

  const LANGUAGES = {
    js: { monaco: "javascript", api: "javascript", label: "JavaScript" },
    mjs: { monaco: "javascript", api: "javascript", label: "JavaScript" },
    cjs: { monaco: "javascript", api: "javascript", label: "JavaScript" },
    ts: { monaco: "typescript", api: "typescript", label: "TypeScript" },
    py: { monaco: "python", api: "python", label: "Python" },
    c: { monaco: "c", api: "c", label: "C" },
    h: { monaco: "c", api: "c", label: "C" },
    cpp: { monaco: "cpp", api: "cpp", label: "C++" },
    cc: { monaco: "cpp", api: "cpp", label: "C++" },
    cxx: { monaco: "cpp", api: "cpp", label: "C++" },
    hpp: { monaco: "cpp", api: "cpp", label: "C++" },
    java: { monaco: "java", api: "java", label: "Java" },
    go: { monaco: "go", api: "go", label: "Go" },
    rs: { monaco: "rust", api: "rust", label: "Rust" },
    cs: { monaco: "csharp", api: "csharp", label: "C#" },
    php: { monaco: "php", api: "php", label: "PHP" },
    rb: { monaco: "ruby", api: "ruby", label: "Ruby" },
    sh: { monaco: "shell", api: "bash", label: "Bash" },
    html: { monaco: "html", api: null, label: "HTML" },
    htm: { monaco: "html", api: null, label: "HTML" },
    css: { monaco: "css", api: null, label: "CSS" },
    scss: { monaco: "scss", api: null, label: "SCSS" },
    json: { monaco: "json", api: "javascript", label: "JSON" },
    md: { monaco: "markdown", api: null, label: "Markdown" },
    txt: { monaco: "plaintext", api: null, label: "Plain Text" },
    xml: { monaco: "xml", api: null, label: "XML" },
    sql: { monaco: "sql", api: null, label: "SQL" }
  };

  const samples = {
    "main.js": `// Welcome to CodeVision IDE ✦\n// Edit this file, then press Run code.\n\nfunction greet(name) {\n  return \`Hello, \${name}! Welcome to CodeVision.\`;\n}\n\nconst learner = "Code Academia";\nconsole.log(greet(learner));\n\n// Try changing the code and run it again.\nfor (let i = 1; i <= 3; i++) {\n  console.log(\`Practice makes progress: \${i}\`);\n}\n`,
    "index.html": `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My project</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Hello, CodeVision!</h1>\n  <p>Start building something amazing.</p>\n  <script src="main.js"></script>\n</body>\n</html>\n`,
    "styles.css": `:root {\n  font-family: system-ui, sans-serif;\n  color: #202638;\n  background: #f7f8fb;\n}\n\nbody {\n  max-width: 760px;\n  margin: 4rem auto;\n  padding: 0 1.25rem;\n}\n\nh1 { color: #579b28; }\n`
  };

  let editor;
  let activePath = "main.js";
  let activeTab = null;
  let toastTimer;
  let isRunning = false;
  const documents = new Map();
  const openTabs = [];
  const directoryHandles = new Map();
  let workspaceHandle = null;
  let workspaceLabel = "CODEVISION PROJECT";

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function basename(path) { return path.split("/").filter(Boolean).pop() || path; }
  function ext(path) {
    const name = basename(path);
    const i = name.lastIndexOf(".");
    return i > 0 ? name.slice(i + 1).toLowerCase() : "";
  }
  function languageFor(path) { return LANGUAGES[ext(path)] || { monaco: "plaintext", api: null, label: "Plain Text" }; }
  function iconClass(path) {
    const e = ext(path);
    if (["js","mjs","cjs"].includes(e)) return ["js","JS"];
    if (["html","htm"].includes(e)) return ["html","5"];
    if (["css","scss"].includes(e)) return ["css","#"];
    if (e === "py") return ["py","Py"];
    if (["cpp","cc","cxx","hpp","c","h"].includes(e)) return [e === "c" || e === "h" ? "c" : "cpp","C+"];
    if (e === "java") return ["java","J"];
    if (e === "json") return ["json","{}"];
    return ["generic","·"];
  }
  function getDoc(path) {
    if (!documents.has(path)) documents.set(path, { content: "", savedContent: "", model: null, handle: null, file: null });
    return documents.get(path);
  }
  function isDirty(path) {
    const doc = documents.get(path);
    return !!doc && doc.content !== doc.savedContent;
  }
  function setSaveState() {
    const dirty = [...documents.keys()].some(isDirty);
    saveState.innerHTML = `<span class="state-dot ${dirty ? "dirty" : ""}"></span>${dirty ? "Unsaved changes" : "All changes saved"}`;
  }
  function syncDocFromEditor() {
    if (!editor || !activePath) return;
    const doc = getDoc(activePath);
    doc.content = editor.getValue();
    updateDirtyUI();
  }
  function updateDirtyUI() {
    for (const tab of tabsBar.querySelectorAll(".tab[data-path]")) {
      tab.classList.toggle("dirty", isDirty(tab.dataset.path));
    }
    setSaveState();
  }
  function ensureModel(path, content) {
    const doc = getDoc(path);
    if (content !== undefined && doc.content === "" && doc.savedContent === "") {
      doc.content = content;
      doc.savedContent = content;
    }
    if (!doc.model && window.monaco) {
      doc.model = monaco.editor.createModel(doc.content, languageFor(path).monaco, monaco.Uri.parse("file:///" + path.replace(/^\/+/, "")));
    } else if (doc.model && doc.model.getLanguageId() !== languageFor(path).monaco) {
      monaco.editor.setModelLanguage(doc.model, languageFor(path).monaco);
    }
    return doc;
  }
  function openTab(path, content, options = {}) {
    if (content !== undefined && !documents.has(path)) {
      documents.set(path, { content, savedContent: content, model: null, handle: options.handle || null, file: options.file || null });
    } else if (options.handle) getDoc(path).handle = options.handle;
    const doc = ensureModel(path, content);
    if (!openTabs.includes(path)) openTabs.push(path);
    activePath = path;
    if (editor && doc.model) editor.setModel(doc.model);
    renderTabs();
    renderTree();
    updateMetadata();
    $("explorer").classList.remove("mobile-open");
  }
  function activateTab(path) {
    if (!documents.has(path)) return;
    syncDocFromEditor();
    activePath = path;
    const doc = ensureModel(path);
    if (editor && doc.model) editor.setModel(doc.model);
    renderTabs();
    renderTree();
    updateMetadata();
  }
  function renderTabs() {
    tabsBar.querySelectorAll(".tab").forEach(el => el.remove());
    openTabs.forEach(path => {
      const [ic, label] = iconClass(path);
      const tab = document.createElement("div");
      tab.className = "tab" + (path === activePath ? " active" : "") + (isDirty(path) ? " dirty" : "");
      tab.dataset.path = path;
      const icon = document.createElement("span"); icon.className = `file-icon ${ic}`; icon.textContent = label;
      const name = document.createElement("span"); name.textContent = basename(path); name.title = path;
      const dirty = document.createElement("span"); dirty.className = "dirty-mark";
      const close = document.createElement("button"); close.className = "tab-close"; close.textContent = "×"; close.setAttribute("aria-label", `Close ${basename(path)}`);
      close.addEventListener("click", e => { e.stopPropagation(); closeTab(path); });
      tab.append(icon, name, dirty, close);
      tab.addEventListener("click", () => activateTab(path));
      tabsBar.insertBefore(tab, $("tabNewFile"));
    });
    $("breadcrumbFile").textContent = activePath;
    updateDirtyUI();
  }
  function closeTab(path) {
    if (isDirty(path) && !confirm(`${basename(path)} has unsaved changes. Close it anyway?`)) return;
    const index = openTabs.indexOf(path);
    if (index >= 0) openTabs.splice(index, 1);
    if (openTabs.length === 0) {
      const fallback = "untitled.js";
      documents.set(fallback, { content: "", savedContent: "", model: null, handle: null, file: null });
      openTabs.push(fallback);
    }
    if (activePath === path) activePath = openTabs[Math.max(0, index - 1)] || openTabs[0];
    const doc = documents.get(path);
    if (doc && doc.model) doc.model.dispose();
    documents.delete(path);
    activateTab(activePath);
    renderTabs();
  }
  function renderTree() {
    fileTree.innerHTML = "";
    const paths = [...documents.keys()].sort((a,b) => a.localeCompare(b));
    paths.forEach(path => {
      const [ic, label] = iconClass(path);
      const row = document.createElement("button");
      row.className = "tree-file" + (path === activePath ? " selected" : "");
      row.title = path;
      const icon = document.createElement("span"); icon.className = `file-icon ${ic}`; icon.textContent = label;
      const name = document.createElement("span"); name.textContent = path; name.style.overflow = "hidden"; name.style.textOverflow = "ellipsis"; name.style.whiteSpace = "nowrap";
      row.append(icon, name);
      row.addEventListener("click", () => activateTab(path));
      fileTree.append(row);
    });
    $("projectName").textContent = workspaceLabel;
  }
  function updateMetadata() {
    const language = languageFor(activePath).label;
    $("languageLabel").textContent = language;
    $("statusLanguage").textContent = language;
    $("statusBranch").textContent = workspaceLabel.toLowerCase().replaceAll(" ", "-");
  }
  function updateCursor() {
    if (!editor) return;
    const p = editor.getPosition();
    if (p) $("cursorStatus").textContent = `Ln ${p.lineNumber}, Col ${p.column}`;
  }
  function saveBlob(path, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = basename(path); a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function saveCurrent(saveAs = false) {
    if (!editor) return;
    syncDocFromEditor();
    const doc = getDoc(activePath);
    if (!saveAs && doc.handle && typeof doc.handle.createWritable === "function") {
      try {
        const writable = await doc.handle.createWritable();
        await writable.write(doc.content);
        await writable.close();
        doc.savedContent = doc.content;
        updateDirtyUI();
        showToast(`${basename(activePath)} saved`);
        return;
      } catch (error) { console.error(error); showToast("Could not save to that file. Downloading a copy instead."); }
    }
    if (!saveAs && !isDirty(activePath) && doc.file) {
      showToast("No changes to save");
      return;
    }
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: basename(activePath),
          types: [{ description: "Source code", accept: { "text/plain": [".txt",".js",".ts",".py",".html",".css",".json",".cpp",".c",".java",".md",".go",".rs",".php",".sh",".sql"] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(doc.content);
        await writable.close();
        doc.handle = handle;
        doc.savedContent = doc.content;
        updateDirtyUI();
        showToast(`${basename(activePath)} saved`);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
        console.warn(error);
      }
    }
    saveBlob(activePath, doc.content);
    doc.savedContent = doc.content;
    updateDirtyUI();
    showToast("File downloaded. Browser permissions may require Save As for future edits.");
  }
  async function openFiles(files) {
    for (const file of files) {
      if (!file || file.name.startsWith(".")) { /* hidden files are still allowed below */ }
      const relative = file.webkitRelativePath || file.name;
      const path = relative.replace(/\\/g, "/").replace(/^\/+/, "");
      try {
        const content = await file.text();
        documents.set(path, { content, savedContent: content, model: null, handle: null, file });
        if (!openTabs.includes(path)) openTabs.push(path);
      } catch { showToast(`Could not read ${file.name}`); }
    }
    if (files.length) {
      const last = files[files.length - 1];
      activateTab(last.webkitRelativePath || last.name);
      renderTree();
      showToast(`${files.length} file${files.length === 1 ? "" : "s"} opened`);
    }
  }
  function createFile(path) {
    path = path.trim().replace(/\\/g, "/").replace(/^\/+/, "");
    if (!path || path.split("/").some(p => !p || p === "..")) { showToast("Enter a valid file name or relative path."); return; }
    if (documents.has(path)) { activateTab(path); showToast("That file is already open."); return; }
    documents.set(path, { content: "", savedContent: "", model: null, handle: null, file: null });
    openTabs.push(path);
    openTab(path);
    editor.focus();
    showToast(`${basename(path)} created`);
  }
  async function openFolder() {
    if (window.showDirectoryPicker) {
      try {
        workspaceHandle = await window.showDirectoryPicker({ mode: "readwrite" });
        workspaceLabel = workspaceHandle.name.toUpperCase();
        documents.clear(); openTabs.length = 0;
        async function walk(dir, prefix = "") {
          for await (const [name, handle] of dir.entries()) {
            const rel = prefix ? `${prefix}/${name}` : name;
            if (handle.kind === "directory") await walk(handle, rel);
            else if (/\.(js|mjs|cjs|ts|py|c|h|cpp|cc|cxx|hpp|java|go|rs|cs|php|rb|sh|html?|css|scss|json|md|txt|xml|sql|ya?ml|toml)$/i.test(name)) {
              try {
                const file = await handle.getFile();
                const content = await file.text();
                documents.set(rel, { content, savedContent: content, model: null, handle, file });
              } catch {}
            }
          }
        }
        await walk(workspaceHandle);
        const first = [...documents.keys()].sort()[0];
        if (first) {
          openTabs.push(first);
          openTab(first);
          showToast(`Opened folder ${workspaceHandle.name}`);
        } else {
          createFile("main.js");
          showToast("Folder opened. Create a file to get started.");
        }
        renderTree();
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
        console.warn(error);
        showToast("Folder access was unavailable. Choose a folder using the fallback picker.");
      }
    }
    folderInput.click();
  }
  const PANEL_VIEWS = { output: "outputText", problems: "problemsView", terminal: "terminalView", preview: "previewView" };
  function panel(name) {
    for (const [key, id] of Object.entries(PANEL_VIEWS)) {
      $(id).classList.add("hidden");
      document.querySelector(`.panel-tab[data-panel="${key}"]`).classList.toggle("active", key === name);
    }
    if (name === "output") {
      const hasOutput = $("outputText").textContent !== "";
      $("outputWelcome").classList.toggle("hidden", hasOutput);
      $("outputText").classList.toggle("hidden", !hasOutput);
    } else {
      $("outputWelcome").classList.add("hidden");
      $(PANEL_VIEWS[name]).classList.remove("hidden");
    }
    $("bottomPanel").classList.toggle("preview-mode", name === "preview");
    if (name !== "preview") $("bottomPanel").classList.remove("preview-max");
    $("previewActions").classList.toggle("hidden", name !== "preview");
  }
  function setOutput(text, isError = false) {
    $("outputWelcome").classList.add("hidden");
    $("outputText").classList.remove("hidden");
    $("outputText").textContent = text || "(No output)";
    $("outputText").style.color = isError ? "#ff9696" : "";
    panel("output");
  }
  /* ---------- Browser preview (HTML / CSS / JS) ---------- */
  const previewFrame = $("previewFrame");
  const previewConsole = $("previewConsole");
  const PREVIEW_TOKEN = Math.random().toString(36).slice(2) + Date.now().toString(36);
  let lastPreviewTarget = null;   // { html, css } of the most recent preview
  let previewRuns = 0;
  let previewErrors = [];
  let livePreview = false;
  let previewTimer;

  const isHtml = (p) => ["html", "htm"].includes(ext(p));
  const isLocalRef = (ref) => !!ref && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref);
  const escapeInline = (code, tag) => code.replace(new RegExp("</" + tag, "gi"), "<\\/" + tag);

  function normalizePath(p) {
    const out = [];
    for (const part of p.split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") out.pop(); else out.push(part);
    }
    return out.join("/");
  }
  // Resolve a relative href/src against an HTML file's folder and return the workspace path, or null.
  function resolveRef(fromPath, ref) {
    if (!isLocalRef(ref)) return null;
    ref = ref.split(/[?#]/)[0];
    try { ref = decodeURIComponent(ref); } catch {}
    const dir = fromPath.includes("/") ? fromPath.slice(0, fromPath.lastIndexOf("/")) : "";
    const full = ref.startsWith("/") ? normalizePath(ref) : normalizePath(dir ? `${dir}/${ref}` : ref);
    return documents.has(full) ? full : null;
  }
  function htmlReferences(htmlPath, target) {
    const dom = new DOMParser().parseFromString(documents.get(htmlPath).content, "text/html");
    return [...dom.querySelectorAll('link[rel~="stylesheet"][href], script[src]')]
      .some(el => resolveRef(htmlPath, el.getAttribute(el.tagName === "LINK" ? "href" : "src")) === target);
  }
  function findHtmlFor(target) {
    const candidates = [...documents.keys()].filter(isHtml).sort();
    if (lastPreviewTarget?.html && documents.has(lastPreviewTarget.html)) candidates.unshift(lastPreviewTarget.html);
    return candidates.find(p => htmlReferences(p, target)) || null;
  }
  // Decide whether the active file runs in the browser preview (returns a target) or on the server (returns null).
  function previewTargetFor(path) {
    const kind = ext(path);
    if (isHtml(path)) return { html: path };
    if (kind === "css") return { html: findHtmlFor(path), css: path };      // no linking page -> built-in demo page
    if (kind === "js" || kind === "mjs") { const html = findHtmlFor(path); return html ? { html } : null; }
    return null;
  }

  // Runs inside the preview iframe: forwards console output and errors to the IDE.
  function previewBridge(token) {
    const stringify = (v) => {
      if (typeof v === "string") return v;
      if (v instanceof Error) return v.stack || v.message;
      try {
        const r = JSON.stringify(v, (k, x) => typeof x === "function" ? "[Function]" : x, 2);
        return r === undefined ? String(v) : r;
      } catch { return String(v); }
    };
    const send = (level, args) => {
      try { parent.postMessage({ __cv: token, level, text: args.map(stringify).join(" ") }, "*"); } catch {}
    };
    ["log", "info", "warn", "error", "debug"].forEach(level => {
      const original = console[level];
      console[level] = (...args) => { send(level, args); original.apply(console, args); };
    });
    window.addEventListener("error", e => send("error", [`${e.message}${e.lineno ? ` (line ${e.lineno})` : ""}`]));
    window.addEventListener("unhandledrejection", e => send("error", ["Unhandled promise rejection: " + stringify(e.reason)]));
  }

  function cssDemoPage(css) {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CSS preview</title><style>${escapeInline(css, "style")}</style></head><body>
<h1>Heading one</h1><h2>Heading two</h2>
<p>This is a paragraph with a <a href="#">link</a>, <strong>bold text</strong> and <em>italic text</em>.</p>
<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>
<div class="card"><h3>Card</h3><p>Sample content to test your styles.</p><button>Button</button></div>
<form onsubmit="return false"><label>Name <input type="text" placeholder="Type here"></label> <button type="submit">Submit</button></form>
</body></html>`;
  }

  // Inlines local <link rel=stylesheet> and <script src> files from the workspace and adds the console bridge.
  function buildPreviewHtml(htmlPath, source) {
    const dom = new DOMParser().parseFromString(source, "text/html");
    const warnings = [];
    dom.querySelectorAll('link[rel~="stylesheet"][href]').forEach(link => {
      const href = link.getAttribute("href");
      const target = resolveRef(htmlPath, href);
      if (target) {
        const style = dom.createElement("style");
        style.setAttribute("data-source", target);
        style.textContent = escapeInline(documents.get(target).content, "style");
        link.replaceWith(style);
      } else if (isLocalRef(href)) {
        warnings.push(`${href} was not found in the workspace (linked from ${htmlPath}).`);
      }
    });
    dom.querySelectorAll("script[src]").forEach(script => {
      const src = script.getAttribute("src");
      const target = resolveRef(htmlPath, src);
      if (!target) {
        if (isLocalRef(src)) warnings.push(`${src} was not found in the workspace (linked from ${htmlPath}).`);
        return;
      }
      const inline = dom.createElement("script");
      const type = script.getAttribute("type");
      if (type) inline.setAttribute("type", type);
      inline.setAttribute("data-source", target);
      inline.textContent = escapeInline(documents.get(target).content, "script");
      if (script.hasAttribute("defer") && type !== "module") {   // inline scripts ignore defer, so run it after the DOM
        dom.body.append(inline);
        script.remove();
      } else {
        script.replaceWith(inline);
      }
    });
    const bridge = dom.createElement("script");
    bridge.textContent = `(${previewBridge.toString()})(${JSON.stringify(PREVIEW_TOKEN)});`;
    dom.head.insertBefore(bridge, dom.head.firstChild);
    return { html: `<!doctype html>\n<!-- run ${++previewRuns} -->\n${dom.documentElement.outerHTML}`, warnings };
  }

  function updateProblems() {
    $("problemsView").textContent = previewErrors.length ? previewErrors.join("\n") : "No problems reported in the last preview.";
  }
  function logPreview(level, text) {
    const line = document.createElement("div");
    line.className = `pc-line ${level}`;
    line.textContent = text;
    previewConsole.append(line);
    while (previewConsole.childElementCount > 300) previewConsole.firstElementChild.remove();
    previewConsole.classList.remove("hidden");
    previewConsole.scrollTop = previewConsole.scrollHeight;
    if (level === "error") {
      if (!previewErrors.length) showToast("Preview reported an error. See Problems for details.");
      previewErrors.push(`[error] ${text}`);
      updateProblems();
    }
  }
  window.addEventListener("message", e => {
    if (e.source !== previewFrame.contentWindow) return;
    const data = e.data;
    if (!data || data.__cv !== PREVIEW_TOKEN) return;
    logPreview(String(data.level), String(data.text).slice(0, 5000));
  });

  function runPreview(target, { live = false } = {}) {
    const { html, css } = target;
    if (html && !documents.has(html)) return;
    if (!html && !(css && documents.has(css))) return;
    lastPreviewTarget = { html, css };
    const source = html ? documents.get(html).content : cssDemoPage(documents.get(css).content);
    const built = buildPreviewHtml(html || "", source);
    previewConsole.textContent = "";
    previewConsole.classList.add("hidden");
    previewErrors = built.warnings.map(w => `[warning] ${w}`);
    updateProblems();
    $("previewEmpty").classList.add("hidden");
    previewFrame.srcdoc = built.html;
    panel("preview");
    $("bottomPanel").classList.remove("collapsed");
    $("runDuration").textContent = live ? "Live preview" : `Previewing ${html ? basename(html) : basename(css) + " (demo page)"}`;
    if (built.warnings.length && !live) showToast("Some linked files were not found. See Problems.");
  }
  function schedulePreview() {
    if (!livePreview || !lastPreviewTarget || $("previewView").classList.contains("hidden")) return;
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => runPreview(lastPreviewTarget, { live: true }), 700);
  }

  $("previewRefresh").addEventListener("click", () => {
    syncDocFromEditor();
    const target = lastPreviewTarget || previewTargetFor(activePath);
    if (target) runPreview(target); else showToast("Open an HTML file and press Run code first.");
  });
  $("previewMax").addEventListener("click", () => $("bottomPanel").classList.toggle("preview-max"));
  $("previewLive").addEventListener("click", () => {
    livePreview = !livePreview;
    $("previewLive").classList.toggle("on", livePreview);
    $("previewLive").setAttribute("aria-pressed", String(livePreview));
    showToast(livePreview ? "Live reload on. The preview refreshes as you type." : "Live reload off.");
    if (livePreview) schedulePreview();
  });

  async function runCode() {
    if (!editor || isRunning) return;
    syncDocFromEditor();
    const previewTarget = previewTargetFor(activePath);
    if (previewTarget) { runPreview(previewTarget); return; }
    const lang = languageFor(activePath);
    if (!lang.api) {
      setOutput(`${lang.label} files are not executable through this runner.\nSupported languages include JavaScript, TypeScript, Python, C, C++, Java, Go, Rust, C#, PHP, Ruby, and Bash.\n\nTip: create or open a supported source file to run it.`, true);
      return;
    }
    const code = editor.getValue();
    if (!code.trim()) { showToast("Write some code first."); return; }
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="loader"></span><span>Running…</span>';
    $("runDuration").textContent = "Running";
    const start = performance.now();
    setOutput("Executing code…");
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang.api, code })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Execution failed.");
      const parts = [];
      if (result.compile) {
        if (result.compile.stdout) parts.push(result.compile.stdout);
        if (result.compile.stderr) parts.push("[compile]\n" + result.compile.stderr);
      }
      if (result.run) {
        if (result.run.stdout) parts.push(result.run.stdout);
        if (result.run.stderr) parts.push("[stderr]\n" + result.run.stderr);
        if (result.run.code !== null && result.run.code !== 0) parts.push(`\nProcess exited with code ${result.run.code}.`);
        if (result.run.signal) parts.push(`\nProcess stopped by signal ${result.run.signal}.`);
      }
      if (!parts.length) parts.push("Program finished with no output.");
      setOutput(parts.join("\n").trim());
      $("runDuration").textContent = `${Math.round(performance.now() - start)} ms`;
      $("problemsView").textContent = (result.compile?.stderr || result.run?.stderr)
        ? "Execution reported compiler/runtime messages. See Output for details."
        : "No compiler/runtime errors reported.";
    } catch (error) {
      setOutput(error.message || "Could not run code.", true);
      $("runDuration").textContent = "Failed";
    } finally {
      isRunning = false;
      runBtn.disabled = false;
      runBtn.innerHTML = '<span class="play-icon">▶</span><span>Run code</span><kbd>Ctrl ↵</kbd>';
    }
  }

  function initMonaco() {
    if (!window.require) {
      $("editorLoading").classList.remove("hidden");
      $("editorLoading").innerHTML = "Could not load Monaco Editor. Check your internet connection or configure a local Monaco build.";
      return;
    }
    require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
    window.MonacoEnvironment = {
      getWorkerUrl: function () {
        const worker = `data:text/javascript;charset=utf-8,${encodeURIComponent(
          `self.MonacoEnvironment={baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/'};importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/base/worker/workerMain.js');`
        )}`;
        return worker;
      }
    };
    $("editorLoading").classList.remove("hidden");
    require(["vs/editor/editor.main"], () => {
      monaco.editor.defineTheme("codevision-dark", {
        base: "vs-dark", inherit: true, rules: [
          { token: "comment", foreground: "7D879B", fontStyle: "italic" },
          { token: "keyword", foreground: "B6A0FF" },
          { token: "string", foreground: "B7E59A" }
        ],
        colors: {
          "editor.background": "#11131A", "editorLineNumber.foreground": "#4C5366",
          "editorLineNumber.activeForeground": "#A7F36B", "editorCursor.foreground": "#A7F36B",
          "editor.selectionBackground": "#a7f36b2a", "editor.lineHighlightBackground": "#ffffff05",
          "editorIndentGuide.background1": "#272c39"
        }
      });
      monaco.editor.defineTheme("codevision-light", {
        base: "vs", inherit: true, rules: [],
        colors: { "editor.background": "#FFFFFF", "editorLineNumber.activeForeground": "#5CAE25", "editorCursor.foreground": "#5CAE25" }
      });
      editor = monaco.editor.create(editorHost, {
        value: "", language: "javascript", theme: document.body.classList.contains("light") ? "codevision-light" : "codevision-dark",
        automaticLayout: true, minimap: { enabled: window.innerWidth > 900 },
        fontFamily: "'DM Mono', Consolas, monospace", fontSize: 13, lineHeight: 22,
        fontLigatures: true, tabSize: 2, insertSpaces: true, scrollBeyondLastLine: false,
        smoothScrolling: true, cursorBlinking: "smooth", renderLineHighlight: "all",
        padding: { top: 14, bottom: 16 }, wordWrap: "off", glyphMargin: false,
        suggestOnTriggerCharacters: true, quickSuggestions: true, bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true, indentation: true }, stickyScroll: { enabled: false }
      });
      editor.onDidChangeModelContent(() => { syncDocFromEditor(); schedulePreview(); });
      editor.onDidChangeCursorPosition(updateCursor);
      $("editorLoading").classList.add("hidden");
      Object.entries(samples).forEach(([path, content]) => {
        documents.set(path, { content, savedContent: content, model: null, handle: null, file: null });
      });
      openTabs.push("main.js", "index.html", "styles.css");
      for (const path of openTabs) ensureModel(path);
      activePath = "main.js";
      editor.setModel(getDoc(activePath).model);
      renderTabs(); renderTree(); updateMetadata(); updateCursor();
      window.addEventListener("resize", () => {
        editor.updateOptions({ minimap: { enabled: window.innerWidth > 900 } });
      });
    }, err => {
      console.error(err);
      $("editorLoading").classList.remove("hidden");
      $("editorLoading").textContent = "Monaco failed to load. Please refresh or check your connection.";
    });
  }

  $("newFileBtn").addEventListener("click", () => { newFileName.value = ""; newFileDialog.showModal(); newFileName.focus(); });
  $("tabNewFile").addEventListener("click", () => { newFileName.value = ""; newFileDialog.showModal(); newFileName.focus(); });
  $("newFileForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = newFileName.value.trim();
    if (!name) return;
    newFileDialog.close();
    createFile(name);
  });
  $("openFileBtn").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", e => { openFiles([...e.target.files]); e.target.value = ""; });
  $("openFolderBtn").addEventListener("click", openFolder);
  $("openFolderBottom").addEventListener("click", openFolder);
  folderInput.addEventListener("change", e => {
    const files = [...e.target.files];
    if (files.length) {
      documents.clear(); openTabs.length = 0;
      workspaceLabel = (files[0].webkitRelativePath.split("/")[0] || "Workspace").toUpperCase();
      openFiles(files);
    }
    e.target.value = "";
  });
  $("runBtn").addEventListener("click", runCode);
  $("clearOutput").addEventListener("click", () => {
    $("outputText").textContent = "";
    $("outputText").classList.add("hidden");
    $("outputWelcome").classList.remove("hidden");
    $("runDuration").textContent = "Ready";
  });
  $("togglePanel").addEventListener("click", () => $("bottomPanel").classList.toggle("collapsed"));
  document.querySelectorAll(".panel-tab").forEach(btn => btn.addEventListener("click", () => panel(btn.dataset.panel)));
  $("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (editor) monaco.editor.setTheme(document.body.classList.contains("light") ? "codevision-light" : "codevision-dark");
  });
  $("toggleExplorer").addEventListener("click", () => $("explorer").classList.toggle("mobile-open"));
  $("explorerRail").addEventListener("click", () => $("explorer").classList.toggle("mobile-open"));
  $("collapseExplorer").addEventListener("click", () => $("explorer").classList.remove("mobile-open"));
  $("searchRail").addEventListener("click", () => editor && editor.getAction("actions.find").run());
  $("helpBtn").addEventListener("click", () => $("helpDialog").showModal());
  $("brandHome").addEventListener("click", () => { if (editor) { activateTab("main.js"); editor.focus(); } });
  document.addEventListener("keydown", async e => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    const key = e.key.toLowerCase();
    if (key === "s") {
      e.preventDefault();
      await saveCurrent(e.shiftKey);
    } else if (key === "n") {
      e.preventDefault();
      newFileName.value = ""; newFileDialog.showModal();
    } else if (key === "enter") {
      e.preventDefault(); runCode();
    }
  });
  window.addEventListener("beforeunload", e => {
    syncDocFromEditor();
    if ([...documents.keys()].some(isDirty)) { e.preventDefault(); e.returnValue = ""; }
  });

  // Keep these functions available for future UI extensions.
  window.CodeVision = { save: () => saveCurrent(false), saveAs: () => saveCurrent(true), run: runCode, preview: () => { syncDocFromEditor(); const t = previewTargetFor(activePath); if (t) runPreview(t); }, openFolder };
  initMonaco();
})();