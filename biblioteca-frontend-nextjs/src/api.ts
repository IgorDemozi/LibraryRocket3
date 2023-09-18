import axios from 'axios';
import Swal from 'sweetalert2';

import { Livro } from '@/types';

export const baseURL = 'http://localhost:3000/';

export const Api = axios.create({
  baseURL: baseURL,
});

Api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    if (config.headers) config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export const routerUrlObject = {
  pathname: '/',
  query: { auth: false },
};

export function showErrorMessage(errorMessage: string) {
  console.log(errorMessage);
  Swal.fire('Algo deu errado...', errorMessage, 'error');
}

export function getBook(
  id: number | string,
  setLivro: React.Dispatch<React.SetStateAction<Livro | undefined>>
) {
  Api.get(`books/${id}`)
    .then(resp => {
      setLivro(resp.data);
    })
    .catch(error => {
      if (error.response.data.auth === false) {
        // logout();
      } else {
        showErrorMessage(error.response.data.error);
      }
    });
}
