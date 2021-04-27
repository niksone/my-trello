import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '../api'
import BoardPage from '../BoardPage'
import { BoardSidebarClose, BoardSidebarContainer, BoardSidebarWrapper } from '../BoardPage/BoardElements'
import { userContext } from '../Context'
import {addBoard, getBoards } from '../redux/Board/actionCreators'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType } from '../redux/store'
import Button from '../shared/Buttons'
import PickIcon from '../shared/icons/Pick/PickIcon'
import { HeaderContainer, HeaderWrapper, LogoWrapper } from '../shared/Header/HeaderElements'
import {ReactComponent as LogoImg} from '../shared/icons/Logo.svg'
import AddIcon from '../shared/icons/Add/AddIcon'
import AddItemForm from '../shared/AddNewItem/AddItemForm'
import { Modal, ModalHandle } from '../shared/Modal'
import EditIcon from '../shared/icons/Edit/EditIcon'
import EditBoardForm from './EditBoardForm'
import MenuIcon from '../shared/icons/Menu/MenuIcon'
import Tooltip from '../shared/Tooltip'
import ButtonGroup from '../shared/Buttons/ButtonGroup'
import MoreIcon from '../shared/icons/More/MoreIcon'
import TrashcanIcon from '../shared/icons/Trashcan/TrashcanIcon'
import OrderIcon from '../shared/icons/Order/OrderIcon'
import {ReactComponent as NoBoardImg} from '../shared/icons/no-board.svg'
// import NoBoardImg from '../shared/icons/no-board.svg'
export const AppContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`
export const BoardSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 250px);
    height: 100%;
    background-color: var(--color-background-light);
    padding: 0 28px 28px 28px;

    @media screen and (max-width: 425px){
        width: 100%;
        background: none;
        padding: 0;
    }
`

// export const BoardSectionWrapper = styled.div`
//     width: 100%;
//     height: calc(100% - 85px);
//     background-color: #fff;

//     & > {
//         padding-right: 10px;
//     }

//     @media screen and (max-width: 425px){
//         background-color:var(--color-background-light);
//     }
// `


export const BoardLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const BoardLinkWrapper = styled.div<BoardLinkContainer>`
    display: flex;
    width: 80%;

    &::after{
        content: '';
        display: ${({active}) => active ? 'block' : 'none'};
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2px;
        background-color: var(--color-primary);
        border-radius: 1px;
    }
`


interface BoardLinkContainer {
    active?: boolean
}

export const BoardLinkContainer = styled.div<BoardLinkContainer>`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0;

    & ~ &{
        margin: 8px 0 8px 0;
    }
`

export const BoardName = styled.h3`
    font-size: var(--text-h3);
`

export const BoardLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: var(--color-primary-dark);
    font-size: var(--text-regular);
`

export const BoardButtonWrapper = styled.div`
    width: 100%;
    & > Button{
        padding: 13px;  
        font-weight: bold;
        text-align:left;
        word-break: break-word;
    }
`

export const BoardLinkIconWrapper = styled.span`
    display: flex;
    align-items: center;
    padding-right: 30px;
    color: inherit;
`
interface LogoI {    
    logoImg: any
}

export const LogoImgWrapper = styled.div`
    margin-right: 30px;
`

interface ShowContainerProps {
    show: boolean
    mobile: boolean
}
export const ShowContainer = styled.div<ShowContainerProps>`
    display: ${({show, mobile}) => show && !mobile ? 'flex' : 'none'};
 
    @media screen and (max-width: 425px){
        display: ${({show, mobile}) => show && mobile? 'flex' : 'none'};
    }
`

export const BoardSectionFooterContainer = styled.div`

`

export const NoBoardSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-size: contain; 
    background-color: var(--color-background-light);

    & > svg{
        /* width: 80%;
        height: 80%; */

        margin-bottom: 35px;

    }

    @media screen and (max-width: 425px){
        & > svg{
            width: 80%;
            height: 80%; 
        }
    }
`

export const NoBoardTitle =styled.h2`
    font-size: var(--text-h2);
    padding-bottom: 8px;
`

