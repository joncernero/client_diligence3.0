import React, { useState } from 'react';
import APIURL from '../Utilities/Environments';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { FlexRow } from '../Styles/FlexRowDiv';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Unit } from '../Types/Unit';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  EditUnit: Function;
  unitToUpdate: Unit;
  ToggleUnitUpdateOn: Function;
  FetchAllUnits: Function;
};

const UpdateUnit = (props: Props) => {
  const [editUnitNo, setEditUnitNo] = useState(props.unitToUpdate.unit_no);
  const [editUnitType, setEditUnitType] = useState(
    props.unitToUpdate.unit_type
  );
  const [editBldgNo, setEditBldgNo] = useState(props.unitToUpdate.bldg_no);
  const [editIsStandard, setEditIsStandard] = useState(
    props.unitToUpdate.isstandard
  );

  const { id } = useParams();

  const Update = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(
      `${APIURL}/properties/${id}/units/${props.unitToUpdate.unit_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          unit_no: editUnitNo,
          unit_type: editUnitType,
          bldg_no: editBldgNo,
          isstandard: editIsStandard,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }
    )
      .then(() => {
        props.FetchAllUnits();
        props.ToggleUnitUpdateOn();
        props.EditUnit();
      })
      .catch((error) => console.error(error));
  };

  return (
    <StyledModal>
      <FlexRow>
        <h3>{`Update Unit #: ${props.unitToUpdate.unit_no}`}</h3>
        <ModalClose
          onClick={() => {
            props.ToggleUnitUpdateOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </FlexRow>
      <form onSubmit={Update} id='updateUnit'>
        <div>
          <label htmlFor='unit_no'>Unit #:</label>
          <input
            name='prop_name'
            type='text'
            defaultValue={editUnitNo}
            onChange={(e) => setEditUnitNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='unit_type'>Unit Type:</label>
          <input
            name='prop_name'
            type='text'
            defaultValue={editUnitType}
            onChange={(e) => setEditUnitType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='bldg_no'>Bldg #:</label>
          <input
            name='prop_name'
            type='text'
            defaultValue={editBldgNo}
            onChange={(e) => setEditBldgNo(e.target.value)}
          />
        </div>
        <div>
          <Boolean>
            <label htmlFor='isstandard'>Standard?:</label>

            <div onClick={() => setEditIsStandard(true)}>
              <FaIcons.FaCheckCircle
                className={
                  editIsStandard === true ? 'activeGreen' : 'buttonTwo'
                }
              />
            </div>
            <div onClick={() => setEditIsStandard(false)}>
              <AiIcons.AiFillCloseCircle
                className={editIsStandard === false ? 'activeRed' : 'buttonOne'}
              />
            </div>
          </Boolean>
        </div>
        <button type='submit' form='updateUnit'>
          Update
        </button>
      </form>
    </StyledModal>
  );
};

export default UpdateUnit;

export const Boolean = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;

  .buttonOne {
    color: gray;
    font-size: 28px;
  }

  .activeRed {
    color: #ff8080;
    font-size: 28px;
  }

  .buttonTwo {
    color: gray;
    font-size: 25px;
  }

  .activeGreen {
    color: #7fbe7f;
    font-size: 25px;
  }
`;
