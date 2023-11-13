import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import { PropertyPic } from '../Types/PropertyPic';
import styled from 'styled-components';
import { SecondaryFlexRow } from '../Styles/SecondaryFlexRowDiv';
import * as MdIcons from 'react-icons/md';

type Props = {
  TogglePicturesOn: Function;
};

const Pictures = (props: Props) => {
  const [propPictures, setPropPictures] = useState([]);
  const { id } = useParams();

  const GetPropPics = async () => {
    await fetch(`${APIURL}/properties/${id}/pictures`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((pictures) => {
        setPropPictures(pictures.data.pics);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetPropPics();
  }, []);

  const DisplayPics = () => {
    return propPictures.length > 0 ? (
      propPictures.map((picture: PropertyPic, index) => {
        return (
          <PicDiv key={index}>
            {/* <PicWindow pic_link={picture.pic_link} /> */}
            <section>
              <Picture src={picture.pic_link} cross-origin={'anonymous'} />
              <p>{picture.pic_name}</p>
            </section>
          </PicDiv>
        );
      })
    ) : (
      <MessageDiv>
        <p className='none'>'No Pictures Uploaded'</p>
      </MessageDiv>
    );
  };

  return (
    <Container>
      <SecondaryFlexRow>
        <h3>Property Pictures</h3>
        <Button
          onClick={() => {
            props.TogglePicturesOn();
          }}>
          <MdIcons.MdAddCircle />
        </Button>
      </SecondaryFlexRow>
      <HSlider>{DisplayPics()}</HSlider>
    </Container>
  );
};

export default Pictures;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.5vh 14.5vh;

  .top {
    grid-area: ;
  }

  p {
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
`;

export const MessageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* padding: 20px 0; */
`;

export const PicDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 5px;
`;

export const Picture = styled.img.attrs((props) => ({
  src: props.src,
  alt: 'Property Picture',
}))`
  height: auto;
  max-width: 100%;
  object-fit: scale-down;
`;

export const Button = styled.button`
  background: none;
  color: white;
  border: none;
  font-size: 20px;

  &:hover {
    background: none;
    color: #08f42d;
  }
`;

export const HSlider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow-x: scroll;
`;
