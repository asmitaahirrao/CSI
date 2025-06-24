const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/products', productRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB error:', err));

const PORT = 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
