export const apiConfig = {
  token: {
    getAccessToken: "/api/refresh-token",
  },
  admin: {
    login: "/auth/admin/login",
    generateForgotOtp: "/auth/admin/forgot-password",
    verifyForgotOtp: "/auth/admin/verify-password",
    updatePassword: "/auth/admin/update-password",
  },
  auth: {
    google: "/google-auth",
    sendOtp: "/send-otp",
    loginOtp: "/login-Otp",
    verifyOtp: "/verify-otp",
    verifyLoginOtp: "/verify-loginotp",
    logout: "/logout",
    accessAccount:"/user/access/login"
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
    getAllkitchens: (query: any) =>
      `/kitchens/all?page=${query.page}&limit=${query.limit}`,
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
    getAllOrganization:(query:any)=> `/organization/all?page=${query.page}&limit=${query.limit}`,    
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

    createItem: "/menu-items/allmenuitems",
    listItems: "/menu-items/allmenuitems",
    getItemById: (id: string | undefined) => `/menu-items/allmenuitems/${id}`,
    updateItem: (id: string | undefined) => `/menu-items/allmenuitems/${id}`,
    deleteItem: (id: string | undefined) => `/menu-items/allmenuitems/${id}`,
    changeItemStatus: (id: string | undefined) =>
      `/menu-items/allmenuitems/${id}/status`,
  },
  designation: {
    createDesignation: "/designation/designations",
    getAllDesignations: "/designation/designations/all",
    getDesignationById: (id: string | undefined) =>
      `/designation/designations/${id}`,
    updateDesignation: (id: string | undefined) =>
      `/designation/designations/${id}`,
    deleteDesignation: (id: string | undefined) =>
      `/designation/designations/${id}`,
    toggleDesignationStatus: (id: string | undefined) =>
      `/designation/designations/${id}/toggle-status`,
  },
  employee: {
    createEmployee: "/employee/employees",
    getAllEmployees: "/employee/employees/all",
    getEmployeeById: (id: string | undefined) => `/employee/employees/${id}`,
    updateEmployee: (id: string | undefined) => `/employee/employees/${id}`,
    deleteEmployee: (id: string | undefined) => `/employee/employees/${id}`,
    toggleEmployeeStatus: (id: string | undefined) =>
      `/employee/employees/${id}/toggle-status`,
  },
  orgemployee: {
    createOrgEmployee: "/org-employee/orgemployee",
    getAllOrgEmployees: "/org-employee/orgemployee/all",
    getOrgEmployeeById: (id: string | undefined) =>
      `/org-employee/orgemployee/${id}`,
    updateOrgEmployee: (id: string | undefined) =>
      `/org-employee/orgemployee/${id}`,
    deleteOrgEmployee: (id: string | undefined) =>
      `/org-employee/orgemployee/${id}`,
    toggleOrgEmployeeStatus: (id: string | undefined) =>
      `/org-employee/orgemployee/${id}/toggle-status`,
  },
  kitchenMenu: {
    getKitchenMenu: (id: string | undefined) =>
      `/kitchens-menu/kitchen-menu/${id}`,
    createkitchenMenu: (id: string | undefined) =>
      `/kitchens-menu/kitchen-menu/${id}`,
    removekitchenMenu: (
      item: string | undefined,
      kitchenId: string | undefined
    ) => `/kitchens-menu/kitchen-menu/${kitchenId}/remove/${item}`,
    kitchenMenuItemChange: (
      kitchenId: string | undefined,
      itemId: string | undefined
    ) => `/kitchens-menu/${kitchenId}/menu-item/${itemId}`,
  },

  kitchenMenu: {
    getKitchenMenu: (id: string | undefined) => `/kitchen-menu/${id}`,
    removekitchenMenu: (item: string | undefined, kitchenId: string | undefined) => `/kitchen-menu/${kitchenId}/item/${item}`,
    createkitchenMenu: (id: string | undefined) => `/kitchen-menu/${id}`,
    kitchenMenuItemChange: (kitchenId: string | undefined, itemId: string | undefined) => `/kitchen-menu/${kitchenId}/item/${itemId}`,
  },

  addressDetails:{
    getAllCountries:"/addressDetails/allcountries",
    getStatesByCountry:(countryName: string |undefined)=>`/addressDetails/states/${countryName}`,
    getCitiesByState:(stateName: string | undefined)=>`/addressDetails/cities/${stateName}`,
    getDistrictsByState:(stateId: string | undefined)=>`/addressDetails/districts/${stateId}`
  }
};
