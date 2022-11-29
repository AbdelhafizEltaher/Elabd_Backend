const Product =require('../Models/product')

async function AddNewProduct(RequestData){
    const newProduct= new Product({
        Name :RequestData.Name,
        Image :RequestData.Image,
        Amount :RequestData.Amount,
        Price :RequestData.Price,
        Categories :RequestData.Categories
    })
 return newProduct.save()
}

async function UpdateProduct(ProductId ,Data){
    return await Product.findByIdAndUpdate(ProductId, { $set: Data, }, { new: true, runValidators: true })
}

async function GetAllProducts(skip,limit,name ,price ,latestProducts, oldestProducts ,QCategory){
    if(skip){
        return await Product.find().skip(skip).limit(limit)
    }
    if(name){
        return await Product.find({Name:name})
    }
    if (price){
        return await Product.find({Price:price})
    }
    if(QCategory){
        return await Product.find({ Categories: { $in: [QCategory] } })
    }
    if (latestProducts){
        return await Product.find().sort({ createdAt: -1 }).limit(5)
    }
    if (oldestProducts){
        return await Product.find().sort({ createdAt: 1 }).limit(5)
    }
    else{
        return await Product.find()
    }
}

async function GetProductById(ProductId){
    return await Product.findById(ProductId)
}

async function DeletProducById(ProductId){
   let ProductData= await Product.findById(ProductId)
   console.log(ProductData)
    if(ProductData == null){
        console.log(ProductData)
        return "Incorrect Product Id"
        
    }else{
        await Product.deleteOne(ProductData)
        return "Product Deleted Successfuly"
    }
}

async function GetProductsStats() {
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await Product.aggregate([
        {
            $match: { createdAt: { $gte: LastYear } }
        },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: { _id: "$month", total: { $sum: 1 } }
        }

    ])

}
module.exports={AddNewProduct,UpdateProduct,GetAllProducts ,GetProductById ,DeletProducById ,GetProductsStats}