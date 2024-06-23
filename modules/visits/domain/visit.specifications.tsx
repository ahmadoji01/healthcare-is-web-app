import { useTranslation } from "react-i18next";
import { VISIT_STATUS } from "./visit.constants";
import moment from "moment";


export function statusEquals(status:string) {
    return { status: { _eq: status }  }
}

export function statusNotEqual(status:string) {
    return { status: { _neq: status }  }
}

export function statusDisplay(status:string) {
    
    const {t} = useTranslation();

    switch (status) {
        case VISIT_STATUS.active:
            return t('visits_status.active');
        case VISIT_STATUS.cancelled:
            return t('visits_status.cancelled');
        case VISIT_STATUS.examined:
            return t('visits_status.examined');
        case VISIT_STATUS.waiting:
            return t('visits_status.waiting');
        case VISIT_STATUS.temporary_leave:
            return t('visits_status.temporary_leave');
        case VISIT_STATUS.examining:
            return t('visits_status.examining');
        case VISIT_STATUS.to_be_examined:
            return t('visits_status.to_be_examined');
        case VISIT_STATUS.inactive:
            return t('visits_status.inactive');
        default:
            return "";
    }
}

export function monthFilter(month:number):object {
    return { "month(date_updated)": { _eq: month } }
}

export function yearFilter(year:number):object {
    return { "year(date_updated)": { _eq: year } }
}

export function dateRangeFilter(from:Date, to:Date) {
    return { "date_updated": { _between: [moment(from).format("YYYY-MM-DD"), moment(to).format("YYYY-MM-DD")]  } }
}