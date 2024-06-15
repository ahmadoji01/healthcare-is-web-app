export function nameEquals(name:string) {
    return  { "name": { _eq: name } } 
}

export function parentNameEquals(name:string) {
    return { "category": 
        { "parent": 
            { "name": { _eq: name }  }
        }
    }
}

export function superNameEquals(name:string) {
    return { "super_parent": { "name": { _eq: name }  } }
}

export const medicineCategoriesFilter = {
    _or: [
        {
            "super_parent": { "name": { _eq: "Medicines" } }
        },
        {
            "name": { _eq: "Medicines" } 
        }
    ]
}

export const treatmentCategoriesFilter = {
    _or: [
        {
            "super_parent": { "name": { _eq: "Treatments" } }
        },
        {
            "name": { _eq: "Treatments" } 
        }
    ]
}