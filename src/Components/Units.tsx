import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import styled from 'styled-components';
import { Unit } from '../Types/Unit';
import AddUnits from './AddUnits';
import { Spinner } from '../Styles/Spinner';
import * as MdIcons from 'react-icons/md';
import { FlexRow } from '../Styles/FlexRowDiv';
import { CSVLink, CSVDownload } from 'react-csv';

const Units = () => {
  const [allUnits, setAllUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateActive, setUpdateActive] = useState(false);
  const { id } = useParams();

  const FetchAllUnits = async () => {
    try {
      const response = await fetch(`${APIURL}/properties/${id}/allUnits`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const propertyUnits = await response.json();
      setAllUnits(propertyUnits.data.propertyUnits);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    FetchAllUnits();
  }, []);

  const ToggleUpdateOn = () => {
    setUpdateActive(!updateActive);
  };

  const UnitList = () => {
    return allUnits.map((unit: Unit, index) => (
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

  const csvData = allUnits.map((unit: Unit) => ({
    Unit_No: !unit.unit_no ? '-' : unit.unit_no,
    Type: unit.unit_type,
    Bldg_No: unit.bldg_no,
    Standard: unit.isstandard,
  }));

  const DownloadLink = {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bolder',
  };

  return (
    <>
      <FlexRow>
        <h3>Property Units</h3>
        <CSVLink
          data={csvData}
          filename={`property_${id}_units.csv`}
          style={DownloadLink}>
          <MdIcons.MdFileDownload />
        </CSVLink>
      </FlexRow>
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
    </>
  );
};

export default Units;

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

export const Table = styled.table`
  width: 100%;
  min-height: 100vh;
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    background-color: #4e6983;
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
