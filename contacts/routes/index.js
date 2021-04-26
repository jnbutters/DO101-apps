const express = require('express');
const router = express.Router();
const { pgconn } = require('../db/config')

/* Show home page. */
router.get('/', function(req, res) {
  console.log('test1');
  // we first check if the 'contacts' table exists
  pgconn.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contacts')", function(err,results) {
    if (err) {
      console.log('test2');
      console.log(err);
      res.render('index', { error: 'Database connection failure! '+err.stack, contacts: null, title: 'Contact List' });
    }

    // 'contacts' table does not exist. Show an empty table.
    else if(results.rows[0].exists == false) {
      console.log('test3');
      res.render('index', { error: null, contacts: null, title: 'Contact List' });
    }

    // 'contacts' table exists. Show the records.
    else {
      pgconn.query('SELECT * FROM contacts', function(err,results) {
        if (err) {
          console.log(err);
          console.log('test4');
          res.render('index', { error: 'Database connection failure! '+err.stack, contacts: null, title: 'Contact List' });
        }
        else {
          console.log('test5');
          let contacts = results.rows;
          console.log(contacts);
          res.render('index', { error: null, contacts: contacts, title: 'Contact List' });
        }
      })  
    }
  });
});

console.log('test6');
/* Seed test data */
router.post('/seed', function(req,res) {
  console.log('test7');
  // drop 'contacts' table if already exists, and seed some test data
  pgconn.query("drop table if exists contacts; create table contacts(id serial primary key,firstname varchar(30) not null,lastname varchar(30) not null, email varchar(30) not null); insert into contacts(firstname, lastname, email) values ('Bilbo','Baggins','bilbo@theshire.com'),('Frodo','Baggins','frodo@theshire.com'),('Samwise','Gamgee','sam@theshire.com'),('Peregrin','Took','pippin@theshire.com'),('Meriadoc','Brandybuck','merry@theshire.com')",function(err,results) {
    if (err) {
      console.log('test8');
      console.log(err);
      res.render('index', { error: 'Seeding database failure! '+err.stack, contacts: null, title: 'Contact List' });
    }

    // redirect to the index page
    else {
      console.log('test9');
      console.log(results);
      res.redirect('/');
    }
    console.log(results);
  });
});

module.exports = router;
