import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { authApi } from '../api'
import BoardSection from '../BoardSection'
import { userContext } from '../Context'
import {addBoard, getBoards } from '../redux/Board/actionCreators'
import { BoardI } from '../redux/Board/interfaces'
import { RootReducerType } from '../redux/store'
import { ModalHandle } from '../shared/Modal'
import {ReactComponent as NoBoardImg} from '../shared/icons/no-board.svg'
import { AppContainer, BoardSectionContainer, NoBoardSection, NoBoardTitle } from './HomePageElements'
import AppLoader from '../shared/Loaders/AppLoader'
import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'
import {ReactComponent as LogoImg} from '../shared/icons/Logo.svg'


const HomePage = () => {
    const {user, getAuth} = useContext(userContext)
    const dispatch = useDispatch()

    const [showSidebar, setShowSidebar] = useState(false)

    const modalRef = useRef<ModalHandle>(null)

    const {boards, isLoading} = useSelector((state: RootReducerType) => state.boards)

    const {lists} = useSelector((state: RootReducerType) => state.handleItems)

    const {id} = useParams<{id: string}>()

    const currentBoard = boards.find(board => board._id === id) || {} as BoardI

    const handleLogout = async () => {
        await authApi.logout()
        getAuth()
    }

    const handleAddBoard = (boardName: string) => {
        dispatch(addBoard(user, boardName))
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
            <Sidebar
                title='React Trello'
                Img={<LogoImg />} 
                boards={boards}
                isShow={showSidebar}
                modalRef={modalRef}
                boardId={id}
                userId={user}
                handleClose={() => setShowSidebar(false)}
                handleAdd={handleAddBoard}
            />
            <BoardSectionContainer>
                
                    <Header
                        board={currentBoard}
                        sidebarOpen={() => setShowSidebar(true)}
                        handleLogout={handleLogout}
                        lists={lists}
                    />
                    {
                    currentBoard._id 
                        ? <BoardSection />   
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
