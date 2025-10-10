import { CLIENT_URL } from "../configs/env.config.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.model.js";


export const signup = async (req, res) => {

    const {

        fullName,
        email,
        password
    } = req.body;

    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            })
        }


        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Email already exists!"
            })
        }

        const newUser = new User({
            fullName,
            email,
            password
        })

        if (newUser) {

            const savedUser = await newUser.save();
            generateToken(newUser._id, res);


            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

            //send a welcome email to user

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, CLIENT_URL);
            } catch (error) {
                console.error("Failed to send welcome email: ", error);
            }


        } else {
            res.status(400).json({
                message: "Invalid user data"
            })
        }

    } catch (error) {

        console.error("Error in signup controller: ", error);
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {

        if (!email || !password) {

            return res.status(400).json({
                message: "Missing credentials!"
            })
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        generateToken(user._id.toString() , res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {

        console.error("Error in login controller: " , error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req , res) => {

    res.cookie("jwt" , "" , {maxAge: 0});
    res.status(200).json(
        {
            message: "Logout successfully!"
        }
    )
}
