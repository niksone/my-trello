import ObjectID from "bson-objectid";
import { useState } from "react";
import { SimpleCard, Task } from "../../../redux/AddItem/interfaces";
import Button from "../../Buttons";

import {
    FormContent,
    FormWrapper,
    FormContainer,
    FormHeaderContainer,
    FormHeaderWrapper,
} from "../FormElements";
import ArrowIcon from "../../icons/Arrow/Arrow";
import {
    CardFormContainer,
    CardFormWrapper,
} from "./CardFormElements";
import SaveIcon from "../../icons/Save/SaveIcon";
import Div100vh from "../../Div100vh";
import ConditionalWrapper from "../../ConditionalWrapper";
import FormHeader from "../FormHeader";
import CardFormChecklist from "./CardFormChecklist";
import CardFormDescription from "./CardFormDescription";
import { BoardName } from "../../../HomePage/HomePageElements";

interface CardFormProps {
    boardName: string;
    columnId: string;
    cardId: string;
    title: string;
    subtitle: string;
    description: string;
    tasks: Task[];
    onExit?: any;
    onSave?: any;
}

const CardForm = ({
    boardName,
    columnId,
    cardId,
    title,
    subtitle,
    description,
    tasks,
    onExit,
    onSave,
}: CardFormProps) => {
    const [card, setCard] = useState<SimpleCard>({
        title,
        subtitle,
        description,
        tasks,
    });

    const [isValid, setIsValid] = useState<boolean>(true)

    const handleUpdateCard = (
        title: string,
        subtitle: string,
        description: string,
        tasks: Task[]
    ) => {
        setCard((prev) => ({ ...prev, title, subtitle, description, tasks }));
    };

    const handleAddTask = (text: string) => {
        setCard((prev) => ({
            ...prev,
            tasks: [
                ...prev.tasks,
                {
                    _id: String(new ObjectID()),
                    completed: false,
                    text,
                },
            ],
        }));
    };

    const handleUpdateTask = (taskId: string, text: string) => {
        setCard((prev) => ({
            ...prev,
            tasks: [...prev.tasks.map(task => task._id === taskId ? {...task, text} : task)]
        }))
    };

    const handleDeleteTask = (taskId: string) => {
        setCard((prev) => ({
            ...prev,
            tasks: [...prev.tasks.filter(task => task._id !== taskId)]
        }))
    };

    const handleChangeTask = (taskId: string) => {
        setCard((prev) => ({
            ...prev,
            tasks: [...prev.tasks.map(task => task._id === taskId ? {...task, completed: !task.completed} : task)]
        }))
    };

    const handleSave = () => {
        console.log(card);
        if(card.title.trim() === ''){
            setIsValid(false)
        }else{
            setIsValid(true)
            onSave(card);
            onExit();
        }
    };

    return (
        <ConditionalWrapper
            Wrapper={Div100vh}
            condition={window.innerWidth <= 425}
        >
            <CardFormContainer>
                <CardFormWrapper>
                    <FormWrapper>
                        <FormHeaderContainer>
                            <FormContainer>
                                <FormHeaderWrapper>
                                    <Button
                                        shape="icon"
                                        variant="outline"
                                        size="lg"
                                        onClick={onExit}
                                    >
                                        <ArrowIcon direction="left" />
                                    </Button>
                                    <BoardName>{boardName}</BoardName>

                                    <Button
                                        shape="icon"
                                        variant="outline"
                                        size="lg"
                                        onClick={handleSave}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </FormHeaderWrapper>
                            </FormContainer>
                        </FormHeaderContainer>

                        <FormHeader
                            title={card.title}
                            handleTitleUpdate={(title) =>
                                handleUpdateCard(
                                    title,
                                    card.subtitle,
                                    card.description,
                                    card.tasks
                                )
                            }
                            subtitle={card.subtitle}
                            handleSubtitleUpdate={(subtitle) =>
                                handleUpdateCard(
                                    card.title,
                                    subtitle,
                                    card.description,
                                    card.tasks
                                )
                            }
                            editable
                            placeholderColor={!isValid ? 'var(--color-error)': ''}
                        />
                        <FormContent>
                            <FormContainer>
                                {/* <FormBlock>
                            <FormDescriptionContainer>
                                <FormBlockTitle>
                                    Description
                                </FormBlockTitle>
                                <FormDescription>
                                    <EditableItem
                                        initialText={card.description}
                                        deleteItem={() => {}}
                                        editItem={() => {}}
                                        placeholder='Enter Description'
                                        updateItem={(text) => handleUpdateCard(card.title, card.subtitle, text, card.tasks)}
                                    />
                                </FormDescription>
                            </FormDescriptionContainer>
                        </FormBlock> */}
                                <CardFormDescription
                                    title="Description"
                                    initialText={card.description}
                                    onUpdate={(text) =>
                                        handleUpdateCard(
                                            card.title,
                                            card.subtitle,
                                            text,
                                            card.tasks
                                        )
                                    }
                                />
                                {card.tasks && (
                                    // <FormBlock>
                                    //     <FormChecklistContainer>
                                    //         <FormChecklistTitle>
                                    //             <FormBlockTitle>Checklist</FormBlockTitle>
                                    //             <FormChecklistDone>{getCompletedTasks(card.tasks)} / {card.tasks.length}</FormChecklistDone>
                                    //         </FormChecklistTitle>
                                    //         <ProgressBar variant='default' value={getCompletedTasks(card.tasks) / card.tasks.length * 100 || getCompletedTasks(card.tasks)}/>
                                    //         <FormChecklistItemsWrapper>
                                    //             <FormListItems>
                                    //                 {card.tasks?.map(task =>
                                    //                     <FormListItem
                                    //                         key={task._id}
                                    //                     >
                                    //                         <Checkbox
                                    //                             checked={task.completed}
                                    //                             key={task._id}
                                    //                             onChange={() => handleUpdate(card.title, card.subtitle, card.description, updateTask(card.tasks, task._id, task.text, !task.completed))}
                                    //                         >
                                    //                             <EditableItem
                                    //                                 initialText={task.text}
                                    //                                 deleteItem={() => {}}
                                    //                                 editItem={(text: string) => {}}
                                    //                                 placeholder='Enter task text'
                                    //                                 updateItem={(text: string) => handleUpdate(card.title, card.subtitle, card.description, updateTask(card.tasks, task._id, text, task.completed))}
                                    //                             />
                                    //                         </Checkbox>
                                    //                         <DeleteIconWrapper onClick={() => handleUpdate(card.title, card.subtitle, card.description, removeTask(task._id, card.tasks))}>
                                    //                             <TrashcanIcon />
                                    //                         </DeleteIconWrapper>
                                    //                     </FormListItem>

                                    //                 )}
                                    //                 <AddItemForm
                                    //                     title='Add new Task'
                                    //                     placeholder='Start Typing...'
                                    //                     item='TASK'
                                    //                     onAdd={(text: string) => handleUpdate(card.title, card.subtitle, card.description, [...card.tasks, {_id: String(new ObjectID()), text, completed: false}])}
                                    //                 />
                                    //             </FormListItems>
                                    //         </FormChecklistItemsWrapper>
                                    //     </FormChecklistContainer>

                                    // </FormBlock>
                                    <CardFormChecklist
                                        tasks={card.tasks}
                                        onAdd={handleAddTask}
                                        onChange={handleChangeTask}
                                        onDelete={handleDeleteTask}
                                        onUpdate={handleUpdateTask}
                                    />
                                )}
                            </FormContainer>
                        </FormContent>
                    </FormWrapper>
                </CardFormWrapper>
            </CardFormContainer>
        </ConditionalWrapper>
    );
};

export default CardForm;
