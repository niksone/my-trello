

export const boards = [
    {
        id: 'board1',
        name: 'Board 1',
        lists: [
        {   
            id: '100',
            title: 'Column 1',
            tasks: [
                {text: 'Task 1', id: '0'},
                {text: 'Task 2', id: '1'},
            ]
        },
        {
            id: '200',
            title: 'Column 2',
            tasks: [
                {text: 'Task 3', id: '2'},
                {text: 'Task 4', id: '3'},
                {text: 'Task 5', id: '4'},
            ]
        },
        {
            id: '300',
            title: 'Column 3',
            tasks: [
                {text: 'Task 6', id: '5'},
                {text: 'Task 7', id: '6'},
                {text: 'Task 8', id: '7'},
                {text: 'Task 9', id: '8'},
            ]
        },      
    ],
    
        taskIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
        draggedListId: '',
        draggedCardId: ''
    },
    {
        id: 'board2',
        name: 'Board 2',
        lists: [
        {   
            id: '100',
            title: 'Column 1',
            tasks: [
                {text: 'Task 1', id: '0'},
                {text: 'Task 2', id: '1'},
            ]
        },
        {
            id: '200',
            title: 'Column 2',
            tasks: [
                {text: 'Task 3', id: '2'},
                {text: 'Task 4', id: '3'},
                {text: 'Task 5', id: '4'},
            ]
        },
    
    ],
        
        taskIds: ['0', '1', '2', '3', '4'],
        draggedListId: '',
        draggedCardId: ''
    },
    {
        id: 'board3',
        name: 'Board 3',
        lists: [
        {   
            id: '100',
            title: 'Column 1',
            tasks: [
                {text: 'Task 1', id: '0'},
                {text: 'Task 2', id: '1'},
            ]
        },

        {
            id: '300',
            title: 'Column 3',
            tasks: [
                {text: 'Task 6', id: '5'},
                {text: 'Task 7', id: '6'},
                {text: 'Task 8', id: '7'},
                {text: 'Task 9', id: '8'},
            ]
        },      
        ],
        taskIds: ['0', '1', '5', '6', '7', '8'],
        draggedListId: '',
        draggedCardId: ''
    }
]