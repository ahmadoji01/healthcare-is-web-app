import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBusinessTime, faCashRegister, faCreditCard, faFileImport, faFileMedical, faFlask, faHospitalUser, faPerson, faPills, faPrescription, faPrescriptionBottle, faSyringe, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

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
                allowedRole: ["admins", "staffs"],
                icon: faUser,
                url: "patients",
                subMenu: [ 
                    { title: "All Patients", url: "patients" }, 
                    { title: "Add a Patient", url: "patients/create" } 
                ],
            },
            {
                title: "Visits",
                allowedRole: ["admins", "staffs"],
                icon: faHospitalUser,
                url: "visits",
                subMenu: [ 
                    { title: "All Visits", url: "visits" }, 
                    { title: "Create a Visit", url: "visits/create" } 
                ],
            },
        ],
    },
    {
        headerTitle: "RECORD MANAGEMENT",
        menuItems: [
            {
                title: "Medical Records",
                allowedRole: ["admins", "staffs"],
                icon: faFileMedical,
                url: "medical-records",
                subMenu: [ 
                    { title: "All Medical Records", url: "medical-records" }, 
                    { title: "Create a Medical Records", url: "patients/create" } 
                ],
            },
            {
                title: "Lab Results",
                allowedRole: ["admins", "staffs"],
                icon: faFlask,
                url: "lab-results",
                subMenu: [ 
                    { title: "All Lab Results", url: "lab-results" }, 
                    { title: "Create a Lab Result", url: "lab-results/create" } 
                ],
            },
            {
                title: "Submit Record to Satusehat",
                allowedRole: ["admins", "staffs"],
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
                title: "Doctors",
                allowedRole: ["admins", "staffs"],
                icon: faUserDoctor,
                url: "doctors",
                subMenu: [ 
                    { title: "All Doctors", url: "doctors" }, 
                    { title: "Add a Doctor", url: "doctors/create" } 
                ],
            },
            {
                title: "Staffs",
                allowedRole: ["admins", "staffs"],
                icon: faPerson,
                url: "staffs",
                subMenu: [ 
                    { title: "All Staffs", url: "staffs" }, 
                    { title: "Add a Staff", url: "staffs/create" } 
                ],
            },
            {
                title: "Treatments",
                allowedRole: ["admins", "staffs"],
                icon: faSyringe,
                url: "treatments",
                subMenu: [ 
                    { title: "All Treatments", url: "treatments" }, 
                    { title: "Create a Treatment", url: "treatments/create" } 
                ],
            },
            {
                title: "Order History",
                allowedRole: ["admins", "staffs"],
                icon: faCashRegister,
                url: "orders",
                subMenu: [ 
                    { title: "All Order History", url: "orders" }, 
                    { title: "Create an Order History", url: "orders/create" } 
                ],
            },
            {
                title: "Medicines",
                allowedRole: ["admins", "staffs"],
                icon: faPills,
                url: "medicines",
                subMenu: [ 
                    { title: "All Medicines", url: "medicines" }, 
                    { title: "Add a Medicine", url: "medicines/create" } 
                ],
            },
        ],
    },
    {
        headerTitle: "SETTINGS",
        menuItems: [
            {
                title: "Opening Hours",
                allowedRole: ["admins", "staffs"],
                icon: faBusinessTime,
                url: "opening-hours",
                subMenu: [ 
                    { title: "All Opening Hours", url: "opening-hours" }, 
                    { title: "Add an Opening Hour", url: "opening-hours/create" } 
                ],
            },
            {
                title: "Payment Methods",
                allowedRole: ["admins", "staffs"],
                icon: faCreditCard,
                url: "payment-methods",
                subMenu: [],
            },
            {
                title: "Satusehat Integration",
                allowedRole: ["admins", "staffs"],
                icon: faPrescription,
                url: "satusehat-settings",
                subMenu: [],
            },
            {
                title: "BPJS Integration",
                allowedRole: ["admins", "staffs"],
                icon: faPrescriptionBottle,
                url: "bpjs-settings",
                subMenu: [],
            },
        ],
    },
]