import EditableItem from "../EditableItem"
import { FormTitleWrapper } from "./FormElements"

interface FormTitleProps {
    title: string
    editable?: boolean
    placeholderColor?: string
    handleTitleUpdate?: (text: string) => void
    maxLength?: number
}

const FormTitle = ({title, placeholderColor, handleTitleUpdate, editable, maxLength}: FormTitleProps) => {
    return (
        <FormTitleWrapper>
        {
            editable 
            ?
                <EditableItem
                    initialText={title}
                    deleteItem={() => {}}
                    editItem={() => {}}
                    placeholder='Enter Title'
                    updateItem={(text) => handleTitleUpdate && handleTitleUpdate(text)}
                    placeholderColor={placeholderColor}
                    maxLength={maxLength}
                />
            : title
        }
    </FormTitleWrapper>
    )
}

export default FormTitle
