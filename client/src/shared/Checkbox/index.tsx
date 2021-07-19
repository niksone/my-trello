import React, { useState } from 'react'
import { CheckboxContainer, CheckboxInput, CheckboxText, CheckboxWrapper, Checkmark } from './CheckboxElements'
import CheckmarkIcon from '../icons/Checkmark'

interface CheckboxProps {
    checked: boolean,
    onChange?: () => void
}

const Checkbox = ({children, checked, onChange}: React.PropsWithChildren<CheckboxProps>) => {
    const [inputChecked, setInputChecked] = useState(checked)

    const changeHandle = () => {
        setInputChecked(!inputChecked)
        onChange && onChange()
    }
    return (
        <CheckboxContainer>
            <CheckboxWrapper>
                <CheckboxInput 
                    type="checkbox" 
                    name="" 
                    id="" 
                    checked={inputChecked} 
                    onChange={changeHandle}
                />
                <Checkmark>
                    <CheckmarkIcon fill={'white'}/>
                </Checkmark>
            </CheckboxWrapper>
            {children && <CheckboxText checked={inputChecked}>{children}</CheckboxText>}
        </CheckboxContainer>
    )
}

export default Checkbox
