import React, { useContext } from 'react'
// import { AppContext } from './context.jsx'
import { useGlobalContext } from './context.jsx'

function Home() {

  // const name = useContext(AppContext)
  const name = useGlobalContext();
  return (
    <>
    <div>My Home PAge</div>
    <p>{name}</p>
    </>
  )
}

export default Home