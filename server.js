//Using Express
const express = require('express'); //used to import express
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'maryam',
    database : 'personalwebsite'
  }
});

const app = express();	
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=>{ //to display the users data in database
	res.send(knex.contacts);
})


app.post('/contact', (req, res)=>{ // to add user's data into the database and login
	const {email, subject, message} = req.body; 
	knex('contacts')
	.returning('*')
	.insert({
		email: email,
		subject: subject,
		message: message
	})
	.then(resp =>{
		res.json('Thanks! We will get back to you.');
	})
	.catch(err => { 
		res.status(400).json('Account already exist');
	})
})

app.listen(3000, ()=>{ //to make the website loads on localhost 3000
	console.log('app is running on port 3000');
})   