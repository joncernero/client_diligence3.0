import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import UpdateUnit from './UpdateUnit';

const Units: React.FC = () => {
  const [allUnits, setAllUnits] = useState([]);
  const [propName, setPropName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updateActive, setUpdateActive] = useState(false);
  const [addUnitActive, setAddUnitActive] = useState(false);
  const [addVariantActive, setAddVariantActive] = useState(false);
  const [unitToUpdate, setUnitToUpdate] = useState({
    prop_id: 0,
    unit_id: 0,
    unit_no: '',
    unit_type: '',
    bldg_no: '',
    isstandard: false,
  });

  const { id } = useParams();
  let navigate = useNavigate();

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

      const propertyInfo = await response.json();
      setPropName(propertyInfo.data.property.prop_name);
      setAllUnits(propertyInfo.data.propertyUnits);
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

  const ToggleUnitUpdateOn = () => {
    setUpdateActive(!updateActive);
    window.scroll(0, 0);
  };

  const EditUnit = (unit: Unit) => {
    setUnitToUpdate(unit);
  };

  const UnitList = () => {
    return allUnits.map((unit: Unit, index: number) => (
      <tr key={index}>
        <TD
          onClick={() => {
            ToggleUnitUpdateOn();
            EditUnit(unit);
          }}>
          {!unit.unit_no ? 0 : unit.unit_no}
        </TD>
        <TD
          onClick={() => {
            ToggleUnitUpdateOn();
            EditUnit(unit);
          }}>
          {unit.unit_type}
        </TD>
        <TD
          onClick={() => {
            ToggleUnitUpdateOn();
            EditUnit(unit);
          }}>
          {unit.bldg_no}
        </TD>
        <TD
          onClick={() => {
            ToggleUnitUpdateOn();
            EditUnit(unit);
          }}>
          {' '}
          {!unit.isstandard ? (
            <AiFillCloseCircle className='red' />
          ) : (
            <FaIcons.FaCheckCircle className='green' />
          )}
        </TD>
        <TD>
          <MdIcons.MdAddCircle
            onClick={() => {
              ToggleAddVariant();
            }}
          />
        </TD>
      </tr>
    ));
  };

  const csvData = allUnits.map((unit: Unit) => ({
    Prop_Id: unit.prop_id,
    Unit_Id: unit.unit_id,
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
      <UnitContainer>
        <div className='header'>
          <FlexRow>
            <h3 onClick={() => navigate(`/properties/${id}`)}>
              Units: {`${propName}`}
            </h3>
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
        </div>
        {addVariantActive ? (
          <AddVariants ToggleAddVariant={ToggleAddVariant} />
        ) : null}
        {updateActive ? (
          <UpdateUnit
            EditUnit={EditUnit}
            ToggleUnitUpdateOn={ToggleUnitUpdateOn}
            FetchAllUnits={FetchAllUnits}
            unitToUpdate={unitToUpdate}
          />
        ) : null}
        <table>
          <TableHeader>
            <tr>
              <th>Unit#</th>
              <th>Type</th>
              <th>Bldg.</th>
              <th>Standard</th>
              <th>Variant</th>
            </tr>
          </TableHeader>

          <TableBody>{UnitList()}</TableBody>
        </table>
      </UnitContainer>
    </>
  );
};

export default Units;

export const UnitContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main';

  .header {
    grid-area: header;
  }
  .main {
    grid-area: main;
  }

  table {
    width: 100%;
  }

  .update {
    display: flex;
    flex-direction: row;
    gap: 5px;

    input {
      border: none;
      width: 50px;
      z-index: 50;
    }

    button {
      z-index: 50;
    }
  }
`;

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

export const TableHeader = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
  background-color: #4e6983;
  color: white;
  tr {
    height: 40px;
    width: 100%;
    th {
      width: 33%;

      &:last-child {
        //make room for scrollbar
        width: 36%;
      }
    }
  }
`;

export const TableBody = styled.tbody`
  display: block;
  max-height: calc((80% - 45px)); //has to be specific
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute; //in relation to a parent
  > tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    height: 40px;
    cursor: pointer;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  padding-bottom: 25px;
`;

export const TD = styled.td`
  padding: 10px 15px;
  border-top: none;
  border-bottom: 1px solid #f1f1f1;
  width: 33%;
  max-width: 33%;
  word-break: break-all;
  text-align: center;
  font-size: 15px;
  font-weight: bold;

  &:nth-child(4) {
    font-size: 22px;
  }
  &:nth-child(5) {
    font-size: 22px;
    color: #4e6983;
  }
  &:last-child {
    //make room for scrollbar
    width: 36%;
  }

  .red {
    color: #ff8080;
  }

  .green {
    color: #7fbe7f;
  }

  form {
    display: flex;
    input {
      background: inherit;
      border: none;
      width: 20px;
    }
    button {
      background: light green;
      width: 20px;
    }
  }
`;
