"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const { Movie } = require("./models");
const { User } = require('../users');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET movie list based on user's genres
router.get("/", jsonParser, (req, res, next) => {
	const { id } = req.user;
	User.findOne({ _id: id })
		.then(user => {
			const { genres } = user;
			return Movie.find({ genre: { $in: genres } })
		})
		.then(movies => res.json(movies.map(movie => movie.serialize())))
		.catch(err => next(err));
});

module.exports = { router };
