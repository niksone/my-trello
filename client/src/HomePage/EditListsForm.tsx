import { useDispatch } from 'react-redux'
import { addList, deleteList, updateListTitle } from '../redux/HandleItems/actionCreators'
import { List } from '../redux/HandleItems/interfaces'
import EditItemsForm from '../shared/Forms/EditItemsForm'

interface EditListsFormProps {
    boardId: string
    lists: List[]
    onExit: () => void
}

const EditListsForm = ({lists, boardId, onExit}: EditListsFormProps) => {
    const dispatch = useDispatch()

    return (
        <EditItemsForm 
            items={lists}
            onAdd={(title: string) => dispatch(addList(boardId, title))}
            onDelete={(listId: string) => dispatch(deleteList(boardId, listId))}
            onEdit={(listId: string, title: string) => dispatch(updateListTitle(boardId, listId, title))}
            onExit={onExit}
            headerTitle='Edit Lists'
            title='Edit List'
            subtitle='Rename, add or delete a list'
            formPlaceholder='Add List'
            formItemFieldLabel='title'        
        />
    )
}

export default EditListsForm