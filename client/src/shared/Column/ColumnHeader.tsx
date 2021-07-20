import Button from "../Buttons";
import ButtonGroup from "../Buttons/ButtonGroup";
import EditableItem from "../EditableItem";
import AddIcon from "../icons/Add/AddIcon";
import MoreIcon from "../icons/More/MoreIcon";
import TrashcanIcon from "../icons/Trashcan/TrashcanIcon";
import Tooltip from "../Tooltip";
import { ColumnTitle, ColumnTitleContainer } from "./ColumnElements";


interface ColumnHeaderProps {
    title: string
    handleEditList: (title: string) => void
    handleDeleteList: () => void
    handleAddCard: () => void
}

const ColumnHeader = ({title, handleDeleteList, handleEditList, handleAddCard}: ColumnHeaderProps) => {
    return (
        <ColumnTitleContainer>
            <ColumnTitle>
                <EditableItem
                    deleteItem={handleDeleteList}
                    editItem={() => {}}
                    initialText={title}
                    placeholder="Enter List Title"
                    updateItem={handleEditList}
                />
            </ColumnTitle>
            <Tooltip
                content={
                    <ButtonGroup spacing={2} direction="column">
                        <Button
                            size="lg"
                            Icon={<AddIcon />}
                            onClick={handleAddCard}
                            fw="700"
                        >
                            Add Card
                        </Button>
                        <Button
                            size="lg"
                            colorScheme="error"
                            Icon={<TrashcanIcon />}
                            onClick={handleDeleteList}
                            fw="700"
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                }
                direction="bottom"
            >
                <Button shape="icon" variant="outline" size="lg">
                    <MoreIcon />
                </Button>
            </Tooltip>
        </ColumnTitleContainer>
    );
};

export default ColumnHeader;
