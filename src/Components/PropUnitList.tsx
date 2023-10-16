import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import styled from 'styled-components';
import { Unit } from '../Types/Unit';
import AddUnits from './AddUnits';
import * as MdIcons from 'react-icons/md';
import { SecondaryFlexRow } from '../Styles/SecondaryFlexRowDiv';

const PropUnitList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [units, setUnits] = useState([]);
  const [unitActive, setUnitActive] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const FetchUnits = async (page = 1, pageSize = 5) => {
    try {
      const response = await fetch(
        `${APIURL}/properties/${id}/units?page=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const prop_units = await response.json();
      setUnits(prop_units.data.propertyUnits);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchUnits(currentPage);
  }, [currentPage]);

  const HandleSelect = () => {
    try {
      navigate(`/properties/${id}/units`);
    } catch (err) {
      console.log(err);
    }
  };

  const ToggleUnitsOn = () => {
    setUnitActive(!unitActive);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const UnitList = () => {
    return units.map((unit: Unit, index) => (
      <tr key={index}>
        <td>{!unit.unit_no ? '-' : unit.unit_no}</td>
        <td>{unit.unit_type}</td>
        <td>{unit.bldg_no}</td>
        <td>{!unit.isstandard ? <MdIcons.MdClear /> : <MdIcons.MdDone />}</td>
        <td>
          <MdIcons.MdUpdate />
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      {unitActive ? <AddUnits ToggleUnitsOn={ToggleUnitsOn} /> : null}
      <SecondaryFlexRow>
        <h3>Property Units</h3>
        <Button
          onClick={() => {
            ToggleUnitsOn();
          }}>
          <MdIcons.MdAddCircle />
        </Button>
      </SecondaryFlexRow>

      {units.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Unit#</th>
              <th>Type</th>
              <th>Bldg.</th>
              <th>Standard</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>{UnitList()}</tbody>
        </Table>
      ) : (
        <p>'No units have been entered'</p>
      )}
      <PgButtonDiv>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev 5
        </button>
        <button onClick={HandleSelect}>All Units</button>
        <button onClick={handleNextPage}>Next 5</button>
      </PgButtonDiv>
    </Container>
  );
};

export default PropUnitList;

export const Container = styled.div`
  p {
    text-align: center;
    font-weight: bold;
    padding: 25px;
  }
`;

export const PgButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;

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
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    background-color: #032a4e;
  }

  thead th {
    color: white;
    padding: 10px;
    font-size: 12px;
  }

  tbody td {
    text-align: center;
    font-size: 11px;
    font-weight: bold;
  }

  td {
    padding: 20px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
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
