import Review from "../models/review.js";
import Movie from "../models/movies.js";
import mongoose from "mongoose";

export const createReview = async (req,res) =>{
    try {
        const {movieId , user , rating , comment}  = req.body;
        if(!movieId  || !user || !rating){
            return res.status(400).json({message:'AlL fields required'});
        }
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message:'Invalid MovieId'});
        }
        const movie = await Movie.findById(movieId);
        if(!movie){
            return req.status(400).json({message:"Movie not found"})
        }

        const review = new Review({
            movieId,
            user,
            rating:Number(rating),
            comment
        })
        const createReview = await review.save();
        res.status(200).json(createReview)
    } catch (error) {
        console.log("Server Error",error);
    }
}

export const getReviewsForMovie = async (req,res)=>{
    try {
        const {movieId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message:'Invalid MovieId'});
        }
        const reviews = await Review.find({movieId:movieId}).sort({createdAt:-1}).limit(20);

        res.status(200).json(reviews);

    } catch (error) {
        console.log("Server Error",error);
    }
}