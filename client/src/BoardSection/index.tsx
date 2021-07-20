import { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { userContext } from '../Context'
import { setBoard } from '../redux/HandleItems/reducer'
import { BoardI } from '../redux/Board/interfaces'
import { RootReducerType } from '../redux/store'
import Board from '../shared/Board'

const BoardSection = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()

    const {user} = useContext(userContext)

    const {boards} = useSelector((state: RootReducerType) => state.boards)

    const currentBoard = boards.find(board => board._id === id) || {} as BoardI

    const data = useSelector((state: RootReducerType) => state.handleItems)


    useEffect(() => {
        dispatch(setBoard(currentBoard))
    }, [dispatch, currentBoard._id, user])
    return (
        <Board data={data} />
    )
}

export default BoardSection
