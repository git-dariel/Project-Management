module.exports = {
  API_ENDPOINTS: {
    MAIN: {
      DEFAULT: '/api',
    },

    USER: {
      GET: '/user/get/all',
      POST: '/user/create',
      GETBYID: '/user/get/:id',
      UPDATE: '/user/update/:id',
      DELETE: '/user/remove/:id',
      CHECKLOGIN: '/current/login',
      LOGIN: '/user/login',
    },

    PROJECT: {
      GET: '/project/get/all',
      POST: '/project/create',
      GETBYID: '/project/get',
      UPDATE: '/project/update/:id',
      DELETE: '/project/remove/:id',
      ADDMEMBER: '/project/adduser/:projectId',
    },

    MEMBER: {
      GETBYID: '/member/get/:projectId',
      DEACTIVATE: '/member/deactivate/:projectId/:userId',
      ACTIVATE: '/member/activate/:projectId/:userId',
    },

    STAGE: {
      GET: '/stage/get/all',
      POST: '/stage/:projectId/create',
    },
  },
};
