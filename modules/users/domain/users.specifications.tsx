import { ROLES } from "./users.constants";

export const allowedURL = (role:string) => {
    switch (role) {
        case ROLES.administrator:
            return ['/dashboard', '/operational/front-desk', '/operational/doctor', '/cashier', '/profile', '/documents'];
        case ROLES.cashier:
            return ['/cashier', '/profile', '/documents'];
        case ROLES.doctor:
            return ['/operational/doctor', '/profile', '/documents'];
        case ROLES.front_desk:
            return ['/operational/front-desk', '/profile', '/documents'];
        case ROLES.staff:
            return ['/dashboard', '/profile', '/documents'];
        default:
            return ['/profile'];
    }
}

export const redirectURL = (role:string) => {
    switch (role) {
        case ROLES.administrator:
            return '/dashboard';
        case ROLES.cashier:
            return '/cashier';
        case ROLES.doctor:
            return '/operational/doctor/patients-list';
        case ROLES.front_desk:
            return '/operational/front-desk/queue-manager';
        case ROLES.staff:
            return '/dashboard';
        default:
            return '';
    }
}

export const isURLAllowed = (url:string, role:string) => {
    let allowedURLs = allowedURL(role);
    if (allowedURLs.some(allowed => url.includes(allowed))) {
        return true;
    }
    return false;
}