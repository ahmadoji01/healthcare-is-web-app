import { Category, categoryMapper } from "@/modules/categories/domain/category";
import { defaultCategory } from "@/modules/categories/domain/category";

export interface Item {
    id: number,
    code: string,
    name: string,
    stock: number,
    category: Category,
    price: number,
}

export const defaultItem: Item = {
    id: 0,
    code: "",
    name: "",
    stock: 0,
    category: defaultCategory,
    price: 0,
}

export function itemMapper(res:Record<string,any>) {
    let item = defaultItem;
    item = { 
        id: res.id,
        name: res.name, 
        code: res.code,
        price: res.price,
        stock: res.stock,
        category: categoryMapper(res.category),
    }
    return item;
}

export type ItemCreator = Omit<Item, 'id'|'category'> & { category:number, organization: number };
export function itemCreatorMapper(item:Item, catID:number, orgID:number) {

    let itemCreator: ItemCreator = { 
        name: item.name, 
        code: item.code,
        price: item.price,
        stock: item.stock,
        category: catID,
        organization: orgID,
    }
    return itemCreator;
}

export type ItemPatcher = Omit<Item, 'id'|'category'> & { category:number };
export function itemPatcherMapper(item:Item) {
    let itemPatcher:ItemPatcher = {
        name: item.name, 
        code: item.code,
        price: item.price,
        stock: item.stock,
        category: item.category.id,
    }
    return itemPatcher;
}