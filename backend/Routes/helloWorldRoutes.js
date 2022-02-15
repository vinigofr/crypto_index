const router = require('express').Router();

router.get('/', (_, res) => res.json({ message: 'Hello World!' }));

module.exports = router;
