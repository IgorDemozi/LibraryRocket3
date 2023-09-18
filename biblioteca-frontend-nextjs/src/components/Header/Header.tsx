import UserMenu from './UserMenu';
import Logo from '../../assets/Logo.svg';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Cabecalho = styled.header`
  background-color: white;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const Header = () => {
  return (
    <Cabecalho data-testid={'Header'}>
      <Link href="/home">
        <Image src={Logo} alt="Logotipo da biblioteca" />
      </Link>
      <UserMenu />
    </Cabecalho>
  );
};

export default Header;
