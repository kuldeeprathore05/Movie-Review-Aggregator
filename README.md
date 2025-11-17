# 🎬 MERN Stack — Movie Review Aggregator

This is a simple full-stack **MERN** application built for a technical assessment.  
The app functions as a **movie review aggregator**, allowing users to browse movies, view average ratings, and submit their own reviews.

---
## 🎥 Project Demo
Here is a walkthrough of the application features:

https://github.com/user-attachments/assets/ef62382a-fee9-485f-bea2-aae47af31a2e


## 🚀 Live Deployment

| Component | Service | Status | Link |
| :--- | :--- | :--- | :--- |
| **Frontend** | Netlify | 🟢 Live | [**Click here to view App**](https://transcendent-naiad-794d10.netlify.app/) |
| **Backend** | Render | 🟠 Active | [API Health Check](https://movie-review-aggregator-elwz.onrender.com/api/movie) |

> **⚠️ Note on Backend:** The API is hosted on Render's **Free Tier**. If the app takes a moment to load data initially, it is likely due to the server "waking up" (Cold Start). Subsequent requests will be instant.

---

## ⭐ Core Features

### 🔧 Backend — Node.js + Express + MongoDB
- Uses MongoDB Aggregation Framework (`$lookup`, `$avg`, `$size`)  
- Computes **average rating** on the fly  
- API routes for movies & reviews  

### 🎨 Frontend — React + Vite + Tailwind CSS
- Fast development using **Vite**
- Modern UI styled with **Tailwind CSS**
- **Lazy Loading** using `React.lazy()` + `Suspense` on the movie detail page  
---
