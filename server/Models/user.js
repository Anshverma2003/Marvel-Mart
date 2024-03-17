import db from "../db.js";

class UserModel {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    async saveUser() {

        try {
            const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [this.email]);

            if (existingUser.rows.length > 0) {
                throw new Error("Email already exists. Try logging in.");
            }
            else {

                const result = await db.query("INSERT INTO users(id , firstname , lastname , email , password) VALUES (DEFAULT , $1 , $2 , $3, $4)",
                    [this.firstname, this.lastname, this.email, this.password]
                );

                if (!result) {
                    throw new Error("User creation failed: Database query did not return a result");
                }

                return { success: true };
            }

        } catch (err) {

            throw err;
        }

    }
}

export default UserModel;