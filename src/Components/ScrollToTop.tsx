import React, { useState } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  window.addEventListener('scroll', () => {
    window.pageYOffset > 100 ? setVisible(true) : setVisible(false);
  });

  return (
    <Div>
      <a href='#' className={`${visible ? 'block' : 'none '}`}>
        <FaIcons.FaChevronCircleUp />
      </a>
    </Div>
  );
}

const Div = styled.div`
  max-width: 100vw;
  .none {
    opacity: 0;
    visibility: hidden;
  }
  a {
    position: fixed;
    bottom: 20px;
    right: 10px;
    background-color: var(--secondary-color);
    padding: 1rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out;
    z-index: 1;
    svg {
      color: #000000;
      font-size: 35px;
    }
    @media screen and (min-width: 280px) and (max-width: 1080px) {
      left: 80vw;
      right: initial;
    }
  }
`;
export default ScrollToTop;