import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  padding: 28px 0 36px 30px;
  position: relative;

  @media screen and (max-width: 425px){
    padding: 0 20px;
  }
`

export const BoardWrapper = styled.div`
  height: 100%;
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