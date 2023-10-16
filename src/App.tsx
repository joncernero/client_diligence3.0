import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './Styles/Global';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User } from './Types/User';
import { Property } from './Types/Property';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
// import Routes from './Routes/Index';
import PropertyDetailPage from './Pages/PropertyDetailPage';
import Units from './Components/Units';
import styled from 'styled-components';
import { Container } from './Components/Navigation';

type Props = {
  sessionToken?: string | null;
};

const App = (props: Props) => {
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }

    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      if (!user) return;

      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };

  const updateUser = (newUser: User) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/properties/:id' element={<PropertyDetailPage />} />
        <Route path='/properties/:id/units' element={<Units />} />
      </Routes>
    </Router>
  );
};

export default App;
