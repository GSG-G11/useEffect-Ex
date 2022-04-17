import React, { useEffect, useState } from 'react';
import './style.css'

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.addEventListener('mousedown', () => {
      setCount((prev) => prev + 1);
    })
  }, [])

  return (
    <div className="counter">
      <h1>Hooks Counter (MouseDown)</h1>
      <h3 className='count'>{count}</h3>
    </div>
  )
}

export default Counter;