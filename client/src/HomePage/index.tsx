import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authApi } from '../api'
import { userContext } from '../Context'
import { addBoard, Board, getBoards } from '../redux/Board/reducer'
import { RootReducerType } from '../redux/store'
import AddNewItem from '../shared/AddNewItem'
import Header from '../shared/Header'
import { useFetching } from '../utils/useFetching'

const HomePage = () => {

    const {user} = useContext(userContext)
    useFetching(() => getBoards(user))

    const {boards, isLoading} = useSelector((state: RootReducerType) => state.boards)
    const dispatch = useDispatch()


    return (
        
        <div>
            <Header />
            {
                isLoading
                    ? <p>Loading</p>
                    :boards?.map((board: Board) => 
                        <Link to={`/board/${board._id}`} key={board._id} onClick={() => {console.log(board)}}>
                            {board.name}
                        </Link>)
            }  
            <AddNewItem 
                text='Add New Board'
                formText='Add Board'
                item='BOARD'
                onAdd={name => dispatch(addBoard(user, name))}
            />
        </div>
    )
}

export default HomePage
