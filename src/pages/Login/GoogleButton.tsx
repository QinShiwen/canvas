import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

interface GoogleButtonProps {
  clientId: string;
  //setIsLogin: (value: boolean) => void;
}

export const GoogleButton = ({ clientId }: GoogleButtonProps) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //generate a random room id
  const roomId = nanoid(5);
  const history = useNavigate();
  const onSuccess = (response: any) => {
    console.log(response);
    const profile = response.getBasicProfile();
    const auth = {
      email: profile.getEmail(),
      name: profile.getName(),
      image: profile.getImageUrl(),
      roomId: roomId,
    };
    //change the route to canvas?
    sessionStorage.setItem("user", JSON.stringify(auth));
    history(`/canvas/${roomId}`, {
      state: {
        auth:auth,
      },
    });

    //router.push("/canvas");
    /*
    const email = profile.getEmail();
    const name = profile.getName();
    const image = profile.getImageUrl();
    */

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
