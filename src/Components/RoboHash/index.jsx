import React, { useState, useEffect } from 'react';
import './style.css';

const RoboHash = () => {
  const [image, setImage] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    setLoading(true)
    fetch(`https://robohash.org/${search}.png`, opts)
    .then(res => res.blob())
    .then(data => {
      setImage(URL.createObjectURL(data));
      setLoading(false);
    })
    .catch(err => {
      setImage('');
      setLoading(false);
    });

    return () => {
      setImage('');
      abortCtrl.abort();
    }
  }, [search]);


  return (
    <div className="giphy">
      <h1>Robo Hash API</h1>
      <form className='form'>
        <input type='text' placeholder='Search' value={search} onChange={(e) => setSearch(prev => e.target.value)} />
      </form>
      <div className='image-container'>
        {loading ? <h1>Loading...</h1> : image ? 
          <img src={image} alt='gif' />
        : <p>No Results to Show</p>}

      </div>
    </div>
  )
}

export default RoboHash;