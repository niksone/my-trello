import React from 'react'
import styled from 'styled-components'
import Button from '../Buttons'
import ButtonGroup from '../Buttons/ButtonGroup'
import Checkbox from '../Checkbox'
import ProgressBar from '../ProgressBar'

export const FormContainer= styled.div`
    max-height: 85%;
    min-width: 30%;
    max-width: 650px;
    background-color: #fff;
    
    border-radius: 4px;
`

export const FormContent = styled.div`
    padding: 22px 28px 0 28px;
`

export const FormBlockTitle = styled.h4`
    font-size: var(--text-h4);
    color: var(--color-primary-dark);
`

export const FormTitleContainer = styled.div``

// export const FormWrapper = styled.div``

export const FormSubtitle = styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
`

export const FormTitle = styled.h3`
    font-size: var(--text-h3);
    color: var(--color-primary-dark);
`


export const FormDescriptionContainer = styled.div``

export const FormDescription = styled.p`
    font-size: var(--text-regular);
`

export const FormBlock = styled.div`
    padding: 26px 0px;
    border-bottom: 1px solid var(--color-resting-outline);

    &:first-child {
        padding-top: 0;
    }
    
    &:last-child{
        border-bottom: none;
    }
`

export const FormButtonsContainer = styled.div`
    padding: 18px 28px;
    background-color: var(--color-primary-light);
`

export const FormChecklistContainer = styled.div`

`

export const FormChecklistTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
`

export const FormChecklistDone = styled.p``

export const FormCheklistItems = styled.div`
    padding-top: 35px;

    & > * {
        padding: 7px 0;
    }
`

const CardForm = () => {
    return (
        <FormContainer>
            <FormContent>
                <FormBlock>
                    <FormTitleContainer>
                        {/* <FormWrapper> */}
                            <FormTitle>Design new UI presentation</FormTitle>
                            <FormSubtitle>Dribble Presentation</FormSubtitle>
                        {/* </FormWrapper> */}
                    </FormTitleContainer>
                </FormBlock>
                <FormBlock>
                    <FormDescriptionContainer>
                        <FormBlockTitle>
                            Description
                        </FormBlockTitle>
                        <FormDescription>
                            When I first got into the online advertising business, I was looking for the magical
                            combination that would put my website into the top search engine rankings, catapult me to
                            the forefront of the minds or individuals looking to buy my product, and generally make me
                            rich beyond my wildest dreams.
                        </FormDescription>
                    </FormDescriptionContainer>
                </FormBlock>
                <FormBlock>
                    <FormChecklistContainer>
                        <FormChecklistTitle>
                            <FormBlockTitle>Checklist</FormBlockTitle>
                            <FormChecklistDone>7 / 14</FormChecklistDone>
                        </FormChecklistTitle>  
                        <ProgressBar value={7/14 * 100}/>
                        <FormCheklistItems>
                            <Checkbox>
                                Design new home page 
                                Design new home page Design new home page 
                                Design new home page Design new home page 
                                Design new home page Design new home page
                            </Checkbox>
                            <Checkbox>Design new home page</Checkbox>
                            <Checkbox>Design new home page</Checkbox>
                            <Checkbox>Design new home page</Checkbox>
                            <Checkbox>Design new home page</Checkbox>
                            <Checkbox>Design new home page</Checkbox>
                        </FormCheklistItems>
                    </FormChecklistContainer>
                
                </FormBlock>
            </FormContent>
            <FormButtonsContainer>
                <ButtonGroup spacing={10}>
                    <Button>Close</Button>
                    <Button>Save</Button>
                </ButtonGroup>
            </FormButtonsContainer>
        </FormContainer>
    )
}

export default CardForm
