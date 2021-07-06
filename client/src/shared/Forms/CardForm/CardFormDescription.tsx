
import EditableItem from '../../EditableItem'
import { FormBlock, FormBlockTitle, FormDescriptionContainer, FormText} from '../FormElements'

type FormDescriptionProps ={ 
    title: string
    initialText: string
    onUpdate: (text: string) => void
}

const CardFormDescription = ({title, initialText, onUpdate}: FormDescriptionProps) => {
    return (
        <FormBlock>
        <FormDescriptionContainer>
            <FormBlockTitle>
                {title}
            </FormBlockTitle>
            <FormText>
                <EditableItem
                    initialText={initialText}
                    deleteItem={() => {}}
                    editItem={() => {}}
                    placeholder='Enter Description'
                    updateItem={(text: string) => onUpdate(text)}
                />
            </FormText>
        </FormDescriptionContainer>
    </FormBlock>
    )
}

export default CardFormDescription
