const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/', function (req, res) {
  res.send('welcome to my Hotel.. how can i help you ?')
});


//!-------------------------------------------------------------------------------------------------------
// app.get('/chicken', (req, res) => {
//   res.send('Sure sir, i would love to serve chicken');
// })


// app.get('/idli', (req, res) => {
//res.send('Welcome to south India and would love to serve Idli.');
//   var customized_idli = {
//     name : 'rava idli',
//     size : '10 cm diameter',
//     is_sambhar : true,
//     is_chutney : false
//   }
//   res.send(customized_idli);
// })

// app.post('/items',(req,res)=>{
//   console.log('Data saved');
//   res.send('Data stored succesfully');
// })
//!-------------------------------------------------------------------------------------------------------


// app.post('/person', (req, res) => {

//   const data = req.body; //! Assuming the request body contains the persond data.
//   const newPerson = new Person(data);


//   //! Save the new person to the data base.
//   newPerson.save((error, SavedPerson) => {
//     if (error) {
//       console.log('Error while saving person', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//     else {
//       console.log('Data saved sucessfully');
//       res.status(200).json(SavedPerson);
//     }
//   })
// });
//!------------------------------------------------------------------------------------------------------
//* Here we have imported router files frpom routes folder

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);






//!-------------------------------------------------------------------------------------------------------
//* Here we defined post and get operations for menu schema


const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);



const mongoURL = process.env.MONGODB_URL;
//const PORT = process.env.MONGODB_URL;






app.listen(3000, () => {
  console.log('Server listening on port 3000');
});












