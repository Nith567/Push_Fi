import React, { useState } from 'react';
import axios from 'axios';

function ProfileDetails() {
  const [identity, setIdentity] = useState('');
  const [profileData, setProfileData] = useState(null);

  const handleIdentityChange = (e) => {
    setIdentity(e.target.value);
  };

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get(`https://api.web3.bio/profile/${identity}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch Profile Details</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="identity">Enter Ethereum Address:</label>
        <input
          type="text"
          id="identity"
          value={identity}
          onChange={handleIdentityChange}
          placeholder="Ethereum Address"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        onClick={fetchProfileDetails}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Fetch Profile Details
      </button>

      {profileData && (
        <div className="mt-4">
          {profileData.map((profile, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md">
              <img
                src={profile.avatar}
                alt={profile.identity}
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold mb-2">{profile.displayName}</h2>
              <p className="text-gray-600 mb-2">{profile.identity}</p>
              <p className="mb-2">{profile.description}</p>
              {profile.links.website && (
                <a
                  href={profile.links.website.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {profile.links.website.handle}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
