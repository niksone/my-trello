import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { boards } from '../data'
import { AddItemState } from '../redux/AddItem/reducer'
import { RootReducerType } from '../redux/store'
import AddNewItem from '../shared/AddNewItem'
import Header from '../shared/Header'

const HomePage = () => {
    const data = useSelector((state: RootReducerType) => state.boards).boards
    const dispatch = useDispatch()
    console.log(data);

    // const getBoardInfo = (id: string) => {
    //     console.log(data, id);
    //     console.log(data.find((board: any) => board.id === id));
    //     return data.find((board: any) => board.id === id).name
    // }

    return (
        
        <div>
            <Header />
            {
                data.map((board: AddItemState) => 
                    <Link to={`/board/${board.id}`} key={board.id} onClick={() => {}}>
                        {/* {console.log(data[board])} */}
                        {board.name}
                    </Link>)
            }  
            <AddNewItem 
                text='Add New Board'
                formText='Add Board'
                item='BOARD'
                onAdd={name => dispatch({type: 'ADD_BOARD', payload: {name}})}
            />
        </div>
    )
}

export default HomePage
