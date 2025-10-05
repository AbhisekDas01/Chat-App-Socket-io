import { generateToken } from "../lib/utils.js";
import User from "../models/User.model.js";


export const signup = async (req , res) => {

    const {

        fullName,
        email , 
        password
    } = req.body;

    try {

        if(!fullName || !email || !password){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        if(password.length < 6){

            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email format"
            })
        }


        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                message: "Email already exists!"
            })
        }

        const newUser = new User({
            fullName,
            email,
            password
        })

        if(newUser){

            await newUser.save();
            generateToken(newUser._id , res);
            

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

            //send a welcome email to user


        } else {
            res.status(400).json({
                message: "Invalid user data"
            })
        }
        
    } catch (error) {
        
        console.error("Error in signup controller: " , error);
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}