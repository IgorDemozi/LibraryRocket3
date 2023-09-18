import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import { Api, routerUrlObject, showErrorMessage } from '@/api';
import Fechar from '@/assets/Caminho_265.svg';
import { TextfieldCadastro } from '@/pages/cadastro/cadastro.styles';
import { ModalProps } from '@/types';
import Image from 'next/image';
import { styled } from 'styled-components';
import { DivFechar } from './Modal.styles';
import { BotaoOpcoesModal } from './ModalLivro.styles';

export const MenuInativar = styled.form`
  background-color: white;
  width: 36.25rem;
  height: 12.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  textarea {
    height: 6.25rem;
    border: 0.063rem solid #133052;
    border-radius: 0.25rem;
    padding: 0.8rem;
    resize: none;
    font: normal normal normal 1rem/1.313rem Roboto;
  }

  button {
    align-self: flex-end;
  }
`;

const ModalInativar = ({ livroId, setInativarAtivado, setModalLivroAtivado }: ModalProps) => {
  const router = useRouter();

  function voltar() {
    if (setInativarAtivado && setModalLivroAtivado) {
      setInativarAtivado(false);
      setModalLivroAtivado(true);
    }
  }

  function salvar() {
    const description = formik.values.motivo;

    Api.patch(`/biblioteca/desativar/${livroId}`, { description: description })
      .then(() => {
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

  const validationSchema = yup.object({
    motivo: yup
      .string()
      .min(10, 'O motivo precisa ter, no mínimo, 10 caracteres')
      .required('Este campo é obrigatório'),
  });

  const formik = useFormik({
    initialValues: { motivo: '' },
    validationSchema: validationSchema,
    onSubmit: () => {
      salvar();
      voltar();
    },
  });

  return (
    <MenuInativar onSubmit={formik.handleSubmit}>
      <DivFechar>
        <h1>Inativar livro</h1>
        <Image onClick={voltar} src={Fechar} alt="Fechar" />
      </DivFechar>

      <TextfieldCadastro
        type="text"
        name="motivo"
        label="Motivo"
        value={formik.values.motivo}
        onChange={formik.handleChange}
        multiline
        rows={3}
        inputProps={{
          style: {
            height: '100%',
            border: 'none',
            padding: 0,
          },
        }}
        FormHelperTextProps={{
          style: {
            position: 'absolute',
            transform: 'translate(-0.75rem, 6rem)',
          },
        }}
        error={formik.touched.motivo && Boolean(formik.errors.motivo)}
        helperText={formik.touched.motivo && formik.errors.motivo}
      />

      <BotaoOpcoesModal
        type="submit"
        id="inativar"
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
    </MenuInativar>
  );
};

export default ModalInativar;
