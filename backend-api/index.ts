import express from 'express';
import cors from 'cors';
import connectDB from './config/mongo.config.js';
import productsRoutes from './routes/productsRoutes.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json({limit:'16mb' })); 
app.use(express.urlencoded({ extended: true, limit:'16mb' }));
app.use('/products', productsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)