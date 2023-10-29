import styled from 'styled-components';

export const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  z-index: 75;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  overflow-y: auto;

  form {
    color: #283747;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    gap: 5px;
    width: 100%;
    padding: 10px;
  }

  label {
    margin-bottom: 0.5em;
    color: #283747;
    display: block;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  select {
    box-sizing: border-box;
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    width: 100%;
    margin-bottom: 1em;

    option {
      text-align: center;
      background-color: #ffffff;
      font-weight: bold;
    }
  }

  button {
    align-self: center;
    height: 45px;
    width: 80%;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: #032a4e;
    border-radius: 5px;
    margin: 15px 15px;
    padding: 5px;
    /* box-shadow: 1px 3px 7px gray; */

    &:hover {
      background: gray;
      color: #060b26;
    }
  }
`;

export const ModalClose = styled.div`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  z-index: 75;

  &:hover {
    color: #c2abe1;
  }
`;
