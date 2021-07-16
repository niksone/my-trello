import { BoardSidebarClose, BoardSidebarContainer, BoardSidebarWrapper } from '../BoardSection/BoardElements'
import PickIcon from '../shared/icons/Pick/PickIcon'
import { HeaderContainer, LogoWrapper } from '../shared/Header/HeaderElements'
import {ReactComponent as LogoImg} from '../shared/icons/Logo.svg'
import AddIcon from '../shared/icons/Add/AddIcon'
import AddItemForm from '../shared/AddNewItem/AddItemForm'
import { Modal, ModalHandle } from '../shared/Modal'
import EditIcon from '../shared/icons/Edit/EditIcon'
import EditBoardForm from './EditBoardForm'
import { BoardButtonWrapper, BoardLink, BoardLinkContainer, BoardLinkIconWrapper, BoardLinksContainer, BoardLinkWrapper, LogoImgWrapper } from './HomePageElements'
import { Board } from '../redux/Board/interfaces'
import Button from '../shared/Buttons'
import { Ref, useRef, useState } from 'react'


interface BoardSidebarProps {
    boards: Board[]
    isShow: boolean
    modalRef: Ref<ModalHandle>
    boardId: string
    userId: string
    handleClose: () => void
    handleAddBoard: (name: string) => void
}

const BoardSidebar = ({boards, isShow, modalRef, boardId, userId, handleClose, handleAddBoard}: BoardSidebarProps) => {
    
    const [showEditBoardModal, setShowEditBoardModal] = useState(false)
    const editBoardModalRef = useRef<ModalHandle>(null);
    const [showModal, setShowModal] = useState(false)

    return (
        <BoardSidebarContainer show={isShow}>
            <BoardSidebarClose onClick={handleClose} show={isShow}>

            </BoardSidebarClose>
            <BoardSidebarWrapper>
            <BoardLinksContainer>
                <HeaderContainer>
                    <LogoWrapper>
                        <BoardLinkWrapper>
                            <LogoWrapper>
                                <LogoImgWrapper>
                                    <LogoImg />
                                </LogoImgWrapper>
                                React Trello
                            </LogoWrapper>
                        </BoardLinkWrapper>
                    </LogoWrapper>
                </HeaderContainer>
                    {
                        boards?.map((board: Board) => 
                        <BoardLinkContainer key={board._id}>
                            <BoardLinkWrapper active={board._id === boardId}>
                                <BoardLink to={`/board/${board._id}`} key={board._id} onClick={handleClose}>
                                    <BoardButtonWrapper>
                                        <Button jc='start' widthFill variant='shadow' active={board._id === boardId}>
                                            <BoardLinkIconWrapper>
                                                <PickIcon />
                                            </BoardLinkIconWrapper>
                                            {board.name}
                                        </Button>
                                    </BoardButtonWrapper>
                                </BoardLink>
                            </BoardLinkWrapper>
                        </BoardLinkContainer>)
                    }  
                        <BoardLinkContainer >
                            <BoardLinkWrapper>
                                <BoardButtonWrapper>
                                    <Button 
                                        jc='start' 
                                        widthFill 
                                        variant='shadow' 
                                        onClick={() => setShowEditBoardModal(true)}
                                    >
                                        <BoardLinkIconWrapper>
                                            <EditIcon />
                                        </BoardLinkIconWrapper>
                                        Edit board
                                    </Button>
                                </BoardButtonWrapper>
                            </BoardLinkWrapper>
                        </BoardLinkContainer>
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
            </BoardLinksContainer>
            <BoardLinkWrapper>
                <Button 
                    widthFill 
                    Icon={AddIcon}
                    onClick={() => setShowModal(true)}
                >
                    Add board
                </Button>
                {
                showModal && 
                    <Modal ref={modalRef} show={showModal} exit={handleClose}>
                        <AddItemForm btnItem='ADD' item='FORM' title='Add board' onAdd={handleAddBoard} /> 
                    </Modal>
                }
            </BoardLinkWrapper>
        </BoardSidebarWrapper>
    </BoardSidebarContainer>
    )
}

export default BoardSidebar
