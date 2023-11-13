import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import DisplayedProp from '../Components/Property';
import styled from 'styled-components';
import AddPictures from '../Components/AddPictures';
import PropRollUp from '../Components/PropRollUp';
import Pictures from '../Components/Pictures';

function PropertyDetailPage() {
  const { id } = useParams();
  const [pictureActive, setPictureActive] = useState(false);
  const [DisplayedProperty, setDisplayedProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const FetchProperty = async () => {
    await fetch(`${APIURL}/properties/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDisplayedProperty(res.data.property);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const TogglePicturesOn = () => {
    setPictureActive(!pictureActive);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    FetchProperty();
    // HandleUpdate();
  }, []);

  return (
    <>
      {pictureActive ? (
        <AddPictures TogglePicturesOn={TogglePicturesOn} />
      ) : null}
      <Container>
        <div className='top'>
          <DisplayedProp DisplayedProperty={DisplayedProperty} />
        </div>
        <div className='middle'>
          <Pictures TogglePicturesOn={TogglePicturesOn} />
        </div>
        <div className='bottom'>
          <PropRollUp />
        </div>
      </Container>
    </>
  );
}

export default PropertyDetailPage;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24vh 20vh 50vh;

  .top {
    grid-area: 1 / 1 / 2 / 2;
  }
  .middle {
    grid-area: 2 / 1 / 3 / 2;
  }
  .bottom {
    grid-area: 3 / 1 / 4 / 2;
  }
`;
