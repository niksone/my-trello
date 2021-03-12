import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { boards } from '../data'
import { AddItemState } from '../redux/AddItem/reducer'
import { RootReducerType, store } from '../redux/store'
import Board from '../shared/Board'
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
}

const BoardPage = () => {
    const {id} = useParams<{id: string}>()
    const board = boards.find(board => board.id === id)
    useFetching({type: 'SET_BOARD', payload: board}, board?.id === id)
    
    const data = useSelector((state: RootReducerType) => state.addItem)
    console.log(data);

    return (
        <AppContainer>
            <Header />
            <BeautifulBoard data={data} />
        </AppContainer>
    )
}

export default BoardPage
