import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import APIURL from '../Utilities/Environments';
import AddProperty from './AddProperties';
import { Property } from '../Types/Property';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { Spinner } from '../Styles/Spinner';
import { FlexRow } from '../Styles/FlexRowDiv';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const pageSize = 10;

const PropertyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [createActive, setCreateActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  const FetchProperties = async (page = 1, pageSize = 10) => {
    try {
      const response = await fetch(
        `${APIURL}/properties?page=${page}&pageSize=${pageSize}`,
        {
          method: 'Get',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const property = await response.json();
      setProperties(property.data.properties);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    FetchProperties(currentPage);

    const showLoading = () => {
      if (isLoading) {
        return <Spinner />;
      }
    };
  }, [currentPage]);

  const HandleSelect = (id: number) => {
    try {
      navigate(`/properties/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const ToggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  const PropertyList = () => {
    return properties.map((property: Property, index) => (
      <ul key={index}>
        <li onClick={() => HandleSelect(property.id)}>{property.prop_name}</li>
        <li>{property.prop_status}</li>
        <li>
          <MdIcons.MdUpdate />
        </li>
      </ul>
    ));
  };

  return (
    <Container>
      {createActive ? (
        <AddProperty
          FetchProperties={FetchProperties}
          ToggleCreateOn={ToggleCreateOn}
        />
      ) : null}
      <FlexRow>
        <h3>Property Name</h3>
        <h4>Status</h4>
        <AddButton
          onClick={() => {
            ToggleCreateOn();
          }}>
          <MdIcons.MdAddCircle />
        </AddButton>
      </FlexRow>
      <PropListContainer>
        <>{PropertyList()}</>
      </PropListContainer>
      <PgButtonDiv>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev 10
        </button>
        <button onClick={handleNextPage}>Next 10</button>
      </PgButtonDiv>
    </Container>
  );
};

export default PropertyList;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PgButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;

  button {
    background: #ffffff;
    color: #black;
    padding: 5px 15px;
    font-weight: bold;
    border: 2px solid black;
    border-radius: 5px;
    height: 30px;
    text-align: center;
    font-size: 15px;

    &:hover {
      background: #032a4e;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;

export const AddButton = styled.div`
  background: none;
  color: white;
  border: none;
  font-size: 20px;
  margin-right: 10px;

  &:hover {
    background: none;
    color: #08f42d;
  }
`;

export const PropListContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex: 3;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 105px;

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 20px 0;

    li:nth-child(1) {
      margin-left: 15px;
      width: 50%;
    }
    li:nth-child(2) {
      text-align: center;
      width: 20%;
    }
    li:nth-child(3) {
      text-align: right;
      width: 20%;
    }
  }
`;
