import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/movies.js'; 
import Review from './models/review.js';
dotenv.config();
 
const sampleMovies = [
  {
    title: 'Inception',
    genre: 'Sci-Fi',
    releaseYear: 2010,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    description: 'A skilled thief steals secrets from within people\'s dreams. He\'s offered a chance to regain his old life, but only if he can pull off an impossible task: planting an idea into a target\'s mind instead of stealing one.'
    },
  {
    title: 'The Godfather',
    genre: 'Crime',
    releaseYear: 1972,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. This decision sparks a brutal war between rival families, testing loyalty and family bonds.'
  },
  {
    title: 'Dune: Part One',
    genre: 'Sci-Fi',
    releaseYear: 2021,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dune_%282021_film%29.jpg/250px-Dune_%282021_film%29.jpg',
    description: 'Young nobleman Paul Atreides must travel to Arrakis, the most dangerous planet in the universe, to secure his family\'s control over the galaxy\'s most valuable resource. He is thrust into a war for survival against ancient enemies.'
  },
  {
    title: 'Pulp Fiction',
    genre: 'Crime',
    releaseYear: 1994,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Pulp_Friction.jpg',
    description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence, redemption, and dark humor in Los Angeles.'
  },
  {
    title: 'The Dark Knight',
    genre: 'Action',
    releaseYear: 2008,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',
    description: 'When the chaotic menace known as the Joker bursts onto the scene, Batman must face one of his greatest psychological and physical tests. He is forced to push his limits to stop the Joker\'s reign of anarchy.'
  },
  {
    title: 'Forrest Gump',
    genre: 'Drama',
    releaseYear: 1994,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
    description: 'A kind-hearted man with a low IQ inadvertently witnesses and influences some of the most defining historical events of the 20th century. His journey is a testament to the power of optimism and his undying love for his childhood friend, Jenny.'
  },
  {
    title: 'Parasite',
    genre: 'Thriller',
    releaseYear: 2019,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTHqERudQeMKbEpp97lLK_unmW1aJZLdP_-A&s',
    description: 'The destitute Kim family cons their way into working for the wealthy Park family. Their new symbiotic relationship is threatened by greed and class discrimination, leading to a dark and bloody confrontation.'
  },
  {
    title: 'Gladiator',
    genre: 'Action',
    releaseYear: 2000,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png',
    description: 'A celebrated Roman general is betrayed and his family murdered by a corrupt emperor\'s son. He is captured and forced into slavery, where he rises as a gladiator, seeking vengeance in the Colosseum.'
  },
  {
    title: 'The Matrix',
    genre: 'Sci-Fi',
    releaseYear: 1999,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDU4yn7nfGEGlsDyU3O5cP_9sr42t89JUdKg&s',
    description: 'A computer hacker named Neo discovers that his everyday world is an elaborate simulation created by sentient machines. He is recruited into a rebellion to free humanity from its electronic prison.'
  },
  {
    title: 'Interstellar',
    genre: 'Sci-Fi',
    releaseYear: 2014,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    description: 'With humanity\'s time on Earth coming to an end, a team of explorers, led by a former NASA pilot, undertakes a desperate mission. They must travel through a wormhole in space to find a new habitable planet.'
  }
];

const seedDB = async () => {
  

  try {
    
    await Review.deleteMany({});
    await Movie.deleteMany({});
    console.log('Database cleared.');
    const createdMovies = await Movie.insertMany(sampleMovies);
    console.log('Movies seeded.');

    // --- Create Sample Reviews ---
    const reviews = [
      { movieId: createdMovies[0]._id, user: 'Alice', rating: 5, comment: 'Mind-bending!' },
      { movieId: createdMovies[0]._id, user: 'Bob', rating: 4, comment: 'Confusing, but cool.' },
      { movieId: createdMovies[1]._id, user: 'Charlie', rating: 5, comment: 'A classic.' },
      { movieId: createdMovies[2]._id, user: 'David', rating: 4, comment: 'Visually stunning.' },
      { movieId: createdMovies[2]._id, user: 'Eve', rating: 3, comment: 'Too long.' },
      { movieId: createdMovies[3]._id, user: 'Frank', rating: 5, comment: 'Iconic.' },
      { movieId: createdMovies[4]._id, user: 'Grace', rating: 5, comment: 'Ledger was amazing.' },
      { movieId: createdMovies[5]._id, user: 'Heidi', rating: 4, comment: 'Cried my eyes out.' },
      { movieId: createdMovies[6]._id, user: 'Ivan', rating: 5, comment: 'Wow. Just wow.' },
      { movieId: createdMovies[7]._id, user: 'Judy', rating: 4, comment: 'Are you not entertained?!' },
      { movieId: createdMovies[8]._id, user: 'Ken', rating: 5, comment: 'Whoa.' },
      { movieId: createdMovies[9]._id, user: 'Laura', rating: 5, comment: 'Took my breath away.' },
    ];
    
    await Review.insertMany(reviews);
    console.log('Sample reviews seeded.');
    
    console.log('--- SEEDING COMPLETE ---');
    
  } catch (err) {
    console.error(`Seeding failed: ${err.message}`);
    process.exit(1);
  } 
};
export default seedDB 