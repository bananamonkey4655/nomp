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

router.get("/match", async (req, res) => {
  const { id } = req.query;
  try {
    const yelpResponse = await yelpAPI.get(`businesses/${id}`);
    return res.status(200).json(yelpResponse.data);
  } catch (error) {
    console.log("Error");
    return res.json(error.message);
  }
});

module.exports = router;
