const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', async (req, res, next) => {
  try {
    const { limit, sortby, sortdir } = req.query;
    const result = await db('accounts').orderBy(sortby || 'id', sortdir || 'asc').limit(limit || 10000);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

server.get('/api/accounts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db('accounts').where({ id });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

server.post('/api/accounts', async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    const result = await db('accounts').insert({ name, budget });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

server.put('/api/accounts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, budget } = req.body;
    const result = await db('accounts').where({ id }).update({ name, budget });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

server.delete('/api/accounts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db('accounts').where({ id }).del();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

server.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message
  })
})

module.exports = server;