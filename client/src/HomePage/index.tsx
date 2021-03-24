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
    grid-area: 'board-section';
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
    }
`

export const BoardLinkIconWrapper = styled.span`
    display: flex;
    align-items: center;
    padding-right: 30px;
    color: inherit;
`

const HomePage = () => {
    const {user, getAuth} = useContext(userContext)

    const {boards} = useSelector((state: RootReducerType) => state.boards)
    const dispatch = useDispatch()

    const {id} = useParams<{id: string}>()

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const handleLogout = async () => {
        await authApi.logout()
        getAuth()
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
                            betaCRM
                        </LogoWrapper>
                    </HeaderContainer>
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
                            <BoardName>{currentBoard.name}</BoardName>
                            <Button 
                                onClick={handleLogout}
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
