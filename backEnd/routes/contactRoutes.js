import express from "express";

import {
  sendContactMessage,
} from "../Controllers/contactController.js";

const router = express.Router();

/*
  CONTACT ROUTES
*/

// Send message from ACV Plus Contact Us page
router.post("/", sendContactMessage);

export default router;