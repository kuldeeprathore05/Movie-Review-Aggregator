import Movie from "../models/movies.js";
import mongoose from "mongoose";

export const getMovies = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1; 
    const limit = Number(req.query.limit) || 8; 
    const skip = (page - 1) * limit; 
    const searchQuery = req.query.search || ''; 
    const matchQuery = {};
    if (searchQuery) {
      matchQuery.title = { 
        $regex: searchQuery,  
        $options: 'i'    
      };
    } 

    const results = await Movie.aggregate([
      { 
        $match: matchQuery
      },
      { 
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews',
        },
      },
      { 
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewCount: { $size: '$reviews' },
        },
      },
      { 
         $project: {
          title: 1,
          genre: 1,
          releaseYear: 1,
          posterUrl: 1,
          description: 1,
          averageRating: 1, 
          reviewCount: 1,   
        },
      },
      { 
        $sort: { averageRating: -1, releaseYear: -1 }
      },
      { 
        $facet: {
          movies: [
            { $skip: skip },
            { $limit: limit }
          ],
          paginationInfo: [   
            { $count: 'totalMovies' }
          ]
        }
      }
    ]);

    const movies = results[0].movies;
    const totalMovies = results[0].paginationInfo[0] ? results[0].paginationInfo[0].totalMovies : 0;
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      movies,
      page,
      totalPages,
      totalMovies
    });

  } catch (err) {
    next(err);
  }
};

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