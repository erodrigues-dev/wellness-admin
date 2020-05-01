import React from 'react';

import useAuth from '~/contexts/auth';

const SignIn = () => {
  const { signIn } = useAuth();

  const handleSignin = () => {
    signIn();
  };

  return (
    <>
      <h1>SignIn</h1>
      <br />
      <br />
      <button type="button" onClick={handleSignin}>
        SignIn
      </button>
    </>
  );
};

export default SignIn;
