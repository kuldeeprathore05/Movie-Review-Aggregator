import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/movies.js'; 
import Review from './models/review.js';
dotenv.config();
 
const sampleMovies = [
  {
    title: "3 Idiots",
    genre: "Comedy",
    releaseYear: 2009,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg",
    description:
      "Three engineering students navigate friendship, pressure, and the pursuit of passion while questioning the Indian education system."
  },
  {
    title: "Dangal",
    genre: "Biography",
    releaseYear: 2016,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Dangal_Poster.jpg/250px-Dangal_Poster.jpg",
    description:
      "A determined father trains his daughters to become world-class wrestlers, breaking stereotypes and inspiring a nation."
  },
  {
    title: "Bahubali: The Beginning",
    genre: "Action",
    releaseYear: 2015,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Baahubali_The_Beginning_poster.jpg",
    description:
      "A young man discovers his royal heritage and sets out to avenge his father and reclaim a kingdom lost to betrayal."
  },
  {
    title: "Bahubali: The Conclusion",
    genre: "Action",
    releaseYear: 2017,
    posterUrl: "https://dontcallitbollywood.com/wp-content/uploads/2017/04/dbd4a-bah.jpg",
    description:
      "The epic saga continues as Mahendra Baahubali rises to fulfill his destiny and answer the question that shook India: ‘Why did Kattappa kill Baahubali?’"
  },
  {
    title: "RRR",
    genre: "Action",
    releaseYear: 2022,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/250px-RRR_Poster.jpg",
    description:
      "Two legendary revolutionaries forge a powerful bond and ignite a rebellion against British colonial rule in this visual spectacle."
  },
  {
    title: "KGF: Chapter 1",
    genre: "Action",
    releaseYear: 2018,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2M0YmIxNzItOWI4My00MmQzLWE0NGYtZTM3NjllNjIwZjc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description:
      "A young man's rise from the streets of Mumbai to the gold mines of Kolar, where he becomes a symbol of hope and fear."
  },
  {
    title: "KGF: Chapter 2",
    genre: "Action",
    releaseYear: 2022,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/K.G.F_Chapter_2.jpg/250px-K.G.F_Chapter_2.jpg",
    description:
      "Rocky Bhai continues his domination of the Kolar Gold Fields while confronting powerful enemies seeking revenge."
  },
  {
    title: "Drishyam",
    genre: "Thriller",
    releaseYear: 2015,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Drishyam_2015_film.jpg/250px-Drishyam_2015_film.jpg",
    description:
      "A cable TV operator uses his love for cinema to protect his family when they become suspects in a mysterious crime."
  },
  {
    title: "PK",
    genre: "Comedy",
    releaseYear: 2014,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_.jpg",
    description:
      "An innocent alien questions humanity, religion, and the absurdities of modern society in his quest to return home."
  },
  {
    title: "Pathaan",
    genre: "Action",
    releaseYear: 2023,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg",
    description:
      "A fearless RAW agent returns from exile to stop a terrorist group threatening India's security."
  },
  {
    title: "Pushpa: The Rise",
    genre: "Action",
    releaseYear: 2021,
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa--the-rise-et00129541-08-12-2021-01-22-02.jpg",
    description:
      "A laborer rises through a violent red sandalwood smuggling syndicate, defying everyone who doubts his ambition."
  },
  {
    title: "Gully Boy",
    genre: "Drama",
    releaseYear: 2019,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/0/07/Gully_Boy_poster.jpg",
    description:
      "A Mumbai slum boy discovers his talent for rap and fights social barriers to chase his dream."
  },
  {
    title: "Jawan",
    genre: "Action",
    releaseYear: 2023,
    posterUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/shah-rukh-khan--jawan--srk-films-295651-3x4.jpg?VersionId=RGX_q3pk2AWWdkkOYhypoZSFxDHwV.vF",
    description:
      "A vigilante with a mysterious past takes on corruption and injustice through high-intensity missions."
  },
  {
    title: "Lagaan",
    genre: "Historical Drama",
    releaseYear: 2001,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Lagaan.jpg/250px-Lagaan.jpg",
    description:
      "Villagers challenge British officers to a cricket match to avoid oppressive taxes, forging unity against colonial rule."
  },
  {
    title: "Barfi!",
    genre: "Romance",
    releaseYear: 2012,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Barfi%21_poster.jpg/250px-Barfi%21_poster.jpg",
    description:
      "A charming deaf-mute boy navigates love and heartbreak while forging an unexpected bond with an autistic girl."
  },
  {
    title: "Vikram",
    genre: "Action Thriller",
    releaseYear: 2022,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmViYjExY2UtMzZjOS00OGQ2LWEzNWYtNGYxY2NkY2RmMDE3XkEyXkFqcGc@._V1_.jpg",
    description:
      "A special Black Ops squad hunts down masked men while uncovering a larger conspiracy involving drug cartels."
  },
  {
    title: "Kaithi",
    genre: "Action",
    releaseYear: 2019,
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs8do50wANc_-DHH273WGwPmMBr1Q55xjeug&s",
    description:
      "An ex-convict must drive a truck of injured police officers to safety while battling a city full of gangsters."
  },
  {
    title: "Chhichhore",
    genre: "Drama",
    releaseYear: 2019,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Chhichhore_Poster.jpg/250px-Chhichhore_Poster.jpg",
    description:
      "A group of old college friends reunite and relive their hostel days to help a young student overcome failure."
  },
  {
    title: "Bajrangi Bhaijaan",
    genre: "Drama",
    releaseYear: 2015,
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYzVjMjZiNGUtZjZiNy00Yzg4LWEzYzYtMmI1NDg5NWNiNjUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description:
      "A kind-hearted man embarks on a dangerous journey to reunite a mute Pakistani girl with her family."
  }
];

