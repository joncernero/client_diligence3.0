import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import DisplayedProp from '../Components/Property';
import styled from 'styled-components';
import AddPictures from '../Components/AddPictures';
import UnitList from '../Components/PropUnitList';
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
        <DisplayedProp DisplayedProperty={DisplayedProperty} />
        <Pictures TogglePicturesOn={TogglePicturesOn} />
        <UnitList />
      </Container>
    </>
  );
}

export default PropertyDetailPage;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
