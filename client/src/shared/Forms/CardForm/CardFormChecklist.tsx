import AddItemForm from '../../AddNewItem/AddItemForm'
import { getCompletedTasks } from '../../Card'
import Checkbox from '../../Checkbox'
import EditableItem from '../../EditableItem'
import { FormBlock, FormBlockTitle, 
    FormChecklistContainer, FormChecklistDone, FormChecklistItemsWrapper,
    FormChecklistTitle, FormListItem, FormListItems} from '../FormElements'
import TrashcanIcon from '../../icons/Trashcan/TrashcanIcon'
import ProgressBar from '../../ProgressBar'
import {DeleteIconWrapper,  } from './CardFormElements'
import { Task } from '../../../redux/HandleItems/interfaces'

type CardFormChecklistProps = {
    tasks: Task[]
    onChange: (taskId: string) => void
    onAdd: (text: string) => void
    onDelete: (taskId: string) => void
    onUpdate: (taskd: string, text: string) => void
}

const CardFormChecklist = ({tasks, onChange, onAdd, onDelete, onUpdate}: CardFormChecklistProps) => {

    return (
        <FormBlock>
            <FormChecklistContainer>
                <FormChecklistTitle>
                    <FormBlockTitle>Checklist</FormBlockTitle>
                    <FormChecklistDone>
                        {getCompletedTasks(tasks)} / {tasks.length}
                    </FormChecklistDone>
                </FormChecklistTitle>
                <ProgressBar
                    variant="default"
                    value={
                        (getCompletedTasks(tasks) / tasks.length) *
                            100 || getCompletedTasks(tasks)
                    }
                />
                <FormChecklistItemsWrapper>
                    <FormListItems>
                        {tasks?.map((task: Task) => (
                            <FormListItem key={task._id}>
                                <Checkbox
                                    checked={task.completed}
                                    key={task._id}
                                    onChange={() => onChange(task._id)}
                                >
                                    <EditableItem
                                        initialText={task.text}
                                        deleteItem={() => {}}
                                        editItem={(text: string) => {}}
                                        placeholder="Enter task text"
                                        updateItem={(text: string) => onUpdate(task._id, text)}
                                    />
                                </Checkbox>
                                <DeleteIconWrapper
                                    onClick={() => onDelete(task._id)}
                                >
                                    <TrashcanIcon />
                                </DeleteIconWrapper>
                            </FormListItem>
                        ))}
                        <AddItemForm
                            title="Add new Task"
                            placeholder="Start Typing..."
                            item="TASK"
                            onAdd={(text: string) => onAdd(text)}
                        />
                    </FormListItems>
                </FormChecklistItemsWrapper>
            </FormChecklistContainer>
        </FormBlock>
    );
};

export default CardFormChecklist;
