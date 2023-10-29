import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { FlexRow } from '../Styles/FlexRowDiv';
import * as AiIcons from 'react-icons/ai';

type Props = {
  ToggleVariantsOn: Function;
};

const AddVariants = (props: Props) => {
  const { id } = useParams();
  const [prop_id, setProp_id] = useState(0);
  const [unit_no, setUnit_no] = useState('');
  const [bldg_no, setBldg_no] = useState('');
  const [variant_item, setVariant_item] = useState('');
  const [variant_note, setVariant_note] = useState('');

  const CreateVariant = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${APIURL}/properties/${id}/variants`, {
      method: 'Post',
      body: JSON.stringify({
        prop_id: id,
        unit_no,
        bldg_no,
        variant_item,
        variant_note,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProp_id(0),
          setUnit_no(''),
          setBldg_no(''),
          setVariant_item(''),
          setVariant_note('');
      })
      .then(() => {
        props.ToggleVariantsOn();
      })
      .catch((error) => console.log(error));
  };

  const scopeItemArray = [
    '0100 - General Requirements',
    '0200 - Site Works',
    '0300 - Concrete',
    '0400 - Masonry',
    '0500 - Metals',
    '0600 - Wood and Plastics',
    '0700 - Thermal and Moisture',
    '0800 - Doors and Windows',
    '0900 - Finishes',
    '1000 - Specialties',
    '1100 - Equipment',
    '1200 - Furnishings',
    '1300 - Special Construction',
    '1400 - Conveying Systems',
    '1500 - Mechanical/Plumbing',
    '1600 - Electrical',
  ];

  return (
    <StyledModal>
      <FlexRow>
        <h3>Add Variant</h3>
        <ModalClose
          onClick={() => {
            props.ToggleVariantsOn();
          }}>
          <AiIcons.AiFillCloseCircle />
        </ModalClose>
      </FlexRow>
      <form onSubmit={CreateVariant} id='addVariant'>
        <div>
          <label htmlFor='unit_no'>Unit#</label>
          <input
            name='unit_no'
            type='text'
            value={unit_no}
            onChange={(e) => setUnit_no(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='bldg_no'>Building#</label>
          <input
            name='bldg_no'
            type='text'
            value={bldg_no}
            onChange={(e) => setBldg_no(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='variant_item'>Variant Item</label>
          <select onChange={(e) => setVariant_item(e.target.value)}>
            <option value='default'></option>
            {scopeItemArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='variant_note'>Variant Note</label>
          <input
            name='variant_note'
            type='text'
            value={variant_note}
            onChange={(e) => setVariant_note(e.target.value)}
          />
        </div>
      </form>
      <button type='submit' form='addVariant'>
        Add Variant
      </button>
    </StyledModal>
  );
};

export default AddVariants;
