import { useDispatch } from "react-redux";
import { addList, deleteList, moveList, updateListTitle } from "../redux/AddItem/actionCreators";
import { List } from "../redux/AddItem/interfaces";
import { Board } from "../redux/Board/interfaces";
import Button from "../shared/Buttons";
import ButtonGroup from "../shared/Buttons/ButtonGroup";
import { HandleAddItemButton, HandleEditItemsButton, HandleMoveItemsButton } from "../shared/HandleButtons/HandleButtons";
import { HeaderContainer, HeaderWrapper } from "../shared/Header/HeaderElements";
import LogoutIcon from "../shared/icons/Logout/LogoutIcon";
import MenuIcon from "../shared/icons/Menu/MenuIcon";
import MoreIcon from "../shared/icons/More/MoreIcon";
import Tooltip from "../shared/Tooltip";
import { BoardName, ShowContainer } from "./HomePageElements";

interface BoardHeaderProps {
    board: Board
    lists: List[]
    sidebarOpen: () => void
    handleLogout: () => void
}


const BoardHeader = ({board, lists, sidebarOpen, handleLogout}: BoardHeaderProps) => {
    const dispatch = useDispatch()

    // const modalRef = useRef<ModalHandle>(null)

    const handleAddList = (title: string) => dispatch(addList(board._id, title))
    const handleDeleteList = (listId: string) => dispatch(deleteList(board._id, listId))
    const handleEditList = (listId: string, title: string) => dispatch(updateListTitle(board._id, listId, title))

    const handleListMove = (sourceIndex: number, destIndex: number) => dispatch(moveList(board._id, sourceIndex, destIndex))

    return (
        <>
        <HeaderContainer>
            <HeaderWrapper>
                <ShowContainer show={true} mobile={true}>
                    <Button
                        shape="icon"
                        variant="outline"
                        size="lg"
                        onClick={sidebarOpen}
                    >
                        <MenuIcon />
                    </Button>
                </ShowContainer>
                <BoardName>{board.name || "No Board Found"}</BoardName>

                <ShowContainer show={true} mobile={true}>
                    <Tooltip
                        content={
                            <ButtonGroup direction="column" spacing={2}>
                                {board._id && (
                                    <>
                                    <HandleAddItemButton 
                                        label='Add List'
                                        formTitle='Add List'
                                        handleAddList={handleAddList}
                                        // modalRef={modalRef}
                                    />

                                    <HandleEditItemsButton 
                                        label='Edit Lists'
                                        items={lists}
                                        onAdd={handleAddList}
                                        onDelete={handleDeleteList}
                                        onEdit={handleEditList}
                                        headerTitle='Edit Lists'
                                        title='Edit List'
                                        subtitle='Rename, add or delete a list'
                                        formPlaceholder='Add List'
                                        formItemFieldLabel='title'   
                                        // modalRef={modalRef}
 
                                    />

                                    <HandleMoveItemsButton 
                                        label='Move Lists'
                                        headerTitle='Move Lists'
                                        title='Move List'
                                        subtitle='Simply change lists order using Drag and Drop'
                                        items={lists}
                                        itemLabelField='title'
                                        onUpdate={(sourceIndex: number, destIndex: number) => handleListMove(sourceIndex, destIndex)}
                                        // modalRef={modalRef}
                                    />
                                        {/* <Button
                                            onClick={() =>
                                                setShowListModal(true)
                                            }
                                            Icon={AddIcon}
                                        >
                                            Add List
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setShowEditListModal(true)
                                            }
                                            Icon={EditIcon}
                                        >
                                            Edit Lists
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setShowMoveListModal(true)
                                            }
                                            Icon={OrderIcon}
                                        >
                                            Move Lists
                                        </Button> */}
                                    </>
                                    
                                )}
                                <Button
                                    onClick={handleLogout}
                                    Icon={LogoutIcon}
                                    colorScheme="errorLight"
                                >
                                    Log Out
                                </Button>
                            </ButtonGroup>
                        }
                        direction="bottom"
                    >
                        <Button shape="icon" variant="outline" size="lg">
                            <MoreIcon />
                        </Button>
                    </Tooltip>
                </ShowContainer>

                <ShowContainer show={true} mobile={false}>
                    <Button
                        onClick={handleLogout}
                        size="md"
                        colorScheme="error"
                    >
                        logout
                    </Button>
                </ShowContainer>
            </HeaderWrapper>
        </HeaderContainer>
                    {/* {
                        showListModal && 
                        <Modal ref={modalRef} show={showListModal} exit={() => setShowListModal(false)}>
                            <AddItemForm btnItem='ADD' item='FORM' title='Add List' onAdd={(title: string) => handleAddList(title)} /> 
                        </Modal>
                    }
                    {
                        showMoveListModal && 
                        <Modal ref={modalRef} show={showMoveListModal} exit={() => setShowMoveListModal(false)}>
                            <MoveItemsForm 
                                headerTitle='Move Lists'
                                title='Move List'
                                subtitle='Simply change lists order using Drag and Drop'
                                items={lists}
                                itemLabelField='title'
                                onUpdate={(sourceIndex: number, destIndex: number) => handleListMove(sourceIndex, destIndex)}
                                onExit={() => setShowMoveListModal(false)}
                            />
                        </Modal>
                    }
                    { showEditListModal &&
                        <Modal ref={modalRef} show={showEditListModal} exit={() => setShowEditListModal(false)}>
                            <EditListsForm 
                                onExit={() => setShowEditListModal(false)}
                                lists={lists}
                                boardId={currentBoard._id}
                                // onSave={(boards: SimpleBoard[]) => handleSave()}
                            />
                        </Modal>
                    }    */}
                    </>
    );
};

export default BoardHeader;
