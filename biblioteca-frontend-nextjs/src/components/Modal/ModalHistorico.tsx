import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';

import Fechar from '@/assets/Caminho_265.svg';
import { ModalProps, RentHistory } from '@/types';
import Image from 'next/image';
import { Api, routerUrlObject, showErrorMessage } from '../../api';
import TabelaInput from '../Input/TabelaInput';
import { DivFechar, MenuHistorico } from './Modal.styles';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFC501',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,

    '&:nth-of-type(1)': {
      borderRadius: '0.25rem 0 0 0',
    },

    '&:last-of-type': {
      borderRadius: '0 0.25rem 0 0',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: '4.625rem',
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
    borderRadius: '0.25rem 0 0 0',
    boxShadow: '0',
  },
}));

const ModalHistorico = ({ livroId, setHistoricoAtivado, setModalLivroAtivado }: ModalProps) => {
  const [aluno, setAluno] = useState('');
  const [turma, setTurma] = useState('');
  const [retirada, setRetirada] = useState('');
  const [entrega, setEntrega] = useState('');
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const asc = useRef(true);
  const identificador = useRef(0);
  const [historico, setHistorico] = useState<RentHistory[]>([]);
  const router = useRouter();

  useEffect(() => {
    Api.get(`/renthistory/${livroId}`)
      .then(res => {
        setHistorico(res.data);
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

  function voltar() {
    if (setHistoricoAtivado && setModalLivroAtivado) {
      setHistoricoAtivado(false);
      setModalLivroAtivado(true);
    }
  }

  function ordenarLista(campo: string, id: number): void {
    if (id !== identificador.current) asc.current = true;
    let field = campo as keyof RentHistory;

    if (asc.current && (field === 'withdrawalDate' || field === 'deliveryDate')) {
      historico.sort(function (a, b) {
        let anoMesDiaA = a[field]!.split('/').reverse().map(Number);
        let anoMesDiaB = b[field]!.split('/').reverse().map(Number);
        let dataA = new Date(anoMesDiaA[0], anoMesDiaA[1] - 1, anoMesDiaA[2]);
        let dataB = new Date(anoMesDiaB[0], anoMesDiaB[1] - 1, anoMesDiaB[2]);

        return dataA.valueOf() - dataB.valueOf();
      });
    } else if (field === 'withdrawalDate' || field === 'deliveryDate') {
      historico.sort((b, a) => {
        let anoMesDiaA = a[field]!.split('/').reverse().map(Number);
        let anoMesDiaB = b[field]!.split('/').reverse().map(Number);
        let dataA = new Date(anoMesDiaA[0], anoMesDiaA[1] - 1, anoMesDiaA[2]);
        let dataB = new Date(anoMesDiaB[0], anoMesDiaB[1] - 1, anoMesDiaB[2]);

        return dataA.valueOf() - dataB.valueOf();
      });
    } else if (asc.current) {
      historico.sort(function (a, b) {
        if (a[field]! < b[field]!) {
          return -1;
        }
        if (a[field]! > b[field]!) {
          return 1;
        }
        return 0;
      });
    } else {
      historico.sort(function (b, a) {
        if (a[field]! < b[field]!) {
          return -1;
        }
        if (a[field]! > b[field]!) {
          return 1;
        }
        return 0;
      });
    }

    asc.current = !asc.current;
    identificador.current = id;
    forceUpdate();
  }

  return (
    <MenuHistorico>
      <DivFechar>
        <h1>Histórico de empréstimos do livro</h1>
        <Image onClick={voltar} src={Fechar} alt="Fechar" />
      </DivFechar>

      <TableContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '0',
          boxShadow: '0',
        }}
        component={Paper}
      >
        <Table sx={{ marginTop: '1.5rem' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Aluno</StyledTableCell>
              <StyledTableCell>Turma</StyledTableCell>
              <StyledTableCell>Data de retirada</StyledTableCell>
              <StyledTableCell>Data de entrega</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <TabelaInput
                  value={aluno}
                  onClick={() => {
                    ordenarLista('studentName', 1);
                  }}
                  onChange={(aluno: ChangeEvent<HTMLInputElement>) => setAluno(aluno.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TabelaInput
                  value={turma}
                  onClick={() => {
                    ordenarLista('class', 2);
                  }}
                  onChange={(turma: ChangeEvent<HTMLInputElement>) => setTurma(turma.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TabelaInput
                  value={retirada}
                  onClick={() => {
                    ordenarLista('withdrawalDate', 4);
                  }}
                  onChange={(retirada: ChangeEvent<HTMLInputElement>) =>
                    setRetirada(retirada.target.value)
                  }
                  maxLength={10}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TabelaInput
                  value={entrega}
                  onClick={() => {
                    ordenarLista('deliveryDate', 5);
                  }}
                  onChange={(entrega: ChangeEvent<HTMLInputElement>) => setEntrega(entrega.target.value)}
                  maxLength={10}
                />
              </StyledTableCell>
            </StyledTableRow>

            {historico &&
              historico.map((emprestimo, index) => {
                return (
                  <React.Fragment key={index}>
                    {emprestimo.studentName.toLowerCase().includes(aluno.toLowerCase()) &&
                    emprestimo.class.toLowerCase().includes(turma.toLowerCase()) &&
                    emprestimo.withdrawalDate.toLowerCase().includes(retirada.toLowerCase()) &&
                    emprestimo.deliveryDate.toLowerCase().includes(entrega.toLowerCase()) ? (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {emprestimo.studentName}
                        </StyledTableCell>
                        <StyledTableCell>{emprestimo.class}</StyledTableCell>
                        <StyledTableCell>{emprestimo.withdrawalDate}</StyledTableCell>
                        <StyledTableCell>{emprestimo.deliveryDate}</StyledTableCell>
                      </StyledTableRow>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </MenuHistorico>
  );
};

export default ModalHistorico;
