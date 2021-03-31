import React, { Children, useEffect } from 'react'
import { ModalContainer, ModalContent, ModalWrapper } from './ModalElements'

const Modal = ({children, exit}: any) => {

    useEffect(() => {
        const modalListener = (e: any) => {
            // console.log(e.key)
            if(e.key === 'Escape'){
                exit()
            }
        }
        document.addEventListener('keydown', e => modalListener(e))

        return () => {
            document.removeEventListener('keydown',e => modalListener(e))
        }
    })

    return (
        <ModalContainer >
            {/* <div style={{display: 'block', width: '100%', height: '100%'}}> */}
                <ModalWrapper onClick={exit}>

                </ModalWrapper>
                <ModalContent>
                    {children}
                </ModalContent>
            {/* </div> */}

        </ModalContainer>
    )
}

export default Modal
