import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://picante-restuarant-cxiv.onrender.com', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent along with the request
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
const dbURI = 'mongodb+srv://pavansaikumar49:5QZ4q7em24FZgHAW@cluster0.xkg6axr.mongodb.net/resto?retryWrites=true&w=majority';
mongoose.connect(dbURI);
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

// Route to fetch vegetarian products
app.get('/veg', async (req, res) => {
  try {
    console.log('Fetching vegetarian products...');
    const products = await Product.find({});
    console.log('Vegetarian products fetched successfully:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching vegetarian products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch tiffins
app.get('/tiffins', async (req, res) => {
  try {
    console.log('Fetching tiffins...');
    const products = await Product.find({});
    console.log('Tiffins fetched successfully:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching tiffins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
