export const adminMenu = [
  {
    //Dashborad
    name: "menu.system.admin.dashboard",
    menus: [
      {
        name: "menu.system.admin.dashboard",
        link: "/system/dashboard",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
        // ]
      },
    ],
  },
  {
    //Quản lý người dùng
    name: "menu.system.admin.user-manage",
    menus: [
      // {
      //     name: 'menu.system.admin.crud', link: '/system/user-manage',
      //     // subMenus: [
      //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
      //     //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
      //     // ]
      // },
      {
        name: "menu.system.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.system.admin.user-doctor",
        link: "/system/user-doctor",
      },
      {
        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },

  {
    //Quản lý phòng khám
    name: "menu.system.admin.clinic",
    menus: [
      {
        name: "menu.system.admin.manage-clinic",
        link: "/system/clinic-manage",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
        // ]
      },
      {
        name: "menu.system.admin.list-manage-clinic",
        link: "/system/list-clinic-manage",
      },
    ],
  },

  {
    //Quản lý chuyên khoa
    name: "menu.system.admin.speciality",
    menus: [
      {
        name: "menu.system.admin.manage-speciality",
        link: "/system/speciality-manage",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
        // ]
      },
      {
        name: "menu.system.admin.list-manage-speciality",
        link: "/system/list-speciality-manage",
      },
    ],
  },

  {
    //Quản lý cẩm nang
    name: "menu.system.admin.handbook",
    menus: [
      {
        name: "menu.system.admin.manage-handbook",
        link: "/system/handbook-manage",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.userRedux', link: '/system/user-redux' },
        // ]
      },
      {
        name: "menu.system.admin.list-manage-handbook",
        link: "/system/list-handbook-manage",
      },
    ],
  },
];

export const doctorMenu = [
  {
    //Quản lý người dùng
    name: "menu.system.doctor.user-manage",
    menus: [
      //Quan lich lich kham benh
      {
        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      //Quan ly benh nhan dat lich
      {
        name: "menu.system.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
      {
        name: "menu.system.doctor.manage-patient-ok",
        link: "/doctor/manage-patient-ok",
      },
    ],
  },
];

export const patientMenu = [
  {
    //Quản lý lịch khám
    name: "menu.system.patient.booking-doctor",
    menus: [
      //Quan lich lich kham benh
      {
        name: "menu.system.patient.manage-schedule",
        link: "/system/manage-history-schedule",
      },
    ],
  },
];
