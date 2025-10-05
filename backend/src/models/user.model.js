import bcrypt from "bcryptjs"
import  mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    email: {

        type: String,
        require: true,
        unique: true,
        trim: true
    },
    fullName: {

        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {timestamps: true});


userSchema.pre('save' ,async function(next) {

    if(!this.isModified('password')){

        return next();
    }

    try {
        
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }

} );

userSchema.methods.comparePassword = async function (candidatePassword) {
    
    return await bcrypt.compare(candidatePassword , this.password);
}

const User = mongoose.model("User" , userSchema);

export default User;