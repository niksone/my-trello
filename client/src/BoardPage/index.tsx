import React from 'react'
import styled from 'styled-components'
import { AddItemState } from '../redux/reducer'
import Board from '../shared/Board'
import BeautifulBoard from '../shared/Board/BeautifulBoard'
import Header from '../shared/Header'


const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-areas: 
    'header'
    'board';
`
export interface BoardPageProps {
    data: AddItemState
}

const BoardPage = ({data}: BoardPageProps) => {
    return (
        <AppContainer>
            <Header />
            <BeautifulBoard data={data}/>
            {/* <Board data={data}/>  */}
        </AppContainer>
    )
}

export default BoardPage
