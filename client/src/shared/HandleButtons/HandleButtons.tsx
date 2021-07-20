import { useRef } from "react";
import AddItemForm from "../AddNewItem/AddItemForm";
import EditItemsForm, { EditItemsFormProps } from "../Forms/EditItemsForm";
import { ItemI, ItemLabelField } from "../Forms/interfaces";
import MoveItemsForm from "../Forms/MoveItemsForm";
import AddIcon from "../icons/Add/AddIcon";
import EditIcon from "../icons/Edit/EditIcon";
import OrderIcon from "../icons/Order/OrderIcon";
import {
    ButtonModalCreator,
    ButtonModalCreatorRef,
} from "./ButtonModalCreator";

interface HandleAddItemProps {
    handleAddList: (title: string) => void
    label: string
    formTitle: string
}

export const HandleAddItemButton = ({ handleAddList, label, formTitle }: HandleAddItemProps) => {
    const buttonRef = useRef<ButtonModalCreatorRef>(null);

    const handleAdd = (title: string) => {
        handleAddList(title);
        buttonRef!.current!.close();
    };

    return (
        <ButtonModalCreator
            label={label}
            Icon={<AddIcon />}
            ref={buttonRef}
            Item={
                <AddItemForm
                    btnItem="ADD"
                    item="FORM"
                    title={formTitle}
                    onAdd={(title) => handleAdd(title)}
                />
            }
        />
    );
};

interface HandleMoveItemsButtonProps{
    label: string
    headerTitle: string
    title: string
    subtitle: string
    items: ItemI[]
    itemLabelField: ItemLabelField
    onUpdate: (sourceIndex: number, destinationIndex: number) => void
}

export const HandleMoveItemsButton = ({
    label,
    headerTitle,
    title,
    subtitle,
    items,
    itemLabelField,
    onUpdate
}: HandleMoveItemsButtonProps) => {
    const buttonRef = useRef<ButtonModalCreatorRef>(null);

    const handleExit = () => {
        buttonRef!.current!.close();
    };

    return (
        <ButtonModalCreator
            label={label}
            Icon={<OrderIcon />}
            ref={buttonRef}
            Item={
                <MoveItemsForm
                    headerTitle={headerTitle}
                    title={title}
                    subtitle={subtitle}
                    items={items}
                    itemLabelField={itemLabelField}
                    onUpdate={onUpdate}
                    onExit={handleExit}
                />
            }
        />
    );
};

interface HandleEditItemsButtonProps
    extends Omit<EditItemsFormProps, "onExit"> {
    label: string;
}
export const HandleEditItemsButton = ({
    label,
    items,
    onDelete,
    onAdd,
    onEdit,
    headerTitle,
    title,
    subtitle,
    formPlaceholder,
    formItemFieldLabel,
}: HandleEditItemsButtonProps) => {
    const buttonRef = useRef<ButtonModalCreatorRef>(null);

    const handleExit = () => {
        buttonRef!.current!.close();
    };

    return (
        <ButtonModalCreator
            label={label}
            Icon={<EditIcon />}
            ref={buttonRef}
            Item={
                <EditItemsForm
                    onExit={handleExit}
                    items={items}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    headerTitle={headerTitle}
                    title={title}
                    subtitle={subtitle}
                    formPlaceholder={formPlaceholder}
                    formItemFieldLabel={formItemFieldLabel}
                />
            }
        />
    );
};
