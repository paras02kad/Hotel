const express = require('express');
const router = express.Router();


const Person = require('./../models/Person');


//!-------------------------------------------------------------------------------------------------------


//* Here we defined post and get operations for person schema



router.post('/', async (req, res) => {
    try {

        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();

        console.log('Data Saved');
        res.status(200).json(response);

    }
    catch (err) {
        console.log('error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//! We need to define get to get the data

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log('Problem in fetching Data', err);
        res.status(500).json({ error: 'problem while fetching data' });
    }
});



//!-------------------------------------------------------------------------------------------------------
//* Defining a end point where we take parameter from the url

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;

        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ err: "Invalid Error" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500), json({ err: "Internal Server Error" });
    }
});




router.put('/:id', async (req, res) => {

    try {
        const personId = req.params.id; //! Extarct ID from URL parameter
        const updatedPersonData = req.body; //! Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {

            new: true, //! This returns the updated document
            runValidators: true, //! Run mongoose Validation
        })

        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        }

        console.log('data updated');
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: "Person not found" })
        }

        console.log('Data Deleted');
        res.status(200).json({ message: "Data sucessfully Deleated" });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal Server error" });
    }
})









module.exports = router;