import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '../api'
import BoardPage from '../BoardPage'
import { BoardSidebar } from '../BoardPage/BoardElements'
import { userContext } from '../Context'
import { setBoard } from '../redux/AddItem/reducer'
import { addBoard, getBoards } from '../redux/Board/actionCreators'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType } from '../redux/store'
import AddNewItem from '../shared/AddNewItem'
import Button from '../shared/Buttons'
import PickIcon from '../shared/icons/Pick/PickIcon'
import { HeaderContainer, HeaderWrapper, LogoWrapper } from '../shared/Header/HeaderElements'
import { BoardWrapper } from '../shared/Board/BoardContainer'
import {BoardContainer} from '../shared/Board/BoardContainer'
export const AppContainer = styled.div`
    height: 100vh;
    display: flex;
`
export const BoardSectionContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--color-background-light);
    padding: 0 28px 28px 28px;
    display: grid;
    grid-template-areas:
        'header'
        'board-section';

    grid-template-rows: 85px 1fr;
`

export const BoardSectionWrapper = styled.div`
    width: 100%;
    grid-area: board-section;
`


export const BoardLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const BoardLinkWrapper = styled.div`
    display: flex;
    width: 80%;
    /* padding: 12px 12px 15px 12px; */
`

export const BoardLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: var(--color-primary-dark);
    font-size: var(--text-regular);
    padding: 8px 0 8px 0;

    &:first-child{
        padding-top: 0;
    }

    & > Button{
        padding: 13px;  
        font-weight: bold;
        text-align:left;
    }
`

export const BoardLinkIconWrapper = styled.span`
    padding-right: 30px;
`

const HomePage = () => {

    const {user, getAuth} = useContext(userContext)

    const {boards} = useSelector((state: RootReducerType) => state.boards)
    const dispatch = useDispatch()

    const {id} = useParams<{id: string}>()

    const currentBoard = boards.find(board => board._id === id) || {} as Board


    const handleLogout = async () => {
        const logout = await authApi.logout()
        getAuth()
    }

    useEffect(() => {
        dispatch(getBoards(user))
    }, [dispatch, currentBoard._id, user])
    return (
        
        <AppContainer>
            <BoardSidebar>
                <BoardLinksContainer>
                    <HeaderContainer>
                        <LogoWrapper>
                            betaCRM
                        </LogoWrapper>
                    </HeaderContainer>
                        {
                            boards?.map((board: Board) => 
                                <BoardLinkWrapper key={board._id}>
                                    <BoardLink to={`/board/${board._id}`} key={board._id}>
                                        <Button jc='start' widthFill variant='shadow' active={board._id === id}>
                                            <BoardLinkIconWrapper>
                                                <PickIcon fill='var(--color-primary-grey'/>
                                            </BoardLinkIconWrapper>
                                            {board.name}
                                        </Button>
                                    </BoardLink>
                                </BoardLinkWrapper>)
                        }  
                </BoardLinksContainer>
                <BoardLinkWrapper>
                    <AddNewItem 
                        text='Add New Board'
                        formText='Add Board'
                        item='BOARD'
                        onAdd={name => dispatch(addBoard(user, name))}
                    />
                </BoardLinkWrapper>
            </BoardSidebar>   

            <BoardSectionContainer>
                    <HeaderContainer>
                        <HeaderWrapper>
                            <p>{currentBoard.name}</p>
                            <Button 
                                onClick={handleLogout}
                            >
                                logout
                            </Button>
                        </HeaderWrapper>
                    </HeaderContainer>
                <BoardSectionWrapper>
                    {id && <BoardPage />   } 
                </BoardSectionWrapper>
            </BoardSectionContainer>
        </AppContainer>
    )
}

export default HomePage
