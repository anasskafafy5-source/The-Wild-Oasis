import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import useOutSideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// [1]. create the context
const ModalContext = createContext();

//[2]. the parent component
function Modal({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const close = () => setIsOpen("");
  const open = setIsOpen;

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

// [3]. child component
function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { isOpen: openWindow, close } = useContext(ModalContext);

  const { ref } = useOutSideClick({ close });

  if (openWindow !== name) return null;
  // to change the position of this compoent in the dom tree
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <IoClose />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

//[4]. add child component as propertie
Modal.Window = Window;
Modal.Open = Open;

export default Modal;
