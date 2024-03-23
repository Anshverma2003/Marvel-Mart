import db from "../db.js";

class cartModal {

    constructor({ user_id, product_id, size, quantity, price }) {
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

    static async getAllCartItems(user_id) {
        try {
            const result = await db.query('SELECT cart.cart_id, cart.user_id, cart.product_id,cart.size, cart.quantity, products.image, products.price, products.name FROM cart JOIN products ON cart.product_id = products.product_id WHERE cart.user_id = $1;'
                , [user_id]);
            if (result.rows.length > 0) {
                return result.rows;
            }
            else {
                throw { status: 500, message: "Internal Server Error" };
            }
        } catch (err) {
            return err;
        }
    }
    static async deleteItem(product_id) {
        try {
            console.log(product_id);
            const result = await db.query('DELETE FROM cart WHERE product_id = $1 ', [product_id]);
            if (!result) {
                throw { status: 500, message: 'Can not remove item from the cart' };
            }
            return { success: true };

        } catch (error) {
            return error;
        }
    }
}
export default cartModal;