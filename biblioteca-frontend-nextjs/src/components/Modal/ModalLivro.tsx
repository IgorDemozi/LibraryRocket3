import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { Api, baseURL, getBook, routerUrlObject, showErrorMessage } from '@/api';
import Fechar from '@/assets/Caminho_265.svg';
import { Livro, ModalProps } from '@/types';
import EmprestadoInfo from './EmprestadoInfo';
import InativadoInfo from './InativadoInfo';
import {
  BotaoDevolver,
  BotaoEmprestar,
  BotaoOpcoesModal,
  BotoesSection,
  CapaBotaoSection,
  DivFecharSimples,
  InfoBtSection,
  Informacoes,
  MenuLivro,
  SinopseFormatada,
} from './ModalLivro.styles';

const ModalLivro = ({
  livroId,
  setModalAtivado,
  setEmprestarAtivado,
  setModalLivroAtivado,
  setInativarAtivado,
  setHistoricoAtivado,
}: ModalProps) => {
  const router = useRouter();
  const [livro, setLivro] = useState<Livro>();

  useEffect(() => {
    if (livroId) {
      getBook(livroId, setLivro);
    }
  }, []);

  function abrirEmprestar() {
    if (setModalLivroAtivado && setEmprestarAtivado) {
      setModalLivroAtivado(false);
      setEmprestarAtivado(true);
    }
  }

  function abrirInativar() {
    if (setModalLivroAtivado && setInativarAtivado) {
      setModalLivroAtivado(false);
      setInativarAtivado(true);
    }
  }

  function abrirHistorico() {
    if (setModalLivroAtivado && setHistoricoAtivado) {
      setModalLivroAtivado(false);
      setHistoricoAtivado(true);
    }
  }

  function irParaEdicaoDoLivro() {
    router.push(
      {
        pathname: '/cadastro',
        query: { id: livroId },
      },
      'cadastro'
    );
  }

  function devolverLivro() {
    Swal.fire({
      title: 'Confirmar devolução?',
      showCancelButton: true,
      confirmButtonText: 'ok',
      cancelButtonText: 'sair',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'sweet-alert-button-ok',
        cancelButton: 'sweet-alert-button-cancelar',
      },
    }).then(result => {
      if (result.isConfirmed) {
        Api.patch(`/biblioteca/devolver/${livroId}`)
          .then(() => {
            if (livroId) {
              getBook(livroId, setLivro);
            }

            Swal.fire({
              title: 'Informações salvas com sucesso!',
              icon: 'success',
              confirmButtonText: 'ok',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'sweet-alert-button-ok',
              },
            });
          })
          .catch(error => {
            if (error.response.data.auth === false) {
              localStorage.clear();
              router.push(routerUrlObject, '/');
            } else {
              showErrorMessage(error.response.data.error);
            }
          });
      }
    });
  }

  function ativarLivro() {
    Swal.fire({
      title: 'Confirmar ativação?',
      showCancelButton: true,
      confirmButtonText: 'ok',
      cancelButtonText: 'sair',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'sweet-alert-button-ok',
        cancelButton: 'sweet-alert-button-cancelar',
      },
    }).then(result => {
      if (result.isConfirmed) {
        Api.patch(`/biblioteca/ativar/${livroId}`)
          .then(() => {
            if (livroId) {
              getBook(livroId, setLivro);
            }

            Swal.fire({
              title: 'Informações salvas com sucesso!',
              icon: 'success',
              confirmButtonText: 'ok',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'sweet-alert-button-ok',
              },
            });
          })
          .catch(error => {
            if (error.response.data.auth === false) {
              localStorage.clear();
              router.push(routerUrlObject, '/');
            } else {
              showErrorMessage(error.response.data.error);
            }
          });
      }
    });
  }

  return (
    <MenuLivro>
      <DivFecharSimples>
        <Image
          onClick={() => {
            if (setModalAtivado) setModalAtivado(false);
          }}
          src={Fechar}
          alt="Fechar"
        />
      </DivFecharSimples>

      <CapaBotaoSection>
        {livro && (
          <Image
            src={baseURL + 'upload/' + livro.image}
            alt={`Capa de ${livro.title}`}
            width={244} // se a largura for maior do que 128, a imagem nao aparece
            height={350}
          />
        )}
        {livro && livro.isRented ? (
          <BotaoDevolver onClick={devolverLivro}>Devolver</BotaoDevolver>
        ) : (
          <React.Fragment>
            {livro && livro.isActive ? (
              <BotaoEmprestar onClick={abrirEmprestar}>Emprestar</BotaoEmprestar>
            ) : (
              <React.Fragment>
                {livro && <BotaoEmprestar disabled={true}>Emprestar</BotaoEmprestar>}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </CapaBotaoSection>

      <InfoBtSection>
        <Informacoes>
          {livro && (
            <React.Fragment>
              <h1>{livro.title}</h1>

              <div>
                <h2>Sinopse</h2>
                <SinopseFormatada>{livro.synopsis}</SinopseFormatada>
              </div>

              <div>
                <h2>Autor</h2>
                <p>{livro.author}</p>
              </div>

              <div>
                <h2>Gênero</h2>
                <p>{livro.genre}</p>
              </div>

              <div>
                <h2>Data de entrada</h2>
                <p>{moment(livro.systemEntryDate).format('DD/MM/YYYY')}</p>
              </div>
            </React.Fragment>
          )}
        </Informacoes>

        <BotoesSection>
          <BotaoOpcoesModal
            sx={{
              border: '0.063rem solid #167CE2',
              color: '#167CE2',
            }}
            onClick={irParaEdicaoDoLivro}
          >
            Editar
          </BotaoOpcoesModal>

          {livro && livro.isActive ? (
            <BotaoOpcoesModal
              onClick={abrirInativar}
              sx={{
                border: '0.063rem solid #ED5E5E',
                color: '#ED5E5E',
                '&:hover': {
                  backgroundColor: '#ffeeee',
                },
              }}
            >
              Inativar
            </BotaoOpcoesModal>
          ) : (
            <BotaoOpcoesModal
              onClick={ativarLivro}
              sx={{
                border: '0.063rem solid #49D749',
                color: '#49D749',
              }}
            >
              Ativar
            </BotaoOpcoesModal>
          )}

          <BotaoOpcoesModal
            onClick={abrirHistorico}
            sx={{
              border: '0.063rem solid #ADB5BD',
              color: 'black',
              '&:hover': {
                backgroundColor: '#eeeeee',
              },
            }}
          >
            Histórico
          </BotaoOpcoesModal>
        </BotoesSection>
      </InfoBtSection>

      {livro && livro.isRented && livroId && <EmprestadoInfo livroId={livroId} />}
      {livro && livro.isActive === false && <InativadoInfo livro={livro} />}
    </MenuLivro>
  );
};

export default ModalLivro;
