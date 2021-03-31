import React from 'react'
import { CheckboxContainer, CheckboxInput, CheckboxText, Checkmark } from './CheckboxElements'
import CheckmarkIcon from '../icons/Checkmark'

const Checkbox = ({children}: React.PropsWithChildren<{}>) => {
    return (
        <CheckboxContainer>
            <CheckboxInput type="checkbox" name="" id=""/>
            <Checkmark>
                <CheckmarkIcon fill={'white'}/>
            </Checkmark>
            <CheckboxText>{children}</CheckboxText>
        </CheckboxContainer>
    )
}

export default Checkbox
