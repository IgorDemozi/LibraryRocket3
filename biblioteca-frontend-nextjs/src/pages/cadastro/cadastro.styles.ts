import { TextField } from '@mui/material';
import styled from 'styled-components';

export const CadastroContainer = styled.form`
   width: 52.5rem;
   margin-top: 12vh;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   gap: 1rem;

   @media screen and (max-width: 57.5rem) {
      width: 38.938rem;
      justify-content: center;
      margin-top: 6vh;
      padding-bottom: 1rem;
   }

   @media screen and (max-width: 45rem) {
      width: 31.25rem;
   }

   @media screen and (max-width: 38.125rem) {
      width: 18.75rem;
   }

   section {
      display: flex;
      gap: 1.4rem;

      @media screen and (max-width: 45rem) {
         flex-direction: column;
      }
   }

   #container1 {
      display: flex;
      flex-direction: column;
      width: 18.75rem;
      height: 12.875rem;
      gap: 1.4rem;
   }

   #container3 {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      margin-top: 1rem;
      gap: 1.4rem;

      #cadastro-botao-salvar {
         font: normal normal 600 1rem/1.125rem Roboto;
         width: 8.125rem;
         height: 3.125rem;
         text-transform: uppercase;
         border-radius: 0.25rem;
         border: none;
         cursor: pointer;
         background-color: #ffc501;
         color: black;
      }

      #cadastro-botao-cancelar {
         font: normal normal 600 1rem/1.125rem Roboto;
         width: 8.125rem;
         height: 3.125rem;
         text-transform: uppercase;
         border-radius: 0.25rem;
         border: none;
         cursor: pointer;
         box-shadow: 0 0 0 0.063rem #133052 inset;
         background-color: white;
         color: black;
      }

      @media screen and (max-width: 57.5rem) {
         align-self: center;
      }
   }
`;

export const InserirCapa = styled.label`
   display: flex;
   align-items: center;
   justify-content: center;
   border: 0.188rem dashed #ffc501;
   color: #ffc501;
   height: 12.5rem;
   width: 10.75rem;
   gap: 0.5rem;
   cursor: pointer;

   p {
      margin: 0;
      width: fit-content;
   }

   input {
      width: 0.063rem;
      height: 0.063rem;
      padding: 0;
      border: 0;
      opacity: 0;
      position: absolute;
   }

   #capaDoLivro {
      width: 100%;
      height: 100%;
   }
`;

export const TextfieldCadastro = styled(TextField)({
   '& label.Mui-focused': {
      color: 'black',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#133052',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'black',
      },
   },
});
