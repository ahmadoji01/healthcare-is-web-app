export function visitFilter(id:number):object {
    return { visit: { _eq: id } };
}