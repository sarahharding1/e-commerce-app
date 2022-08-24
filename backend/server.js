import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';

 const app = express();
 // eslint-disable-next-line no-undef
 mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://admin:admin@cluster0.o2riywz.mongodb.net/?retryWrites=true&w=majority',
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
 });

 app.get('/api/products/:id', (req, res) => {
  const product = data.products.find( x => x._id === req.params.id);
  if (product){
    res.send(product);
  } else{
    res.status(404).send({message: 'Product not found'});
  }
});

 app.get('/api/products', (req, res) => {
   res.send(data.products);
 });

 app.get('/', (req, res) => {
   res.send('Server is ready');
 });

 app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message});
 });

 app.use('/api/users', userRouter);
 // eslint-disable-next-line no-undef
 const port = process.env.PORT || 5000;
 app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`);

 });
