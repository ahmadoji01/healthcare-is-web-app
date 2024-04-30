export function visitFilter(id:number):object {
    return { visit: { _eq: id } };
}

export function statusFilter(status:string):object {
    return { status: { _eq: status } };
}