import { ModalProps } from '@/types';
import { styled } from 'styled-components';

export const InativadoInfoSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  h1 {
    text-align: left;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  p {
    margin-top: 0.3rem;
    font-size: 1rem;
    font-family: Roboto;
    color: #3e4756;
  }

  div {
    background-color: #e6e6e6;
    height: 5rem;
    padding: 1rem;
  }
`;

const InativadoInfo = ({ livro }: ModalProps) => {
  return (
    <InativadoInfoSection>
      <h1>Informações da inativação</h1>

      <div>
        <h2>Motivo</h2>
        <p>{livro!.statusDescription}</p>
      </div>
    </InativadoInfoSection>
  );
};

export default InativadoInfo;
