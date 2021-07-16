import { useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { userContext } from '../Context'
import { setBoard } from '../redux/HandleItems/reducer'
import { Board } from '../redux/Board/interfaces'
import { RootReducerType } from '../redux/store'
import BeautifulBoard from '../shared/Board/BeautifulBoard'

const BoardSection = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()

    const {user} = useContext(userContext)

    const {boards} = useSelector((state: RootReducerType) => state.boards)

    const currentBoard = boards.find(board => board._id === id) || {} as Board

    const data = useSelector((state: RootReducerType) => state.handleItems)


    useEffect(() => {
        dispatch(setBoard(currentBoard))
    }, [dispatch, currentBoard._id, user])
    return (
        <BeautifulBoard data={data} />
    )
}

export default BoardSection
