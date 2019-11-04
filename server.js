const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  const result = await db('accounts');
  res.status(200).json(result);
});

server.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await db('accounts').where({ id });
  res.status(200).json(result);
});

server.post('/', async (req, res) => {
  const { name, budget } = req.body;
  const result = await db('accounts').insert({ name, budget });
  res.status(200).json(result);
});

server.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;
  const result = await db('accounts').where({ id }).update({ name, budget });
  res.status(200).json(result);
});

server.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await db('accounts').where({ id }).del();
  res.status(200).json(result);
});

module.exports = server;