const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

// same pre populated data for API testing
let items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' },
    { id: 4, name: 'Item Four' },
    { id: 5, name: 'Item Five' },
    { id: 6, name: 'Item Six' },
    { id: 7, name: 'Item Seven' },
    { id: 8, name: 'Item Eight' },
    { id: 9, name: 'Item Nine' },
    { id: 10, name: 'Item Ten' }
];

// GET just for testing if its UP or DOWN

app.get('/', (req, res) => {
    res.send('Sike ankoooooo');
});

app.get('/items', (req, res) => {
    res.json(items);
});

// use GET
// fetching a single item by ID passing it to URL
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// use POST
// add the new item given in the request body as [JSON] 
// and return the created item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// use PUT
// update an existing item by ID in the URL
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    item.name = req.body.name;
    res.json(item);
});

// use DELETE
// delete an existing item by ID in the URL
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Item not found');
    const deleted = items.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});