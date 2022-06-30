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

router.get("/get", async (req, res) => {
  const { term, location } = req.query;
  const LIMIT = 50; // Number of eateries returned by Yelp API (Default: 20, Maximum: 50)
  try {
    const yelpResponse = await yelpAPI.get(
      `/businesses/search?term=${term}&location=${location}_singapore&limit=${LIMIT}` //"singapore" added to URL to filter for SG only
    );
    return res.status(200).json(yelpResponse.data);
  } catch (error) {
    console.log("Error");
    return res.json(error.message);
  }
});

module.exports = router;

/** 1. user input their location,
 *
 * 2. frontend sends their location. e.g. user inputs simei, future addition: automatically find nearest location? (geolocation API)
 * for now maybe just stick with user sends their location(in a string? or longitude+latitude), put into query string of URL
 *
 * 3. send to backend, using 2 endpoints: get from frontend to backend , get from backend to yelp's API
 *  e.g.
 * app.get("backend-nomp.herokuapp.com/eatery/search?term=...&location=...", (req, res) => {
 *  //then we fetch using axios
 *  fetch("yelp.api.com/...) using query parameters
 * })
 *
 *
 */
