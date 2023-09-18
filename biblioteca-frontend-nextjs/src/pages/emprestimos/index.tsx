import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';

import TabelaInput from '@/components/Input/TabelaInput';
import VoltarParaHome from '@/components/VoltarParaHome';
import { RentHistory } from '@/types';
import { useRouter } from 'next/router';
import { Api, routerUrlObject, showErrorMessage } from '../../api';

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

const EmprestimosForm = () => {
  const [rentHistory, setRentHistory] = useState<RentHistory[]>([]);
  const [aluno, setAluno] = useState('');
  const [turma, setTurma] = useState('');
  const [titulo, setTitulo] = useState('');
  const [retirada, setRetirada] = useState('');
  const [entrega, setEntrega] = useState('');
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const asc = useRef(true);
  const identificador = useRef(0);
  const router = useRouter();

  useEffect(() => {
    Api.get('rentHistories')
      .then(res => {
        const data: RentHistory[] = res.data;
        setRentHistory(data);
      })
      .catch(error => {
        // if (error.response.data.auth === false) {
        //   if (error.response.data.auth === false) {
        //     localStorage.clear();
        //     router.push(routerUrlObject, '/');
        //   } else {
        //     showErrorMessage(error.response.data.error);
        //   }
        // } else {
        //   showErrorMessage(error.response.data.error);
        // }

        if (error.response.data.auth === false) {
          localStorage.clear();
          router.push(routerUrlObject, '/');
        } else {
          showErrorMessage(error.response.data.error);
        }
      });
  }, []);

  function ordenarLista(campo: string, id: number): void {
    if (id !== identificador.current) asc.current = true;
    let field = campo as keyof RentHistory;

    if (asc.current && (field === 'withdrawalDate' || field === 'deliveryDate')) {
      rentHistory.sort(function (a, b) {
        let anoMesDiaA = a[field]!.split('/').reverse().map(Number);
        let anoMesDiaB = b[field]!.split('/').reverse().map(Number);
        let dataA = new Date(anoMesDiaA[0], anoMesDiaA[1] - 1, anoMesDiaA[2]);
        let dataB = new Date(anoMesDiaB[0], anoMesDiaB[1] - 1, anoMesDiaB[2]);

        return dataA.valueOf() - dataB.valueOf();
      });
    } else if (field === 'withdrawalDate' || field === 'deliveryDate') {
      rentHistory.sort((b, a) => {
        let anoMesDiaA = a[field]!.split('/').reverse().map(Number);
        let anoMesDiaB = b[field]!.split('/').reverse().map(Number);
        let dataA = new Date(anoMesDiaA[0], anoMesDiaA[1] - 1, anoMesDiaA[2]);
        let dataB = new Date(anoMesDiaB[0], anoMesDiaB[1] - 1, anoMesDiaB[2]);

        return dataA.valueOf() - dataB.valueOf();
      });
    } else if (asc.current) {
      rentHistory.sort((a, b) => a[field]!.localeCompare(b[field]!));
    } else {
      rentHistory.sort((b, a) => a[field]!.localeCompare(b[field]!));
    }

    asc.current = !asc.current;
    identificador.current = id;
    forceUpdate();
  }

  return (
    <>
      <VoltarParaHome paginaAnterior="Home" paginaAtual="Empréstimos" irPara="/home" />

      <TableContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '0',
          boxShadow: '0',
          padding: '0 0 1.5rem 0',
        }}
        component={Paper}
      >
        <Table sx={{ margin: '1.5rem 1.5rem 0 1.5rem' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Aluno</StyledTableCell>
              <StyledTableCell>Turma</StyledTableCell>
              <StyledTableCell>Livro</StyledTableCell>
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
                  value={titulo}
                  onClick={() => {
                    ordenarLista('title', 3);
                  }}
                  onChange={(titulo: ChangeEvent<HTMLInputElement>) => setTitulo(titulo.target.value)}
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

            {rentHistory.length < 1 ? (
              <StyledTableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Nenhum empréstimo encontrado</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            ) : !rentHistory ? (
              <StyledTableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Carregando informações...</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            ) : (
              rentHistory.map((element, index) => {
                return (
                  <React.Fragment key={index}>
                    {element.studentName.toLowerCase().includes(aluno.toLowerCase()) &&
                    element.class.toLowerCase().includes(turma.toLowerCase()) &&
                    element.title!.toLowerCase().includes(titulo.toLowerCase()) &&
                    element.withdrawalDate.toLowerCase().includes(retirada.toLowerCase()) &&
                    element.deliveryDate.toLowerCase().includes(entrega.toLowerCase()) ? (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {element.studentName}
                        </StyledTableCell>
                        <StyledTableCell>{element.class}</StyledTableCell>
                        <StyledTableCell>{element.title}</StyledTableCell>
                        <StyledTableCell>{element.withdrawalDate}</StyledTableCell>
                        <StyledTableCell>{element.deliveryDate}</StyledTableCell>
                      </StyledTableRow>
                    ) : null}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmprestimosForm;
