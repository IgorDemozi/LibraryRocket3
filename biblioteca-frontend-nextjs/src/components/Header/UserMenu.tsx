import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Image from 'next/image';
import { useRouter } from 'next/router';
import Seta from '../../assets/Arrow.svg';
import Avatar from '../../assets/person_black_24dp (1).svg';
import { routerUrlObject } from '@/api';

const UserMenuDiv = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  height: 3.125rem;
  gap: 0.25rem;
  cursor: pointer;
`;

const UserMenuSair = styled.div`
  background-color: #e6e6e6;
  border-radius: 0.25rem;
  width: 7.5rem;
  height: 3.125rem;
  font: normal normal normal 1.125rem/1.125rem Roboto;
  color: #2a2a2a;
  cursor: pointer;
  margin-right: 0.375;

  p {
    margin: 1rem 0 1rem 1rem;
  }
`;

const UserMenuSection = styled.section`
  display: flex;
  align-items: center;
`;

const UserMenu = () => {
  const [usuario, setUsuario] = useState('');
  const [ativado, setAtivado] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   Api.post('/auth', {
  //     token: localStorage.getItem('token'),
  //   })
  //     .then(() => {
  //       setUsuario(localStorage.getItem('atual-usuario')!);
  //     })
  //     .catch(err => {
  //       if (err.response.data.auth === false) {
  //         logout();
  //       } else {
  //         showErrorMessage(err.response.data);
  //       }
  //     });
  // }, []);

  function logout() {
    localStorage.clear();
    router.push('/');
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user === null || token === null) {
      localStorage.clear();
      router.push(routerUrlObject, '/');
    } else {
      if (user) setUsuario(user);
    }
  }, []);

  function exibirBotaoDeLogout() {
    if (ativado) {
      setAtivado(false);
    } else {
      setAtivado(true);
    }
  }

  return (
    <UserMenuSection>
      {ativado && (
        <UserMenuSair onClick={logout}>
          <p>Sair</p>
        </UserMenuSair>
      )}

      <UserMenuDiv onClick={exibirBotaoDeLogout}>
        <Image src={Avatar} alt="" />
        <p>{usuario}</p>
        <Image src={Seta} alt="" />
      </UserMenuDiv>
    </UserMenuSection>
  );
};

export default UserMenu;
