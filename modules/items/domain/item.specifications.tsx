export function categoryNameEquals(name:string) {
    return { "category": 
        { "name": { _eq: name } } 
    }
}

export function parentNameEquals(name:string) {
    return { "category": 
        { "parent": 
            { "name": { _eq: name }  }
        }
    }
}

export function superParentNameEquals(name:string) {
    return { "category": 
        { "super_parent": 
            { "name": { _eq: name }  }
        }
    }
}

export const medicineItemsFilter = {
    _or: [
        {
            "category": { "super_parent": { "name": { _eq: "Medicines" } } }
        },
        {
            "category": { "name": { _eq: "Medicines" } } 
        }
    ]
}

export const treatmentItemsFilter = {
    _or: [
        {
            "category": { "super_parent": { "name": { _eq: "Treatments" } } }
        },
        {
            "category": { "name": { _eq: "Treatments" } } 
        }
    ]
}