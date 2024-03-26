import db from "../db.js";
import Stripe from "stripe";

class buyModel {

    constructor({ user_id, address, city, state, pincode, mobile_no }) {
        this.user_id = user_id;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.mobile_no = mobile_no;
    };

    async saveAddress() {
        try {
            const result = await db.query('INSERT INTO address(address_id , user_id , address , city , state , pincode , mobile_no) VALUES(DEFAULT , $1 , $2 ,$3 , $4 , $5 , $6) RETURNING *',
                [this.user_id, this.address, this.city, this.state, this.pincode, this.mobile_no]);

            if (!result.rows[0]) {
                throw { status: 500, message: 'Server error: Could not add Address' };
            }
            const saveAddress = result.rows[0];
            return { success: true };

        } catch (error) {
            return error;
        }
    }

    static async getAddress(user_id) {
        try {
            const result = await db.query('SELECT * FROM address WHERE user_id = $1', [user_id]);

            if (result.rows.length > 0) {
                return result.rows;
            }
            else {
                throw { status: 500, message: 'can not show address' };
            }
        } catch (error) {
            return error;
        }
    }

    static async removeaddress(user_id, pincode) {

        try {
            const result = await db.query('DELETE FROM address WHERE user_id = $1 AND pincode = $2', [user_id, pincode]);

            if (!result) {
                throw { status: 500, message: 'Can not remove address' };
            }
            return { success: true };
        } catch (error) {
            return error;
        }

    }

};

export default buyModel;