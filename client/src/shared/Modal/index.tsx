import React, { Children, forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom';
import { ModalContainer, ModalContent, ModalWrapper } from './ModalElements'

const modalElement = document.getElementById('modal-root');


const Modal = ({children, exit, show = false}: any, ref: Ref<any>) => {

    const [isOpen, setIsOpen] = useState(show);

    const handleExit = () => {
        setIsOpen(false)
        exit && exit()
    }
    useEffect(() => {
        const modalListener = (e: any) => {
            if(e.key === 'Escape'){
                handleExit()
            }
        }
        document.addEventListener('keydown', modalListener)

        return () => {
            document.removeEventListener('keydown', modalListener)
        }
    })

    useImperativeHandle(
        ref,
        () => ({
            open: () => setIsOpen(true),
            close: () => {
                handleExit()
                console.log('close')
            },
        }),
        [],
    )

    return (
        modalElement && 
        createPortal(
            <ModalContainer show={isOpen} >
                {/* <div style={{display: 'block', width: '100%', height: '100%'}}> */}
                    <ModalWrapper onClick={handleExit}>

                    </ModalWrapper>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        {children}
                    </ModalContent  >
                {/* </div> */}

            </ModalContainer>
            ,
            modalElement
        )

    )
}

const exportModal =  forwardRef(Modal)

export {exportModal as Modal}

export type ModalHandle = React.ElementRef<typeof exportModal>;

