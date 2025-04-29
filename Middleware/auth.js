import jwt from 'jsonwebtoken';
import User from '../Models/usermodel.js';

const authentication=(req,res,next)=>{

    try{
        const cookie = req.headers.cookie;
        console.log(cookie);

        if (!cookie) {
            console.log("Please login to continue.");
            res.status(401).send("Please login to continue.")
        }

        else{
       
                const [name,Token]=cookie.trim().split('=');
                console.log(name);
                console.log(Token);

                if(name=="authToken"){
                    const verification = jwt.verify(Token, process.env.SECRET_KEY);
                    req.userId = verification.userId;
                    req.userrole= verification.role;

                    next();
                }

        }

        

    }

    catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }

}

const userCheck= async(req, res, next) => {

    try{
        const userId = req.userId ? req.userId : req.body.userId;
        
        const user = await User.findOne({userId: userId});
        console.log(user);
        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (user.role== "admin") {
            return res.status(403).json({ message: "Access denied. Only users are allowed." });
        }

        
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }

};

export {authentication,userCheck}