import styled from 'styled-components';

export const MenuHistorico = styled.section`
  background-color: white;
  width: fit-content;
  height: fit-content;
  padding: 2em;
`;

export const DivFechar = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: bold;
    font-size: 1.25rem;
    font-family: Roboto;
    color: #3e4756;
    margin: 0;
  }

  img {
    cursor: pointer;
  }
`;

export const ModalPrincipal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  z-index: 1000;
`;
