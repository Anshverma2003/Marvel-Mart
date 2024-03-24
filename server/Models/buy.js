import db from "../db.js";

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
            return { success: true};

        } catch (error) {
            return error;
        }
    }
};

export default buyModel;