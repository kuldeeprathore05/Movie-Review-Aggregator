import express from "express";
import { getReviewsForMovie,createReview } from "../controllers/review.js";
const router = express.Router();
router.get('/:movieId',getReviewsForMovie)
router.post('/',createReview);
export default router; 