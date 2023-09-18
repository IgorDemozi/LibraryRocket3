import { MouseEvent, useState } from 'react';

import { ModalProps } from '@/types';
import { ModalPrincipal } from './Modal.styles';
import ModalEmprestar from './ModalEmprestar';
import ModalHistorico from './ModalHistorico';
import ModalInativar from './ModalInativar';
import ModalLivro from './ModalLivro';

const Modal = ({ setModalAtivado, livroId }: ModalProps) => {
  const [modalLivroAtivado, setModalLivroAtivado] = useState(true);
  const [emprestarAtivado, setEmprestarAtivado] = useState(false);
  const [inativarAtivado, setInativarAtivado] = useState(false);
  const [historicoAtivado, setHistoricoAtivado] = useState(false);

  function clicarFora(event: MouseEvent) {
    if (event.target === event.currentTarget && setModalAtivado) {
      setModalAtivado(false);
    }
  }

  return (
    <ModalPrincipal onClick={clicarFora}>
      {modalLivroAtivado && (
        <ModalLivro
          livroId={livroId}
          setModalLivroAtivado={setModalLivroAtivado}
          setModalAtivado={setModalAtivado}
          setEmprestarAtivado={setEmprestarAtivado}
          setInativarAtivado={setInativarAtivado}
          setHistoricoAtivado={setHistoricoAtivado}
        />
      )}

      {emprestarAtivado && (
        <ModalEmprestar
          livroId={livroId}
          setEmprestarAtivado={setEmprestarAtivado}
          setModalLivroAtivado={setModalLivroAtivado}
        />
      )}

      {inativarAtivado && (
        <ModalInativar
          livroId={livroId}
          setInativarAtivado={setInativarAtivado}
          setModalLivroAtivado={setModalLivroAtivado}
        />
      )}

      {historicoAtivado && (
        <ModalHistorico
          livroId={livroId}
          setHistoricoAtivado={setHistoricoAtivado}
          setModalLivroAtivado={setModalLivroAtivado}
        />
      )}
    </ModalPrincipal>
  );
};

export default Modal;
