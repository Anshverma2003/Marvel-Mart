import db from "../db.js";

class ProductModel {

    static async getItems() {
        try {

            const getAllItems = await db.query('SELECT * FROM products');
            if (getAllItems.rows.length === 0) {
                throw { status: 404, message: "Could Not Fecth Data" };
            }
    
            return getAllItems.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getItemById(id){
        try{
            const getItem = await db.query('SELECT * FROM products WHERE product_id = $1' ,[id]);
            if(getItem.rows.length > 0){

                return getItem.rows;
            }
            else{
          
                throw{status:500 , message: "Could Not Fetch Data"}
            }
            
        }
        catch(err){
            throw err;
        }
    }
};

export default ProductModel;
