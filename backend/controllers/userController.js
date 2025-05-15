const jwt = require('jsonwebtoken');
const User = require('../models/User')
const bcrypt = require('bcrypt')
async function registerUser(user) {
    console.log(user)
    try {
    
        if (!user.firstName || !user.lastName || !user.email || !user.password || !user.phone) {
            throw new Error("Missing info - cannot register user");
        }
        if(user.role !== 'coach' && user.role !== "student"){
            console.log(user.role)
            throw new Error("Role invalid");
        }
   
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            throw new Error("User already registered");
        }

 
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(hashedPassword);

      
        const newUser = new User({ ...user, password: hashedPassword });
        return await newUser.save(); // Ensures the saved user is returned

    } catch (error) {
        return {error:error.message}
    }
}
async function loginUser(email, password) {
    try {
     
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }


        const token = jwt.sign({ userId: user._id, firstName: user.firstName, lastName :user.lastName, email:user.email,role:user.role,phone:user.phone }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return { message: "Login successful", token };
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = {loginUser,registerUser}