export const NoBoardSubtitle =styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
`


const HomePage = () => {
    const {user, getAuth} = useContext(userContext)
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef<ModalHandle>(null)

    const [showEditBoardModal, setShowEditBoardModal] = useState(false)
    const editBoardModalRef = useRef<ModalHandle>(null);

    const [showSidebar, setShowSidebar] = useState(false)

    const {boards, isLoading} = useSelector((state: RootReducerType) => state.boards)
    const dispatch = useDispatch()

    const {id} = useParams<{id: string}>()

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const handleLogout = async () => {
        await authApi.logout()
        getAuth()
    }

    const handleAddItem = (text: string) => {
        dispatch(addBoard(user, text))
        setShowModal(false)
    }

    const handleSave = (boards: Board[]) => {
        console.log(boards);
    }

    useEffect(() => {
        dispatch(getBoards(user))
        // boards.length > 0 && <Redirect to={`/board/${boards[0]._id}`}/>
    }, [dispatch, user])

    if(boards.length > 0 && !id){
        return <Redirect to={`/board/${boards[0]._id}`}/>
    } 

    if(isLoading){
        return <div></div>
    }

    return (
        
        <AppContainer>
            <p>{isLoading && 'jopa'}</p>
            <BoardSidebarContainer show={showSidebar}>
                <BoardSidebarClose onClick={() => setShowSidebar(false)} show={showSidebar}>

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
                                <BoardLinkWrapper active={board._id == id}>
                                    <BoardLink to={`/board/${board._id}`} key={board._id}>
                                        <BoardButtonWrapper>
                                            <Button jc='start' widthFill variant='shadow' active={board._id === id}>
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
                                        onSave={() => {}}
                                        userId={user}
                                        // onSave={(boards: SimpleBoard[]) => handleSave()}
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
                        <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                            <AddItemForm btnItem='ADD' item='FORM' title='Add board' onAdd={(name: string) => handleAddItem(name)} /> 
                        </Modal>
                    }
                </BoardLinkWrapper>
                </BoardSidebarWrapper>
            </BoardSidebarContainer>   

            <BoardSectionContainer>
                    <HeaderContainer>
                        <HeaderWrapper>
                            <ShowContainer show={true} mobile={true}>
                                <Button shape='icon' variant='outline' size='lg' onClick={() => setShowSidebar(true)}>
                                    <MenuIcon />
                                </Button>
                            </ShowContainer>
                            <BoardName>{currentBoard.name || 'No Board Found'}</BoardName>

                            <ShowContainer show={true} mobile={true}>
                            <Tooltip 
                                content={
                                    <ButtonGroup direction='column' spacing={2}>
                                        <Button onClick={() => {}}
                                        Icon={AddIcon}>
                                            Add List
                                        </Button>
                                        <Button onClick={() => {}}
                                        Icon={OrderIcon}>
                                            Move List
                                        </Button>
                                        <Button 
                                            onClick={handleLogout}
                                            Icon={TrashcanIcon}
                                            colorScheme='error'
                                        >
                                            Log Out
                                        </Button>
                                    </ButtonGroup>
                                } 
                                direction='bottom'
                            >
                                <Button shape='icon' variant='outline' size='lg'>
                                    <MoreIcon />
                                </Button>
                            </Tooltip>
                            </ShowContainer>

                            <ShowContainer show={true} mobile={false}>
                                <Button 
                                    onClick={handleLogout}
                                    size='md'
                                    colorScheme='error'
                                >
                                    logout
                                </Button>
                            </ShowContainer>

                        </HeaderWrapper>
                    </HeaderContainer>
                {/* <BoardSectionWrapper> */}
                    {currentBoard._id && <BoardPage />   }
                    {
                    
                        boards.length <= 0 
                        && <NoBoardSection>
                            <NoBoardImg /> 
                            
                            <NoBoardTitle>{isLoading && 'jopa'}</NoBoardTitle>
                            {/* <NoBoardSubtitle>Create One</NoBoardSubtitle> */}
                        </NoBoardSection>
                    }
                {/* </BoardSectionWrapper> */}
            </BoardSectionContainer>
            <BoardSectionFooterContainer>
                
            </BoardSectionFooterContainer>
        </AppContainer>
    )
}

export default HomePage
