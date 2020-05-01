import React from 'react';

import useAuth from '~/contexts/auth';

const Home = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Home customer</h1>
      <br />
      <br />
      <button type="button" onClick={signOut}>
        SignOut
      </button>
    </>
  );
};

export default Home;
