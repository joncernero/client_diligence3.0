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
    <div>
      <FlexRow>
        <h3>{props.DisplayedProperty.prop_name}</h3>
      </FlexRow>
      <InfoContainer>
        <TopRow>
          <div>
            <h4>Address:</h4>
            <div>
              <p>{props.DisplayedProperty.prop_streetaddress}</p>
              <Address2ndRow>
                <p>
                  {props.DisplayedProperty.prop_city},
                  {props.DisplayedProperty.prop_state}
                </p>
                <p>{props.DisplayedProperty.prop_zip}</p>
              </Address2ndRow>
            </div>
          </div>
          <Status>
            <h4>Status:</h4>
            <p>{props.DisplayedProperty.prop_status}</p>
          </Status>
        </TopRow>
        <BottomRow>
          <div>
            <h4>Project Manager:</h4>
            <p>{props.DisplayedProperty.prop_pm}</p>
          </div>
          <div>
            <h4>Created By:</h4>
            <p>{props.DisplayedProperty.prop_createdby}</p>
          </div>
        </BottomRow>
      </InfoContainer>
    </div>
  );
}

export default DisplayedProp;

export const InfoContainer = styled.div`
  color: #283747;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  height: 15vh;
  margin-bottom: 10px;

  h4 {
    margin-bottom: 5px;
  }
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Address2ndRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Status = styled.div`
  p {
    color: green;
  }
`;
