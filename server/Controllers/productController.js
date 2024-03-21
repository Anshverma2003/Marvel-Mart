
import ProductModel from "../Models/product.js";

export const product = async (req, res) => {

    try {
        const getAllProduct = await ProductModel.getItems();
        res.status(200).json({ message: "Data Fetched", getAllProduct });
    }
    catch (error) {
        res.status(error.status).json({ error: error.message || error });
    }
};

export const productById = async(req , res)=>{

    const id = req.params.id;

    try{
        const getProductById = await ProductModel.getItemById(id);

        if(!getProductById){
            throw{status: 500 , message:"Could Not Fetch Data From DB"};
        }
        res.status(200).json({message:"Data Fetched !", getProductById});
    }
    catch(err){
        res.status(err.status).json({err: err.message || err});
    }
};
