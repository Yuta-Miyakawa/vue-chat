const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/setup',
    name: 'Setup',
    // meta: { title: '認証' },
    component: () => import('src/layouts/AuthLogin.vue'),
  },
  {
    path: '/callback',
    name: 'Callback',
    // meta: { title: '認証' },
    component: () => import('layouts/AuthCallbackLayout.vue'),
  },
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: () => import('layouts/SignUpPage.vue'),
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/LoginPage.vue'),
  },
  
  {
    path: "/system",
    name: "System",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "SystemMain",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "kanban",
        name: "SystemTodoBoard",
        component: () => import("src/pages/KanbanBoard.vue"),
      },
      {
        path: "Contactlist",
        name: "SystemContactlist",
        component: () => import("src/pages/Contactlist.vue"),
      },
      {
        path: "DankaList/:id/:page",
        name: "user-detail",
        component: () => import("src/pages/DankaListDetail.vue"),
      },
      {
        path: "DankaList/:filter/:id/:page",
        name: "search-user-detail",
        component: () => import("src/pages/DankaListDetail.vue"),
      },
      {
        path: "DankaList",
        name: "DankaList",
        component: () => import("src/pages/DankaList.vue"),
      },
      {
        path: "DankaList2",
        name: "TestFiledanka",
        component: () => import("src/pages/TestFiledanka.vue"),
      },
      {
        path: "Pastbook",
        name: "Pastbook",
        component: () => import("src/pages/TestFilePast.vue"),
      },
      // {
      //   path: "DankaList/:page",
      //   name: "BackDankaList",
      //   component: () => import("src/pages/DankaList.vue"),
      // },
      {
        path: "vuecal",
        name: "vue-cal",
        component: () => import("pages/VueCalendar.vue"),
      },
      {
        path: "anniversarycal",
        name: "anniversarycal",
        component: () => import("pages/AnniversaryCalendar.vue"),
      },
      {
        path: "dateofdeathcal",
        name: "dateofdeathcal",
        component: () => import("pages/DateofDeathCalendar.vue"),
      },
      {
        path: "celebrationcal",
        name: "celebrationcal",
        component: () => import("pages/CelebrationYearCalendar.vue"),
      },
      // {
      //   path: "email",
      //   name: "email",
      //   component: () => import("src/pages/Email.vue"),
      // },
      {
        path: "templateform",
        name: "templateform",
        component: () => import("src/pages/TemplateForm.vue"),
      },
      {
        path: "chat",
        name: "chatwork",
        component: () => import("src/pages/Chatwork.vue"),
      },
      {
        path: "myprofile",
        name: "myProfile",
        component: () => import("src/pages/tenantmyProfiles.vue"),
      },
      {
        path: "Announce",
        name: "Announcework",
        component: () => import("src/pages/Announcework.vue"),
      },
      {
        path: "Announcehistory",
        name: "Announcehistory",
        component: () => import("src/pages/Announcehistory.vue"),
      },
      {
        path: "Announcehistory/:id",
        name: "AnnouncehistoryDeteil",
        component: () => import("src/pages/AnnouncehistoryDeteil.vue"),
      },
      {
        path: "test",
        name: "ContactTest",
        component: () => import("src/pages/ContactTest.vue"),
      },
      {
        path: "chattest",
        name: "ChatworkTest",
        component: () => import("src/pages/ChatworkTest.vue"),
      },
      
    ],
    // TODO: Delete this later
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
