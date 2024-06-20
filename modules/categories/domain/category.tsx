export interface Category {
    id: number,
    name: string,
    parent: Category|null,
    super_parent: Category|null,
    children: Category[],
}

export const defaultCategory:Category = {
    id: 0,
    name: "",
    parent: null,
    super_parent: null,
    children: [],
}

export const categoryMapper = (res:Record<string,any>) => {
    let category = defaultCategory;
    category = { 
      id: res.id,
      name: res.name,
      parent: res.parent,
      super_parent: res.super_parent,
      children: res.children,
    }
    return category;
}

export type CategoryCreator = Omit<Category, 'id'|'parent'|'super_parent'> & { parent:number|null, super_parent:number|null, organization: number };
export const categoryCreatorMapper = (category:Category, orgID:number) => {
    let categoryCreator:CategoryCreator = {
        name: category.name,
        organization: orgID,
        parent: category.parent? category.parent.id : null,
        super_parent: category.super_parent? category.super_parent.id : null,
        children: category.children,
    }
    return categoryCreator;
};