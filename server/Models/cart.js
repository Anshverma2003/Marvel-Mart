import db from "../db.js";

class cartModal {

    constructor({user_id, product_id, size, quantity, price}) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.size = size;
        this.quantity = quantity;
        this.price = price;
    }

    async addToCart() {
        try {
            const result = await db.query('INSERT INTO cart(cart_id , user_id , product_id , size , quantity , price) VALUES (DEFAULT ,$1 , $2 , $3 , $4 , $5)',
                [this.user_id, this.product_id, this.size, this.quantity, this.price]);

            if (!result) {
                throw { staus: 500, message: "Server error Can Not Store Data" };
            }
            return { success: true };
        }

        catch (err) {
            return err;
        }
    }
}
export default cartModal;