import React from 'react'
import EditableItem from '../EditableItem'
import { FormSubtitleWrapper } from './FormElements'

interface FormSubtitleProps {
    subtitle: string
    editable?: boolean
    handleSubtitleUpdate?: (text: string) => void
    maxLength?: number
}

const FormSubtitle = ({subtitle, handleSubtitleUpdate, editable, maxLength}: FormSubtitleProps) => {
    return (
        <FormSubtitleWrapper>
        {
            editable 
            ?
            <EditableItem
                initialText={subtitle}
                deleteItem={() => {}}
                editItem={() => {}}
                placeholder='Enter subtitle'
                updateItem={(text) => handleSubtitleUpdate && handleSubtitleUpdate(text)}
                maxLength={maxLength}
            />
            : subtitle
        }   
    </FormSubtitleWrapper>
    )
}

export default FormSubtitle
