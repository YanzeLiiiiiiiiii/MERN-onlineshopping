const mongoose = require('mongoose')
const brcypt = require("bcryptjs")
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.checkPwd = async function (pwd) {
    return await brcypt.compare(pwd, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User