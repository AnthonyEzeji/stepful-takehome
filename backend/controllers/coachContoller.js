const User = require('../models/User');
const bcrypt = require('bcrypt');

async function getAllCoaches() {
    try {
        return await User.find({ role: "coach" });
    } catch (error) {
        throw error;
    }
}

async function getCoachByID(id) {
    try {
        const user = await User.findById(id);
        if (!user || user.role !== "coach") {
            throw new Error("User not found or not a coach");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllCoaches, getCoachByID };
