import { Ref, useRef, useState } from "react";
import EditBoardForm from "../../HomePage/EditBoardForm";
import { BoardI } from "../../redux/Board/interfaces";
import AddItemForm from "../AddNewItem/AddItemForm";
import Button from "../Buttons";
import { HeaderContainer, LogoWrapper } from "../Header/HeaderElements";
import AddIcon from "../icons/Add/AddIcon";
import EditIcon from "../icons/Edit/EditIcon";
import PickIcon from "../icons/Pick/PickIcon";
import { Modal, ModalHandle } from "../Modal";
import { LogoImgWrapper, SidebarButtonWrapper, SidebarClose, SidebarContainer, SidebarLink, SidebarLinkContainer, SidebarLinkIconWrapper, SidebarLinksContainer, SidebarLinkWrapper, SidebarWrapper } from "./SidebarElements";


interface SidebarProps {
    title: string
    Img: JSX.Element
    boards: BoardI[]
    isShow: boolean
    modalRef: Ref<ModalHandle>
    boardId: string
    userId: string
    handleClose: () => void
    handleAdd: (title: string) => void
}

const Sidebar = ({title, Img, boards, isShow, modalRef, boardId, userId, handleClose, handleAdd}: SidebarProps) => {
    
    const [showEditBoardModal, setShowEditBoardModal] = useState(false)
    const editBoardModalRef = useRef<ModalHandle>(null);
    const [showModal, setShowModal] = useState(false)

    const handleAddBoard = (title: string) => {
        setShowModal(false)
        handleAdd(title)
    }

    return (
        <SidebarContainer show={isShow}>
            <SidebarClose onClick={handleClose} show={isShow}>

            </SidebarClose>
            <SidebarWrapper>
            <SidebarLinksContainer>
                <HeaderContainer>
                    <LogoWrapper>
                        <SidebarLinkWrapper>
                            <LogoWrapper>
                                <LogoImgWrapper>
                                    {Img}
                                </LogoImgWrapper>
                                {title}
                            </LogoWrapper>
                        </SidebarLinkWrapper>
                    </LogoWrapper>
                </HeaderContainer>
                    {
                        boards?.map((board: BoardI) => 
                        <SidebarLinkContainer key={board._id}>
                            <SidebarLinkWrapper active={board._id === boardId}>
                                <SidebarLink to={`/board/${board._id}`} key={board._id} onClick={handleClose}>
                                    <SidebarButtonWrapper>
                                        <Button jc='start' widthFill variant='shadow' active={board._id === boardId}>
                                            <SidebarLinkIconWrapper>
                                                <PickIcon />
                                            </SidebarLinkIconWrapper>
                                            {board.name}
                                        </Button>
                                    </SidebarButtonWrapper>
                                </SidebarLink>
                            </SidebarLinkWrapper>
                        </SidebarLinkContainer>)
                    }  
                        <SidebarLinkContainer >
                            <SidebarLinkWrapper>
                                <SidebarButtonWrapper>
                                    <Button 
                                        jc='start' 
                                        widthFill 
                                        variant='shadow' 
                                        onClick={() => setShowEditBoardModal(true)}
                                    >
                                        <SidebarLinkIconWrapper>
                                            <EditIcon />
                                        </SidebarLinkIconWrapper>
                                        Edit board
                                    </Button>
                                </SidebarButtonWrapper>
                            </SidebarLinkWrapper>
                        </SidebarLinkContainer>
                        { showEditBoardModal &&
                            <Modal ref={editBoardModalRef} show={showEditBoardModal} exit={() => setShowEditBoardModal(false)}>
                                <EditBoardForm
                                    onExit={() => setShowEditBoardModal(false)}
                                    boards={boards}
                                    onSave={() => setShowEditBoardModal(false)}
                                    userId={userId}
                                />
                            </Modal>
                        }   
            </SidebarLinksContainer>
            <SidebarLinkWrapper>
                <Button 
                    widthFill 
                    Icon={<AddIcon />}
                    onClick={() => setShowModal(true)}
                >
                    Add board
                </Button>
                {
                showModal && 
                    <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                        <AddItemForm btnItem='ADD' item='FORM' title='Add board' onAdd={handleAddBoard} /> 
                    </Modal>
                }
            </SidebarLinkWrapper>
        </SidebarWrapper>
    </SidebarContainer>
    )
}

export default Sidebar
