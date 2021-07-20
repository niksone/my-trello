import { useDispatch } from "react-redux";
import { BoardI } from "../../redux/Board/interfaces";
import { addList, deleteList, moveList, updateListTitle } from "../../redux/HandleItems/actionCreators";
import { List } from "../../redux/HandleItems/interfaces";
import Button from "../Buttons";
import ButtonGroup from "../Buttons/ButtonGroup";
import { BREAKPOINTS } from "../constants";
import { HandleAddItemButton, HandleEditItemsButton, HandleMoveItemsButton } from "../HandleButtons/HandleButtons";
import LogoutIcon from "../icons/Logout/LogoutIcon";
import MenuIcon from "../icons/Menu/MenuIcon";
import MoreIcon from "../icons/More/MoreIcon";
import { ShowContainer } from "../ShowContainer";
import Tooltip from "../Tooltip";
import { HeaderContainer, HeaderTitle, HeaderWrapper } from "./HeaderElements";


interface BoardHeaderProps {
    board: BoardI;
    lists: List[];
    sidebarOpen: () => void;
    handleLogout: () => void;
}

const Header = ({
    board,
    lists,
    sidebarOpen,
    handleLogout,
}: BoardHeaderProps) => {
    const dispatch = useDispatch();

    const handleAddList = (title: string) =>
        dispatch(addList(board._id, title));

    const handleDeleteList = (listId: string) =>
        dispatch(deleteList(board._id, listId));

    const handleEditList = (listId: string, title: string) =>
        dispatch(updateListTitle(board._id, listId, title));

    const handleListMove = (sourceIndex: number, destIndex: number) =>
        dispatch(moveList(board._id, sourceIndex, destIndex));

    return (
        <>
            <HeaderContainer>
                <HeaderWrapper>
                    <ShowContainer widthTo={BREAKPOINTS.laptop}>
                        <Button
                            shape="icon"
                            size="lg"
                            onClick={sidebarOpen}
                            variant='outline'
                            bg='#fff'
                        >
                            <MenuIcon />
                        </Button>
                    </ShowContainer>
                    <HeaderTitle>{board.name || "No Board Found"}</HeaderTitle>

                    <ShowContainer widthTo={BREAKPOINTS.laptop}>
                        <Tooltip
                            content={
                                <ButtonGroup direction="column" spacing={2}>
                                    {board._id && (
                                        <>
                                            <HandleAddItemButton
                                                label="Add List"
                                                formTitle="Add List"
                                                handleAddList={handleAddList}
                                            />

                                            <HandleEditItemsButton
                                                label="Edit Lists"
                                                items={lists}
                                                onAdd={handleAddList}
                                                onDelete={handleDeleteList}
                                                onEdit={handleEditList}
                                                headerTitle="Edit Lists"
                                                title="Edit List"
                                                subtitle="Rename, add or delete a list"
                                                formPlaceholder="Add List"
                                                formItemFieldLabel="title"
                                            />

                                            <HandleMoveItemsButton
                                                label="Move Lists"
                                                headerTitle="Move Lists"
                                                title="Move List"
                                                subtitle="Simply change lists order using Drag and Drop"
                                                items={lists}
                                                itemLabelField="title"
                                                onUpdate={(
                                                    sourceIndex: number,
                                                    destIndex: number
                                                ) =>
                                                    handleListMove(
                                                        sourceIndex,
                                                        destIndex
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                    <Button
                                        onClick={handleLogout}
                                        Icon={<LogoutIcon />}
                                        colorScheme="error"
                                    >
                                        Log Out
                                    </Button>
                                </ButtonGroup>
                            }
                            direction="bottom"
                        >
                            <Button 
                                shape="icon" 
                                size="lg"
                                variant='outline'
                                bg='#fff'
                            >
                                <MoreIcon />
                            </Button>
                        </Tooltip>
                    </ShowContainer>

                    <ShowContainer widthFrom={BREAKPOINTS.laptop}>
                        <Button
                            onClick={handleLogout}
                            size="md"
                            colorScheme="errorLight"
                        >
                            logout
                        </Button>
                    </ShowContainer>
                </HeaderWrapper>
            </HeaderContainer>
        </>
    );
};

export default Header;
