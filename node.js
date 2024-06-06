const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Built-in middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock database
let db = [
{ "id": 1, "name": "Oliver Queen", "email": "oliver.q@gmail.com" },
{ "id": 2, "name": "Natasha Romanoff", "email": "natasha.r@shield.gov" },
{ "id": 3, "name": "Tony Stark", "email": "tony.stark@starkindustries.com" },
{ "id": 4, "name": "Peter Parker", "email": "peter.parker@dailybugle.net" },
{ "id": 5, "name": "Wanda Maximoff", "email": "wanda.m@avengers.org" },
{ "id": 6, "name": "Steve Rogers", "email": "steve.rogers@usarmy.gov" },
{ "id": 7, "name": "Thor Odinson", "email": "thor.odinson@asgardia.com" }
];



// Simulate delay function
function simulateDelay(callback) {
    setTimeout(() => {
        callback();
    }, 1000); // Simulates a 1-second delay
}

// GET /api/data
app.get('/api/data', (req, res) => {
    simulateDelay(() => {
        res.send(db);
    });
});

// POST /api/data
app.post('/api/data', (req, res) => {
    simulateDelay(() => {
        const newData = req.body;
        db.push(newData);
        res.status(201).send(newData);
    });
});

// PUT /api/data/:id
app.put('/api/data/:id', (req, res) => {
    simulateDelay(() => {
        const id = parseInt(req.params.id);
        const updatedData = req.body;
        const index = db.findIndex(item => item.id === id);

        if (index!== -1) {
            db[index] = updatedData;
            res.send(updatedData);
        } else {
            res.status(404).send({ message: 'Entry not found' });
        }
    });
});

// DELETE /api/data/:id
app.delete('/api/data/:id', (req, res) => {
    simulateDelay(() => {
        const id = parseInt(req.params.id);
        const index = db.findIndex(item => item.id === id);

        if (index!== -1) {
            db.splice(index, 1);
            res.send({ message: 'Entry deleted' });
        } else {
            res.status(404).send({ message: 'Entry not found' });
        }
    });
});

// Root URL handler
app.get('/', (req, res) => {
    res.send('Welcome to the API'); // Or perform a redirect
});

// Port
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
