export const moveItemBetweenLists = <T>(arrSource: T[], arrDest: T[], sourceElIndex: number, destElIndex: number) => {    
    const item = arrSource.splice(sourceElIndex, 1)[0]
    arrDest.splice(destElIndex, 0, item)
}