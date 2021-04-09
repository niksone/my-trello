import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ResizableTextArea from '../ResizableTextArea'
import { EditableItemContainer, EditButton, EditableItemWrapper, SubmitEditButton } from './EditableItemElements'

interface EditableItemProps {
    // children: React.ReactChild,
    initialText: string,
    deleteItem: () => void,
    updateItem: (text: string) => void
    editItem: (text: string) => void,
    Wrapper?: any,
    placeholder: string
}



const EditableItem = ({deleteItem, editItem, updateItem, initialText, placeholder, Wrapper}: EditableItemProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const test = useRef<HTMLSpanElement>(null)

    const handleIsEdit = () => {
      setIsEdit(!isEdit)
    }

    const handleEdit = () => {
        const text = test.current && (test.current.innerText)
        if(text === null) return
        editItem(text)
        // setIsEdit(false)
    }

    useEffect(() => {
        // test?.current?.focus()
        // const onExit = (e: any) => {
        //     // console.log('blur')
        //     console.log(test?.current?.innerText || 'jopa -----------');
        //     e.preventDefault()
        //     e.stopPropagation()
        //     updateItem(test?.current?.innerText || 'jopa -------------') 
        //     document.removeEventListener('focusout', e)
        //     // console.log(object);
            
        // }

        // const onFocus = () => {
        //     // console.log('focus');
        //     // document.addEventListener('focusout', onExit)
        //     if(test.current === document.activeElement){
        //         console.log(test.current)
        //         document.addEventListener('focusout', (e) => onExit(e))
        //     }   
        // }
        // // console.log(test.current, document.activeElement);
        // document.addEventListener('focus', onFocus)
        // // if(test.current === document.activeElement){
        // //     console.log(test.current)
        // //     document.addEventListener('focusout', (e) => onExit)
        // // }   
        
        test.current && (test.current.innerText = initialText)

        // return () => {
            
        //     document.removeEventListener('focus', onFocus)
        // }
    })


    const handleClick = () => {
        console.log('handle click');
         const onExit = (e: any) => {
            updateItem(test?.current?.innerText || '') 
            // test.current && (test.current.innerText = '')
            document.removeEventListener('focusout', onExit)            
        }
        document.addEventListener('focusout', onExit)
    }

    // const handle

    return (
        // !isEdit
        //     ?  
        //     <EditableItemContainer onClick={handleIsEdit}> 
        //             <Wrapper>
        //                     {children}
        //                     {/* <EditButton onClick={handleIsEdit}/> */}
        //             </Wrapper>
        //     </EditableItemContainer>

        //     : 
        
        // <EditableItemContainer>
                    /* <CardContainer> */
                    <span onClick={handleClick}>
                        <ResizableTextArea 
                            ref={test}
                            onChange={() => {}}
                            placeholder={placeholder}
                        />
                        {/* <EditButton style={{backgroundColor: 'red'}} onClick={deleteItem}/> */}
                    </span>
                    /* </CardContainer> */
            /* <SubmitEditButton onClick={handleEdit}>submit</SubmitEditButton> */
        // </EditableItemContainer>   

   
        
    )
}

export default EditableItem
