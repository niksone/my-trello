export const moveItem = <T>(arr: T[], sourceIndex: number, destIndex: number) => {
    const item = arr.splice(sourceIndex, 1)[0]
    arr.splice(destIndex, 0, item)
    return arr
}