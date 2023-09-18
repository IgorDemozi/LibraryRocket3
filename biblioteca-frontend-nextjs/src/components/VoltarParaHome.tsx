import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import Seta from '@/assets/chevron_left_FILL0_wght400_GRAD0_opsz48.svg';

const LinkParaHome = styled(Link)`
  text-decoration: none;
  color: #6a7681;

  img {
    transform: translate(-2px, 2px);
  }
`;

const Container = styled.div`
  align-self: flex-start;
  padding: 1rem 0 0 1rem;
`;

interface VoltarParaHomeProps {
  paginaAnterior: string;
  paginaAtual: string;
  irPara: string;
}

const VoltarParaHome = (props: VoltarParaHomeProps) => {
  return (
    <Container>
      <LinkParaHome href={props.irPara}>
        <Image src={Seta} alt="voltar para a tela anterior" /> {props.paginaAnterior}
      </LinkParaHome>{' '}
      / <b>{props.paginaAtual}</b>
    </Container>
  );
};

export default VoltarParaHome;
