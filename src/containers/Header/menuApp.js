export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.system.admin.user-manage', 
        menus: [
            {
                name: 'menu.system.admin.crud', link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.system.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.system.admin.user-doctor', link: '/system/user-doctor',
            },
            {
                name: 'menu.system.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },

    { //Quản lý phòng khám
        name: 'menu.system.admin.clinic', 
        menus: [
            {
                name: 'menu.system.admin.manage-clinic', link: '/system/clinic-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
                // ]
            },
        ]
    },

    { //Quản lý chuyên khoa
        name: 'menu.system.admin.speciality', 
        menus: [
            {
                name: 'menu.system.admin.manage-speciality', link: '/system/speciality-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
                // ]
            },
        ]
    },

    { //Quản lý cẩm nang
        name: 'menu.system.admin.handbook', 
        menus: [
            {
                name: 'menu.system.admin.manage-handbook', link: '/system/handbook-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
                // ]
            },
        ]
    },
];

export const doctorMenu = [
    { //Quản lý người dùng
        name: 'menu.system.admin.user-manage', 
        menus: [
            {
                name: 'menu.system.doctor.manage-schedule', link: '/doctor/manage-schedule',
            }
        ]          

    }
];