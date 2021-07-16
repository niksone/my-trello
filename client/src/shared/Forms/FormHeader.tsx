import EditableItem from '../EditableItem'
import { FormContainer, FormSubtitleWrapper, FormTitleContainer } from './FormElements'
import FormSubtitle from './FormSubtitle';
import FormTitle from './FormTitle';

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
            <FormTitle
                title={title}
                handleTitleUpdate={handleTitleUpdate}
                editable={editable}
                placeholderColor={placeholderColor}
            />
            <FormSubtitle
                subtitle={subtitle}
                editable={editable}
                handleSubtitleUpdate={handleSubtitleUpdate}
            />

            </FormContainer>
        </FormTitleContainer>
    )
}

export default FormHeader
