import { Button, MenuItem, TextField } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

import { Api, baseURL, routerUrlObject, showErrorMessage } from '@/api';
import Lupa from '@/assets/Caminho_263.svg';
import Modal from '@/components/Modal/Modal';
import VoltarParaHome from '@/components/VoltarParaHome';
import { Livro } from '@/types';
import {
  BibliotecaItem,
  BibliotecaItensContainer,
  PesquisaContainer,
  PesquisaForm,
} from './biblioteca.styles';

const Biblioteca = () => {
  const router = useRouter();
  const options = ['Título', 'Gênero', 'Autor', 'Data de entrada'];
  const [books, setBooks] = useState<Livro[]>();
  const [livroId, setLivroId] = useState<number | string>();
  const [opcao, setOpcao] = useState('');
  const [filtro, setFiltro] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [texto, setTexto] = useState('');
  const [modalAtivado, setModalAtivado] = useState(false);

  useEffect(() => {
    Api.get('books')
      .then(resp => {
        setBooks(resp.data);
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

  useEffect(() => {
    if (
      router.query.id &&
      (typeof router.query.id === 'number' || typeof router.query.id === 'string')
    ) {
      setLivroId(router.query.id);
      setModalAtivado(true);
    }
  }, [router.query]);

  function abrirModal(livroId: number | string | undefined) {
    setLivroId(livroId);
    setModalAtivado(true);
  }

  function pesquisar(event: any) {
    event.preventDefault();
    setFiltro(opcao);
    setPesquisa(texto);
  }

  function criarElementoLivro(livro: Livro) {
    return (
      <BibliotecaItem
        onClick={() => {
          abrirModal(livro.id);
        }}
        key={livro.id}
      >
        <Image
          src={baseURL + 'upload/' + livro.image}
          alt={`Capa do livro ${livro.title}`}
          width={120}
          height={180}
        />
        <p>{livro.title}</p>
      </BibliotecaItem>
    );
  }

  return (
    <>
      <VoltarParaHome paginaAnterior="Home" paginaAtual="Biblioteca" irPara="/home" />

      <PesquisaContainer>
        <PesquisaForm onSubmit={pesquisar}>
          <Image src={Lupa} alt="" />
          <input
            id="pesquisaInput"
            value={texto}
            onChange={(texto: ChangeEvent<HTMLInputElement>) => setTexto(texto.target.value)}
            placeholder="Pesquisar livro..."
          />
          <Button onClick={pesquisar} id="biblioteca-botao-pesquisar">
            Buscar
          </Button>
        </PesquisaForm>

        <TextField
          select
          label="Buscar por:"
          value={opcao}
          onChange={opcao => setOpcao(opcao.target.value)}
          sx={{
            '& .MuiInputBase-root': {
              width: 200,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ADB5BD',
              },
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </PesquisaContainer>

      <BibliotecaItensContainer>
        {modalAtivado && <Modal setModalAtivado={setModalAtivado} livroId={livroId} />}
        {!books ? (
          <p id="bibliotecaCarregandoInfo">Carregando informações...</p>
        ) : (
          books.map(livro => {
            switch (filtro) {
              case '':
                if (livro.title.toLowerCase().includes(pesquisa.toLowerCase())) {
                  return criarElementoLivro(livro);
                }
                break;
              case 'Título':
                if (livro.title.toLowerCase().includes(pesquisa.toLowerCase())) {
                  return criarElementoLivro(livro);
                }
                break;
              case 'Gênero':
                if (livro.genre.toLowerCase().includes(pesquisa.toLowerCase())) {
                  return criarElementoLivro(livro);
                }
                break;
              case 'Autor':
                if (livro.author.toLowerCase().includes(pesquisa.toLowerCase())) {
                  return criarElementoLivro(livro);
                }
                break;
              case 'Data de entrada':
                const dataString = moment(livro.systemEntryDate).format('DD/MM/YYYY');
                if (dataString.includes(pesquisa)) {
                  return criarElementoLivro(livro);
                }
                break;
            }
            return null;
          })
        )}
      </BibliotecaItensContainer>
    </>
  );
};

export default Biblioteca;
