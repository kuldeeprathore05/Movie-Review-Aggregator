import './App.css'
import React ,{ lazy,Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Home from './components/Home' 
import Header from './components/Header';
const MovieDetail = React.lazy(() => import('./components/MovieDetail'));
function App() { 
  return (
    <div className="min-h-screen">
      <Header/>
      <main className="container px-10 lg:px-20 xl:px-32 mx-auto max-w-7xl py-8">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/movie/:id" element={<MovieDetail />} />
            
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App