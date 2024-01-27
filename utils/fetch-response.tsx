export interface FetchResponse {
    error: boolean,
    loading: boolean,
    statusCode: number,
    errorMessage: string,
    data: object,
}

export const defaultResponse: FetchResponse = {
    error: false,
    loading: false,
    statusCode: 0,
    errorMessage: "",
    data: {},
}