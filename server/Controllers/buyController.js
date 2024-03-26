import Stripe from "stripe";
import env from 'dotenv';
import buyModel from "../Models/buy.js";
import cartModal from "../Models/cart.js";

env.config();

const stripe = new Stripe(process.env.stripeSecret);

export const address = async (req, res) => {
    try {
        const user_id = req.user

        const { address, city, state, pincode, mobile_no } = req.body;

        const newAddress = new buyModel({
            user_id: user_id,
            address,
            city,
            state,
            pincode,
            mobile_no
        })

        const response = await newAddress.saveAddress();
        if (!response.success) {
            throw { status: 500, message: 'Server error can not add Address' };
        }
        res.status(201).json({ message: 'Address saved !' });

    } catch (error) {
        res.status(error.status).json({ error: error.message || error });
    }
};

export const getAddress = async (req, res) => {
    try {
        const user_id = req.user;
        const response = await buyModel.getAddress(user_id);
        if (response) {
            res.status(200).json({ message: 'data fetched ', response });
        }
        else {
            throw { status: 500, message: 'can not show address' };
        }
    } catch (error) {
        res.status(error.status).json({ error: error.message || error });
    }
};

export const removeaddress = async (req, res) => {
    try {
        const user_id = req.user;
        const { pincode } = req.body;

        const response = await buyModel.removeaddress(user_id, pincode);
        if (response.success) {
            res.status(201).json({ message: 'Address removed' });
        }
        else {
            throw { status: 500, message: 'Can not remove address' };
        }
    } catch (error) {
        res.status(error.status).json({ error: error.message || error });
    }
};

export const payment = async (req, res) => {
    try {
        const user_id = req.user;
        const result = await cartModal.getAllCartItems(user_id);

        if (result) {
            const lineItems = result.map((product) => ({
                price_data: {
                    currency: "Inr",
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity
            }));

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url:"http://localhost:3000/",
                cancel_url:"http://localhost:3000/cart"
            });
            res.status(200).json({ id: session.id });
        } else {
            throw { status: 500, message: 'No items found in the cart' };
        }
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || error });
    }
}
