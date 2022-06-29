// This page routes all of our "website.com/geolocation" URLs

const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.get("/get", async (req, res) => {
  const { lat, lng } = req.query;
  try {
    //const googleMapsResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDuSONcwph1O_HdU-iQ_giJcdUBrlKk31M`)
    const googleMapsResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=` + `${process.env.GOOGLEMAPS_APIKEY}`);
    return res.status(200).json(googleMapsResponse.data);
  } catch (error) {
    console.log("Error");
    return res.json(error.message);
  }
});

module.exports = router;