const express = require('express');
const Category = require('../models/category-model');

const router = express.Router()

router.post('/create', (req, res) => {
    try {
        const newCategory = new Category({
            categoryName: req.body.categoryName,
            description: req.body.description,
        })
        const categoryToSave = newCategory.save();
        res.status(200).json({
            code: 200, 
            message: "Category created successfully!",
        })
    }
    catch (error) {
        res.status(500).json({code: 500, message: error.message})
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
    console.log("Get all categories");
    let categories = Category.find({}).then(function(categories){
        res.json({
            status: 200,
            message: "All categories retrieved successfully!",
            data: categories
        });
    }).catch(err => {
        res.status(400).json({
            code: 400,
            message: err.message
        })
    });
})

module.exports = router;