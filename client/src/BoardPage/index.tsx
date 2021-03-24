import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '../api'
import { userContext } from '../Context'
import { setBoard } from '../redux/AddItem/reducer'
import { getBoards } from '../redux/Board/actionCreators'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType, store } from '../redux/store'
import BeautifulBoard from '../shared/Board/BeautifulBoard'
import Header from '../shared/Header'
import { useFetching } from '../utils/useFetching'
import {BoardSidebar} from './BoardElements'

export const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  /* display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-areas: 
    'header'
    'board'; */
`

export const BoardSectionWrapper = styled.div`
    height: 100%; 
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
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

    const {boards} = useSelector((state: RootReducerType) => state.boards)

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const data = useSelector((state: RootReducerType) => state.addItem)

    useEffect(() => {
        dispatch(getBoards(user))
        dispatch(setBoard(currentBoard))
    }, [dispatch, currentBoard._id, user])
    return (
        <BoardSectionWrapper>
            <BeautifulBoard data={data} />
        </BoardSectionWrapper>
            
        // </AppContainer>
    )
}

export default BoardPage
