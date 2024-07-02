const express = require('express');
const router = express.Router();



const Menu = require('./../models/menu');

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log('Problem in fetching Data', err);
        res.status(500).json({ error: 'problem while fetching data' });
    }
});



router.post('/', async (req, res) => {
    try {

        const data = req.body;

        const newMenu = new Menu(data);

        const response = await newMenu.save();

        console.log('Data Saved');
        res.status(200).json(response);

    }
    catch (err) {
        console.log('error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;