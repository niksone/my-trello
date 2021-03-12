export type BoardAction = SetBoard | AddBoard

interface SetBoard {type: 'SET_BOARD', payload: any}

interface AddBoard {type: 'ADD_BOARD', payload: {name: string}}