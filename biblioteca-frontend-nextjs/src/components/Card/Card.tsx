import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import CardMUI from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardLink = styled(Link)`
  text-decoration: none;

  p {
    margin: 0;
    padding: 1rem;
    height: 2rem;
    line-height: 2rem;
    color: #343a40;
    text-decoration: 'none';
    text-align: center;
    font-family: 'Roboto', sans-serif;
  }

  #div-do-paragrafo {
    padding: 0;
    margin-bottom: 0.25rem;
  }
`;

export interface CardInterface {
  txt: string;
  rota: string;
  alt: string;
  imagem: string;
}

const Card = ({ txt, rota, alt, imagem }: CardInterface) => {
  return (
    <CardLink href={rota}>
      <CardMUI
        sx={{
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#e6e6e6',
          '&:hover': {
            backgroundColor: '#FFC501',
          },
        }}
      >
        <CardContent
          component="div"
          sx={{
            height: '7.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src={imagem} alt={alt} />
        </CardContent>

        <CardContent
          component="div"
          id="div-do-paragrafo"
          sx={{
            backgroundColor: 'white',
            width: 240,
          }}
        >
          <p>{txt}</p>
        </CardContent>
      </CardMUI>
    </CardLink>
  );
};

export default Card;
