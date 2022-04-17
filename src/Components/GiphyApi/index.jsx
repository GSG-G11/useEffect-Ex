import React, { useState, useEffect } from 'react';
import './style.css';

const GiphyApi = () => {
  const [giphy, setGiphy] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    setLoading(true)
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=DxgbMjuHkQDxUaTysygWT1It0o1zhwUi&q=${search}&limit=20`, opts)
    .then(res => res.json())
    .then(data => {
      setGiphy(data.data);
      setLoading(false);
    });
    console.log('running');
    return () => {
      setGiphy([]);
      abortCtrl.abort();
    }
  }, [search]);


  return (
    <div className='giphy'>
      <h1>Giphy API</h1>
      <form className='form'>
        <input
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch((prev) => e.target.value)}
        />
      </form>
      <div className='giphy-container'>
        {loading ? (
          <h1>Loading...</h1>
        ) : giphy.length > 0 ? (
          giphy.map((gif, index) => (
            <img src={gif.images.fixed_height.url} alt='gif' key={index} />
          ))
        ) : (
          <p>No Results to Show</p>
        )}
      </div>
    </div>
  );
}

export default GiphyApi;