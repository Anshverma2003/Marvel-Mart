import buyModel from "../Models/buy.js";

export const address = async(req , res) => {
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
        if(!response.success){
            throw { status: 500, message: 'Server error can not add Address' };
        }
        res.status(201).json({message: 'Address saved !' });

    } catch (error) {
        res.status(error.status).json({error: error.message || error});
    }
};