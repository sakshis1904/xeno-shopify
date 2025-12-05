const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();


const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_STORE,
  REDIRECT_URL
} = process.env;

console.log("SHOPIFY_STORE =", SHOPIFY_STORE);
console.log("REDIRECT_URL =", REDIRECT_URL);


router.get("/install", (req, res) => {
  const installUrl =
    `https://${SHOPIFY_STORE}/admin/oauth/authorize?` +
    `client_id=${SHOPIFY_API_KEY}&` +
    `scope=${SHOPIFY_SCOPES}&` +
    `redirect_uri=${REDIRECT_URL}`;

  return res.redirect(installUrl);
});


router.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Authorization code missing");

  try {
    const tokenRes = await axios.post(`https://${SHOPIFY_STORE}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    });


    console.log("ACCESS TOKEN:", tokenRes.data.access_token);


    return res.send("Access Token Generated — check your backend terminal");
  } 
  catch (err) {
    return res.status(500).send("Token exchange failed");
  }
  
});

module.exports = router;
