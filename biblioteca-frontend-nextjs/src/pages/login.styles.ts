import Link from 'next/link';
import styled from 'styled-components';

import Background from '@/assets/emil-widlund-xrbbXIXAWY0-unsplash.png';
import IconeEmail from '@/assets/Grupo_37.svg';
import IconeSenha from '@/assets/Grupo_36.svg';

export const EsqueceuSenha = styled(Link)`
  color: black;
  font: normal normal bold 0.875rem/1.188rem Roboto;
`;

export const LoginContainer = styled.section`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${Background.src});
  background-position-y: 65%;
  height: 100vh;
`;

export const LoginForm = styled.form`
  margin: 0;
  background-color: white;
  width: 23.125rem;
  height: 24.063rem;
  border-radius: 0.25rem;
  margin: 12vh 0;
  padding: 2.5rem;
  box-shadow: 0 0 0 62.5rem rgba(60, 60, 60, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  #loginEmail {
    background-color: #e3e5e7;
    padding: 1.5em;
    border-radius: 0.25rem;
    font: 0.875rem Roboto;
    background-image: url(${IconeEmail});
    background-repeat: no-repeat;
    background-position: 94%;
  }

  #loginSenha {
    background-color: #e3e5e7;
    padding: 1.5em;
    border-radius: 0.25rem;
    font: 0.875rem Roboto;
    background-image: url(${IconeSenha});
    background-repeat: no-repeat;
    background-position: 94%;
  }

  .login-label {
    transform: translate(1.25rem, 1.25rem);
  }

  #loginBotao {
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    border: 0;
    background-color: #ffc501;
    color: black;
    text-transform: uppercase;
    font: normal normal bold 1rem/1.313rem Roboto;
    cursor: pointer;
  }

  #Logotipo {
    margin: 0 auto 2rem auto;
    transform: scale(1.3);
  }
`;
