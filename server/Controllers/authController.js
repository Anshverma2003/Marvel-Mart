import UserModel from "../Models/user.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel(
        firstname,
        lastname,
        email,
        hashPassword
    );

    try {
        const savedUser = await newUser.saveUser();
        if (savedUser.success) {
            res.status(201).json({ message: "User created successfully" });
        } else {
            throw new Error("User not saved");
        }
    } catch (error) {

        if (error.message === "Email already exists. Try logging in.") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Failed to create user" });
        }
    }
};

export const login = async (req, res) => {

    res.send("login");
}