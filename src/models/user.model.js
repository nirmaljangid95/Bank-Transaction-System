import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required "],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/],
        unique: [true, "email already exists"]

    },
    name: {
        type: String,
        required: [true, "name is required "],
        trim: true,

    }
    ,
    password: {
        type: String,
        required: [true, "password is required "],
        minlength:[6,"password should be cantain more than 6 "],
        select:false
    }
}, { timestamps: true })

userSchema.pre("save",async function(next) {
    if(!this.password.isModified("password")) return next();

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash;
    return next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

export const userModel = mongoose.model("user",userSchema);