import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { styled } from 'styled-components';

import Header from '@/components/Header/Header';
import '@/styles/globals.css';

const MainContainer = styled.div`
  background-color: #e6e6e6;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContainerGeral = styled.div`
  background-color: white;
  margin: 1.5rem;
  min-height: calc(100vh - 9rem);
  max-height: fit-content;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <MainContainer>
      {router.pathname !== '/' && <Header />}

      {router.pathname === '/' ? (
        <>
          <NextNProgress />
          <Component {...pageProps} />
        </>
      ) : (
        <ContainerGeral>
          <NextNProgress />
          <Component {...pageProps} />
        </ContainerGeral>
      )}
    </MainContainer>
  );
}
