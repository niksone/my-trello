import {combineReducers, createStore} from 'redux'
import { addItemReducer } from './reducer'
import {AddItemState} from './reducer'

const rootReducer = combineReducers({
    addItem: addItemReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)