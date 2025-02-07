export const apiConfig = {
  token:{
    getAccessToken : "/api/refresh-token"
  },
  admin: {
    login: "/auth/admin/login",
  },
  auth: {
    google: "/google-auth",
    sendOtp: "/send-otp",
    loginOtp: "/login-Otp",
    verifyOtp: "/verify-otp",
    verifyLoginOtp: "/verify-loginotp",
    logout: "/logout",
  },
  users: {
    getUser: "/users/:id",
    createUser: "/users",
    updateUser: "/users/:id",
  },
  kitchens: {
    newkitchens: "/kitchens/new",
    updatekitchens: (kitchenId: string | undefined) =>
      `/kitchens/update/${kitchenId}`,
    deletekitchens: (kitchenId: string | undefined) =>
      `/kitchens/delete /${kitchenId}`,
    getAllkitchens: "/kitchens/all",
    getkitchensById: (kitchenId: string | undefined) =>
      `/kitchens/${kitchenId}`,
  },
  organization: {
    newOrganization: "/organization/new",
    updateOrganization: (orgId: string | undefined) =>
      `/organization/update/${orgId}`,
    deleteOrganization: (orgId: string | undefined) =>
      `/organization/delete/${orgId}`,
    getAllOrganization: "/organization/all",
    getOrganizationById: (orgId: string | undefined) =>
      `/organization/${orgId}`,
  },
};
