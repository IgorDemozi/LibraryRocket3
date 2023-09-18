import IconeEmprestar from '@/assets/auto_stories_FILL0_wght400_GRAD0_opsz48_1.svg';
import { Button as ButtonMUI } from '@mui/material';
import styled from 'styled-components';

export const BotaoOpcoesModal = styled(ButtonMUI)`
  && {
    padding: 1rem;
    border-radius: 0.25rem;
    background-color: white;
    font-weight: bold;
    text-transform: none;
    line-height: 1rem;
  }
`;

export const BotaoEmprestar = styled(ButtonMUI)`
  && {
    background-color: #ffc501;
    color: black;
    font-size: 0.875rem;
    font-family: Roboto;
    text-transform: none;
    text-align: center;
    height: 3rem;
    width: 15.25rem;
    border: 0.063rem solid #adb5bd;
    border-radius: 0.25rem;
    background-image: url(${IconeEmprestar.src});
    background-repeat: no-repeat;
    background-position: 32% 44%;
    background-size: 1.3rem;
    padding-left: 2.5rem;
    font-weight: bold;
    cursor: pointer;

    :disabled {
      background-color: #f3e0a0;
    }

    :hover {
      background-color: #ffc501;
    }
  }
`;

export const BotaoDevolver = styled(ButtonMUI)`
  && {
    background-color: #e6e6e6;
    color: black;
    font-size: 0.875rem;
    font-family: Roboto;
    text-transform: none;
    height: 3rem;
    width: 15.25rem;
    border: 0.063rem solid #adb5bd;
    border-radius: 0.25rem;
    background-image: url(${IconeEmprestar.src});
    background-repeat: no-repeat;
    background-position: 34% 44%;
    background-size: 1.3rem;
    padding-left: 2rem;
    font-weight: bold;
    cursor: pointer;

    :hover {
      background-color: #e6e6e6;
    }
  }
`;

export const DivFecharSimples = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img {
    cursor: pointer;
  }
`;

export const SinopseFormatada = styled.p`
  height: 3.575rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  overflow-y: hidden;
`;

export const BotoesSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
`;

export const CapaBotaoSection = styled.section`
  /* width: 25rem; */
  width: 15.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  img {
    width: 15.25rem;
    height: 21.875rem;

    /* border: solid 1px red; */
  }
`;

export const MenuLivro = styled.section`
  background-color: white;
  width: 43.75rem;
  height: fit-content;
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.8rem;

  @media screen and (max-width: 45.625rem) {
    transform: scale(0.6);
    justify-content: center;
  }
`;

export const Informacoes = styled.section`
  width: 25rem;
  height: 21.875rem;

  h1 {
    margin: 0 0 1rem 0;
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
    font-family: Roboto;
    color: #3e4756;
  }

  h2 {
    margin: 0;
    font-weight: bold;
    font-size: 1rem;
    font-family: Roboto;
    color: #3e4756;
  }

  p {
    margin: 0.5em 0 1.5em 0;
    color: #3e4756;
  }
`;

export const InfoBtSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
