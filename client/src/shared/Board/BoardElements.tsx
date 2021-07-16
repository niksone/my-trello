import styled from 'styled-components'
import { BREAKPOINTS } from '../constants'

export const BoardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  /* height: 100%; */
  padding: 28px 0 36px 30px;
  position: relative;

  @media screen and (max-width: ${BREAKPOINTS.mobile}px){
    padding: 0 20px;
  }

  & > * {
    height:100%;  
  }
  /* overflow-x: auto; */

  /* display: flex; 
  flex-direction: column; */
`

export const BoardWrapper = styled.div`
  /* height: 100%; */
  display: flex;
  align-items: flex-start;
  height: 100%;
  padding: 28px 0 36px 30px;
  position: relative;

  @media screen and (max-width: ${BREAKPOINTS.mobile}px){
    padding: 0 20px;
  }
`


export const AddColumnContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > button{
    height: 100%;
  }
`

export const BoardColumnContainer = styled.div<BoardColumnWrapperProps>`
  display: flex;
  height: 100%;
  position: relative;

  & > div{
    margin: 0 8px;
  } 

  @media screen and (max-width: ${BREAKPOINTS.mobile}px){
    & > div{
      margin: 0 calc((100vw - (100vw - 40px)) / 2);
    }

    & > div:first-child{
      margin-left: 0;
    }
  }
`

interface BoardColumnWrapperProps {
  count?: number,
  isDragging?: boolean,
  isOver?: boolean
}

export const BoardColumnWrapper = styled.div<BoardColumnWrapperProps>`
  display: flex;
  flex-direction: column;
`

export const BoardFooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 32px 20px;
  background-color: #fff;
`

export const BoardFooterTitle = styled.h4`
  font-size: var(--text-h4);
`

export const BoardFooterNav = styled.div`

`