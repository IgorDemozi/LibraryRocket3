import styled from 'styled-components';

export const BibliotecaItem = styled.div`
  width: 12.5rem;
  height: 15rem;
  background-color: #e6e6e6;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  cursor: pointer;

  p {
    text-align: center;
    margin: 0.5rem 0 0 0;
    font: normal normal medium 1rem/1.313rem Roboto;
    color: #3e4756;
  }

  img {
    height: 11.25rem;
    width: 7.5rem;
  }
`;

export const BibliotecaItensContainer = styled.div`
  width: 84%;
  margin: 2em auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding-bottom: 1.5rem;

  #bibliotecaCarregandoInfo {
    font: normal normal 400 1rem Roboto;
  }

  @media screen and (min-width: 83.125rem) {
    width: 66.875rem;
  }
`;

export const PesquisaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 2rem;
  justify-content: center;
`;

export const PesquisaForm = styled.form`
  display: flex;
  align-items: center;
  border: 0.063rem solid #adb5bd;
  border-radius: 0.25rem;
  padding: 0.375rem 0.5rem 0.375rem 0.375rem;
  width: 41.625rem;
  height: 2.625rem;

  img {
    margin: 0.6rem 1rem;
  }

  #biblioteca-botao-pesquisar {
    background-color: #ffc501;
    width: 5.125rem;
    height: 2.313rem;
    font: normal normal 400 0.875rem Roboto;
    color: black;
    text-transform: none;
  }

  #pesquisaInput {
    border: none;
    flex-grow: 2;
    outline: none;
  }

  @media screen and (max-width: 48.75rem) {
    width: 80%;
  }
`;
