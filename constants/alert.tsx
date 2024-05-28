export const ALERT_STATUS = {
    error: 'error',
    success: 'success',
    warning: 'warning',
} 

export const ALERT_MESSAGE = {
    success: 'Your request has successfully been processed!',
    server_error: 'Oops! Something went wrong. Try again!',
    forbidden: 'You are not allowed to do this operation!',
    dataExists: (name:string) => { return 'This ' + name + ' already exists. Please try again with different ' + name + '.' }
}