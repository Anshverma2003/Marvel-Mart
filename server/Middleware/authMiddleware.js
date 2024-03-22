import Jwt, { decode } from "jsonwebtoken";

const fetchUser = (req, res, next) => {

    try {

        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: "Token not found" });
        }
        Jwt.verify(token.split(' ')[1] , process.env.Secret , (err , decode)=>{
            if(err){
                res.status(401).json({message: "Invalid Token"});
            }
            req.user = decode;
            next();
        });
    }
    catch(err) {
        res.status(err.status).json({err: err.message || err});
    }
}

export default fetchUser;