import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

interface GoogleButtonProps {
    clientId: string;
    setIsLogin: (value: boolean) => void;
}

export const GoogleButton = ({clientId,setIsLogin}:GoogleButtonProps) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSuccess = (response:any) => {
    
    console.log(response);
    const profile = response.getBasicProfile();
    const email = profile.getEmail();
    const name = profile.getName();
    const image = profile.getImageUrl();
    
    setIsLogin(true);
  };

  const onFailure = (response:any) => {
    console.error(response);
  };

  return (
    <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
    </div>
  );
};