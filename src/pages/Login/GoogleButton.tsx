import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

const GoogleButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSuccess = (response:any) => {
    console.log(response);
    setIsLoggedIn(true);
  };

  const onFailure = (response:any) => {
    console.error(response);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>You are logged in!</div>
      ) : (
        <GoogleLogin
          clientId="YOUR_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default GoogleButton;