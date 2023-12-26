const express = require("express");
const cors = require("cors");
const db= require('./db')
//const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
//mongoose.connect(uri);
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

app.get("/api/form",(req, res) => {
  const sql = 'SELECT * FROM yoga_schema';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from the table:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Data fetched from the table:', results);
    res.status(200).json(results);
  });
});

app.post("/api/form",(req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const contact = req.body.contact;
  const fee = req.body.fee;
  const slot = req.body.slot;
  //const timeOfCreation = req.body.timeOfCreation;
  const dateOfCreation = req.body.dateOfCreation;


  const checkContactQuery = 'SELECT * FROM form WHERE contact = ? AND dateOfCreation >= DATE_SUB(NOW(), INTERVAL 1 MONTH)';
  
  db.query(checkContactQuery, [contact], (checkErr, checkResult) => {
    if (checkErr) {
     // {console.log("1234567 eror ")}
      console.error('Error checking contact:', checkErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    // If contact exists within the last month, send an error response
    if (checkResult && checkResult.length > 0) {
    
      res.status(400).send('You have already registered within the last month. Please wait before registering again.');

   
      return;
    }


  //const checkContactQuery = 'SELECT * FROM form WHERE contact = ? AND dateOfCreation >= DATE_SUB(NOW(), INTERVAL 1 MONTH)';
  // db.query(checkContactQuery, [contact], (checkErr, checkResult) => {
  //   if (checkErr) {
  //    // console.error('Error checking contact:', checkErr);
  //     res.status(500).send('Internal Server Error');
  //     return;
  //   }

  //   // If contact exists within the last month, send an error response
  //   if (checkResult && checkResult.length > 0) {
  //     res.status(400).send('You have to wait for a month to complete before registering again.');
  //     return;
  //   }


  // const newUser = new User({
  //   name,
  //   age,
  //   gender,
  //   contact,
  //   fee,
  //   slot,
  // });
    

  

  const sql = 'INSERT INTO form (name, age, gender, contact, fee, slot, dateOfCreation) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, age, gender, contact, fee, slot, dateOfCreation];

  db.query(sql, values, (err, result) => {
    
    if (err) {
      console.error('Error inserting data into the table:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    console.log('Data inserted into the table');
    res.status(200).send('Data inserted into the table');
  });
  });
  });

// const usersRouter = require("./routes/users");
// app.use("/", usersRouter);

app.listen(port, () => {
  console.log("Server is ruunig on port 5000");
});