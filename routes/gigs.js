const express = require('express');
const { Op } = require('sequelize');
const db = require('../config/database');
const Gig = require('../models/Gig');

const router = express.Router();

// GET ALL GIGS
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', {
        gigs,
      });
    })
    .catch(err => console.log(err));
});

// DISPLAY ADD GIG FORM

router.get('/add', (req, res) => {
  res.render('add');
})

// ADD A GIG
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  // FORM VALIDATION
  const errors = [];
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add contact email" });
  }

  // CHECK FOR ERRORS
  if (errors.length) {
    res.render('add', { errors, title, technologies, budget, description, contact_email });
  }
  else {
    if (!budget) {
      budget = 'unknown';
    }
    else {
      budget = `$${budget}`;
    }
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    //INSERT INTO TABLE
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => {
        res.redirect('/gigs')
      })
      .catch(err => console.log(err));
  }
})

// SEARCH FOR GIGS
router.get('/search', (req, res) => {
  let { term } = req.query;
  term = term.toLocaleLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
  .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
})

module.exports = router;
