const mongoose=require("mongoose")
const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/Products', { useNewUrlParser: true, useUnifiedTopology: true });

};
const product=new mongoose.Schema({

  productId:String,
  productName:String,
  productCode:String,
  releaseDate:String,
  description:String,
  price:String,
  starRating:String,
  imageUrl:String
})
const Product=mongoose.model('product',product);

connect().then(
  console.log("db connected")
).catch(e=>console.log(e));

module.exports=Product;
