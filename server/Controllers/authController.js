import UserModel from "../Models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const generateToken = (payload) => {
    return Jwt.sign(payload, process.env.Secret);
}


export const signup = async (req, res) => {


    try {
        const { firstname, lastname, email, password } = req.body;
        console.log(firstname, lastname, email, password);


        if (!email || !password || !firstname || !lastname) {
            console.log("hit1");
            throw { status: 400, message: "All field required" };


        }
        if (!validator.isEmail(email)) {
            console.log("hit2");
            throw { status: 400, message: "Enter a valid email" };
        }


        const existingUser = await UserModel.checkExistingUser(email);

        if (existingUser) {
            console.log("hit4");

            throw { status: 400, message: "Email already exists. Try logging in" };
        }

        else {
            console.log("hit");
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            const newUser = new UserModel(
                firstname,
                lastname,
                email,
                hashPassword
            );

            const savedUser = await newUser.saveUser();
            if (!savedUser.success) {
                throw {
                    status: 400, message: "User not saved"
                }

            }
            const token = generateToken(newUser.firstname);

            res.status(201).json({ message: "User created successfully", token });
        }
    } catch (error) {
        console.log(error.message);
        res.status(error.status).json({ error: error.message || error });
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