import React, { useRef, useEffect, useCallback } from "react";
// import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose} from "react-icons/md"


const Background = styled.div`
    width: 100%;
    height: 100%;
    background: #7393B3B3;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center; 
`
const ModalWrapper = styled.div`
    width: 800px;
    height: 600px;
    box-shadow: 0 5px 16px;
    background: #fff;
    color: #000;
    display: grid;
    // grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`
const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: #141414;

    p{
        margin-bottom: 1rem;
    }

    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`


export const Modal = ({showModal, setShowModal}) => {

    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target){
            setShowModal(false);
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal)
            setShowModal(false)
    }, [setShowModal, showModal])

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return() => document.removeEventListener('Keydown', keyPress)
    }, [keyPress])

    return(
        <>
            {showModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <ModalWrapper showModal={showModal}>
                        <ModalContent>
                            <h1>This is a Modal</h1>
                            <p>This button does nothing.</p>
                            <button>Does nothing</button>
                        </ModalContent>
                        <CloseModalButton aria-label="Close modal" onClick={() => setShowModal 
                        (prev => !prev)}/>
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    )
}