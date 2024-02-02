export const ALERT_STATUS = {
    error: 'error',
    success: 'success',
    warning: 'warning',
} 

export const ALERT_MESSAGE = {
    success: 'Your request has successfully been processed!',
    server_error: 'Oops! Something went wrong. Try again!',
    dataExists: (name:string) => { return 'This ' + name + 'already exists. Click here to see this ' + name + "'s data." }
}