import { ROLES } from "@/modules/users/domain/users.constants";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCashRegister, faClinicMedical, faClipboard, faClock, faCreditCard, faDashboard, faFileImport, faFileMedical, faHospitalUser, faNoteSticky, faPerson, faPills, faPrescription, faPrescriptionBottle, faSyringe, faTimes, faUser, faUserDoctor, faUserInjured, faUsers, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";

interface SubMenuItem {
    title: string,
    url: string,
}

interface MenuItem {
    title: string,
    allowedRole: string[],
    icon: IconProp,
    url: string,
    subMenu: SubMenuItem[],
}

interface MenuGroup {
    headerTitle: string,
    menuItems: MenuItem[],
}

export interface UserMenuItem {
    title: string,
    icon: IconProp,
    url: string,
    role: string[]
}

export const sidebarMenuItems: MenuGroup[] = [
    {
        headerTitle: "menu.patient_header",
        menuItems: [
            {
                title: "menu.patient_data",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faUserInjured,
                url: "patients",
                subMenu: [ 
                    { title: "menu.all_patients", url: "patients" }, 
                    { title: "menu.add_patient", url: "patients/create" } 
                ],
            },
            {
                title: "menu.visits",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faHospitalUser,
                url: "visits",
                subMenu: [],
            },
        ],
    },
    {
        headerTitle: "menu.record_header",
        menuItems: [
            {
                title: "menu.medical_records",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faFileMedical,
                url: "medical-records",
                subMenu: [],
            },
            {
                title: "menu.submit_to_satusehat",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faFileImport,
                url: "submit-record",
                subMenu: [],
            },
        ],
    },
    {
        headerTitle: "menu.clinic_header",
        menuItems: [
            {
                title: "menu.account_management",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faUser,
                url: "accounts",
                subMenu: [ 
                    { title: "menu.all_users", url: "accounts" }, 
                    { title: "menu.add_user", url: "accounts/create" } 
                ],
            },
            {
                title: "doctors",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faUserDoctor,
                url: "doctors",
                subMenu: [ 
                    { title: "menu.all_doctors", url: "doctors" }, 
                    { title: "menu.add_doctor", url: "accounts/create?role=Doctor" } 
                ],
            },
            {
                title: "staffs",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPerson,
                url: "staffs",
                subMenu: [ 
                    { title: "menu.all_staffs", url: "staffs" }, 
                    { title: "menu.add_staff", url: "accounts/create?role=Staff" } 
                ],
            },
            {
                title: "treatments",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faSyringe,
                url: "treatments",
                subMenu: [ 
                    { title: "menu.all_treatments", url: "treatments" }, 
                    { title: "menu.add_treatment", url: "treatments/create" } 
                ],
            },
            {
                title: "medicines",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPills,
                url: "medicines",
                subMenu: [ 
                    { title: "menu.all_medicines", url: "medicines" }, 
                    { title: "menu.add_medicines", url: "medicines/create" }, 
                    { title: "medicine_categories", url: "medicines/category" } 
                ],
            },
            {
                title: "order_history",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faCashRegister,
                url: "orders",
                subMenu: [],
            },
        ],
    },
    {
        headerTitle: "menu.settings_header",
        menuItems: [
            {
                title: "menu.tax_and_administrations",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faNoteSticky,
                url: "administration",
                subMenu: [],
            },
            {
                title: "payment_methods",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faCreditCard,
                url: "payment-methods",
                subMenu: [],
            },
            {
                title: "satusehat_integration",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPrescription,
                url: "satusehat-settings",
                subMenu: [],
            },
            {
                title: "bpjs_integration",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPrescriptionBottle,
                url: "bpjs-settings",
                subMenu: [],
            },
        ],
    },
]

export const userMenuItems: UserMenuItem[] = [
    {
        title: "menu.my_profile",
        icon: faUser,
        url: "/dashboard/profile",
        role: [ROLES.administrator, ROLES.apothecary, ROLES.cashier, ROLES.doctor, ROLES.receptionist, ROLES.staff, ROLES.front_desk]
    },
    {
        title: "menu.dashboard",
        icon: faDashboard,
        url: "/dashboard",
        role: [ROLES.administrator, ROLES.apothecary]
    },
    {
        title: "menu.queue_manager",
        icon: faUsersBetweenLines,
        url: "/operational/front-desk/queue-manager",
        role: [ROLES.administrator, ROLES.front_desk]
    },
    {
        title: "patient_registration",
        icon: faClipboard,
        url: "/operational/front-desk/patient-registration",
        role: [ROLES.administrator, ROLES.front_desk]
    },
    {
        title: "clinic_status",
        icon: faClinicMedical,
        url: "/operational/front-desk",
        role: [ROLES.administrator, ROLES.front_desk]
    },
    {
        title: "menu.patients_list",
        icon: faUserInjured,
        url: "/operational/doctor/patients-list",
        role: [ROLES.administrator, ROLES.doctor]
    }
]