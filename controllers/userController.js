const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller for user registration
const usersController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("all fields is required");
        }
        // check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hasshedPassword = await bcrypt.hash(password, salt);
        // save new user
        const newUser = new userModel({ username, email, password: hasshedPassword });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error in usersController:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Controller for user login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }
        // find user by email only
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "Invalid email or password"
            });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).send({
                status: false,
                message: "Invalid email or password"
            });
        }
        // token
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" });
        res.status(200).send({
            status: true,
            message: "User login successfully",
            token,
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        });
        
    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { usersController, loginController };