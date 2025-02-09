export const apiConfig = {
  token: {
    getAccessToken: "/api/refresh-token",
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
      `/kitchens/delete/${kitchenId}`,
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
  menu: {
    createCategory: "/menu-category/categories",
    getAllCategories: "/menu-category/categories",
    updateCategory: (id: string | undefined) =>
      `/menu-category/categories/${id}`,
    deleteCategory: (id: string | undefined) =>
      `/menu-category/categories/${id}`,
    toggleCategoryStatus: (id: string | undefined) =>
      `/menu-category/categories/${id}/toggle-status`,

    createSubcategory: "/sub-menu-category/subcategories",
    getAllSubCategories: "/sub-menu-category/subcategories",
    getSubcategoriesByCategory: (categoryId: string | undefined) =>
      `/sub-menu-category/categories/${categoryId}/subcategories`,
    getSubcategoryById: (id: string | undefined) => `/sub-menu-category/subcategories/${id}`,
    updateSubcategory: (id: string | undefined) => `/sub-menu-category/subcategories/${id}`,
    deleteSubcategory: (id: string | undefined) => `/sub-menu-category/subcategories/${id}`,
    toggleSubcategoryStatus: (id: string | undefined) =>
      `/sub-menu-category/subcategories/${id}/toggle-status`,
  },
};
