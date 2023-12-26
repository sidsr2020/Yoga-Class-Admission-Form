

const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "Anmol124!",
database:"yoga_schema",
port: 3100,
})
db.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

module.exports = db;