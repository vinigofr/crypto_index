const router = require('express').Router();

router.post('/', (_, res) => res.json({ message: 'Login Route' }));

module.exports = router;
