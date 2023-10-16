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
        `${APIURL}/properties${id}/variants?${page}&pageSize=${pageSize}`,
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
      setVariants(prop_variants.data.propertyVariants);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchVariants();
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
        <td>{variant.variant_note}</td>
        <td>
          <MdIcons.MdUpdate />
        </td>
      </tr>
    ));
  };

  return <div>PropVariList</div>;
}

export default PropVariList;
