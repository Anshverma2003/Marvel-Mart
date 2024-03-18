import UserModel from "../Models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const generateToken = (payload) => {
    return Jwt.sign(payload, process.env.Secret);
}


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

        if (!email || !password || !firstname || !lastname) {
            throw new Error("All field required");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Enter a valid email");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("Enter are strong password");
        }

        let existingUser = await UserModel.checkExistingUser(email);

        if (existingUser) {
            throw new Error("Email already exists. Try logging in");
        }

        else {
            const savedUser = await newUser.saveUser();
            if (savedUser.success) {

                const token = generateToken(newUser.firstname);

                res.status(201).json({ message: "User created successfully", token });
            } else {
                throw new Error("User not saved");
            }
        }

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("All fields required");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Enter a valid email");
        }

        const user = await UserModel.findUser(email);

        if (!user) {
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong Password");
        }

        const token = generateToken(user.email);

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
