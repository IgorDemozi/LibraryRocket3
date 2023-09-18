import styled from 'styled-components';

import Filtro from '@/assets/Caminho_147.svg';
import { InputProps } from '@/types';
import Image from 'next/image';

const BotaoOrdenar = styled(Image)`
  position: absolute;
  z-index: 100;
  cursor: pointer;
`;

const DivInputTabela = styled.div`
  .tabelaInput {
    border: none;
    border-bottom: 0.125rem solid black;
    width: 75%;
    padding-left: 2rem;
    transform: translateX(-0.2rem);
    outline: none;
  }
`;

const TabelaInput = ({ value, onChange, onClick, maxLength }: InputProps) => {
  return (
    <DivInputTabela>
      <BotaoOrdenar src={Filtro} onClick={onClick} alt="" />
      <input
        className="tabelaInput"
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </DivInputTabela>
  );
};

export default TabelaInput;
