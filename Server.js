const express = require('express');
const mongoose = require('mongoose');
const Product = require('./ProductModel');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server running at port - 3000");
})

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ProductInfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})
.then(() => console.log("Connected to database"))
.catch((error) => console.log(error));

// Posting Product Details to database
app.post("/products", async (request,response) => {
    try {
        const product = await request.body;
        await Product.create(product);
        response.status(200).json({message: "Successfully posted to database"})
    } catch (error) {
        console.log(error);
    }
})

// Fetch all products from database
app.get('/products', async(request,response) => {
    try {
        const products = await Product.find({});
        response.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
})

// Fetch single product from database based on product id
app.get('/products/:id', async(request,response) => {
    try {
        const {id} = request.params;
        const product = await Product.findById(id);
        response.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
})

// update product details
app.put("/products/:id", async(request,response) => {
    try {
        const {id} = request.params;
        const product = await Product.findByIdAndUpdate(id, request.body);
        if(!product) {
            response.status(404).json({message: 'cannot find the product'});
            response.send("Cannot find product");
        }

        const updatedProduct = await Product.findById(id);

        response.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
    }
})

// Deleting specific product from product listStyle
app.delete("/products/:id", async(request,response) => {
    try {
        const {id} = request.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            response.status(404).json({message: "Cannot find product"});
        }
        response.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
})
