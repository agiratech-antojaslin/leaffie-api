const express = require('express');
const Product = require('../models/product-model');
const category = require('../models/category-model');

const router = express.Router()

//Post Method
router.post('/create',  (req, res) => {
    try {
        const newProduct = new Product({
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            categoryID: req.body.categoryID,
            quantity: req.body.quantity,
            image: req.body.image,
        })
        const productToSave = newProduct.save();
        res.status(200).json({
            code: 200, 
            message: "Product created successfully!",
        })
    }
    catch (error) {
        res.status(400).json({code: 200, message: error.message})
    }
})

//Get all Method
router.get('/getAll',  (req, res) => {
    Product.find({}).populate('categoryID').then((products, err) => {
        if(err){
            console.log(err);
            res.status(400).json({message: err.message})
        }
        else {
            res.json({
                status: 200,
                message: "All products retrieved successfully!",
                data: products
            });
        }
    });
})

//Get by ID Method
router.get('/getOne/:id',  (req, res) => {
    Product.findOne({ _id: req.params.id }).populate('categoryID').then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.json({
            status: 200,
            message: "Product retrieved successfully!",
            data: product
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

//Get by ID Method
router.get('/getProductsByCategory/:categoryId',  (req, res) => {
    Product.find({ categoryID: req.params.categoryId }).then((products) => {
        if (!products) {
            return res.status(404).send();
        }
        res.json({
            status: 200,
            message: "Products retrieved successfully!",
            data: products
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;