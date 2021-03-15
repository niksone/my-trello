import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '../api'
import { userContext } from '../Context'
import { AddItemState, setBoard } from '../redux/AddItem/reducer'
import { Board, getBoards } from '../redux/Board/reducer'
import { RootReducerType, store } from '../redux/store'
import BeautifulBoard from '../shared/Board/BeautifulBoard'
import Header from '../shared/Header'
import { useFetching } from '../utils/useFetching'


const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-areas: 
    'header'
    'board';
`
export interface BoardPageProps {
    // data: AddItemState
    boards: Board[]
}

const BoardPage = (
    // {boards}: BoardPageProps
    ) => {
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()

    const {user} = useContext(userContext)

    const {boards, isLoading} = useSelector((state: RootReducerType) => state.boards)

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const data = useSelector((state: RootReducerType) => state.addItem)
    // console.log(`${user} -> ${JSON.stringify(boards)} -> ${JSON.stringify(data)}`);
    // console.log(`${data.isLoading}->data ${isLoading}->board`);

    useEffect(() => {
        dispatch(getBoards(user))
        dispatch(setBoard(currentBoard))
    }, [dispatch, currentBoard._id, user])
    return (
        <AppContainer>
            <Header />
            
            {data.isLoading || isLoading
                ? <p>Loading</p>
                : 
                <BeautifulBoard data={data} />
            }
        </AppContainer>
    )
}

export default BoardPage
