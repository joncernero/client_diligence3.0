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
import styled from 'styled-components';

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
    <Container>
      <Router>
        <GlobalStyle />
        <div className='item-a'>
          <Header />
        </div>
        <div className='item-b'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/properties/:id' element={<PropertyDetailPage />} />
            <Route path='/properties/:id/units' element={<Units />} />
            <Route path='/properties/:id/variants' element={<Variants />} />
          </Routes>
        </div>
        <div className='item-c'>
          <Navigation />
        </div>
      </Router>
    </Container>
  );
};

export default App;

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'header header header' 'main main main' 'footer footer footer';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 5vh 85vh 10vh;

  .item-a {
    grid-area: 1 / 1 / 2 / 4;
  }

  .item-b {
    grid-area: 2 / 1 / 2 / 4;
  }

  .item-c {
    grid-area: 3 / 1 / 4 / 4;
    z-index: 1;
  }
`;
