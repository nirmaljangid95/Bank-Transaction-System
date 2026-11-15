import { userModel } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'

const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body
    if ([name, email, password].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "All fields are required")
    }
    const isExists = await userModel.findOne({ email });
    if (isExists) {
        throw new ApiError(422, "user all ready exists");
    }
    const user = await userModel.create({
        email, password, name
    })

    if (!user) {
        throw new ApiError(500, "user not created in database");
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )
    if (!token) {
        throw new Error(404, "token not created ");
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(201)
        .cookie("token", token, options)
        .json(
            new ApiResponse(201,
                {
                    user,
                    token
                },
                "User registered successfully"
            )
        )



})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new ApiError(402, "invalid email password")
    }
    const isValidPassword = await userModel.comparePassword(password)

    if(!isValidPassword){
        throw new ApiError(402, "invalid email password")
    }


     const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )
    if (!token) {
        throw new Error(404, "token not created ");
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(201,
                {
                    user,
                    token
                },
                "User registered successfully"
            )
        )


})

export {
    register
}