const seedDB = async () => {
  

  try {
    
    // await Review.deleteMany({});
    // await Movie.deleteMany({});
    // console.log('Database cleared.');
    const createdMovies = await Movie.insertMany(sampleMovies);
    console.log('Movies seeded.');

    // --- Create Sample Reviews ---
    const reviews = [
     { movieId: createdMovies[0]._id, user: 'Alice', rating: 5, comment: 'Mind-bending!' },
{ movieId: createdMovies[0]._id, user: 'Bob', rating: 4, comment: 'Confusing but cool.' },
{ movieId: createdMovies[0]._id, user: 'Rohan', rating: 5, comment: 'One of Nolan’s best works.' },
{ movieId: createdMovies[0]._id, user: 'Sneha', rating: 4, comment: 'Loved the concept.' },
{ movieId: createdMovies[0]._id, user: 'Tarun', rating: 3, comment: 'Good but too long.' },
{ movieId: createdMovies[0]._id, user: 'Zara', rating: 5, comment: 'Masterpiece storytelling!' },
{ movieId: createdMovies[1]._id, user: 'Charlie', rating: 5, comment: 'A classic.' },
{ movieId: createdMovies[1]._id, user: 'Meera', rating: 4, comment: 'Very emotional.' },
{ movieId: createdMovies[1]._id, user: 'Kabir', rating: 5, comment: 'Perfect execution.' },
{ movieId: createdMovies[1]._id, user: 'Ananya', rating: 5, comment: 'Timeless cinema.' },
{ movieId: createdMovies[1]._id, user: 'Rita', rating: 3, comment: 'Good but slow-paced.' },
{ movieId: createdMovies[1]._id, user: 'Sam', rating: 4, comment: 'Great acting!' },
{ movieId: createdMovies[2]._id, user: 'David', rating: 4, comment: 'Visually stunning.' },
{ movieId: createdMovies[2]._id, user: 'Eve', rating: 3, comment: 'Too long.' },
{ movieId: createdMovies[2]._id, user: 'Farhan', rating: 5, comment: 'Brilliant visuals.' },
{ movieId: createdMovies[2]._id, user: 'Priya', rating: 4, comment: 'Loved the story.' },
{ movieId: createdMovies[2]._id, user: 'Liam', rating: 5, comment: 'Top-tier cinema!' },
{ movieId: createdMovies[2]._id, user: 'Nina', rating: 4, comment: 'Amazing soundtrack.' },
{ movieId: createdMovies[3]._id, user: 'Frank', rating: 5, comment: 'Iconic.' },
{ movieId: createdMovies[3]._id, user: 'Pooja', rating: 4, comment: 'Great performance by the cast.' },
{ movieId: createdMovies[3]._id, user: 'Harsh', rating: 5, comment: 'A must-watch.' },
{ movieId: createdMovies[3]._id, user: 'Vidya', rating: 5, comment: 'Simply beautiful.' },
{ movieId: createdMovies[3]._id, user: 'Zaid', rating: 3, comment: 'Overrated but good.' },
{ movieId: createdMovies[3]._id, user: 'Kiran', rating: 4, comment: 'Enjoyed every bit.' },
{ movieId: createdMovies[4]._id, user: 'Grace', rating: 5, comment: 'Ledger was amazing.' },
{ movieId: createdMovies[4]._id, user: 'Aman', rating: 5, comment: 'Dark yet brilliant.' },
{ movieId: createdMovies[4]._id, user: 'Tanvi', rating: 4, comment: 'Very well made.' },
{ movieId: createdMovies[4]._id, user: 'Rohit', rating: 5, comment: 'Perfect villain.' },
{ movieId: createdMovies[4]._id, user: 'Daisy', rating: 5, comment: 'One of my favorites!' },
{ movieId: createdMovies[4]._id, user: 'Shaan', rating: 4, comment: 'Really good pacing.' },
{ movieId: createdMovies[5]._id, user: 'Heidi', rating: 4, comment: 'Cried my eyes out.' },
{ movieId: createdMovies[5]._id, user: 'Rahul', rating: 5, comment: 'Emotional masterpiece.' },
{ movieId: createdMovies[5]._id, user: 'Sneha', rating: 4, comment: 'Lovely acting.' },
{ movieId: createdMovies[5]._id, user: 'Mira', rating: 5, comment: 'Heart-touching story.' },
{ movieId: createdMovies[5]._id, user: 'Yash', rating: 3, comment: 'Good but predictable.' },
{ movieId: createdMovies[5]._id, user: 'Rishi', rating: 4, comment: 'Enjoyed it a lot.' },
{ movieId: createdMovies[6]._id, user: 'Ivan', rating: 5, comment: 'Wow. Just wow.' },
{ movieId: createdMovies[6]._id, user: 'Meghana', rating: 4, comment: 'Very unique story.' },
{ movieId: createdMovies[6]._id, user: 'Oliver', rating: 5, comment: 'Incredible direction.' },
{ movieId: createdMovies[6]._id, user: 'Sara', rating: 4, comment: 'Loved the cinematography.' },
{ movieId: createdMovies[6]._id, user: 'Aarav', rating: 5, comment: 'Outstanding film.' },
{ movieId: createdMovies[6]._id, user: 'Jenna', rating: 3, comment: 'Good but slow.' },
{ movieId: createdMovies[7]._id, user: 'Judy', rating: 4, comment: 'Are you not entertained?!' },
{ movieId: createdMovies[7]._id, user: 'Ravi', rating: 5, comment: 'Epic from start to end.' },
{ movieId: createdMovies[7]._id, user: 'Kajol', rating: 4, comment: 'Very gripping.' },
{ movieId: createdMovies[7]._id, user: 'Manish', rating: 5, comment: 'Historical perfection.' },
{ movieId: createdMovies[7]._id, user: 'Hera', rating: 5, comment: 'Loved every frame.' },
{ movieId: createdMovies[7]._id, user: 'Tanya', rating: 3, comment: 'Good action scenes.' },
{ movieId: createdMovies[8]._id, user: 'Ken', rating: 5, comment: 'Whoa.' },
{ movieId: createdMovies[8]._id, user: 'Arjun', rating: 5, comment: 'Mind-blowing concept.' },
{ movieId: createdMovies[8]._id, user: 'Kiara', rating: 4, comment: 'Very engaging.' },
{ movieId: createdMovies[8]._id, user: 'Naman', rating: 5, comment: 'Brilliantly executed.' },
{ movieId: createdMovies[8]._id, user: 'Sophia', rating: 3, comment: 'Good but confusing.' },
{ movieId: createdMovies[8]._id, user: 'Deepak', rating: 4, comment: 'Great effects.' },
{ movieId: createdMovies[9]._id, user: 'Laura', rating: 5, comment: 'Took my breath away.' },
{ movieId: createdMovies[9]._id, user: 'Ishika', rating: 4, comment: 'Beautiful storyline.' },
{ movieId: createdMovies[9]._id, user: 'Kunal', rating: 5, comment: 'Very emotional.' },
{ movieId: createdMovies[9]._id, user: 'George', rating: 3, comment: 'Decent movie.' },
{ movieId: createdMovies[9]._id, user: 'Reena', rating: 4, comment: 'Amazing visuals!' },
{ movieId: createdMovies[9]._id, user: 'Aria', rating: 5, comment: 'Loved it completely.' },
{ movieId: createdMovies[10]._id, user: 'Aditi', rating: 5, comment: 'Totally worth the hype.' },
{ movieId: createdMovies[10]._id, user: 'Rohit', rating: 4, comment: 'Great direction and pacing.' },
{ movieId: createdMovies[10]._id, user: 'Simran', rating: 4, comment: 'Really enjoyed it!' },
{ movieId: createdMovies[10]._id, user: 'Imran', rating: 3, comment: 'Could have been shorter.' },
{ movieId: createdMovies[10]._id, user: 'Poppy', rating: 5, comment: 'Loved every moment.' },
{ movieId: createdMovies[10]._id, user: 'Tara', rating: 4, comment: 'Very impressive.' },
{ movieId: createdMovies[11]._id, user: 'Neeraj', rating: 5, comment: 'Powerful storyline.' },
{ movieId: createdMovies[11]._id, user: 'Zoya', rating: 4, comment: 'Very moving.' },
{ movieId: createdMovies[11]._id, user: 'Atharv', rating: 3, comment: 'Good but slow.' },
{ movieId: createdMovies[11]._id, user: 'Vaani', rating: 5, comment: 'Exceptional performances!' },
{ movieId: createdMovies[11]._id, user: 'Kabir', rating: 4, comment: 'Liked the cinematography.' },
{ movieId: createdMovies[11]._id, user: 'Eshan', rating: 5, comment: 'Masterfully made.' },
{ movieId: createdMovies[12]._id, user: 'Kriti', rating: 5, comment: 'So entertaining!' },
{ movieId: createdMovies[12]._id, user: 'Mohit', rating: 4, comment: 'Good mix of action and drama.' },
{ movieId: createdMovies[12]._id, user: 'Leena', rating: 4, comment: 'Loved the characters.' },
{ movieId: createdMovies[12]._id, user: 'Samrat', rating: 5, comment: 'A crowd-pleaser.' },
{ movieId: createdMovies[12]._id, user: 'Anushka', rating: 3, comment: 'Story was average.' },
{ movieId: createdMovies[12]._id, user: 'Nishant', rating: 4, comment: 'Very enjoyable.' },
{ movieId: createdMovies[13]._id, user: 'Harshita', rating: 4, comment: 'Unique and refreshing.' },
{ movieId: createdMovies[13]._id, user: 'Dhruv', rating: 5, comment: 'Absolutely stunning visuals.' },
{ movieId: createdMovies[13]._id, user: 'Mehak', rating: 4, comment: 'Loved the vibe.' },
{ movieId: createdMovies[13]._id, user: 'Tejas', rating: 5, comment: 'Very well made.' },
{ movieId: createdMovies[13]._id, user: 'Riya', rating: 3, comment: 'Nice but not amazing.' },
{ movieId: createdMovies[13]._id, user: 'Joel', rating: 5, comment: 'Simply brilliant.' },
{ movieId: createdMovies[14]._id, user: 'Madhav', rating: 5, comment: 'Fantastic storytelling.' },
{ movieId: createdMovies[14]._id, user: 'Kajal', rating: 4, comment: 'Very emotional narrative.' },
{ movieId: createdMovies[14]._id, user: 'Jatin', rating: 3, comment: 'Good but predictable.' },
{ movieId: createdMovies[14]._id, user: 'Harini', rating: 5, comment: 'Great character development.' },
{ movieId: createdMovies[14]._id, user: 'Zubin', rating: 4, comment: 'Really well directed.' },
{ movieId: createdMovies[14]._id, user: 'Anil', rating: 5, comment: 'One of the best this year.' },
{ movieId: createdMovies[15]._id, user: 'Sanya', rating: 4, comment: 'Highly entertaining.' },
{ movieId: createdMovies[15]._id, user: 'Prakash', rating: 5, comment: 'Loved the twists!' },
{ movieId: createdMovies[15]._id, user: 'Gauri', rating: 4, comment: 'Great pacing.' },
{ movieId: createdMovies[15]._id, user: 'Yuvraj', rating: 3, comment: 'Some scenes felt unnecessary.' },
{ movieId: createdMovies[15]._id, user: 'Elena', rating: 5, comment: 'Amazing screenplay.' },
{ movieId: createdMovies[15]._id, user: 'Samar', rating: 4, comment: 'Would watch again!' },
{ movieId: createdMovies[16]._id, user: 'Anaya', rating: 5, comment: 'Super thrilling!' },
{ movieId: createdMovies[16]._id, user: 'Rishi', rating: 4, comment: 'Great cast performance.' },
{ movieId: createdMovies[16]._id, user: 'Kiran', rating: 4, comment: 'Good overall feel.' },
{ movieId: createdMovies[16]._id, user: 'Fatima', rating: 5, comment: 'Loved every twist.' },
{ movieId: createdMovies[16]._id, user: 'Sudeep', rating: 3, comment: 'Decent but inconsistent.' },
{ movieId: createdMovies[16]._id, user: 'Bella', rating: 4, comment: 'Amazing music score.' },
{ movieId: createdMovies[17]._id, user: 'Omkar', rating: 5, comment: 'Fantastic visual experience.' },
{ movieId: createdMovies[17]._id, user: 'Ayesha', rating: 4, comment: 'Very engaging.' },
{ movieId: createdMovies[17]._id, user: 'Shivam', rating: 4, comment: 'Solid performance.' },
{ movieId: createdMovies[17]._id, user: 'Radhika', rating: 5, comment: 'Exceeded expectations!' },
{ movieId: createdMovies[17]._id, user: 'Tanish', rating: 3, comment: 'Good but slow in middle.' },
{ movieId: createdMovies[17]._id, user: 'Clara', rating: 4, comment: 'Loved the ambiance.' },
{ movieId: createdMovies[18]._id, user: 'Vikram', rating: 5, comment: 'Top-notch acting.' },
{ movieId: createdMovies[18]._id, user: 'Roshni', rating: 4, comment: 'Very gripping story.' },
{ movieId: createdMovies[18]._id, user: 'Evelyn', rating: 3, comment: 'Average but good visuals.' },
{ movieId: createdMovies[18]._id, user: 'Dev', rating: 5, comment: 'Loved the execution.' },
{ movieId: createdMovies[18]._id, user: 'Arnav', rating: 4, comment: 'Well paced.' },
{ movieId: createdMovies[18]._id, user: 'Pia', rating: 5, comment: 'Really enjoyed it.' },

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