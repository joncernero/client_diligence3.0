import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './Styles/Global';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User } from './Types/User';
import Home from './Pages/Home';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Login from './Pages/Login';
import PropertyDetailPage from './Pages/PropertyDetailPage';
import Units from './Components/Units';
import Variants from './Components/Variants';

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
        <Route path='/properties/:id/variants' element={<Variants />} />
      </Routes>
      <Navigation />
    </Router>
  );
};

export default App;
