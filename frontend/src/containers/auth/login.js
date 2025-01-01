import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import client from '../../context/axiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setCurrentUser } = useAuth();

  const handleLogin = async () => {
    try {
      setError(null);

      const response = await client.post('/api/login', {
        username,
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);

      setCurrentUser(user);

    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password');
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;