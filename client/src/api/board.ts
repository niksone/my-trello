import { instance } from ".";
import { Card, List } from "../redux/HandleItems/interfaces";
import { Board } from "../redux/Board/interfaces";

export const boardApi = {
    async getBoards(userId: string) {
        const boards = await instance.get<Board[]>('/boards', {params: {userId: userId}})
        return boards
    },

    async addBoard(userId: string, boardName: string) {
        const board = await instance.post<Board>('/boards', {userId, boardName})
        return board
    },

    async deleteBoard(userId: string, boardId: string) {
        const board = await instance.delete<Board>('/boards', {data: {userId, boardId}})
        return board
    },
    async editBoardName(boardId: string, boardName: string) {
        const board = await instance.patch<Board>('/boards', {boardId, boardName})
        return board
    },

    async addList(boardId: string, list: List){
        const listItem = await instance.post<List>('/boards/lists', {boardId, list})
        return listItem
    },

    async deleteList(boardId: string, listId: string) {
        await instance.delete<List>('/boards/list', {data: {boardId, listId}})
    },

    async editListTitle(boardId: string, listId: string, title: string) {
        const updateList = await instance.patch<List>('/boards/list/title', {boardId,listId,title})
        return updateList
    },

    async moveList(boardId: string, sourceIndex: number, destinationIndex: number) {
        const updateBoard = await instance.patch<Board>('/boards/moveList', {boardId,sourceIndex,destinationIndex})
        return updateBoard
    },

    async addCard(boardId: string, listId: string, card: Card){
        const listItem = await instance.post<Card>('/boards/card', {boardId, listId, card})
        return listItem
    },

    async deleteCard(boardId: string, listId: string, cardId: string) {
            const list = await instance.delete<Card>('/boards/card', {data: {boardId, listId, cardId}})
            return list
    },

    async updateCard(boardId: string, listId: string, cardId: string, card: Card){
            const updatedCard = await instance.patch<Card>(
                '/boards/card', 
                {boardId, listId, cardId, card}
            )
            return updatedCard
    },
    async moveCard(
        boardId: string, sourceListIndex: number, destListIndex: number, 
        sourceCardIndex: number, destCardIndex: number
    ) {
        const updateBoard = await instance.patch<Board>(
            '/boards/moveCard', 
            {boardId, sourceListIndex, destListIndex, sourceCardIndex, destCardIndex}
        )
        return updateBoard
    }
}