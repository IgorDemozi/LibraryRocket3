import styled from 'styled-components';

export const EmprestarInputsContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   gap: 1rem;
`

export const MenuEmprestar = styled.form`
   background-color: white;
   width: 40.625rem;
   display: flex;
   justify-content: flex-end;
   flex-wrap: wrap;
   padding: 2rem;
   gap: 2rem;

   input {
      width: 17.5rem;
      height: 3rem;
   }
`