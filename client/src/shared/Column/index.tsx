import { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
    addCard,
    deleteList,
    updateListTitle,
} from "../../redux/HandleItems/actionCreators";
import { CardI, List, SimpleCardI, Task } from "../../redux/HandleItems/interfaces";
import { RootReducerType } from "../../redux/store";
import Button from "../Buttons";
import Card from "../Card";
import { BREAKPOINTS } from "../constants";
import CardForm from "../Forms/CardForm";
import AddIcon from "../icons/Add/AddIcon";
import { Modal, ModalHandle } from "../Modal";
import { ShowContainer } from "../ShowContainer";
import {
    AddCardContainer,
    ColumnCardContainer,
    ColumnCardWrapper,
    ColumnContainer,
    ColumnWrapper,
} from "./ColumnElements";
import ColumnHeader from "./ColumnHeader";

interface ColumnPropsI {
    title?: string;
    id: string;
    list: List;
    index: number;
    cardIds: string[];
    cards: CardI[];
    onAdd(text: string): void;
}

const Column = ({
    title,
    id,
    list,
    index,
    cardIds,
    cards,
    onAdd,
}: ColumnPropsI) => {
    const boardId = useSelector((state: RootReducerType) => state.handleItems)._id;
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef<ModalHandle>(null);

    const handleDeleteList = () => {
        dispatch(deleteList(boardId, id));
    };

    const handleEditList = (title: string) => {
        dispatch(updateListTitle(boardId, list._id, title));
    };

    return (
        <Draggable draggableId={list._id} index={index} key={list._id}>
            {(provided, snapshot) => (
                <ColumnContainer
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <ColumnWrapper>
                        <ColumnHeader 
                            title={list.title}
                            handleEditList={handleEditList}
                            handleDeleteList={handleDeleteList}
                            handleAddCard={() => setShowModal(true)}
                        />
                        
                        <Droppable droppableId={list._id}>
                            {(provided, snapshot) => (
                                <ColumnCardContainer
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <ColumnCardWrapper>
                                        {cards?.map(
                                            (card: CardI, index: number) => (
                                                <Card
                                                    cardId={card._id}
                                                    card={card}
                                                    key={card._id}
                                                    listId={id}
                                                />
                                            )
                                        )}
                                    </ColumnCardWrapper>
                                    {showModal && (
                                        <Modal
                                            ref={modalRef}
                                            show={showModal}
                                            exit={() => setShowModal(false)}
                                        >
                                            <CardForm
                                                boardName="Add Card"
                                                title=""
                                                subtitle=""
                                                description=""
                                                onSave={(card: SimpleCardI) =>
                                                    dispatch(
                                                        addCard(
                                                            boardId,
                                                            id,
                                                            card.title,
                                                            card.subtitle,
                                                            card.description,
                                                            card.tasks
                                                        )
                                                    )
                                                }
                                                onExit={() =>
                                                    modalRef?.current?.close()
                                                }
                                                tasks={[] as Task[]}
                                            />
                                        </Modal>
                                    )}
                                    {provided.placeholder}
                                </ColumnCardContainer>
                            )}
                        </Droppable>

                        <ShowContainer widthTo={BREAKPOINTS.mobileLg}>
                            <AddCardContainer>
                                <Button
                                    Icon={<AddIcon />}
                                    onClick={() => setShowModal(true)}
                                    variant="dashed"
                                    bg="inherit"
                                    fw="700"
                                    widthFill
                                >
                                    ADD NEW CARD
                                </Button>
                            </AddCardContainer>
                        </ShowContainer>
                    </ColumnWrapper>
                </ColumnContainer>
            )}
        </Draggable>
    );
};

export default Column;
