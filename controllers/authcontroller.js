import User from "../Models/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req,res)=>{
    try{
        const {Name,Email,Password,Role}=req.body;

        if (Role === 'admin'){

            const existingAdmin = await User.findOne({role:'admin'});

            if(existingAdmin){
                res.status(400).json({message: 'Admin already exists!'});
            }

        }

        const newpassword=await bcrypt.hash(Password,10);

        const user = new User({
            name:Name,
            email:Email,
            password:newpassword,
            role:Role

        });

        await user.save(); 
        res.status(201).json({message:'User registered successfully'});
        
    }
    catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}

const login= async(req,res)=>{
    try{
        const {Email,Password}=req.body;
        const user=await User.findOne({ email:Email });

        if (!user){
            res.status(404).json({ message: 'Invalid credentials!' });
        }

        const Match = await bcrypt.compare(Password, user.password);
        if (!Match) {
            res.status(400).json({ message: 'Invalid credentials!' });
        } 

        const token = jwt.sign({ userId: user.userId, role: user.role },process.env.SECRET_KEY,{ expiresIn: '7d' });

        res.cookie('authToken', token, {
            httpOnly: true,
        });

        res.status(200).json({ message: 'Login successful!', role: user.role });


    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = async (req, res) => {
    try {

      res.clearCookie('authToken');
      res.status(200).json({ message: 'Logged out successfully!' });

    } catch (error) {

      console.error(error);
      res.status(500).json({ message: 'Server error' });

    }
};

export {signup,login,logout}

  