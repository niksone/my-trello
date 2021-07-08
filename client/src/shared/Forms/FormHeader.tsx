import React from 'react'
import ConditionalWrapper from '../ConditionalWrapper'
import EditableItem from '../EditableItem'
import { FormContainer, FormSubtitle, FormTitle, FormTitleContainer } from './FormElements'

interface FormHeaderProps {
    title: string,
    handleTitleUpdate?: (text: string) => void
    subtitle: string
    handleSubtitleUpdate?: (text: string) => void
    editable?: boolean
    placeholderColor?: string

}

const FormHeader = ({title, handleTitleUpdate, subtitle, handleSubtitleUpdate, editable = false, placeholderColor}: FormHeaderProps) => {
    console.log(subtitle, title);
    return (
        <FormTitleContainer>
            <FormContainer>
            <FormTitle>
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
                        />
                    : title
                }
            </FormTitle>
            <FormSubtitle>
                {
                    editable 
                    ?
                    <EditableItem
                        initialText={subtitle}
                        deleteItem={() => {}}
                        editItem={() => {}}
                        placeholder='Enter subtitle'
                        updateItem={(text) => handleSubtitleUpdate && handleSubtitleUpdate(text)}
                    />
                    : subtitle
                }   
            </FormSubtitle>
            </FormContainer>
        </FormTitleContainer>
    )
}

export default FormHeader
