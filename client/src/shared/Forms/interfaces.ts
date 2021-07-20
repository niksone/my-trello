export type ItemWithId = {
    _id: string
}

export type ItemLabelField = 'title' | 'name'

export type ItemWithLabel = Partial<Record<ItemLabelField, string>>

export type ItemI = ItemWithId & ItemWithLabel & {[key: string]: any}