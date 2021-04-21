import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import styled from 'styled-components'
import { authApi } from '../api'
import { userContext } from '../Context'
import { setBoard } from '../redux/AddItem/reducer'
import { getBoards } from '../redux/Board/actionCreators'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType, store } from '../redux/store'
import BeautifulBoard from '../shared/Board/BeautifulBoard'
import Header from '../shared/Header'
import { ModalHandle } from '../shared/Modal'
import { useFetching } from '../utils/useFetching'

export const AppContainer = styled.div`
  height: 100vh;
  display: flex;
`

export const BoardSectionWrapper = styled.div`
    height: 100%; 
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    overflow-x: auto;

    @media screen and (max-width: 425px){
        border-radius: 0;
        background-color: var(--color-background-light);
    }
`
// export interface BoardPageProps {
//     // data: AddItemState
//     boards: Board[]
// }

const BoardPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()

    const {user} = useContext(userContext)

    const {boards} = useSelector((state: RootReducerType) => state.boards)

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const data = useSelector((state: RootReducerType) => state.addItem)



    const myRef = useRef<HTMLElement>()

    const scrollLeft = (e: any) => {
      // alert('scroll left');
      console.log('scroll');
      // refPassthrough.current && refPassthrough.current.scrollLeft += window.innerWidth
      if(myRef.current){ 
        // console.log(myRef.current?.scrollLeft,  window.innerWidth);
        myRef.current.scrollLeft += window.innerWidth
      }
      console.log(myRef.current?.scrollLeft,  window.innerWidth);

      // boardRef.current && (boardRef.current.scrollLeft -= window.innerWidth)
      // console.log(boardRef?.current?.scrollLeft);
    }

    const scrollRight = (e: any) => {
      // alert('scroll right');
      console.log('scroll');
      if(myRef.current){ 
        // console.log(myRef.current?.scrollLeft,  window.innerWidth);
        myRef.current.scrollLeft -= window.innerWidth
      }
      console.log(myRef.current?.scrollLeft, window.innerWidth);
      // boardRef.current && (boardRef.current.scrollLeft -= window.innerWidth)
    }

    const handlers = useSwipeable({
      onSwipedRight: (eventData) => scrollRight(eventData),
      onSwipedLeft: (eventData) => scrollLeft(eventData),
      // onSwiped: (eventData) => console.log(`User Swiped!, ${eventData}`),
      preventDefaultTouchmoveEvent: true,
      trackTouch: true
    })

    const refPassthrough = (el: HTMLElement) => {
      // call useSwipeable ref prop with el
      handlers.ref(el);
  
      // set myRef el so you can access it yourself
      myRef.current = el;
    }
    useEffect(() => {
        dispatch(setBoard(currentBoard))
    }, [dispatch, currentBoard._id, user])
    return (
        <BoardSectionWrapper {...handlers} ref={e => refPassthrough(e as HTMLElement)} >
            <BeautifulBoard data={data} />
        </BoardSectionWrapper>
            
        // </AppContainer>
    )
}

export default BoardPage
