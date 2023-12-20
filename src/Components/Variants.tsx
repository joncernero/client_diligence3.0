import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIURL from '../Utilities/Environments';
import styled from 'styled-components';
import { Variant } from '../Types/Variant';
import { Spinner } from '../Styles/Spinner';
import * as MdIcons from 'react-icons/md';
import { FlexRow } from '../Styles/FlexRowDiv';
import { CSVLink, CSVDownload } from 'react-csv';
import ScrollToTop from './ScrollToTop';
import * as FaIcons from 'react-icons/fa';
import UpdateVariant from './UpdateVariant';

const Variants = () => {
  const [allVariants, setAllVariants] = useState([]);
  const [propName, setPropName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updateActive, setUpdateActive] = useState(false);
  const [addVariantActive, setAddVariantActive] = useState(false);
  const [variantToUpdate, setVariantToUpdate] = useState({
    variant_id: 0,
    prop_id: 0,
    unit_no: '',
    bldg_no: '',
    variant_item: '',
    variant_note: '',
  });
  const { id } = useParams();
  let navigate = useNavigate();

  const FetchAllVariants = async () => {
    try {
      const response = await fetch(`${APIURL}/properties/${id}/allVariants`, {
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
      setAllVariants(propertyInfo.data.propertyVariants);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    FetchAllVariants();
  }, []);

  const ToggleAddVariant = () => {
    setAddVariantActive(!addVariantActive);
    window.scrollTo(0, 0);
  };

  const ToggleVariantUpdateOn = () => {
    setUpdateActive(!updateActive);
    window.scroll(0, 0);
  };

  const EditVariant = (variant: Variant) => {
    setVariantToUpdate(variant);
  };

  const VariantList = () => {
    return allVariants.map((variant: Variant, index) => (
      <tr key={index}>
        <TD>{variant.unit_no}</TD>
        <TD>{variant.bldg_no}</TD>
        <TD>{variant.variant_note}</TD>
        <TD
          onClick={() => {
            ToggleVariantUpdateOn();
            EditVariant(variant);
          }}>
          <MdIcons.MdUpdate />
        </TD>
      </tr>
    ));
  };

  const csvData = allVariants.map((variant: Variant) => ({
    Prop_Id: variant.prop_id,
    Unit_No: variant.unit_no,
    Bldg_No: variant.bldg_no,
    Variant_Item: variant.variant_item,
    Variant_Note: variant.variant_note,
  }));

  const DownloadLink = {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bolder',
  };

  return (
    <>
      <ScrollToTop />
      <VariantContainer>
        <div className='header'>
          <FlexRow>
            <h3 onClick={() => navigate(`/properties/${id}`)}>
              Variants: {`${propName}`}
            </h3>
            <div>
              <Button
                onClick={() => {
                  ToggleAddVariant();
                }}>
                <MdIcons.MdAddCircle />
              </Button>
              <CSVLink
                data={csvData}
                filename={`property_${id}_variants.csv`}
                style={DownloadLink}>
                <MdIcons.MdFileDownload />
              </CSVLink>
            </div>
          </FlexRow>
        </div>

        {updateActive ? (
          <UpdateVariant
            ToggleVariantUpdateOn={ToggleVariantUpdateOn}
            EditVariant={EditVariant}
            FetchAllVariants={FetchAllVariants}
            variantToUpdate={variantToUpdate}
          />
        ) : null}

        <table>
          <TableHeader>
            <tr>
              <th>Unit#</th>
              <th>Bldg.</th>
              <th>Note</th>
              <th>Update</th>
            </tr>
          </TableHeader>
          <TableBody>{VariantList()}</TableBody>
        </table>
      </VariantContainer>
    </>
  );
};

export default Variants;

export const VariantContainer = styled.div`
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
      &:nth-child(1) {
        width: 10%;
      }
      &:nth-child(2) {
        width: 10%;
      }
      &:nth-child(3) {
        width: 30%;
      }
      &:nth-child(4) {
        width: 10%;
      }

      /* &:last-child {
        //make room for scrollbaar
        width: 36%;
      } */
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
  /* width: 33%;
  max-width: 33%; */
  word-break: break-all;
  text-align: center;
  font-size: 12px;
  font-weight: bold;

  &:nth-child(1) {
    width: 10%;
  }

  &:nth-child(2) {
    width: 10%;
  }

  &:nth-child(3) {
    width: 30%;
  }
  &:nth-child(4) {
    width: 10%;
    font-size: 17px;
  }
`;
