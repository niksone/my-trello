import { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { userContext } from '../Context'
import { setBoard } from '../redux/AddItem/reducer'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType, store } from '../redux/store'
import BeautifulBoard from '../shared/Board/BeautifulBoard'


// export interface BoardSectionProps {
//     // data: AddItemState
//     boards: Board[]
// }

const BoardSection = () => {
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

export default BoardSection
