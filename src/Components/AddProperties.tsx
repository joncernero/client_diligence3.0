import React, { useState, useEffect } from 'react';
import APIURL from '../Utilities/Environments';
import { StyledModal, ModalClose } from '../Styles/Modal';
import { Title } from '../Styles/Title';
import { FlexRow } from '../Styles/FlexRowDiv';
import { Button } from '../Styles/Button';
import * as AiIcons from 'react-icons/ai';

type Props = {
  ToggleCreateOn: Function;
  FetchProperties: Function;
};

const AddProperties = (props: Props) => {
  const [prop_name, setProp_name] = useState('');
  const [prop_streetaddress, setProp_streetaddress] = useState('');
  const [prop_city, setProp_city] = useState('');
  const [prop_state, setProp_state] = useState('');
  const [prop_zip, setProp_zip] = useState('');
  const [prop_createdBy, setProp_createdBy] = useState('');
  const [prop_status, setProp_status] = useState('');
  const [prop_pm, setProp_pm] = useState('');

  const CreateProperty = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${APIURL}/properties`, {
      method: 'Post',
      body: JSON.stringify({
        prop_name,
        prop_streetaddress,
        prop_city,
        prop_state,
        prop_zip,
        prop_createdBy,
        prop_status,
        prop_pm,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProp_name(''),
          setProp_streetaddress(''),
          setProp_city(''),
          setProp_state(''),
          setProp_zip(''),
          setProp_createdBy(''),
          setProp_status('');
        setProp_pm('');
      })
      .then(() => {
        props.FetchProperties();
        props.ToggleCreateOn();
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledModal>
      <FlexRow>
        <h3>Add Property</h3>
        <ModalClose
          onClick={() => {
            props.ToggleCreateOn();
          }}>
          <AiIcons.AiFillCloseCircle />
        </ModalClose>
      </FlexRow>
      <form onSubmit={CreateProperty} id='addProperty'>
        <div>
          <label htmlFor='prop_name'>Property Name:</label>
          <input
            name='prop_name'
            type='text'
            value={prop_name}
            onChange={(e) => setProp_name(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_streetaddress'>Property Address:</label>
          <input
            name='prop_streetaddress'
            type='text'
            value={prop_streetaddress}
            onChange={(e) => setProp_streetaddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_city'>City:</label>
          <input
            name='prop_city'
            type='text'
            value={prop_city}
            onChange={(e) => setProp_city(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_state'>State:</label>
          <input
            name='prop_state'
            type='text'
            value={prop_state}
            onChange={(e) => setProp_state(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_zip'>Zip Code:</label>
          <input
            name='prop_zip'
            type='text'
            value={prop_zip}
            onChange={(e) => setProp_zip(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='prop_createdBy'>Created By:</label>
          <input
            name='prop_createdBy'
            type='text'
            value={prop_createdBy}
            onChange={(e) => setProp_createdBy(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor='userId'>Campaign Manager:</label>
          <select onChange={(e) => setUserId(e.target.value)}>
            <option value='default'></option>
            {props.users.map((user: User, index) => (
              <option key={index} value={user.id}>
                {user.campaignManager}
              </option>
            ))}
          </select>
        </div> */}
        <div>
          <label htmlFor='prop_status'>Status:</label>
          <select onChange={(e) => setProp_status(e.target.value)}>
            <option value='default'></option>
            <option value='Active'>Active</option>
            <option value='Archived'>Archived</option>
          </select>
        </div>
        <div>
          <label htmlFor='prop_pm'>Project Manager:</label>
          <select onChange={(e) => setProp_pm(e.target.value)}>
            <option value='default'></option>
            <option value='Luke Skywalker'>Luke Skywalker</option>
            <option value='Han Solo'>Han Solo</option>
            <option value='Leia Organa'>Leia Organa</option>
            <option value='Darth Vader'>Darth Vader</option>
          </select>
        </div>
      </form>
      <button type='submit' form='addProperty'>
        Add Account
      </button>
    </StyledModal>
  );
};

export default AddProperties;
