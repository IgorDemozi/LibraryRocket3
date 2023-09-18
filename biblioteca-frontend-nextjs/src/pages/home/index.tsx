import { styled } from 'styled-components';

import ImgCadastro from '@/assets/add_circle_FILL0_wght400_GRAD0_opsz48.svg';
import ImgBiblioteca from '@/assets/import_contacts_FILL0_wght400_GRAD0_opsz48 (1).svg';
import ImgEmprestimos from '@/assets/pending_actions_FILL0_wght400_GRAD0_opsz48.svg';
import Card from '@/components/Card/Card';

const HomeDiv = styled.div`
  min-height: 77vh;
  max-height: fit-content;
  display: flex;
  align-items: center;

  @media screen and (max-width: 57.5rem) {
    padding: 1rem 0;
  }
`;

const CardsDiv = styled.div`
  max-width: 51.25rem;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 57.5rem) {
    flex-direction: column;
  }
`;

const Home = () => {
  return (
    <HomeDiv>
      <CardsDiv>
        <Card txt="Cadastrar novo Livro" rota="/cadastro" alt="cadastro" imagem={ImgCadastro} />
        <Card txt="Biblioteca" rota="/biblioteca" alt="biblioteca" imagem={ImgBiblioteca} />
        <Card
          txt="Histórico de Empréstimos"
          rota="/emprestimos"
          alt="emprestimos"
          imagem={ImgEmprestimos}
        />
      </CardsDiv>
    </HomeDiv>
  );
};

export default Home;
