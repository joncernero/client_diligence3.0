import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { FlexRow } from '../Styles/FlexRowDiv';
import * as AiIcons from 'react-icons/ai';

type Props = {
  ToggleAddUnit: Function;
  FetchAllUnits: Function;
};

const AddUnits = (props: Props) => {
  const { id } = useParams();
  const [prop_id, setProp_id] = useState(0);
  const [unit_type, setUnit_type] = useState('');
  const [bldg_no, setBldg_no] = useState('');
  const [num_rows, setNum_rows] = useState(0);

  const CreateUnitType = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${APIURL}/properties/${id}/units`, {
      method: 'Post',
      body: JSON.stringify({
        prop_id: id,
        unit_type,
        unit_no: '',
        bldg_no,
        isstandard: false,
        num_rows,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProp_id(0), setUnit_type(''), setBldg_no(''), setNum_rows(0);
        props.ToggleAddUnit();
        props.FetchAllUnits();
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledModal>
      <FlexRow>
        <h3>Add Units</h3>
        <ModalClose
          onClick={() => {
            props.ToggleAddUnit();
          }}>
          <AiIcons.AiFillCloseCircle />
        </ModalClose>
      </FlexRow>
      <form onSubmit={CreateUnitType} id='addUnits'>
        <div>
          <label htmlFor='unit_type'>Unit Type:</label>
          <input
            name='unit_type'
            type='text'
            value={unit_type}
            onChange={(e) => setUnit_type(e.target.value)}
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
          <label htmlFor='num_rows'>How Many?</label>
          <input
            name='num_rows'
            type='number'
            value={num_rows}
            onChange={(e) => setNum_rows(parseFloat(e.target.value))}
          />
        </div>
      </form>
      <button type='submit' form='addUnits'>
        Add Units
      </button>
    </StyledModal>
  );
};

export default AddUnits;
