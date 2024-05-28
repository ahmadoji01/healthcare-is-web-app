import { ROLES } from "@/modules/users/domain/users.constants";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCashRegister, faCreditCard, faFileImport, faFileMedical, faHospitalUser, faNoteSticky, faPerson, faPills, faPrescription, faPrescriptionBottle, faSyringe, faUser, faUserDoctor, faUserInjured } from "@fortawesome/free-solid-svg-icons";

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

export const sidebarMenuItems: MenuGroup[] = [
    {
        headerTitle: "PATIENTS",
        menuItems: [
            {
                title: "Patient Data",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faUserInjured,
                url: "patients",
                subMenu: [ 
                    { title: "All Patients", url: "patients" }, 
                    { title: "Add a Patient", url: "patients/create" } 
                ],
            },
            {
                title: "Visits",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faHospitalUser,
                url: "visits",
                subMenu: [],
            },
        ],
    },
    {
        headerTitle: "RECORD MANAGEMENT",
        menuItems: [
            {
                title: "Medical Records",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faFileMedical,
                url: "medical-records",
                subMenu: [],
            },
            {
                title: "Submit Record to Satusehat",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faFileImport,
                url: "submit-record",
                subMenu: [],
            },
        ],
    },
    {
        headerTitle: "CLINIC MANAGEMENT",
        menuItems: [
            {
                title: "Account Management",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faUser,
                url: "accounts",
                subMenu: [ 
                    { title: "All Users", url: "accounts" }, 
                    { title: "Add a User", url: "accounts/create" } 
                ],
            },
            {
                title: "Doctors",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faUserDoctor,
                url: "doctors",
                subMenu: [ 
                    { title: "All Doctors", url: "doctors" }, 
                    { title: "Add a Doctor", url: "accounts/create?role=Doctor" } 
                ],
            },
            {
                title: "Staffs",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPerson,
                url: "staffs",
                subMenu: [ 
                    { title: "All Staffs", url: "staffs" }, 
                    { title: "Add a Staff", url: "accounts/create?role=Staff" } 
                ],
            },
            {
                title: "Treatments",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faSyringe,
                url: "treatments",
                subMenu: [ 
                    { title: "All Treatments", url: "treatments" }, 
                    { title: "Create a Treatment", url: "treatments/create" } 
                ],
            },
            {
                title: "Medicines",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPills,
                url: "medicines",
                subMenu: [ 
                    { title: "All Medicines", url: "medicines" }, 
                    { title: "Add a Medicine", url: "medicines/create" }, 
                    { title: "Medicine Categories", url: "medicines/category" } 
                ],
            },
            {
                title: "Order History",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faCashRegister,
                url: "orders",
                subMenu: [],
            },
        ],
    },
    {
        headerTitle: "SETTINGS",
        menuItems: [
            {
                title: "Tax and Administration",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faNoteSticky,
                url: "administration",
                subMenu: [],
            },
            {
                title: "Payment Methods",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faCreditCard,
                url: "payment-methods",
                subMenu: [],
            },
            {
                title: "Satusehat Integration",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPrescription,
                url: "satusehat-settings",
                subMenu: [],
            },
            {
                title: "BPJS Integration",
                allowedRole: [ROLES.administrator, ROLES.staff],
                icon: faPrescriptionBottle,
                url: "bpjs-settings",
                subMenu: [],
            },
        ],
    },
]