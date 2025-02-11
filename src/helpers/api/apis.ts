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

    createCategory: "/kitchens/categories",
    getAllCategories: "/kitchens/categories/all",
    updateCategory: (id: string | undefined) => `/kitchens/categories/${id}`,
    deleteCategory: (id: string | undefined) => `/kitchens/categories/${id}`,
    toggleCategoryStatus: (id: string | undefined) =>
      `/kitchens/categories/${id}/toggle-status`,

    createSubcategory: "/kitchens/subcategories",
    getAllSubCategories: "/kitchens/subcategories/all",
    getSubcategoriesByCategory: (categoryId: string | undefined) =>
      `/kitchens/categories/${categoryId}/subcategories`,
    getSubcategoryById: (id: string | undefined) =>
      `/kitchens/subcategories/${id}`,
    updateSubcategory: (id: string | undefined) =>
      `/kitchens/subcategories/${id}`,
    deleteSubcategory: (id: string | undefined) =>
      `/kitchens/subcategories/${id}`,
    toggleSubcategoryStatus: (id: string | undefined) =>
      `/kitchens/subcategories/${id}/toggle-status`,
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
    getAllCategoriesByStatus: "/organization/category/status",

    createCategory: "/organization/categories",
    getAllCategories: "/organization/categories/all",
    updateCategory: (id: string | undefined) =>
      `/organization/categories/${id}`,
    deleteCategory: (id: string | undefined) =>
      `/organization/categories/${id}`,
    toggleCategoryStatus: (id: string | undefined) =>
      `/organization/categories/${id}/toggle-status`,

    createSubcategory: "/organization/subcategories",
    getAllSubCategories: "/organization/subcategories/all",
    getSubcategoriesByCategory: (categoryId: string | undefined) =>
      `/organization/categories/${categoryId}/subcategories`,
    getSubcategoryById: (id: string | undefined) =>
      `/organization/subcategories/${id}`,
    updateSubcategory: (id: string | undefined) =>
      `/organization/subcategories/${id}`,
    deleteSubcategory: (id: string | undefined) =>
      `/organization/subcategories/${id}`,
    toggleSubcategoryStatus: (id: string | undefined) =>
      `/organization/subcategories/${id}/toggle-status`,
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
    getAllCategoriesByStatus: "/sub-menu-category/category/status",
    getAllSubCategories: "/sub-menu-category/subcategories",
    getSubcategoriesByCategory: (categoryId: string | undefined) =>
      `/sub-menu-category/categories/${categoryId}/subcategories`,
    getSubcategoryById: (id: string | undefined) =>
      `/sub-menu-category/subcategories/${id}`,
    updateSubcategory: (id: string | undefined) =>
      `/sub-menu-category/subcategories/${id}`,
    deleteSubcategory: (id: string | undefined) =>
      `/sub-menu-category/subcategories/${id}`,
    toggleSubcategoryStatus: (id: string | undefined) =>
      `/sub-menu-category/subcategories/${id}/toggle-status`,
  },
};
