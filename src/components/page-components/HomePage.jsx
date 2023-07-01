import React from 'react'
import MovieListScroll from './MovieListScroll'
import MovieSummary from './MovieSummary'
import "./HomePage.scss"

const HomePage = () => {
  return (
    <div className='home'>
        <MovieListScroll/>
        {/* <MovieSummary/> */}
    </div>
  )
}

export default HomePage