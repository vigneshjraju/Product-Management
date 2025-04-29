import Product from "../Models/productmodel.js";

const converttobase64=(buffer)=>{
    return buffer.toString("base64")
}

const createProduct=async(req,res)=>{

    try{

        const userId = req.userId ? req.userId : req.body.userId;
        const { Name, Description, Price, Category} = req.body;

        let image1=null;
        

            if(req.files && req.files["image"]){
                image1=converttobase64(req.files["image"][0].buffer)
            }

            if (Description.length > 50) {
                return res.status(400).json({ message: "Description must be 50 characters or fewer." });
              }

              const productCount = await Product.countDocuments();
              const productId = `PROD${(productCount + 1).toString().padStart(3, '0')}`;
              

            const newProduct = new Product({
                productId,
                name:Name,
                description:Description,
                price:Price,
                category:Category,
                image: image1,
                ownerId: userId
              });    

              await newProduct.save();

              res.status(201).json({ message: "Product created successfully!" });


    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

}

export {createProduct}