import {combineReducers, createStore} from 'redux'
import { boardReducer } from './Board/reducer'
import { addItemReducer } from './AddItem/reducer'
import {AddItemState} from './AddItem/reducer'

const rootReducer = combineReducers({
    addItem: addItemReducer,
    boards: boardReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)