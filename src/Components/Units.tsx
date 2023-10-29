import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import styled from 'styled-components';
import { Unit } from '../Types/Unit';
import AddUnits from './AddUnits';
import AddVariants from './AddVariants';
import { Spinner } from '../Styles/Spinner';
import * as MdIcons from 'react-icons/md';
import { FlexRow } from '../Styles/FlexRowDiv';
import { CSVLink, CSVDownload } from 'react-csv';
import ScrollToTop from './ScrollToTop';
import * as FaIcons from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

const Units = () => {
  const [allUnits, setAllUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateActive, setUpdateActive] = useState(false);
  const [addUnitActive, setAddUnitActive] = useState(false);
  const [addVariantActive, setAddVariantActive] = useState(false);
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    FetchAllUnits();
  }, []);

  const ToggleAddUnit = () => {
    setAddUnitActive(!addUnitActive);
    window.scrollTo(0, 0);
  };

  const ToggleAddVariant = () => {
    setAddVariantActive(!addVariantActive);
    window.scrollTo(0, 0);
  };

  const ToggleUpdateOn = () => {
    setUpdateActive(!updateActive);
  };

  const UnitList = () => {
    return allUnits.map((unit: Unit, index) => (
      <tr key={index}>
        <td>{!unit.unit_no ? '-' : unit.unit_no}</td>
        <td>{unit.unit_type}</td>
        <td>{unit.bldg_no}</td>
        <td>
          {!unit.isstandard ? (
            <AiFillCloseCircle className='red' />
          ) : (
            <FaIcons.FaCheckCircle className='green' />
          )}
        </td>
        <td>
          <MdIcons.MdAddCircle
            onClick={() => {
              ToggleAddVariant();
            }}
          />
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
    fontSize: 25,
    fontWeight: 'bolder',
  };

  return (
    <>
      <ScrollToTop />
      <FlexRow>
        <h3>Property Units</h3>
        <div>
          {addUnitActive ? (
            <AddUnits
              ToggleAddUnit={ToggleAddUnit}
              FetchAllUnits={FetchAllUnits}
            />
          ) : null}
          <Button
            onClick={() => {
              ToggleAddUnit();
            }}>
            <MdIcons.MdAddCircle />
          </Button>
          <CSVLink
            data={csvData}
            filename={`property_${id}_units.csv`}
            style={DownloadLink}>
            <MdIcons.MdFileDownload />
          </CSVLink>
        </div>
      </FlexRow>
      <Table>
        <thead>
          <tr>
            <th>Unit#</th>
            <th>Type</th>
            <th>Bldg.</th>
            <th>Standard</th>
            <th>Variant</th>
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
  font-size: 25px;
  margin: 0 15px;
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
  margin-top: 95px;

  thead {
    position: fixed;
    background-color: #4e6983;
    width: 100%;
  }

  thead th {
    color: white;
    padding: 10px;
    font-size: 15px;
  }

  tbody {
    overflow: scroll;
    width: 100%;
  }

  td {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    padding: 20px;
  }

  td {
    .red {
      color: #ff8080;
    }

    .green {
      color: #7fbe7f;
    }
  }

  td:nth-child(4) {
    font-size: 22px;
  }

  td:nth-child(5) {
    font-size: 22px;
    color: #4e6983;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
