import React, { useEffect, useState } from 'react'
import HomePage from './Components/HomePage'
import { useLocation } from 'react-router';
import { RiseLoader } from 'react-spinners';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [loading, setLoading] = useState([false]);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])

  return (
    <div>
      {loading ?
        <div className="loader">
          <RiseLoader color={'#FF467E'} size={50} speedMultiplier={.8} />
        </div> :
      <HomePage />
}
    </div>
  )
}
export default App