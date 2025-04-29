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

              res.status(201).json({ message: "Product created successfully!" ,newProduct});


    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

}

const editProduct = async (req, res) => {
    try {

        const userId = req.userId ? req.userId : req.body.userId;
        const userRole = req.userrole;

        const { id } = req.params; 
        const { Name, Description, Price, Category } = req.body;

        let image1 = null;

        if (req.files && req.files["image"]) {
        image1 = converttobase64(req.files["image"][0].buffer);
        }

        let product = await Product.findOne({ productId: id });

        if (!product) {
        return res.status(404).json({ message: "Product not found" });
        } 
  
        else{

            if (product.ownerId !== userId && userRole !== "admin") {
                return res.status(403).json({ message: "Unauthorized to update this product" });
              }
              


            const product1=await Product.findOneAndUpdate(
                { productId: id },
                {
                    $set: {
                        name:Name,
                        description:Description,
                        price:Price,
                        category:Category,
                        ...(image1 && { image: image1 }),
                        ownerId: userId
                    }

                },
                { new: true }
            );
            res.status(200).json({ message: "Product updated successfully!", product1 });
      }
  
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const deleteProduct = async (req, res) => {
    try {
      const userId = req.userId ? req.userId : req.body.userId; 
      const userRole = req.userrole;
    
      const { id } = req.params; 
  
      
      const product = await Product.findOne({ productId: id });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      
      if (product.ownerId !== userId && userRole !== "admin") {
        return res.status(403).json({ message: "Unauthorized to delete this product" });
      }
  
      
      await Product.deleteOne({ productId: id });
  
      res.status(200).json({ message: "Product deleted successfully!" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};

const getAllProducts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
  
      const products = await Product.find({}, 'name image price') // only selected fields
        .skip(skip)
        .limit(limit);
  
      const total = await Product.countDocuments();
      const totalPages = Math.ceil(total / limit);
  
      res.status(200).json({
        currentPage: page,
        totalPages,
        totalProducts: total,
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};


const getProductDetail = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findOne({ productId: id });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};

const searchProducts = async (req, res) => {
    try {
      const { query } = req.query;
  
      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { productId: { $regex: query, $options: 'i' } },
        ],
      });
  
      res.status(200).json({ total: products.length, products });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
};

const filterProducts = async (req, res) => {
    try {
      const { category, minPrice, maxPrice } = req.query;
      const query = {};
  
      if (category) query.category = category;

      if (minPrice || maxPrice) {

        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      
    }
  
      const products = await Product.find(query);
      res.status(200).json({ total: products.length, products });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
};

const sortProducts = async (req, res) => {
    try {
      const { sortBy = 'createdAt', order = 'desc' } = req.query;
  
      const sortOption = {};
      sortOption[sortBy] = order === 'asc' ? 1 : -1;
  
      const products = await Product.find().sort(sortOption);
      res.status(200).json({ total: products.length, products });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  
  
  


export {createProduct,editProduct,deleteProduct,getAllProducts,getProductDetail,searchProducts,filterProducts,sortProducts}