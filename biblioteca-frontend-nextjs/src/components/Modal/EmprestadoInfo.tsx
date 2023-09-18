import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Api, routerUrlObject, showErrorMessage } from '@/api';
import { RentHistory } from '@/types';
import { styled } from 'styled-components';

export const EmprestadoInfoSection = styled.section`
  width: 100%;

  #container {
    background-color: #e6e6e6;
    height: fit-content;
    width: 41.875rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    text-align: left;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1rem;
  }

  p {
    margin-top: 0.3rem;
    font-size: 1rem;
    font-family: Roboto;
    color: #3e4756;
  }
`;

const EmprestadoInfo = ({ livroId }: { livroId: string | number }) => {
  const [historico, setHistorico] = useState<RentHistory>();
  const router = useRouter();

  useEffect(() => {
    Api.get(`/renthistory/${livroId}`)
      .then(res => {
        const data = res.data;
        setHistorico(res.data[data.length - 1]);
      })
      .catch(error => {
        if (error.response.data.auth === false) {
          localStorage.clear();
          router.push(routerUrlObject, '/');
        } else {
          showErrorMessage(error.response.data.error);
        }
      });
  }, []);

  return (
    <EmprestadoInfoSection>
      <h1>Dados do aluno</h1>

      {historico && (
        <div id="container">
          <div>
            <h2>Nome do aluno</h2>
            <p>{historico.studentName}</p>
          </div>

          <div>
            <h2>Turma</h2>
            <p>{historico.class}</p>
          </div>

          <div>
            <h2>Data da retirada</h2>
            <p>{historico.withdrawalDate}</p>
          </div>

          <div>
            <h2>Data de devolução</h2>
            <p>{historico.deliveryDate}</p>
          </div>
        </div>
      )}
    </EmprestadoInfoSection>
  );
};

export default EmprestadoInfo;
