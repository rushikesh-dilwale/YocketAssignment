const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// In-memory game state
let gameData = {
  cities: [],
  vehicles: [],
  copData: [],
};

// Landing Page
app.get('/', (req, res) => {
  res.send('Welcome to the Fugitive Capture Game Backend');
});

// City Selection
app.post('/city-selection', (req, res) => {
  const { copId, selectedCities } = req.body;
  gameData.cities[copId - 1] = selectedCities;
  res.json({ success: true });
});

// Vehicle Selection
app.post('/vehicle-selection', (req, res) => {
  const { copId, selectedVehicle } = req.body;
  gameData.vehicles[copId - 1] = selectedVehicle;
  res.json({ success: true });
});
// Result Page
app.get('/result', (req, res) => {
  const capturedCop = gameData.copData.find((cop) => cop.captured);
  res.json({ capturedCop });
});
// Restart Game
app.post('/restart', (req, res) => {
  gameData = {
    cities: [],
    vehicles: [],
    copData: [],
  };
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
