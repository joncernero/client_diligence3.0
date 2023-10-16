import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { FlexRow } from '../Styles/FlexRowDiv';
import * as AiIcons from 'react-icons/ai';

type Props = {
  TogglePicturesOn: Function;
};

const AddPictures = (props: Props) => {
  const { id } = useParams();
  const [prop_id, setProp_id] = useState(0);
  const [pic_name, setPic_name] = useState('');
  const [pic_link, setPic_link] = useState('');

  const CreatePic = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${APIURL}/properties/${id}/pictures`, {
      method: 'Post',
      body: JSON.stringify({
        prop_id: id,
        pic_name,
        pic_link,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProp_id(0), setPic_name(''), setPic_link('');
      })
      .catch((error) => console.log(error));
  };
  return (
    <StyledModal>
      <FlexRow>
        <h3>Add Picture</h3>
        <ModalClose
          onClick={() => {
            props.TogglePicturesOn();
          }}>
          <AiIcons.AiFillCloseCircle />
        </ModalClose>
      </FlexRow>
      <form onSubmit={CreatePic} id='addPic'>
        <div>
          <label htmlFor='pic_name'>Picture Name:</label>
          <input
            name='pic_name'
            type='text'
            value={pic_name}
            onChange={(e) => setPic_name(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='pic_link'>Picture Link Address:</label>
          <input
            name='pic_link'
            type='text'
            value={pic_link}
            onChange={(e) => setPic_link(e.target.value)}
          />
        </div>
      </form>
      <button type='submit' form='addPic'>
        Add Picture
      </button>
    </StyledModal>
  );
};

export default AddPictures;
