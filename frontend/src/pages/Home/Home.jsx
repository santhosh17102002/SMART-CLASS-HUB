import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Galary from './Gallery/Galary'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import Map from './Map/Map'
const Home = () => {
  return (
    <div>
      <HeroContainer/>
      <div className='max-w-screen-xl mx-auto'>
        <Galary/>
        <PopularClasses/>
        <PopularTeacher/>
        
      </div>
      <Map/>
    </div>

  )
}

export default Home
