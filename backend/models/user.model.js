import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//create a user schema 
const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6,'Email must be at least 6 characters long'],
        maxLength: [50,'Email must not be longer than 50 characters'],
    },
    password: {
        type: String,
        select: false,
    }
});

//hash the password before saving the user
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

//validate password when user is created or updated
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//generate a JWT token for authentication
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

const User = mongoose.model('user', userSchema);

export default User;