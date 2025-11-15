import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
        default: 'https://placehold.co/300x450/222/FFF?text=No+Poster'
    },
    description:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const Movie = mongoose.model('Movie',movieSchema)
export default Movie