import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import styled from 'styled-components';
import { Variant } from '../Types/Variant';
import AddVariants from './AddVariants';
import * as MdIcons from 'react-icons/md';
import { SecondaryFlexRow } from '../Styles/SecondaryFlexRowDiv';

function PropVariList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [variants, setVariants] = useState([]);
  const [variantActive, setVariantActive] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const FetchVariants = async (page = 1, pageSize = 5) => {
    try {
      const response = await fetch(
        `${APIURL}/properties/${id}/variants?page=${page}&pageSize=${pageSize}`,
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
      const prop_variants = await response.json();

      setVariants(prop_variants.data.variants);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchVariants(currentPage);
  }, [currentPage]);

  const HandleSelect = () => {
    try {
      navigate(`/properties/${id}/variants`);
    } catch (err) {
      console.log(err);
    }
  };

  const ToggleVariantsOn = () => {
    setVariantActive(!variantActive);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const VariantList = () => {
    return variants.map((variant: Variant, index) => (
      <tr key={index}>
        <td>{!variant.unit_no ? '-' : variant.unit_no}</td>
        <td>{variant.bldg_no}</td>
        <td>{variant.variant_item}</td>
        <td>
          <MdIcons.MdUpdate />
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      {variantActive ? (
        <AddVariants ToggleVariantsOn={ToggleVariantsOn} />
      ) : null}
      <SecondaryFlexRow>
        <h3>Property Variants</h3>
        <Button
          onClick={() => {
            ToggleVariantsOn();
          }}>
          <MdIcons.MdAddCircle />
        </Button>
      </SecondaryFlexRow>

      {variants.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Unit#</th>
              <th>Bldg.</th>
              <th>Item</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>{VariantList()}</tbody>
        </Table>
      ) : (
        <p>'No variants have been entered'</p>
      )}
      <PgButtonDiv>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev 5
        </button>
        <button onClick={HandleSelect}>All Variants</button>
        <button onClick={handleNextPage}>Next 5</button>
      </PgButtonDiv>
    </Container>
  );
}

export default PropVariList;

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
