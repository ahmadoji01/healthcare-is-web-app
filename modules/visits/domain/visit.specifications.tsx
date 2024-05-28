import { VISIT_STATUS } from "./visit.constants"

export function statusEquals(status:string) {
    return { status: { _eq: status }  }
}

export function statusNotEqual(status:string) {
    return { status: { _neq: status }  }
}

export function statusDisplay(status:string) {
    switch (status) {
        case VISIT_STATUS.active:
            return "Active";
        case VISIT_STATUS.cancelled:
            return "Cancelled";
        case VISIT_STATUS.examined:
            return "Examined";
        case VISIT_STATUS.waiting:
            return "Waiting on Queue";
        case VISIT_STATUS.temporary_leave:
            return "On Leave";
        case VISIT_STATUS.examining:
            return "Examining";
        case VISIT_STATUS.to_be_examined:
            return "To be Examined";
        case VISIT_STATUS.inactive:
            return "Inactive";
        default:
            return "";
    }
}
