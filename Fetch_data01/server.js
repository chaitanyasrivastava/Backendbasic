const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const products = [
    { id: 1, name: "Laptop", price: 2000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 150 },
];


app.get('/api/products', (req, res) => {
    res.json(products);
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
