require("dotenv").config(); // Load environment variables from .env
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const sanitizer = require("sanitize")();
// const functions = require("firebase-functions/v2");
// const express = require("express");
// const cors = require("cors");

const admin = require("firebase-admin");

admin.initializeApp();

// Retrieve the API key from the environment variables
const VALID_API_KEY = process.env.API_KEY;

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // API key sent in the request header

  if (!apiKey) {
    return res.status(401).json({ error: "API key is missing" });
  }

  if (apiKey !== VALID_API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next(); // API key is valid, proceed to the next handler
};

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.authenticateUser = onRequest((request, response) => {
  validateApiKey(request, response, () => {
    const userName = sanitizer.value(request.body.userName, "str");
    const password = sanitizer.value(request.body.password, "str");

    logger.info("Received authentication request", { userName, password });
    // Perform authentication logic here
    // For example, check against a database or an external service
    const isAuthenticated = userName === "admin" && password === "password";
    // Dummy check
    if (isAuthenticated) {
      response.status(200).send({ message: "Authentication successful" });
    } else {
      response
        .status(401)
        .send({ message: "Username and password combination is incorrect" });
    }
  });
});
