import React, { useState } from 'react';
import APIURL from '../Utilities/Environments';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { FlexRow } from '../Styles/FlexRowDiv';
import * as AiIcons from 'react-icons/ai';
import { Property } from '../Types/Property';

type Props = {
  EditProperty: Function;
  propertyToUpdate: Property;
  ToggleEditOn: Function;
  FetchProperties: Function;
};

const UpdateProperty = (props: Props) => {
  const [editProp_name, setEditProp_name] = useState(
    props.propertyToUpdate.prop_name
  );
  const [editProp_streetaddress, setEditProp_streetaddress] = useState(
    props.propertyToUpdate.prop_streetaddress
  );

  const [editProp_city, setEditProp_city] = useState(
    props.propertyToUpdate.prop_city
  );

  const [editProp_state, setEditProp_state] = useState(
    props.propertyToUpdate.prop_state
  );

  const [editProp_zip, setEditProp_zip] = useState(
    props.propertyToUpdate.prop_zip
  );

  const [editProp_status, setEditProp_status] = useState(
    props.propertyToUpdate.prop_status
  );

  const [editProp_pm, setEditProp_pm] = useState(
    props.propertyToUpdate.prop_pm
  );

  const UpdateProperty = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${APIURL}/properties/${props.propertyToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        prop_name: editProp_name,
        prop_streetaddress: editProp_streetaddress,
        prop_city: editProp_city,
        prop_state: editProp_state,
        prop_zip: editProp_zip,
        prop_status: editProp_status,
        prop_pm: editProp_pm,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(() => {
        props.FetchProperties();
        props.ToggleEditOn();
        props.EditProperty();
      })
      .catch((error) => console.error(error));
  };

  return (
    <StyledModal>
      <FlexRow>
        <h3>{`Update ${props.propertyToUpdate.prop_name}`}</h3>
        <ModalClose
          onClick={() => {
            props.ToggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </FlexRow>
      <form onSubmit={UpdateProperty} id='updateProperty'>
        <div>
          <label htmlFor='prop_name'>Property Name:</label>
          <input
            name='prop_name'
            type='text'
            defaultValue={editProp_name}
            onChange={(e) => setEditProp_name(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_streetaddress'>Property Address:</label>
          <input
            name='prop_streetaddress'
            type='text'
            defaultValue={editProp_streetaddress || ''}
            onChange={(e) => setEditProp_streetaddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_city'>City:</label>
          <input
            name='prop_city'
            type='text'
            defaultValue={editProp_city}
            onChange={(e) => setEditProp_city(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_state'>State:</label>
          <input
            name='prop_state'
            type='text'
            defaultValue={editProp_state}
            onChange={(e) => setEditProp_state(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_zip'>Zip Code:</label>
          <input
            name='prop_zip'
            type='text'
            defaultValue={editProp_zip}
            onChange={(e) => setEditProp_zip(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_status'>Status:</label>
          <div className='custom-select'>
            <select
              name='prop_status'
              value={editProp_status}
              onChange={({ target: { value } }) => {
                setEditProp_status(value);
              }}>
              {!editProp_status && <option value=''>Choose a Status</option>}
              <option value='Active'>Active</option>
              <option value='Archived'>Archived</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='prop_pm'>Project Manager:</label>
          <select
            name='prop_pm'
            defaultValue={editProp_pm}
            onChange={({ target: { value } }) => {
              setEditProp_pm(value);
            }}>
            {!editProp_pm && <option value=''>Choose a Project Manager</option>}
            <option value='Luke Skywalker'>Luke Skywalker</option>
            <option value='Han Solo'>Han Solo</option>
            <option value='Leia Organa'>Leia Organa</option>
            <option value='Darth Vader'>Darth Vader</option>
          </select>
        </div>
      </form>
      <button type='submit' form='updateProperty'>
        Update Property
      </button>
    </StyledModal>
  );
};

export default UpdateProperty;
