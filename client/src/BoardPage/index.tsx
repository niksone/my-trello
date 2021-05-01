import { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { userContext } from '../Context'
import { setBoard } from '../redux/AddItem/reducer'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType, store } from '../redux/store'
import BeautifulBoard from '../shared/Board/BeautifulBoard'

export const AppContainer = styled.div`
  height: 100%;
  display: flex;
`

export const BoardSectionWrapper = styled.div`
    height: 100%; 
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    overflow: auto;
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


    useEffect(() => {
        dispatch(setBoard(currentBoard))
    }, [dispatch, currentBoard._id, user])
    return (
        <BeautifulBoard data={data} />
    )
}

export default BoardPage
