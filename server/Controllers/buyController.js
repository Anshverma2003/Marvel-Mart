import buyModel from "../Models/buy.js";

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
        res.status(error.status).json({error: error.message || error});
    }
}