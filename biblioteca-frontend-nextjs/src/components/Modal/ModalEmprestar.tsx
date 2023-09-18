import { isBefore } from 'date-fns';
import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import Fechar from '@/assets/Caminho_265.svg';
import { TextfieldCadastro } from '@/pages/cadastro/cadastro.styles';
import { ModalProps, RentHistory } from '@/types';
import { Api, routerUrlObject, showErrorMessage } from '../../api';
import { DivFechar } from './Modal.styles';
import { EmprestarInputsContainer, MenuEmprestar } from './ModalEmprestar.styles';
import { BotaoEmprestar } from './ModalLivro.styles';
import Image from 'next/image';

const ModalEmprestar = ({ livroId, setEmprestarAtivado, setModalLivroAtivado }: ModalProps) => {
  const [shrinkAluno, setShrinkAluno] = useState(false);
  const [shrinkTurma, setShrinkTurma] = useState(false);
  const diaHoje = useRef(new Date());
  const router = useRouter();

  useEffect(() => {
    let hoje = new Date();
    let dataHoje: string = hoje.getMonth() + 1 + '/' + hoje.getDate() + '/' + hoje.getFullYear();
    let dia = new Date(dataHoje);
    diaHoje.current = dia;
  }, []);

  function inputDateHandleChange(event: ChangeEvent<HTMLInputElement>) {
    let anoMesDia = event.target.value.split('-').map(Number);
    let dataSelecionada = new Date(anoMesDia[0], anoMesDia[1] - 1, anoMesDia[2]);

    if (isBefore(dataSelecionada, diaHoje.current)) {
      Swal.fire('A data escolhida já passou!', '', 'warning');
    } else {
      formik.handleChange(event);
    }
  }

  const validationSchema = yup.object({
    aluno: yup.string().required('Este campo é obrigatório'),
    turma: yup.string().required('Este campo é obrigatório'),
    retirada: yup.string().required('Este campo é obrigatório'),
    devolucao: yup.string().required('Este campo é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      aluno: '',
      turma: '',
      retirada: '',
      devolucao: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      salvar();
      voltar();
    },
  });

  function voltar() {
    if (setEmprestarAtivado && setModalLivroAtivado) {
      setEmprestarAtivado(false);
      setModalLivroAtivado(true);
    }
  }

  function salvar() {
    let historicoDeEmprestimos: RentHistory = {
      studentName: formik.values.aluno,
      class: formik.values.turma,
      withdrawalDate: formik.values.retirada,
      deliveryDate: formik.values.devolucao,
    };

    Api.patch(`/biblioteca/emprestar/${livroId}`, historicoDeEmprestimos)
      .then(() => {
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

  return (
    <MenuEmprestar onSubmit={formik.handleSubmit}>
      <DivFechar>
        <h1>Informe os dados do aluno antes de continuar</h1>
        <Image onClick={voltar} src={Fechar} alt="Fechar" />
      </DivFechar>

      <EmprestarInputsContainer>
        <TextfieldCadastro
          type="text"
          name="aluno"
          label="Nome do aluno"
          inputProps={{
            style: {
              height: '1rem',
              width: 285,
            },
          }}
          InputLabelProps={{
            shrink: shrinkAluno,
            style: shrinkAluno ? undefined : { transform: 'translate(1rem, 0.75rem)' },
          }}
          onFocus={() => {
            setShrinkAluno(true);
          }}
          onBlur={() => {
            if (formik.values.aluno.length === 0) setShrinkAluno(false);
          }}
          value={formik.values.aluno}
          onChange={formik.handleChange}
          error={formik.touched.aluno && Boolean(formik.errors.aluno)}
          helperText={formik.touched.aluno && formik.errors.aluno}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              transform: 'translate(9.6rem, 2.8rem)',
            },
          }}
        />

        <TextfieldCadastro
          type="text"
          name="turma"
          label="Turma"
          inputProps={{
            style: {
              height: '1rem',
              width: 285,
            },
          }}
          InputLabelProps={{
            shrink: shrinkTurma,
            style: shrinkTurma ? undefined : { transform: 'translate(1rem, 0.75rem)' },
          }}
          onFocus={() => {
            setShrinkTurma(true);
          }}
          onBlur={() => {
            if (formik.values.turma.length === 0) setShrinkTurma(false);
          }}
          value={formik.values.turma}
          onChange={formik.handleChange}
          error={formik.touched.turma && Boolean(formik.errors.turma)}
          helperText={formik.touched.turma && formik.errors.turma}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              transform: 'translate(9.6rem, 2.8rem)',
            },
          }}
        />

        <TextfieldCadastro
          type="date"
          name="retirada"
          label="Data de retirada"
          inputProps={{
            style: {
              height: '1rem',
              width: 285,
            },
          }}
          InputLabelProps={{ shrink: true }}
          value={formik.values.retirada}
          onChange={inputDateHandleChange}
          error={formik.touched.retirada && Boolean(formik.errors.retirada)}
          helperText={formik.touched.retirada && formik.errors.retirada}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              transform: 'translate(9.6rem, 2.8rem)',
            },
          }}
        />

        <TextfieldCadastro
          type="date"
          name="devolucao"
          label="Data de devolução"
          inputProps={{
            style: {
              height: '1rem',
              width: 285,
            },
          }}
          InputLabelProps={{ shrink: true }}
          value={formik.values.devolucao}
          onChange={inputDateHandleChange}
          error={formik.touched.devolucao && Boolean(formik.errors.devolucao)}
          helperText={formik.touched.devolucao && formik.errors.devolucao}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              transform: 'translate(9.6rem, 2.8rem)',
            },
          }}
        />
      </EmprestarInputsContainer>

      <BotaoEmprestar type="submit">Emprestar</BotaoEmprestar>
    </MenuEmprestar>
  );
};

export default ModalEmprestar;
