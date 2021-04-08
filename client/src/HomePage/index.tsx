import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '../api'
import BoardPage from '../BoardPage'
import { BoardSidebar } from '../BoardPage/BoardElements'
import { userContext } from '../Context'
import {addBoard, getBoards } from '../redux/Board/actionCreators'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType } from '../redux/store'
import Button from '../shared/Buttons'
import PickIcon from '../shared/icons/Pick/PickIcon'
import { HeaderContainer, HeaderWrapper, LogoWrapper } from '../shared/Header/HeaderElements'
import LogoImg from '../shared/icons/Logo.svg'
import AddIcon from '../shared/icons/Add/AddIcon'
import AddNewItem from '../shared/AddNewItem'
import AddNewItemBtn from '../shared/AddNewItem/AddNewItemBtn'
import AddItemForm from '../shared/AddNewItem/AddItemForm'
import { Modal, ModalHandle } from '../shared/Modal'
// import { boards } from '../data'

export const AppContainer = styled.div`
    height: 100vh;
    display: flex;
    /* display: grid;
    grid-template-columns: 250px 1fr;
    overflow: hidden; */
`
export const BoardSectionContainer = styled.div`
    width: calc(100% - 250px);
    height: 100%;
    background-color: var(--color-background-light);
    padding: 0 28px 28px 28px;
    /* display: grid;
    grid-template-areas:
        'header'
        'board-section';
    grid-template-rows: 85px 1fr; */
`

export const BoardSectionWrapper = styled.div`
    width: 100%;
    height: calc(100% - 85px);
    /* grid-area: 'board-section'; */
    background-color: #fff;
    overflow-x: auto;


    & > {
        padding-right: 10px;
    }
`


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
    /* /* padding: 12px 12px 15px 12px; */
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
    /* border-right: ${({active}) => active ? '2px var(--color-primary) solid' : 'none'}; */
`

export const BoardName = styled.h3`
    font-size: var(--text-h3);
`

export const BoardLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: var(--color-primary-dark);
    font-size: var(--text-regular);

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

export const Logo = styled.div<LogoI>`
    background-image: url(${({logoImg}) => logoImg});
    margin-right: 30px;
`

const HomePage = () => {
    const {user, getAuth} = useContext(userContext)
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef<ModalHandle>(null)

    const {boards} = useSelector((state: RootReducerType) => state.boards)
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

    useEffect(() => {
        dispatch(getBoards(user))
    }, [dispatch, user])
    return (
        
        <AppContainer>
            <BoardSidebar>
                <BoardLinksContainer>
                    <HeaderContainer>
                        <LogoWrapper>
                            <Logo logoImg={LogoImg}/>betaCRM
                        </LogoWrapper>
                    </HeaderContainer>
                            {/* <BoardLinkContainer >
                                {/* <BoardLinkWrapper active={true}>
                                    <Button jc='start' widthFill variant='shadow' active={true}>
                                        <BoardLinkIconWrapper>
                                            <PickIcon />
                                        </BoardLinkIconWrapper>
                                        {}ene
                                    </Button>
                                </BoardLinkWrapper> 
                            </BoardLinkContainer> */}
                        {
                            boards?.map((board: Board) => 
                            <BoardLinkContainer key={board._id}>
                                <BoardLinkWrapper active={board._id == id}>
                                    <BoardLink to={`/board/${board._id}`} key={board._id}>
                                        <Button jc='start' widthFill variant='shadow' active={board._id === id}>
                                            <BoardLinkIconWrapper>
                                                <PickIcon />
                                            </BoardLinkIconWrapper>
                                            {board.name}
                                        </Button>
                                    </BoardLink>
                                </BoardLinkWrapper>
                            </BoardLinkContainer>)
                        }  
                </BoardLinksContainer>
                <BoardLinkWrapper>
                    <Button 
                        widthFill 
                        Icon={AddIcon}
                        onClick={() => setShowModal(true)}
                    >
                        add new Board
                    </Button>
                    {
                    showModal && 
                        <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                            <AddItemForm title='add board' onAdd={(name: string) => handleAddItem(name)} /> 
                        </Modal>
                    }
                    {/* <Button widthFill Icon={AddIcon}> */}
                        {/* Add board */}
                        {/* <AddNewItem 
                            text='Add New Board'
                            formText='Add Board'
                            item='BOARD'
                            Button={Button
                                // <Button widthFill Icon={AddIcon}>
                                //     Add board
                                // </Button>
                            }
                            // onAdd={name => dispatch(addBoard(user, name))}
                            onAdd={() => {}}
                        /> */}
                    {/* </Button> */}
                </BoardLinkWrapper>
            </BoardSidebar>   

            <BoardSectionContainer>
                    <HeaderContainer>
                        <HeaderWrapper>
                            <BoardName>{currentBoard.name}</BoardName>
                            <Button 
                                onClick={handleLogout}
                                size='md'
                                colorScheme='error'
                            >
                                logout
                            </Button>
                        </HeaderWrapper>
                    </HeaderContainer>
                <BoardSectionWrapper>
                    {currentBoard._id && <BoardPage />   } 
                </BoardSectionWrapper>
            </BoardSectionContainer>
        </AppContainer>
    )
}

export default HomePage
