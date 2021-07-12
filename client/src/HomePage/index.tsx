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
import LogoutIcon from '../shared/icons/Logout/LogoutIcon'
import { addList, moveList } from '../redux/AddItem/actionCreators'
import MoveItemsForm from '../shared/Forms/MoveItemsForm'
import EditListsForm from './EditListsForm'
import BoardSidebar from './BoardSidebar'
import { AppContainer, BoardName, BoardSectionContainer, NoBoardSection, NoBoardTitle, ShowContainer } from './HomePageElements'
import AppLoader from '../shared/Loaders/AppLoader'
import BoardHeader from './BoardHeader'
// import NoBoardImg from '../shared/icons/no-board.svg'



const HomePage = () => {
    const {user, getAuth} = useContext(userContext)
    const dispatch = useDispatch()

    const [showListModal, setShowListModal] = useState(false)
    const [showMoveListModal, setShowMoveListModal] = useState(false)
    const [showEditListModal, setShowEditListModal] = useState(false)

    const [showSidebar, setShowSidebar] = useState(false)

    const modalRef = useRef<ModalHandle>(null)

    const {boards, isLoading} = useSelector((state: RootReducerType) => state.boards)

    const {lists} = useSelector((state: RootReducerType) => state.addItem)

    const {id} = useParams<{id: string}>()

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const handleLogout = async () => {
        await authApi.logout()
        getAuth()
    }

    const handleAddList = (text: string) => {
        dispatch(addList(currentBoard._id, text))
        setShowListModal(false)
    }

    const handleListMove = (sourceIndex: number, destIndex: number) => {
        dispatch(moveList(currentBoard._id, sourceIndex, destIndex))
    }

    const handleAddBoard = (text: string) => {
        dispatch(addBoard(user, text))
        setShowSidebar(false)
    }

    useEffect(() => {
        dispatch(getBoards(user))
    }, [dispatch, user])

    if(boards.length > 0 && !id){
        return <Redirect to={`/board/${boards[0]._id}`}/>
    } 

    if(isLoading){
        return <AppLoader />
    }

    return (
        <AppContainer>
            <BoardSidebar 
                boards={boards}
                isShow={showSidebar}
                modalRef={modalRef}
                boardId={id}
                userId={user}
                handleClose={() => setShowSidebar(false)}
                handleAddBoard={handleAddBoard}
            />
            <BoardSectionContainer>
                
                    <BoardHeader 
                        board={currentBoard}
                        sidebarOpen={() => setShowSidebar(true)}
                        handleLogout={handleLogout}
                        lists={lists}
                    />
                    {currentBoard._id 
                        ? <BoardPage />   
                        : <NoBoardSection>
                            <NoBoardImg /> 
                            
                            <NoBoardTitle>{isLoading && 'Loading'}</NoBoardTitle>
                            {/* <NoBoardSubtitle>Create One</NoBoardSubtitle> */}
                        </NoBoardSection>
                    }
            </BoardSectionContainer>            
        </AppContainer>
        
    )
}

export default HomePage
