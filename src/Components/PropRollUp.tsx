import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import styled from 'styled-components';
import { Unit } from '../Types/Unit';
import AddUnits from './AddUnits';
import * as MdIcons from 'react-icons/md';
import { SecondaryFlexRow } from '../Styles/SecondaryFlexRowDiv';
import { Chart } from 'react-google-charts';

const PropRollUp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [units, setUnits] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const isStandard = [];
  const isNotStandard = [];
  const oneByOne = [];
  const twoByOne = [];
  const twoByTwo = [];
  const threeByTwo = [];
  const other = [];

  const FetchUnits = async () => {
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
      setUnits(propertyUnits.data.propertyUnits);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchUnits();
  }, []);

  units.map((unit: Unit) => {
    unit.isstandard ? isStandard.push(unit) : isNotStandard.push(unit);
  });

  units.map((unit: Unit) => {
    if (unit.unit_type === '1 x 1') {
      oneByOne.push(unit);
    } else if (unit.unit_type === '2 x 1') {
      twoByOne.push(unit);
    } else if (unit.unit_type === '2 x 2') {
      twoByTwo.push(unit);
    } else if (unit.unit_type === '3 x 2') {
      threeByTwo.push(unit);
    } else {
      other.push(unit);
    }
  });

  console.log(twoByTwo.length);

  const data = [
    ['Units', 'Number of Units'],
    [`Standard: ${isStandard.length}`, isStandard.length],
    [`Variants: ${isNotStandard.length}`, isNotStandard.length],
  ];

  const options = {
    legend: { position: 'bottom' },
    pieHole: 0.1,
    is3D: false,
    width: 225,
    height: 225,
    chartArea: { width: '80%', height: '65%' },
    pieSliceText: 'none',
    pieSliceTextStyle: {
      fontSize: '12',
      color: '#000000',
    },
    colors: ['9aa9b8', '#b3bfc9'],
  };

  const HandleUnitSelect = () => {
    try {
      navigate(`/properties/${id}/units`);
    } catch (err) {
      console.error(err);
    }
  };

  const HandleVariantSelect = () => {
    try {
      navigate(`/properties/${id}/variants`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <SecondaryFlexRow>
        <h3>Property Units</h3>
      </SecondaryFlexRow>
      <ChartCon>
        <Chart chartType='PieChart' data={data} options={options} />
        <UnitTally>
          <h3>Unit Breakdown</h3>
          <h5>1 x 1: {`${oneByOne.length} Units`}</h5>
          <h5>2 x 1: {`${twoByOne.length} Units`}</h5>
          <h5>2 x 2: {`${twoByTwo.length} Units`}</h5>
          <h5>3 x 2: {`${threeByTwo.length} Units`}</h5>
          <h5>Other: {`${other.length} Units`}</h5>
        </UnitTally>
      </ChartCon>
      <PgButtonDiv>
        <button onClick={HandleUnitSelect}>All Units</button>
        <button onClick={HandleVariantSelect}>All Variants</button>
      </PgButtonDiv>
    </Container>
  );
};

export default PropRollUp;

export const Container = styled.div``;

export const ChartCon = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const UnitTally = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #000000;

  h3 {
    font-weight: bold;
    font-size: 14px;
  }
  h5 {
    font-weight: normal;
    font-size: 13px;
  }
`;

export const PgButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 15px 0;

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
