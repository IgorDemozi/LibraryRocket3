import { MenuItem } from '@mui/material';
import ButtonMUI from '@mui/material/Button';
import { isBefore } from 'date-fns';
import { useFormik } from 'formik';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import { Api, baseURL, routerUrlObject, showErrorMessage } from '@/api';
import IconeAdicionar from '@/assets/Caminho_261.svg';
import VoltarParaHome from '@/components/VoltarParaHome';
import { Livro } from '@/types';
import { CadastroContainer, InserirCapa, TextfieldCadastro } from './cadastro.styles';

const Cadastro = () => {
  const diaHoje = useRef(new Date());
  const [livro, setLivro] = useState<Livro>();
  const [arquivo, setArquivo] = useState<File>();
  const [generos, setGeneros] = useState<string[]>();
  const [imgNoInput, setImgNoInput] = useState(false);
  const [base64, setBase64] = useState<string>('');
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id) {
      Api.get(`/books/${router.query.id}`)
        .then(resp => {
          setLivro(resp.data);
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
  }, [router.query]);

  React.useEffect(() => {
    Api.get('/books/generos')
      .then(resp => {
        setGeneros(resp.data);
      })
      .catch(error => {
        if (error.response.data.auth === false) {
          localStorage.clear();
          router.push(routerUrlObject, '/');
        } else {
          showErrorMessage(error.response.data.error);
        }
      });

    let hoje = new Date();
    let dataHoje: string = hoje.getMonth() + 1 + '/' + hoje.getDate() + '/' + hoje.getFullYear();
    let dia = new Date(dataHoje);
    diaHoje.current = dia;

    if (livro) {
      setImgNoInput(true);
      setBase64(baseURL + 'upload/' + livro.image);

      formik.values.titulo = livro.title;
      formik.values.sinopse = livro.synopsis;
      formik.values.autor = livro.author;
      formik.values.genero = livro.genre;
      formik.values.data = moment(livro.systemEntryDate).format('YYYY-MM-DD');
    }
  }, [livro]);

  const validationSchema = yup.object({
    titulo: yup.string().required('Este campo é obrigatório'),
    sinopse: yup.string().required('Este campo é obrigatório'),
    autor: yup.string().required('Este campo é obrigatório'),
    genero: yup.string().required('Este campo é obrigatório'),
    data: yup.string().required('Este campo é obrigatório'),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      titulo: livro ? livro.title : '',
      sinopse: livro ? livro.synopsis : '',
      autor: livro ? livro.author : '',
      genero: livro ? livro.genre : '',
      data: livro ? moment(livro.systemEntryDate).format('YYYY-MM-DD') : '',
    },

    onSubmit: () => {
      salvar();

      if (livro) {
        router.push(
          {
            pathname: '/biblioteca',
            query: { id: livro.id },
          },
          'biblioteca'
        );
      } else {
        formik.resetForm();
        setBase64('');
      }
    },
  });

  function inputDateHandleChange(event: ChangeEvent<HTMLInputElement>) {
    let anoMesDia = event.target.value.split('-').map(Number);
    let dataSelecionada = new Date(anoMesDia[0], anoMesDia[1] - 1, anoMesDia[2]);

    if (isBefore(dataSelecionada, diaHoje.current)) {
      Swal.fire({
        title: 'A data escolhida já passou!',
        text: 'Não é possível escolher uma data anterior à data atual.',
        icon: 'warning',
        confirmButtonText: 'ok',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'sweet-alert-button-ok',
        },
      });
    } else {
      formik.handleChange(event);
    }
  }

  function pegarBase64(event: ChangeEvent<HTMLInputElement>) {
    return new Promise(() => {
      let leitor = new FileReader();

      if (event.target.files) {
        setArquivo(event.target.files[0]);
        leitor.readAsDataURL(event.target.files[0]);
        leitor.onloadend = () => {
          setBase64(leitor.result as string);
          setImgNoInput(true);
        };
      }
    });
  }

  function retornarParaBiblioteca() {
    if (livro) {
      Swal.fire({
        title: 'Tem certeza de que quer cancelar?',
        text: 'Você retornará à biblioteca.',
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
          router.push({
            pathname: '/biblioteca',
            query: { id: livro.id },
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Tem certeza de que quer cancelar?',
        text: 'Você retornará à página principal.',
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
          router.push('/home');
        }
      });
    }
  }

  function salvar() {
    const newInfo = {
      title: formik.values.titulo,
      author: formik.values.autor,
      genre: formik.values.genero,
      image: livro ? livro.image : '',
      systemEntryDate: formik.values.data,
      synopsis: formik.values.sinopse,
    };

    const formData = new FormData();
    formData.append('newInfo', JSON.stringify(newInfo));
    if (arquivo) {
      formData.append('image', arquivo);
    }

    if (livro) {
      Api.patch(`books/${livro.id}`, formData)
        .then(() => {
          setImgNoInput(false);
          Swal.fire('Informações salvas com sucesso!', '', 'success');
        })
        .catch(error => {
          if (error.response.data.auth === false) {
            localStorage.clear();
            router.push(routerUrlObject, '/');
          } else {
            showErrorMessage(error.response.data.error);
          }
        });
    } else {
      Api.post('books', formData)
        .then(() => {
          setImgNoInput(false);
          Swal.fire('Informações salvas com sucesso!', '', 'success');
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
  }

  return (
    <>
      {livro ? (
        <VoltarParaHome paginaAnterior="Biblioteca" paginaAtual="Editar livro" irPara="/biblioteca" />
      ) : (
        <VoltarParaHome paginaAnterior="Home" paginaAtual="Cadastro" irPara="/home" />
      )}

      <CadastroContainer onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <InserirCapa>
          {imgNoInput ? (
            <React.Fragment>
              <Image
                id="capaDoLivro"
                src={base64}
                alt="capa do livro"
                width={128} // se a largura for maior do que 128, a imagem nao aparece
                height={200}
              />
              <input type="file" onChange={pegarBase64} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input required type="file" onChange={pegarBase64} />
              <Image src={IconeAdicionar} alt="adicionar capa" />
              <p>Capa</p>
            </React.Fragment>
          )}
        </InserirCapa>

        <section>
          <div id="container1">
            <TextfieldCadastro
              type="text"
              name="titulo"
              label="Título"
              value={formik.values.titulo}
              onChange={formik.handleChange}
              inputProps={{
                style: {
                  height: '1.25rem',
                },
              }}
              error={formik.touched.titulo && Boolean(formik.errors.titulo)}
              helperText={formik.touched.titulo && formik.errors.titulo}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  transform: 'translate(-0.75rem, 3.1rem)',
                },
              }}
            />

            <TextfieldCadastro
              type="text"
              name="sinopse"
              label="Sinopse"
              value={formik.values.sinopse}
              onChange={formik.handleChange}
              multiline
              rows={4}
              inputProps={{
                style: {
                  height: '6.125rem',
                },
              }}
              error={formik.touched.sinopse && Boolean(formik.errors.sinopse)}
              helperText={formik.touched.sinopse && formik.errors.sinopse}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  transform: 'translate(-0.75rem, 8rem)',
                },
              }}
            />
          </div>

          <div id="container1">
            <TextfieldCadastro
              type="text"
              name="autor"
              label="Autor"
              value={formik.values.autor}
              onChange={formik.handleChange}
              error={formik.touched.autor && Boolean(formik.errors.autor)}
              helperText={formik.touched.autor && formik.errors.autor}
              inputProps={{
                style: {
                  height: '1.25rem',
                },
              }}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  transform: 'translate(-0.75rem, 3.1rem)',
                },
              }}
            />

            <TextfieldCadastro
              select
              name="genero"
              label="Gênero"
              value={formik.values.genero}
              onChange={formik.handleChange}
              error={formik.touched.genero && Boolean(formik.errors.genero)}
              helperText={formik.touched.genero && formik.errors.genero}
              sx={{
                '& .MuiInputBase-root': {
                  height: 53,
                },
              }}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  transform: 'translate(-0.75rem, 3.1rem)',
                },
              }}
            >
              <MenuItem value={''}>---</MenuItem>
              {generos &&
                generos.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextfieldCadastro>

            <TextfieldCadastro
              type="date"
              name="data"
              label="Data"
              inputProps={{
                style: {
                  height: '1.25rem',
                },
              }}
              InputLabelProps={{ shrink: true }}
              value={formik.values.data}
              onChange={inputDateHandleChange}
              error={formik.touched.data && Boolean(formik.errors.data)}
              helperText={formik.touched.data && formik.errors.data}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  transform: 'translate(-0.75rem, 3.1rem)',
                },
              }}
            />
          </div>
        </section>

        <div id="container3">
          <ButtonMUI id="cadastro-botao-salvar" type="submit">
            <span>salvar</span>
          </ButtonMUI>
          <ButtonMUI id="cadastro-botao-cancelar" onClick={retornarParaBiblioteca}>
            <span>cancelar</span>
          </ButtonMUI>
        </div>
      </CadastroContainer>
    </>
  );
};

export default Cadastro;
