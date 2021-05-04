import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deleteBoard, editBoardName, addBoard} from '../redux/Board/actionCreators'
import { Board} from '../redux/Board/interfaces'
import EditItemsForm from '../shared/Forms/EditItemsForm'

interface EditBoardFormProps {
    onExit: () => void,
    onSave: (boards: Board[]) => void
    boards: Board[]
    userId: string
}

const EditBoardForm = ({boards, onSave, onExit, userId}: EditBoardFormProps) => {

    const dispatch = useDispatch()

    return (

        <EditItemsForm 
            items={boards}
            onAdd={(name: string) => dispatch(addBoard(userId, name))}
            onDelete={(boardId: string) => dispatch(deleteBoard(userId, boardId))}
            onEdit={(boardId: string, name: string) => dispatch(editBoardName(boardId, name))}
            onExit={onExit}
            headerTitle='Edit Boards'
            title='Edit Board'
            subtitle='Rename, add or delete a board'
            formPlaceholder='Create Board'
            formItemFieldLabel='name'

        />
    )
}

export default EditBoardForm
