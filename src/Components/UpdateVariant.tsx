import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import { Variant } from '../Types/Variant';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { FlexRow } from '../Styles/FlexRowDiv';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';

type Props = {
  EditVariant: Function;
  variantToUpdate: Variant;
  ToggleVariantUpdateOn: Function;
  FetchAllVariants: Function;
};

const UpdateVariant = (props: Props) => {
  const [editUnitNo, setEditUnitNo] = useState(props.variantToUpdate.unit_no);
  const [editBldgNo, setEditBldgNo] = useState(props.variantToUpdate.bldg_no);
  const [editVariantItem, setEditVariantItem] = useState(
    props.variantToUpdate.variant_item
  );
  const [editVariantNote, setEditVariantNote] = useState(
    props.variantToUpdate.variant_note
  );
  const { id } = useParams();

  const Update = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(
      `${APIURL}/properties/${id}/units/${props.variantToUpdate.variant_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          unit_no: editUnitNo,
          bldg_no: editBldgNo,
          variant_item: editVariantItem,
          variant_note: editVariantNote,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }
    )
      .then(() => {
        props.FetchAllVariants();
        props.ToggleVariantUpdateOn();
        props.EditVariant();
      })
      .catch((error) => console.error(error));
  };

  const scopeItemArray = [
    '0100GR',
    '0200STWR',
    '0300CON',
    '0400MAS',
    '0500MET',
    '0600WOPL',
    '0700THM',
    '0800DW',
    '0900FIN',
    '1000SPEC',
    '1100EQUIP',
    '1200FURN',
    '1300SPC',
    '1400ELV',
    '1500MECH',
    '1600ELC',
  ];

  return (
    <StyledModal>
      <FlexRow>
        <h3>{`Update Variant Unit: ${props.variantToUpdate.unit_no}`}</h3>
        <ModalClose
          onClick={() => {
            props.ToggleVariantUpdateOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </FlexRow>
      <form onSubmit={Update} id='updateVariant'>
        <div>
          <label htmlFor='unit_no'>Unit #:</label>
          <input
            name='unit_no'
            type='text'
            defaultValue={editUnitNo}
            onChange={(e) => setEditUnitNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='bldg_no'>Bldg #:</label>
          <input
            name='bldg_no'
            type='text'
            defaultValue={editBldgNo}
            onChange={(e) => setEditBldgNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='variant_item'>Variant Item</label>
          <select onChange={(e) => setEditVariantItem(e.target.value)}>
            <option value='default'>
              {props.variantToUpdate.variant_item}
            </option>
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
            defaultValue={editVariantNote}
            onChange={(e) => setEditVariantNote(e.target.value)}
          />
        </div>
        <button type='submit' form='updateVariant'>
          Update
        </button>
      </form>
    </StyledModal>
  );
};

export default UpdateVariant;
