/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// const functions = require("firebase-functions/v2");
// const express = require("express");
// const cors = require("cors");

const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.authenticateUser = onRequest((request, response) => {
  const {userName, password} = request.body;
  logger.info("Received authentication request", {userName, password});
  // Perform authentication logic here
  // For example, check against a database or an external service
  const isAuthenticated = userName === "admin" && password === "password";
  // Dummy check
  if (isAuthenticated) {
    response.status(200).send({message: "Authentication successful"});
  } else {
    response.status(401).send({message: "Authentication failed"});
  }
});
