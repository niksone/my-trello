import {applyMiddleware, combineReducers, createStore} from 'redux'
import { boardReducer } from './Board/reducer'
import { addItemReducer } from './HandleItems/reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    addItem: addItemReducer,
    boards: boardReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))