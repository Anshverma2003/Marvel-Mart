import db from "../db.js";

class UserModel {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    static async checkExistingUser(email) {
        try {

            const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            if (existingUser.rows.length > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    }

    async saveUser() {

        try {

            const result = await db.query("INSERT INTO users(id , firstname , lastname , email , password) VALUES (DEFAULT , $1 , $2 , $3, $4)",
                [this.firstname, this.lastname, this.email, this.password]
            );

            if (!result) {
                throw new Error("User creation failed: Database query did not return a result");
            }
            return { success: true };

        } catch (err) {

            throw err;
        }

    }

    static async findUser(email){
        try{
            const checkUser = await db.query("SELECT * FROM users WHERE email = $1" , [email]);
            if(checkUser.rows.length > 0){

                return checkUser.rows[0];
            }
            else{
                throw new Error("User not Found. Try signing in");
            }
        }
        catch(error){
            throw error;
        }
    }
}

export default UserModel;