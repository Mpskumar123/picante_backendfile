import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent along with the 
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
const dbURI = 'mongodb+srv://pavansaikumar49:5QZ4q7em24FZgHAW@cluster0.xkg6axr.mongodb.net/resto?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB:', mongoose.connection.name);
});

// Define the Product model for the "details" collection in the "resto" database
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: String,
  image: String
});

const Product = mongoose.model('Product', productSchema, 'details');
// Route to fetch all products
app.get('/products', async (req, res) => {
  try {
    console.log('Fetching products...');
    const products = await Product.find({});
    console.log('Products fetched successfully:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const Product1 = mongoose.model('Product1', productSchema, 'itemdetails');
// Route to fetch all products
app.get('/veg', async (req, res) => {
  try {
    console.log('Fetching products...');
    const products = await Product1.find({});
    console.log('Products fetched successfully:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




const Product2 = mongoose.model('Product2', productSchema, 'tiffins');
// Route to fetch all products
app.get('/tiffins', async (req, res) => {
  try {
    console.log('Fetching products...');
    const products = await Product2.find({});
    console.log('Products fetched successfully:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
