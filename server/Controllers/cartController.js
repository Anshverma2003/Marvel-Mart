import cartModal from "../Models/cart.js"

export const cart = async (req, res) => {

    try {

        const user_id = req.user

        const { product_id, size, quantity, price } = req.body;

        const newCart = new cartModal({

            user_id: user_id,
            product_id,
            size,
            quantity,
            price
        });

        const result = await newCart.addToCart();
        console.log(result);
        if (!result.success) {
            throw { status: 500, message: "Data Not Added In Cart !" };
        }
        res.status(201).json({ message: "Data added to cart" });

    } catch (error) {
        res.status(error.status).json({ message: error.message || error });
    }
};

export const cartItems = async (req, res) => {
    try {
        const user_id = req.user;

        const response = await cartModal.getAllCartItems(user_id);
        if (response) {
            res.status(200).json({ message: "Data fetched from the cart", response });
        }
        else {
            throw { status: 500, message: "Could Not Fetch Data From DB" };
        }
    } catch (error) {
        res.status(error.status).json({ error: error.message || error });

    }
};

export const deleteProduct = async (req, res) => {

    try {
        const { product_id } = req.body;
        
        const response = await cartModal.deleteItem(product_id);
        if (response.success) {
            res.status(201).json({ message: 'Item removed from the cart' });
        }
        else {
            throw { status: 500, message: 'Can not remove item from cart' };
        }
    } catch (error) {
        res.status(error.status).json({ error: error.message || error });
    }
};