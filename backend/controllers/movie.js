import Movie from "../models/movies.js";
import mongoose from "mongoose";

export const getMovies = async(req,res)=>{
    try {
        const movies = await Movie.aggregate([
            {
                $lookup:{
                    from:'reviews',
                    localField:'_id',
                    foreignField:'movieId',
                    as:'reviews'
                } 
            },
            {
                $addFields:{
                    avgRating : {$avg:'$reviews.rating'},
                    reviewCount : {$size:'$reviews'}
                },
            },
            {
                $project:{
                    title: 1,
                    genre: 1,
                    releaseYear: 1,
                    avgRating: 1,  
                    reviewCount: 1,
                    posterUrl:1,
                }
            },
            {
                $sort: { avgRating: -1 }
            }
        ])
        res.status(200).json(movies);
    } catch (error) {
        console.log('Server Error',error);
    }
}

export const getMovieById = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:'Invalid Movie Id'});
        }
        const movieId = new mongoose.Types.ObjectId(String(id));
        const movie = await Movie.aggregate([
            {
                $match:{_id:movieId}
            },
            {
                $lookup:{
                    from:'reviews',
                    localField:'_id',
                    foreignField:'movieId',
                    as:'reviews'
                } 
            },
            {
                $addFields:{
                    avgRating : {$avg:'$reviews.rating'},
                    reviewCount : {$size:'$reviews'},
                    recentReview : {
                        $slice:[
                            {$sortArray:{input:"$reviews",sortBy:{createdAt:-1}}},
                            10
                        ]
                    }
                },
            },
            {
                $project:{
                    title: 1,
                    genre: 1,
                    releaseYear: 1,
                    avgRating: 1,  
                    reviewCount: 1,
                    recentReview:1,
                    posterUrl:1,
                    description:1,
                }
            },
        ])
        if(movie.length===0){
            return res.status(400).json({message:'Movie not found'})
        }
        return res.status(200).json(movie[0])    
    } catch (error) {
        console.log('Server Error',error);
    }
}