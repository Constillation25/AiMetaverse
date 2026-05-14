const express = require('express');
const path = require('path');
const { MODULES, AGENTS, ASSETS, SECTIONS, PlatformState } = require('./src/platform.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get platform stats
app.get('/api/stats', (req, res) => {
  const state = new PlatformState();
  res.json(state.getStats());
});

// API endpoint to get modules
app.get('/api/modules', (req, res) => {
  res.json(MODULES);
});

// API endpoint to get agents
app.get('/api/agents', (req, res) => {
  res.json(AGENTS);
});

// API endpoint to get assets by type
app.get('/api/assets/:type?', (req, res) => {
  const { type } = req.params;
  if (type) {
    res.json(ASSETS[type] || []);
  } else {
    res.json(ASSETS);
  }
});

// API endpoint to get all sections
app.get('/api/sections', (req, res) => {
  res.json(SECTIONS);
});

// Serve main index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Constellation25 Platform Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});
