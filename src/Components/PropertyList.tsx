import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import APIURL from '../Utilities/Environments';
import AddProperty from './AddProperties';
import { Property } from '../Types/Property';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { Spinner } from '../Styles/Spinner';
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
      <tr key={index}>
        <td onClick={() => HandleSelect(property.id)}>{property.prop_name}</td>
        <td>{`${property.prop_city}, ${property.prop_state}`}</td>
        <td>{property.prop_status}</td>
        <td>{property.prop_pm}</td>
        <td></td>
        <td>
          <MdIcons.MdUpdate />
        </td>
      </tr>
    ));
  };

  return (
    <>
      {createActive ? (
        <AddProperty
          FetchProperties={FetchProperties}
          ToggleCreateOn={ToggleCreateOn}
        />
      ) : null}

      <Table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>PM</th>
            <th></th>
            <th>
              <button
                onClick={() => {
                  ToggleCreateOn();
                }}>
                <MdIcons.MdAddCircle />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{PropertyList()}</tbody>
      </Table>
      <PgButtonDiv>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev 10
        </button>
        <button onClick={handleNextPage}>Next 10</button>
      </PgButtonDiv>
    </>
  );
};

export default PropertyList;

export const Container = styled.div``;

export const PgButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;

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

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 100%;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    height: 10px;
    background-color: #032a4e;
  }

  thead th {
    color: white;
    padding: 15px;
  }

  thead th:nth-child(1) {
    width: 40%;
    text-align: left;
  }

  thead th:nth-child(2) {
    width: 20%;
    text-align: center;
  }

  thead th:nth-child(3) {
    width: 15%;
    text-align: center;
  }

  thead th:nth-child(4) {
    width: 20%;
    text-align: center;
  }

  thead th:nth-child(5) {
    width: 0%;
  }

  thead th:nth-child(6) {
    width: 10%;
    text-align: center;
  }

  th:nth-child(2),
  th:nth-child(4),
  td:nth-child(2),
  td:nth-child(4),
  th:nth-child(5),
  td:nth-child(5) {
    @media screen and (max-width: 400px) {
      display: none;
    }
  }

  th button {
    background: none;
    color: white;
    border: none;
    font-size: 20px;

    &:hover {
      background: none;
      color: #08f42d;
    }
  }

  tbody tr {
    &:hover {
      background: #c2abe1;
      color: #ffffff;
    }
    width: 80%;
  }

  tbody td {
    padding: 15px;
    width: auto;
    color: black;
  }

  td:not(:first-child) {
    text-align: center;
  }

  td button {
    background: none;
    border: none;
  }
`;
