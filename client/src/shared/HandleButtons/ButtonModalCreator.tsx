import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react"
import Button from "../Buttons"
import { Modal, ModalHandle } from "../Modal"

interface ButtonModalCreatorProps {
    label: string
    Icon: JSX.Element
    Item: JSX.Element
}

export type ButtonModalCreatorRef = {
    open: () => void
    close: () => void
}

const ButtonModalCreator = ({label, Icon, Item}: ButtonModalCreatorProps, ref: Ref<ButtonModalCreatorRef>) => {
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef<ModalHandle>(null)
    const closeModal = () => {
        setShowModal(prev => false)
    }

    const openModal = () => {
        setShowModal(prev => true)
    }

    useImperativeHandle(
        ref,
        () => ({
            open: openModal,
            close: closeModal,
        })
    )

    return (
        <>
            <Button
                onClick={openModal}
                Icon={Icon}
            >
                {label}
            </Button>
            {
                showModal && 
                <Modal ref={modalRef} show={showModal} exit={closeModal}>
                    {Item}
                </Modal>
            }
        </>
    )
}

const ButtonModalCreatorWithRef = forwardRef(ButtonModalCreator)

export {ButtonModalCreatorWithRef as ButtonModalCreator}