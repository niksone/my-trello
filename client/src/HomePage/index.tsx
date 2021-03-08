import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { boards } from '../data'
import { AddItemState } from '../redux/reducer'
import Header from '../shared/Header'

const HomePage = ({data}: any) => {
    const dispatch = useDispatch()
    // console.log(data);

    const getBoardInfo = (id: string) => {
        console.log(data, id);
        console.log(data.find((board: any) => board.id === id));
        return data.find((board: any) => board.id === id).name
    }

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
        </div>
    )
}

export default HomePage
