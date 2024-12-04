import React from 'react';
import { logout } from '../services/authServices';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const message = await logout();
      console.log(message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;