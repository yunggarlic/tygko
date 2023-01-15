const router = require('express').Router();
const data = require('../../data.json');

router.get('/', async (req, res) => {
  try {
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
