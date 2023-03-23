import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

interface GoogleButtonProps {
  clientId: string;
  //setIsLogin: (value: boolean) => void;
}

export const GoogleButton = ({ clientId }: GoogleButtonProps) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useNavigate();
  const onSuccess = (response: any) => {
    console.log(response);
    const profile = response.getBasicProfile();
    const user = {
      email: profile.getEmail(),
      name: profile.getName(),
      image: profile.getImageUrl(),
    };
    //change the route to canvas?
    history("/canvas", {
      state: {
        user: user,
      },
    });

    //router.push("/canvas");
    /*
    const email = profile.getEmail();
    const name = profile.getName();
    const image = profile.getImageUrl();
    */
    sessionStorage.setItem("user", JSON.stringify(user));

    //setIsLogin(true);
  };

  const onFailure = (response: any) => {
    console.error(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
