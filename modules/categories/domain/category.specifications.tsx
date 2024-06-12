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