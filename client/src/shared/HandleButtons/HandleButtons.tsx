import { Ref, useRef } from "react"
import AddItemForm from "../AddNewItem/AddItemForm"
import EditItemsForm, { EditItemsFormProps } from "../Forms/EditItemsForm"
import MoveItemsForm from "../Forms/MoveItemsForm"
import AddIcon from "../icons/Add/AddIcon"
import EditIcon from "../icons/Edit/EditIcon"
import OrderIcon from "../icons/Order/OrderIcon"
import { ModalHandle } from "../Modal"
import { ButtonModalCreator, ButtonModalCreatorRef } from "./ButtonModalCreator"


export const HandleAddItemButton = ({handleAddList, label, formTitle, modalRef}) => {
    const buttonRef = useRef<ButtonModalCreatorRef>(null)

    const handleAdd = (title: string) => {
        handleAddList(title)
        buttonRef!.current!.close()
    }

    return (
        <ButtonModalCreator 
            label={label}
            Icon={AddIcon}
            ref={buttonRef}
            Item={
                <AddItemForm btnItem='ADD' item='FORM' title={formTitle} onAdd={
                    // (title: string) => handleAddList(title)
                    (title) => handleAdd(title)
                } />
            }
            modalRef={modalRef}
        />
    )
}

export const HandleMoveItemsButton = ({label, headerTitle, title, modalRef, subtitle, items, itemLabelField, onUpdate}) => {
    const buttonRef = useRef<ButtonModalCreatorRef>(null)

    const handleExit = () => {
        buttonRef!.current!.close()
    }

    return (
        <ButtonModalCreator 
            label={label}
            Icon={OrderIcon}
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
            modalRef={modalRef}
        />
    )
}

interface HandleEditItemsButtonProps extends Omit<EditItemsFormProps, 'onExit'> {
    label: string
    modalRef: Ref<ModalHandle>
}
export const HandleEditItemsButton = ({label, modalRef, items, onDelete, onAdd, onEdit, headerTitle, title, subtitle, formPlaceholder, formItemFieldLabel}: HandleEditItemsButtonProps) => {
    const buttonRef = useRef<ButtonModalCreatorRef>(null)

    const handleExit = () => {
        buttonRef!.current!.close()
    }

    return (
        <ButtonModalCreator 
            label={label}
            Icon={EditIcon}
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
            modalRef={modalRef}
        />
    )
}