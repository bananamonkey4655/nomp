// This page routes all of our "website.com/eatery" URLs
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Configure axios calls on this particular instance to use these settings
const yelpAPI = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: { Authorization: `Bearer ${process.env.YELP_APIKEY}` }, // Calling Yelp's API requires API key on each HTTP Request
  validateStatus: (status) => (status >= 200 && status < 300) || status === 400, // Change to not throw error when '400 Bad Request' for invalid syntax,
  // let app handle error by sending JSON of { "error": ... } instead
});

const mapBudgetToPrice = (budget) => {
  switch (budget) {
    case "low-budget":
      return "1";
    case "mid-budget":
      return "1, 2";
    case "high-budget":
      return "1, 2, 3";
    default:
      return "1, 2, 3, 4";
  }
};

/* Endpoint for searching restaurants with given filters set */
router.get("/search", async (req, res) => {
  let {
    location,
    query: term,
    budget,
    latitude,
    longitude,
    radius,
  } = req.query;
  console.log(req.query);

  // Input validation/sanitization/modification
  if (latitude && longitude) {
    location = null;
  }
  radius = (function convertKmToMetres(km) {
    return km * 1000;
  })(radius);
  const LIMIT = 20; // Number of eateries returned by Yelp API (Default: 20, Maximum: 50)
  const price = mapBudgetToPrice(budget);

  const searchParams = { location, term, price, latitude, longitude, radius };
  console.log(searchParams);
  let URL = `businesses/search?limit=${LIMIT}`;

  // Check whether each parameter has a value, skip if empty
  for (const property in searchParams) {
    if (searchParams[property]) {
      URL += `&${property}=${searchParams[property]}`;
    }
  }

  try {
    const yelpResponse = await yelpAPI.get(URL);
    return res.status(200).json(yelpResponse.data);
  } catch (error) {
    return res.json(error.message);
  }
});

/* Endpoint for searching a single restaurant with given ID */
router.get("/match", async (req, res) => {
  const { id } = req.query;

  try {
    const yelpResponse = await yelpAPI.get(`businesses/${id}`);
    return res.status(200).json(yelpResponse.data);
  } catch (error) {
    return res.json(error.message);
  }
});

module.exports = router;
