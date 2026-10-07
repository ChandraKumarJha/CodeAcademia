const {Schema, model} = require("mongoose"); 

const UserSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;