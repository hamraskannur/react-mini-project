import React from 'react'
import Banner from '../../components/User/Banner/Banner'
import Footer from '../../components/User/Footer/Footer'
import Header from '../../components/User/layout/Header'
const Home = () => {
  return (
    <div style={{backgroundColor:"#3f5871"}}> 
      <Header/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home
