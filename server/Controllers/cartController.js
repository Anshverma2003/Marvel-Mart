import cartModal from "../Models/cart.js"

export const cart = async (req, res) => {

    try {
        req.user = user_id;
        const { product_id, size, quantity, price } = req.body;

        const newCart = new cartModal({

            user_id,
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
}