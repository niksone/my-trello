import React, {
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { ModalContainer, ModalContent, ModalWrapper } from "./ModalElements";

const modalElement = document.getElementById("modal-root");

const Modal = ({ children, exit, show = false }: any, ref: Ref<any>) => {
    const [isOpen, setIsOpen] = useState(show);

    const handleExit = () => {
        setIsOpen(false);
        exit && exit();
    };
    useEffect(() => {
        const modalListener = (e: any) => {
            if (e.key === "Escape") {
                handleExit();
            }
        };
        document.addEventListener("keydown", modalListener);

        return () => {
            document.removeEventListener("keydown", modalListener);
        };
    });

    useImperativeHandle(
        ref,
        () => ({
            open: () => setIsOpen(true),
            close: () => {
                handleExit();
                console.log("close");
            },
        }),
        []
    );

    return (
        modalElement &&
        createPortal(
            <ModalContainer show={isOpen}>
                <ModalWrapper onClick={handleExit}></ModalWrapper>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    {children}
                </ModalContent>
            </ModalContainer>,
            modalElement
        )
    );
};

const exportModal = forwardRef(Modal);

export { exportModal as Modal };

export type ModalHandle = React.ElementRef<typeof exportModal>;
