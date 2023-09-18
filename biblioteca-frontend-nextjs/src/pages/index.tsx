import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import { Api, showErrorMessage } from '@/api';
import Logo from '@/assets/Logo.svg';
import { EsqueceuSenha, LoginContainer, LoginForm } from './login.styles';

const Login = () => {
  const router = useRouter();
  const [shrinkEmail, setShrinkEmail] = useState(false);
  const [shrinkSenha, setShrinkSenha] = useState(false);

  useEffect(() => {
    if (router.query.auth) {
      Swal.fire(
        'Não autorizado',
        'Você não tem autorização para realizar operações no sistema. Tente logar novamente.',
        'error'
      );
    }
  }, [router.query]);

  const validationSchema = yup.object({
    email: yup.string().email('Digite um email válido').required('Este campo é obrigatório'),
    password: yup
      .string()
      .min(8, 'A senha precisa ter, no mínimo, 8 caracteres')
      .required('Este campo é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: validationSchema,

    onSubmit: () => {
      Api.post('/', {
        email: formik.values.email,
        password: formik.values.password,
      })
        .then(resp => {
          if (resp.data.auth) {
            localStorage.setItem('user', formik.values.email);
            localStorage.setItem('token', resp.data.token);
            router.push('/home');
          }
          // else {
          //   Swal.fire('Algo deu errado...', resp.data.error, 'error');
          //   console.log(resp.data.error);
          // }
        })
        .catch(error => {
          // Swal.fire('Algo deu errado...', error.response.data.error, 'error');
          showErrorMessage(error.response.data.error);
        });
    },
  });

  return (
    <LoginContainer>
      <LoginForm name="LoginForm" onSubmit={formik.handleSubmit}>
        <Image id="Logotipo" src={Logo} alt="Logotipo da biblioteca" />

        <TextField
          type="email"
          name="email"
          id="loginEmail"
          label="Email"
          InputLabelProps={{
            shrink: shrinkEmail,
            className: shrinkEmail ? undefined : 'login-label',
          }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onFocus={() => {
            setShrinkEmail(true);
          }}
          onBlur={() => {
            if (formik.values.email.length === 0) setShrinkEmail(false);
          }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              transform: 'translate(-0.75rem, 3.7rem)',
            },
          }}
        />

        <TextField
          type="password"
          name="password"
          id="loginSenha"
          label="Senha"
          InputLabelProps={{
            shrink: shrinkSenha,
            className: shrinkSenha ? undefined : 'login-label',
          }}
          value={formik.values.password}
          onChange={formik.handleChange}
          onFocus={() => {
            setShrinkSenha(true);
          }}
          onBlur={() => {
            if (formik.values.password.length === 0) setShrinkSenha(false);
          }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              transform: 'translate(-0.75rem, 3.7rem)',
            },
          }}
        />

        <EsqueceuSenha href="/">Esqueci minha senha</EsqueceuSenha>

        <MuiButton id="loginBotao" type="submit">
          Entrar
        </MuiButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
