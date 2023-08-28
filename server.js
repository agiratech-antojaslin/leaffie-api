require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoString = "mongodb://localhost:27017/leaffie";
const bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const port = process.env.PORT || 8000

//mongoose.set('strictQuery', false);
//mongoose.connect( db='test', username='antojaslin', password='HnRieDC472eeYc3k', host='mongodb+srv://antojaslin:HnRieDC472eeYc3k@cluster0.hzlqtvq.mongodb.net/test/')
mongoose.connect(process.env.MONGO_URI || mongoString);
//mongoose.connect("mongodb+srv://antojaslin:HnRieDC472eeYc3k@cluster0.hzlqtvq.mongodb.net/leaffie");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
var dir = path.join(__dirname, 'public');

app.use(express.static(dir));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})