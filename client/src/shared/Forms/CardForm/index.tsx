import ObjectID from "bson-objectid";
import { useState } from "react";
import { SimpleCard, Task } from "../../../redux/HandleItems/interfaces";
import Button from "../../Buttons";

import {
    FormContent,
    FormWrapper,
    FormContainer,
    FormHeaderContainer,
    FormHeaderWrapper,
} from "../FormElements";
import ArrowIcon from "../../icons/Arrow/Arrow";
import { CardFormContainer, CardFormWrapper } from "./CardFormElements";
import SaveIcon from "../../icons/Save/SaveIcon";
import Div100vh from "../../Div100vh";
import ConditionalWrapper from "../../ConditionalWrapper";
import FormHeader from "../FormHeader";
import CardFormChecklist from "./CardFormChecklist";
import CardFormDescription from "./CardFormDescription";
import { BoardName } from "../../../HomePage/HomePageElements";
import { COLORS, isMobileWidth } from "../../constants";

interface CardFormProps {
    boardName: string;
    columnId: string;
    cardId: string;
    title: string;
    subtitle: string;
    description: string;
    tasks: Task[];
    onExit?: () => void;
    onSave?: (card: SimpleCard) => void;
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

    const [isValid, setIsValid] = useState<boolean>(true);

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
            tasks: [
                ...prev.tasks.map((task) =>
                    task._id === taskId ? { ...task, text } : task
                ),
            ],
        }));
    };

    const handleDeleteTask = (taskId: string) => {
        setCard((prev) => ({
            ...prev,
            tasks: [...prev.tasks.filter((task) => task._id !== taskId)],
        }));
    };

    const handleChangeTask = (taskId: string) => {
        setCard((prev) => ({
            ...prev,
            tasks: [
                ...prev.tasks.map((task) =>
                    task._id === taskId
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            ],
        }));
    };

    const handleSave = () => {
        console.log(card);
        if (card.title.trim() === "") {
            setIsValid(false);
        } else {
            setIsValid(true);
            onSave && onSave(card);
            onExit && onExit();
        }
    };

    return (
        <ConditionalWrapper Wrapper={Div100vh} condition={isMobileWidth}>
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
                            placeholderColor={!isValid ? COLORS.error : ""}
                        />
                        <FormContent>
                            <FormContainer>
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
