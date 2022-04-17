import React, { useEffect, useState } from 'react';
import './style.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState(true);

  useEffect(() => {
    setLoading(true);
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    const fetchData = async () => {
      const result = await fetch('https://randomuser.me/api/', opts)
      .then((res) => res.json())
      .catch(err => 'Error');
      
      setProfile(result.results[0]);
      setLoading(false);
      setGetData(false);
    }

    if(getData) {
      fetchData();
    }

    return () => {
      abortCtrl.abort();
    };
  }, [getData]);

  const deleteHandler = () => {
    setProfile({});
  };

  return (
    <div className="profile">
      <section className='user-profile'>
      {
        profile.name ? (
          <>
            <header className='profile-header'>
              <div className="profile-image">
                <img src={profile.picture.large} alt="profile" />
              </div>
            </header>
            <main>
              <div className="profile-info">
                <h1 className='name'>{profile.name.first} {profile.name.last}</h1>
                <div>
                  <p>
                    <strong>
                      <i className="ri-map-pin-line"></i>
                    </strong>
                    {profile.location.country}, {profile.location.city}
                  </p>
                  <p>
                    <strong>
                      <i className="ri-mail-line"></i>
                    </strong>
                    {profile.email}
                  </p>
                  <p>
                    <strong>
                      <i className="ri-phone-line"></i>
                    </strong>
                    {profile.phone}
                  </p>
                </div>
              </div>
            </main>
          </>
        )
        : 
        <p>No Profile</p>
      }
    </section>
    <div className="btns-div">
      <button className="btn" onClick={setGetData}>Generate User</button>
    </div>
    </div>
  );
};

export default Profile;
