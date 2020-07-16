const express = require("express");
const path = require("path");
const app=new express();
const cors=require('cors');
const bcrypt=require("bcryptjs")
const userdb=require('./src/Model/user')
const jwt=require("jsonwebtoken")
const bodyParser = require('body-parser');
const productModel=require('./src/Model/product')
const multer = require("multer");
const checkAuth=require('./src/middleware/check-auth')
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "./public/images"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).single("imageUrl");


app.get('/products',function (req,res){
  productModel.find({}).exec().then(
    data=>res.status(200).json(data)
  ).catch(e=>console.log(e))
})
app.post('/products',checkAuth,function(req,res){
  /*
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log(req.body)
    let data = {
      productId:req.body.productId,
      productName:req.body.productName,
      productCode:req.body.productCode,
      releaseDate:req.body.releaseDate,
      description:req.body.description,
      price:req.body.price,
      starRating:req.body.starRating,
      imageUrl:req.file.originalname
    };
*/
    productModel(req.body).save().then(
      (data)=>res.json(data)
    ).catch(e=>console.log(e))
 // });

})
/*------login------*/
app.post('/login',function (req,res) {
  console.log(req.body.email)
  userdb.find({email:req.body.email}).exec()
    .then(
      user=>{
        if(user.length<1){
          return res.status(401).json(
            {
              message:"Auth failed user not present in database",

            }
          )
        }
        else{

          bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){

              return res.status(401).json({
                message:"Auth failed"
              })
            }
            else if(result){

              const token=jwt.sign(
                { email:user[0].email,
                  userId:user[0]._id,
                  username:user[0].fname
                },
                'vivekkey',
                {
                  expiresIn:"1hr"
                }
              )
              console.log("authsuccessful")
              return res.status(200).json({
                message:"Auth successful",
                redirect:true,
                token:token
              })

            }
            else{
              return res.status(401).json({
                message:"Auth failed wrong password"
              })
            }
          })
        }
      }
    )
    .catch(
      (err=>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
    )
})
/*---------signup------*/
app.post('/signup',function (req,res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      console.log(req.body.email);
      userdb
        .find({ email: req.body.email })
        .exec()
        .then((user) => {
          console.log(user);
          if (user.length >= 1) {
            return res.status(409).json({
              message: "User with the same mail exists",
            });
          } else {
            var data = {
              fname:req.body.fname,
              lname:req.body.lname,
              email:req.body.email,
              password:hash
            };
            console.log(data);
            userdb(data)
              .save()
              .then(() => {
                return res.status(200).json({
                  message: "Signup successful",
                  redirect:true
                });

              });
          }
        });
    }
  });
})

/*---------single product------------*/
app.get('/products/:id',checkAuth,function(req,res){

  console.log(req.params.id);
  productModel.findById(req.params.id).exec().then(
    data=>res.status(200).json(data)
  ).catch(e=>console.log(e))
})
app.post('/products/delete',checkAuth,function (req,res) {
  console.log(req.body);
  const id=req.body._id;
  productModel.findByIdAndDelete(id,function (err, docs) {
    if (err){
    return res.status(502).json(
      {
        message:"Failed to delete",
      }
    )
  }
  else{
    return res.status(201).json(
      {
        message:"product deleted !!",

      }
    )
  }
});
})
app.put('/products/:id',checkAuth,function(req,res) {
  console.log(req.params.id);
  productModel.findByIdAndUpdate(req.params.id,req.body).exec().then(
    data => res.status(200).json(data)
  ).catch(e => console.log(e))
})
app.listen("3000");
console.log("Port:3000")
