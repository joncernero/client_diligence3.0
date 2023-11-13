import React, { PropsWithChildren, useState } from 'react';
import { Title } from '../Styles/Title';
import { FlexRow } from '../Styles/FlexRowDiv';
import { Property } from '../Types/Property';
import * as MdIcons from 'react-icons/md';
import styled from 'styled-components';

type Props = {
  DisplayedProperty: Property[] | any;
};

function DisplayedProp(props: Props) {
  return (
    <Container>
      <FlexRow>
        <h3>{props.DisplayedProperty.prop_name}</h3>
      </FlexRow>
      <PropertyInfo>
        <div className='one'>
          <h4>Address:</h4>
          <div>
            <p>{props.DisplayedProperty.prop_streetaddress}</p>
            <p>
              {props.DisplayedProperty.prop_city},
              {props.DisplayedProperty.prop_state}&nbsp;
              {props.DisplayedProperty.prop_zip}
            </p>
          </div>
        </div>
        <div className='four'>
          <h4>Status:</h4>
          <p>{props.DisplayedProperty.prop_status}</p>
        </div>
        <div className='three'>
          <h4>Project Manager:</h4>
          <p>{props.DisplayedProperty.prop_pm}&nbsp;&nbsp;</p>
        </div>
        <div className='two'>
          <h4>Created By:</h4>
          <p>{props.DisplayedProperty.prop_createdby}</p>
        </div>
      </PropertyInfo>
    </Container>
  );
}

export default DisplayedProp;

export const Container = styled.div`
  color: #283747;
`;

export const PropertyInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;

  .one,
  .two,
  .three,
  .four {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }

  .one,
  .three {
    justify-self: right;
  }

  .two,
  .four {
    justify-self: center;
  }

  .four {
    color: ;
  }

  .one {
    grid-area: 1 / 1 / 2 / 2;
  }

  .two {
    grid-area: 1 / 2 / 2 / 3;
  }

  .three {
    grid-area: 2 / 1 / 3 / 2;
  }

  .four {
    grid-area: 2 / 2 / 3 / 2;
  }
`;
