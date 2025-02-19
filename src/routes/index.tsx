import React, { Children } from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
import { Details, detailsInfo } from "../pages/apps/Restaurant/Staffdata";
import PaginatedTable from "../pages/apps/Restaurant/StaffDetails";
import List from "../pages/apps/Restaurant/List/";
import MenuCategory from "../pages/apps/menu/MenuCategory";
import MenuSubCategory from "../pages/apps/menu/MenuSubCategory";
import KitchensSubCategories from "../pages/apps/kitchen/KitchensSubCategories";
import KitchensCategories from "../pages/apps/kitchen/KitchensCategories";
import OrgCategories from "../pages/apps/Organizations/OrgCategories";
import OrgSubCategories from "../pages/apps/Organizations/OrgSubCategories";
import OurMenu from "../pages/apps/kitchen/OurMenu";
import MenuItems from "../pages/apps/MenuItems/MenuItems";
import ItemsListing from "../pages/apps/MenuItems/ItemsListing";
import ItemsEditing from "../pages/apps/MenuItems/ItemsEditing";
import EmployeeManagment from "../pages/apps/adminemployee/addemployee";
import EmployeeList from "../pages/apps/adminemployee/listemployee";
import EmployeeEdit from "../pages/apps/adminemployee/editemployee";
import OrgEmployeeManagement from "../pages/apps/organisationemployee/addorgemployee";
import OrgEmployeeList from "../pages/apps/organisationemployee/listorgemployee";
import OrgEmployeeEdit from "../pages/apps/organisationemployee/editorgemployee";
import OrgEmployeeDetails from "../pages/apps/organisationemployee/orgemployeedetails";
import MenuDetails from "../pages/apps/kitchen/MenuDetails";

// import Root from './Root';

// lazy load all the views
// auth

const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Confirm = React.lazy(() => import("../pages/auth/Confirm"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const SignInSignUp = React.lazy(() => import("../pages/auth/SignInSignUp"));
const LockScreen = React.lazy(() => import("../pages/auth/LockScreen"));

// auth2
const Login2 = React.lazy(() => import("../pages/auth2/Login2"));
const Logout2 = React.lazy(() => import("../pages/auth2/Logout2"));
const Register2 = React.lazy(() => import("../pages/auth2/Register2"));
const Confirm2 = React.lazy(() => import("../pages/auth2/Confirm2"));
const ForgetPassword2 = React.lazy(
  () => import("../pages/auth2/ForgetPassword2")
);
const LockScreen2 = React.lazy(() => import("../pages/auth2/LockScreen2"));
const SignInSignUp2 = React.lazy(() => import("../pages/auth2/SignInSignUp2"));

// landing
const Landing = React.lazy(() => import("../pages/landing"));

// dashboard
// const Dashboard1 = React.lazy(() => import("../pages/dashboard/Dashboard1/"));
// const Dashboard2 = React.lazy(() => import("../pages/dashboard/Dashboard2/"));
const Dashboard3 = React.lazy(() => import("../pages/dashboard/Dashboard3/"));
// const Dashboard4 = React.lazy(() => import("../pages/dashboard/Dashboard4/"));

// apps
const CalendarApp = React.lazy(() => import("../pages/apps/Calendar/"));
const Projects = React.lazy(() => import("../pages/apps/Projects/"));
const ProjectDetail = React.lazy(() => import("../pages/apps/Company/Detail"));
const ProjectForm = React.lazy(
  () => import("../pages/apps/Projects/ProjectForm")
);
// - chat
const ChatApp = React.lazy(() => import("../pages/apps/Chat/"));
// - ecommece pages
const EcommerceDashboard = React.lazy(
  () => import("../pages/apps/Ecommerce/Dashboard/")
);
const EcommerceProducts = React.lazy(
  () => import("../pages/apps/Ecommerce/Products")
);
const ProductDetails = React.lazy(
  () => import("../pages/apps/Ecommerce/ProductDetails")
);
const ProductEdit = React.lazy(
  () => import("../pages/apps/Ecommerce/ProductEdit")
);
const Customers = React.lazy(() => import("../pages/apps/Ecommerce/Customers"));
const Orders = React.lazy(() => import("../pages/apps/Ecommerce/Orders"));
const OrderDetails = React.lazy(
  () => import("../pages/apps/Ecommerce/OrderDetails")
);
const Sellers = React.lazy(() => import("../pages/apps/Ecommerce/Sellers"));
const Cart = React.lazy(() => import("../pages/apps/Ecommerce/Cart"));
const Checkout = React.lazy(() => import("../pages/apps/Ecommerce/Checkout"));
// - crm pages
const CRMDashboard = React.lazy(() => import("../pages/apps/CRM/Dashboard/"));
const CRMContacts = React.lazy(() => import("../pages/apps/CRM/Contacts/"));
const Opportunities = React.lazy(
  () => import("../pages/apps/CRM/Opportunities/")
);
const CRMLeads = React.lazy(() => import("../pages/apps/CRM/Leads/"));
const CRMCustomers = React.lazy(() => import("../pages/apps/CRM/Customers/"));
// - email
const Inbox = React.lazy(() => import("../pages/apps/Email/Inbox"));
const EmailDetail = React.lazy(() => import("../pages/apps/Email/Detail"));
const EmailCompose = React.lazy(() => import("../pages/apps/Email/Compose"));
// - social
const SocialFeed = React.lazy(() => import("../pages/apps/SocialFeed/"));
// settings
const Settings = React.lazy(() => import("../pages/apps/Settings"));
// Orders
const FoodOrders = React.lazy(() => import("../pages/apps/orders/Orders"));

// food
const FoodDetails = React.lazy(() => import("../pages/apps/FoodMenu/Products"));
const CartDetails = React.lazy(() => import("../pages/apps/FoodMenu/Cart"));
const CheckoutDetails = React.lazy(
  () => import("../pages/apps/FoodMenu/Checkout")
);
const OrderDetailsFood = React.lazy(
  () => import("../pages/apps/FoodMenu/OrderDetails")
);
// - companies
const Companies = React.lazy(() => import("../pages/apps/Company"));
const CompanyDetail = React.lazy(() => import("../pages/apps/Company/Detail"));
const TotalRestaurants = React.lazy(
  () => import("../pages/apps/Company/TotalRstaurant")
);
// - Restaurants
const Restaurants = React.lazy(() => import("../pages/apps/Restaurant"));
// const List = React.lazy(() => import("../pages/apps/Restaurant/List"))
const RestaurantDetails = React.lazy(
  () => import("../pages/apps/Restaurant/StaffDetails")
);
const TotalCompany = React.lazy(
  () => import("../pages/apps/Restaurant/TotalCompany")
);
// - Users
const Users = React.lazy(() => import("../pages/apps/Users"));
const UsersProfile = React.lazy(() => import("../pages/apps/Users/Profile"));

// - Customers
const Customer = React.lazy(() => import("../pages/apps/Customers/List/"));
const CustomerContactsProfile = React.lazy(
  () => import("../pages/apps/Customers/Profile/")
);
// const CustomerProfile = React.lazy(() => import("../pages/apps/Customers/Profile"))

// - tasks
const TaskList = React.lazy(() => import("../pages/apps/Tasks/List/"));
const TaskDetails = React.lazy(() => import("../pages/apps/Tasks/Details"));
const Kanban = React.lazy(() => import("../pages/apps/Tasks/Board/"));
// -contacts
const ContactsList = React.lazy(() => import("../pages/apps/Contacts/List/"));
const ContactsProfile = React.lazy(
  () => import("../pages/apps/Contacts/Profile/")
);
// -tickets
// const TicketsList = React.lazy(() => import("../pages/apps/Restaurant/List"));
const TicketsDetails = React.lazy(
  () => import("../pages/apps/Tickets/Details/")
);
// - file
const FileManager = React.lazy(() => import("../pages/apps/FileManager"));

// extra pages
const Starter = React.lazy(() => import("../pages/other/Starter"));
const Timeline = React.lazy(() => import("../pages/other/Timeline"));
const Sitemap = React.lazy(() => import("../pages/other/Sitemap/"));
const Error404 = React.lazy(() => import("../pages/error/Error404"));
const Error404Two = React.lazy(() => import("../pages/error/Error404Two"));
const Error404Alt = React.lazy(() => import("../pages/error/Error404Alt"));
const Error500 = React.lazy(() => import("../pages/error/Error500"));
const Error500Two = React.lazy(() => import("../pages/error/Error500Two"));
// - other
const Invoice = React.lazy(() => import("../pages/other/Invoice"));
const FAQ = React.lazy(() => import("../pages/other/FAQ"));
const SearchResults = React.lazy(() => import("../pages/other/SearchResults/"));
const Upcoming = React.lazy(() => import("../pages/other/Upcoming"));
const Pricing = React.lazy(() => import("../pages/other/Pricing"));
const Gallery = React.lazy(() => import("../pages/other/Gallery/"));
const Maintenance = React.lazy(() => import("../pages/other/Maintenance"));

// uikit
const Buttons = React.lazy(() => import("../pages/uikit/Buttons"));
const Avatars = React.lazy(() => import("../pages/uikit/Avatars"));
const Cards = React.lazy(() => import("../pages/uikit/Cards"));
const Portlets = React.lazy(() => import("../pages/uikit/Portlets"));
const TabsAccordions = React.lazy(
  () => import("../pages/uikit/TabsAccordions")
);
const Progress = React.lazy(() => import("../pages/uikit/Progress"));
const Modals = React.lazy(() => import("../pages/uikit/Modals"));
const Notifications = React.lazy(() => import("../pages/uikit/Notifications"));
const Offcanvases = React.lazy(() => import("../pages/uikit/Offcanvas"));
const Placeholders = React.lazy(() => import("../pages/uikit/Placeholders"));
const Spinners = React.lazy(() => import("../pages/uikit/Spinners"));
const Images = React.lazy(() => import("../pages/uikit/Images"));
const Carousels = React.lazy(() => import("../pages/uikit/Carousel"));
const ListGroups = React.lazy(() => import("../pages/uikit/ListGroups"));
const EmbedVideo = React.lazy(() => import("../pages/uikit/EmbedVideo"));
const Dropdowns = React.lazy(() => import("../pages/uikit/Dropdowns"));
const Ribbons = React.lazy(() => import("../pages/uikit/Ribbons"));
const TooltipsPopovers = React.lazy(
  () => import("../pages/uikit/TooltipsPopovers")
);
const GeneralUI = React.lazy(() => import("../pages/uikit/GeneralUI"));
const Typography = React.lazy(() => import("../pages/uikit/Typography"));
const Grid = React.lazy(() => import("../pages/uikit/Grid"));
const NestableList = React.lazy(() => import("../pages/uikit/NestableList"));
const DragDrop = React.lazy(() => import("../pages/uikit/DragDrop"));
const RangeSliders = React.lazy(() => import("../pages/uikit/RangeSliders"));
const Animation = React.lazy(() => import("../pages/uikit/Animation"));
const TourPage = React.lazy(() => import("../pages/uikit/TourPage"));
const SweetAlerts = React.lazy(() => import("../pages/uikit/SweetAlerts"));
const LoadingButtons = React.lazy(
  () => import("../pages/uikit/LoadingButtons")
);

// widgets
const Widgets = React.lazy(() => import("../pages/uikit/Widgets"));

// icons
const TwoToneIcons = React.lazy(() => import("../pages/icons/TwoToneIcons/"));
const FeatherIcons = React.lazy(() => import("../pages/icons/FeatherIcons/"));
const Dripicons = React.lazy(() => import("../pages/icons/Dripicons/"));
const MDIIcons = React.lazy(() => import("../pages/icons/MDIIcons/"));
const FontAwesomeIcons = React.lazy(
  () => import("../pages/icons/FontAwesomeIcons/")
);
const ThemifyIcons = React.lazy(() => import("../pages/icons/ThemifyIcons/"));
const SimpleLineIcons = React.lazy(
  () => import("../pages/icons/SimpleLineIcons/")
);
const WeatherIcons = React.lazy(() => import("../pages/icons/WeatherIcons/"));

// forms
const BasicForms = React.lazy(() => import("../pages/forms/Basic"));
const FormAdvanced = React.lazy(() => import("../pages/forms/Advanced"));
const FormValidation = React.lazy(() => import("../pages/forms/Validation"));
// issues::change
// const FormWizard = React.lazy(() => import("../pages/forms/Wizard"));
const FileUpload = React.lazy(() => import("../pages/forms/FileUpload"));
const Editors = React.lazy(() => import("../pages/forms/Editors"));

// tables
const BasicTables = React.lazy(() => import("../pages/tables/Basic"));
const AdvancedTables = React.lazy(() => import("../pages/tables/Advanced"));

// charts
const ApexChart = React.lazy(() => import("../pages/charts/Apex"));
const ChartJs = React.lazy(() => import("../pages/charts/ChartJs"));

const NewKitchen = React.lazy(() => import("../pages/apps/kitchen/NewKitchen"));
const ListKitchens = React.lazy(
  () => import("../pages/apps/kitchen/ListKitchens")
);
const KitchensDetails = React.lazy(
  () => import("../pages/apps/kitchen/KitchensDetails")
);
const Editkitchens = React.lazy(
  () => import("../pages/apps/kitchen/Editkitchens")
);

//Organizations

const NewOrganizations = React.lazy(
  () => import("../pages/apps/Organizations/NewOrganizations")
);
const ListOrganizations = React.lazy(
  () => import("../pages/apps/Organizations/ListOrganizations")
);
const EditOrganizations = React.lazy(
  () => import("../pages/apps/Organizations/EditOrganizations")
);
const OrganizationDetails = React.lazy(
  () => import("../pages/apps/Organizations/OrganizationDetails")
);

const Designations = React.lazy(
  () => import("../pages/apps/Designations/listdesignations")
);
const EmployeeDetails = React.lazy(
  () => import("../pages/apps/adminemployee/employeedetails")
);

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

const organizationsAppRoutes = {
  path: "/apps/organizations",
  name: "Organizations",
  route: PrivateRoute,
  roles: ["Admin"],
  children: [
    {
      path: "/apps/organizations/new",
      name: "Add New Organizations",
      element: <NewOrganizations />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/list",
      name: "List of Organizations",
      element: <ListOrganizations />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/edit/:id",
      name: "Edit Organizations",
      element: <EditOrganizations />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/:id",
      name: "Edit Organizations",
      element: <OrganizationDetails />,
      route: PrivateRoute,
    },
    {
      path: "/apps/org/category",
      name: "Edit Organizations",
      element: <OrgCategories />,
      route: PrivateRoute,
    },
    {
      path: "/apps/org/subcategory",
      name: "Edit Organizations",
      element: <OrgSubCategories />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/employ/add",
      name: "Organizations employ add",
      element: <OrgEmployeeManagement />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/employ/list",
      name: "Organisation Employee List",
      element: <OrgEmployeeList />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/employ/edit/:id",
      name: "Organisation Employee edit",
      element: <OrgEmployeeEdit />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/employ/details/:id",
      name: "Organisation Employee details",
      element: <OrgEmployeeDetails />,
      route: PrivateRoute,
    },
  ],
};
const kitchenAppRoutes = {
  path: "/apps/kitchen",
  name: "Kitchens",
  route: PrivateRoute,
  roles: ["Admin"],
  children: [
    {
      path: "/apps/kitchen/new",
      name: "Add New Kitchen",
      element: <NewKitchen />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/list",
      name: "List of Kitchens",
      element: <ListKitchens />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/edit/:id",
      name: "edit Kitchens",
      element: <Editkitchens />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/:id",
      name: "details Kitchens",
      element: <KitchensDetails />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/category",
      name: "details Kitchens",
      element: <KitchensCategories />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/subcategory",
      name: "details Kitchens",
      element: <KitchensSubCategories />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/:id/our-menu",
      name: "details Kitchens",
      element: <OurMenu />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/menu",
      name: "Items",
      element: <MenuItems />,
      route: PrivateRoute,
    },
    {
      path: "/apps/kitchen/listing",
      name: "Listing",
      element: <ItemsListing />,
    },
    {
      path: "/apps/kitchen/editing/:id",
      name: "Editing",
      element: <ItemsEditing />,
    },
    {
      path: "/apps/kitchen/:kitchenId/item-details/:id",
      name: "Editing",
      element: <MenuDetails />,
    },
  ],
};
const itemAppRoutes = {
  path: "/apps/items",
  name: "items",
  route: PrivateRoute,
  roles: ["Admin"],
  Children: [
    {
      path: "/apps/items/menu",
      name: "Items",
      element: <MenuItems />,
      route: PrivateRoute,
    },
  ],
};

const menuAppRoutes = {
  path: "/apps/menu",
  name: "Organizations",
  route: PrivateRoute,
  roles: ["Admin"],
  children: [
    {
      path: "/apps/menu/category",
      name: "Menu Category",
      element: <MenuCategory />,
      route: PrivateRoute,
    },
    {
      path: "/apps/menu/subcategory",
      name: "Menu Sub Category",
      element: <MenuSubCategory />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/edit/:id",
      name: "Edit Organizations",
      element: <EditOrganizations />,
      route: PrivateRoute,
    },
    {
      path: "/apps/organizations/:id",
      name: "Edit Organizations",
      element: <OrganizationDetails />,
      route: PrivateRoute,
    },
  ],
};
const designationRoutes = {
  path: "/apps/designations",
  name: "List designations",
  element: <Designations />,
  route: PrivateRoute,
};

const employeeRoutes = {
  path: "/apps/employee",
  name: "Employee",
  route: PrivateRoute,
  roles: ["Admin"],
  children: [
    {
      path: "/apps/employee/add",
      name: "Add Employee",
      element: <EmployeeManagment />,
      route: PrivateRoute,
    },
    {
      path: "/apps/employee/list",
      name: "Employee List",
      element: <EmployeeList />,
      route: PrivateRoute,
    },
    {
      path: "/apps/employee/edit/:id",
      name: "Employee edit",
      element: <EmployeeEdit />,
      route: PrivateRoute,
    },
    {
      path: "/apps/employee/details/:id",
      name: "Employee details",
      element: <EmployeeDetails />,
      route: PrivateRoute,
    },
  ],
};

const dashboardRoutes = {
  path: "/",
  name: "Dashboard",
  route: PrivateRoute,
  roles: ["Admin", "User"],
  icon: "airplay",
  element: <Dashboard3 />,
};

const calendarAppRoutes: RoutesProps = {
  path: "/apps/calendar",
  name: "Calendar",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "calendar",
  element: <CalendarApp />,
  header: "Apps",
};

const chatAppRoutes = {
  path: "/apps/chat",
  name: "Chat",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "message-square",
  element: <ChatApp />,
};

const ecommerceAppRoutes = {
  path: "/apps/ecommerce",
  name: "eCommerce",
  route: PrivateRoute,
  roles: ["Admin"],
  children: [
    {
      path: "/apps/ecommerce/dashboard",
      name: "Products",
      element: <EcommerceDashboard />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/products",
      name: "Products",
      element: <EcommerceProducts />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/product-details",
      name: "Product Details",
      element: <ProductDetails />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/edit-product",
      name: "Product Edit",
      element: <ProductEdit />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/customers",
      name: "Customers",
      element: <Customers />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/orders",
      name: "Orders",
      element: <Orders />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/order/details",
      name: "Order Details",
      element: <OrderDetails />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/sellers",
      name: "Sellers",
      element: <Sellers />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/shopping-cart",
      name: "Shopping Cart",
      element: <Cart />,
      route: PrivateRoute,
    },
    {
      path: "/apps/ecommerce/checkout",
      name: "Checkout",
      element: <Checkout />,
      route: PrivateRoute,
    },
  ],
};

const crmAppRoutes = {
  path: "/apps/crm",
  name: "CRM",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  children: [
    {
      path: "/apps/crm/dashboard",
      name: "Dashboard",
      element: <CRMDashboard />,
      route: PrivateRoute,
    },
    {
      path: "/apps/crm/contacts",
      name: "Contacts",
      element: <CRMContacts />,
      route: PrivateRoute,
    },
    {
      path: "/apps/crm/opportunities",
      name: "Opportunities",
      element: <Opportunities />,
      route: PrivateRoute,
    },
    {
      path: "/apps/crm/leads",
      name: "Leads",
      element: <CRMLeads />,
      route: PrivateRoute,
    },
    {
      path: "/apps/crm/customers",
      name: "Customers",
      element: <CRMCustomers />,
      route: PrivateRoute,
    },
  ],
};

const emailAppRoutes = {
  path: "/apps/email",
  name: "Email",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "mail",
  children: [
    {
      path: "/apps/email/inbox",
      name: "Inbox",
      element: <Inbox />,
      route: PrivateRoute,
    },
    {
      path: "/apps/email/details",
      name: "Email Details",
      element: <EmailDetail />,
      route: PrivateRoute,
    },
    {
      path: "/apps/email/compose",
      name: "Compose Email",
      element: <EmailCompose />,
      route: PrivateRoute,
    },
  ],
};

const socialAppRoutes = {
  path: "/apps/social-feed",
  name: "Social Feed",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "rss",
  element: <SocialFeed />,
};
// Settings
const sttingsAppRoutes = {
  path: "/apps/settings",
  name: "settings",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "settings",
  element: <Settings />,
};
// Food menu
const foodAppRoutes = {
  path: "/apps/food",
  name: "Employee",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  element: <FoodDetails />,
};
// - CartDetails
const foodCartAppRoute = {
  path: "/apps/food/cart",
  name: "cart",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  element: <CartDetails />,
};
const foodCheckoutAppRoute = {
  path: "/apps/food/checkout",
  name: "checkout",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  element: <CheckoutDetails />,
};
const ordersAppRoutes = {
  path: "/apps/orders",
  name: "Orders",
  element: <FoodOrders />,
  route: PrivateRoute,
};
// Customers Details
const customerAppRoute = {
  path: "/apps/customer",
  name: "customers",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  element: <Customer />,
};
const CustomerProfileAppRoutes = {
  path: "/apps/customer/profile",
  name: "profile",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "profile",
  element: <CustomerContactsProfile />,
};
// users Details
const usersAppRoutes = {
  path: "/apps/users",
  name: "users",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  element: <Users />,
};
const userProfileAppRoutes = {
  path: "/apps/users/profile",
  name: "profile",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "profile",
  element: <UsersProfile />,
};
// RestaurantDetails
const restaurantsAppRoutes = {
  path: "/apps/restaurants",
  name: "restaurants",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "restaurant",
  element: <Restaurants />,
};
const totalCompanyAppRoute = {
  path: "/apps/restaurants/company",
  name: "totalCompany",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "totalCompany",
  element: <TotalCompany />,
};

const ListAppRouts = {
  path: "/apps/restaurants/lists",
  name: "List",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "list",
  element: <List />,
};
const restaurantDetailsAppRoute = {
  path: "/apps/restaurants/details",
  name: "restaurantsdetails",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "restaurantdetails",
  element: <PaginatedTable detailsInfo={detailsInfo} />,
};

const companiesAppRoutes = {
  path: "/apps/companies",
  name: "Companies",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "activity",
  element: <Companies />,
};

const companyDetailsAppRoutes = {
  path: "/apps/company/details",
  name: "Detail",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "activity",
  element: <CompanyDetail />,
};

const totalRestaurantsAppRoutes = {
  path: "/apps/company/details/restaurants",
  name: "restaurantsdetails",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "activity",
  element: <TotalRestaurants />,
};

const projectAppRoutes = {
  path: "/apps/projects",
  name: "Projects",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "uil-briefcase",

  children: [
    {
      path: "/apps/projects/list",
      name: "List",
      element: <Projects />,
      route: PrivateRoute,
    },
    {
      path: "/apps/projects/:id/details",
      name: "Detail",
      element: <ProjectDetail />,
      route: PrivateRoute,
    },
    {
      path: "/apps/projects/create",
      name: "Create Project",
      element: <ProjectForm />,
      route: PrivateRoute,
    },
  ],
};

const taskAppRoutes = {
  path: "/apps/tasks",
  name: "Tasks",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "clipboard",
  children: [
    {
      path: "/apps/tasks/list",
      name: "Task List",
      element: <TaskList />,
      route: PrivateRoute,
    },
    {
      path: "/apps/tasks/details",
      name: "Task List",
      element: <TaskDetails />,
      route: PrivateRoute,
    },
    {
      path: "/apps/tasks/kanban",
      name: "Kanban",
      element: <Kanban />,
      route: PrivateRoute,
    },
  ],
};

const contactsRoutes = {
  path: "/apps/contacts",
  name: "Contacts",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "book",
  children: [
    {
      path: "/apps/contacts/list",
      name: "Task List",
      element: <ContactsList />,
      route: PrivateRoute,
    },
    {
      path: "/apps/contacts/profile",
      name: "Profile",
      element: <ContactsProfile />,
      route: PrivateRoute,
    },
  ],
};

const ticketsRoutes = {
  path: "/apps/tickets",
  name: "Tickets",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "aperture",
  children: [
    {
      path: "/apps/tickets/details",
      name: "Details",
      element: <TicketsDetails />,
      route: PrivateRoute,
    },
  ],
};

const fileAppRoutes = {
  path: "/apps/file-manager",
  name: "File Manager",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "folder-plus",
  element: <FileManager />,
};

const appRoutes = [
  calendarAppRoutes,
  chatAppRoutes,
  ecommerceAppRoutes,
  organizationsAppRoutes,
  kitchenAppRoutes,
  itemAppRoutes,
  designationRoutes,
  employeeRoutes,
  menuAppRoutes,
  crmAppRoutes,
  emailAppRoutes,
  socialAppRoutes,
  companiesAppRoutes,
  projectAppRoutes,
  taskAppRoutes,
  contactsRoutes,
  ticketsRoutes,
  fileAppRoutes,
  restaurantDetailsAppRoute,
  restaurantsAppRoutes,
  usersAppRoutes,
  companyDetailsAppRoutes,
  ListAppRouts,
  totalRestaurantsAppRoutes,
  totalCompanyAppRoute,
  userProfileAppRoutes,
  sttingsAppRoutes,
  customerAppRoute,
  foodAppRoutes,
  foodCartAppRoute,
  foodCheckoutAppRoute,
  ordersAppRoutes,
  CustomerProfileAppRoutes,
];

// pages
const extrapagesRoutes = {
  path: "/pages",
  name: "Pages",
  icon: "package",
  header: "Custom",
  children: [
    {
      path: "/pages/starter",
      name: "Starter",
      element: <Starter />,
      route: PrivateRoute,
    },
    {
      path: "/pages/timeline",
      name: "Timeline",
      element: <Timeline />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sitemap",
      name: "Sitemap",
      element: <Sitemap />,
      route: PrivateRoute,
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      element: <Invoice />,
      route: PrivateRoute,
    },
    {
      path: "/pages/faq",
      name: "FAQ",
      element: <FAQ />,
      route: PrivateRoute,
    },
    {
      path: "/pages/serach-results",
      name: "Search Results",
      element: <SearchResults />,
      route: PrivateRoute,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      element: <Pricing />,
      route: PrivateRoute,
    },
    {
      path: "/pages/gallery",
      name: "Gallery",
      element: <Gallery />,
      route: PrivateRoute,
    },
    {
      path: "/pages/error-404-alt",
      name: "Error - 404-alt",
      element: <Error404Alt />,
      route: PrivateRoute,
    },
  ],
};

// ui
const uiRoutes = {
  path: "/ui",
  name: "Components",
  icon: "pocket",
  header: "UI Elements",
  children: [
    {
      path: "/ui/base",
      name: "Base UI",
      children: [
        {
          path: "/ui/buttons",
          name: "Buttons",
          element: <Buttons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/cards",
          name: "Cards",
          element: <Cards />,
          route: PrivateRoute,
        },
        {
          path: "/ui/avatars",
          name: "Avatars",
          element: <Avatars />,
          route: PrivateRoute,
        },
        {
          path: "/ui/portlets",
          name: "Portlets",
          element: <Portlets />,
          route: PrivateRoute,
        },
        {
          path: "/ui/tabs-accordions",
          name: "Tabs & Accordions",
          element: <TabsAccordions />,
          route: PrivateRoute,
        },
        {
          path: "/ui/progress",
          name: "Progress",
          element: <Progress />,
          route: PrivateRoute,
        },
        {
          path: "/ui/modals",
          name: "Modals",
          element: <Modals />,
          route: PrivateRoute,
        },
        {
          path: "/ui/notifications",
          name: "Notifications",
          element: <Notifications />,
          route: PrivateRoute,
        },
        {
          path: "/ui/offcanvas",
          name: "Offcanvas",
          element: <Offcanvases />,
          route: PrivateRoute,
        },
        {
          path: "/ui/placeholders",
          name: "Placeholders",
          element: <Placeholders />,
          route: PrivateRoute,
        },
        {
          path: "/ui/spinners",
          name: "Spinners",
          element: <Spinners />,
          route: PrivateRoute,
        },
        {
          path: "/ui/images",
          name: "Images",
          element: <Images />,
          route: PrivateRoute,
        },
        {
          path: "/ui/carousel",
          name: "Carousel",
          element: <Carousels />,
          route: PrivateRoute,
        },
        {
          path: "/ui/listgroups",
          name: "List Groups",
          element: <ListGroups />,
          route: PrivateRoute,
        },
        {
          path: "/ui/embedvideo",
          name: "EmbedVideo",
          element: <EmbedVideo />,
          route: PrivateRoute,
        },
        {
          path: "/ui/dropdowns",
          name: "Dropdowns",
          element: <Dropdowns />,
          route: PrivateRoute,
        },
        {
          path: "/ui/ribbons",
          name: "Ribbons",
          element: <Ribbons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/tooltips-popovers",
          name: "Tooltips & Popovers",
          element: <TooltipsPopovers />,
          route: PrivateRoute,
        },
        {
          path: "/ui/typography",
          name: "Typography",
          element: <Typography />,
          route: PrivateRoute,
        },
        {
          path: "/ui/grid",
          name: "Grid",
          element: <Grid />,
          route: PrivateRoute,
        },
        {
          path: "/ui/general",
          name: "General UI",
          element: <GeneralUI />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/extended",
      name: "Extended UI",
      children: [
        {
          path: "/extended-ui/nestable",
          name: "Nestable List",
          element: <NestableList />,
          route: PrivateRoute,
        },
        {
          path: "/extended-ui/dragdrop",
          name: "Drag and Drop",
          element: <DragDrop />,
          route: PrivateRoute,
        },
        {
          path: "/extended-ui/rangesliders",
          name: "Range Sliders",
          element: <RangeSliders />,
          route: PrivateRoute,
        },
        {
          path: "/extended-ui/animation",
          name: "Animation",
          element: <Animation />,
          route: PrivateRoute,
        },
        {
          path: "/extended-ui/sweet-alert",
          name: "Sweet Alert",
          element: <SweetAlerts />,
          route: PrivateRoute,
        },
        {
          path: "/extended-ui/tour",
          name: "Tour Page",
          element: <TourPage />,
          route: PrivateRoute,
        },
        {
          path: "/extended-ui/loading-buttons",
          name: "Loading Buttons",
          element: <LoadingButtons />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/widgets",
      name: "Widgets",
      element: <Widgets />,
      route: PrivateRoute,
    },
    {
      path: "/ui/icons",
      name: "Icons",
      children: [
        {
          path: "/ui/icons/two-tone",
          name: "Two Tone Icons",
          element: <TwoToneIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/feather",
          name: "Feather Icons",
          element: <FeatherIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/dripicons",
          name: "Dripicons",
          element: <Dripicons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/mdi",
          name: "Material Design",
          element: <MDIIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/font-awesome",
          name: "Font Awesome 5",
          element: <FontAwesomeIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/themify",
          name: "Themify",
          element: <ThemifyIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/simple-line",
          name: "Simple Line Icons",
          element: <SimpleLineIcons />,
          route: PrivateRoute,
        },
        {
          path: "/ui/icons/weather",
          name: "Weather Icons",
          element: <WeatherIcons />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/forms",
      name: "Forms",
      children: [
        {
          path: "/ui/forms/basic",
          name: "Basic Elements",
          element: <BasicForms />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/advanced",
          name: "Form Advanced",
          element: <FormAdvanced />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/validation",
          name: "Form Validation",
          element: <FormValidation />,
          route: PrivateRoute,
        },
        // issues::change
        // {
        //   path: "/ui/forms/wizard",
        //   name: "Form Wizard",
        //   element: <FormWizard />,
        //   route: PrivateRoute,
        // },
        {
          path: "/ui/forms/upload",
          name: "File Upload",
          element: <FileUpload />,
          route: PrivateRoute,
        },
        {
          path: "/ui/forms/editors",
          name: "Editors",
          element: <Editors />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/tables",
      name: "Tables",
      children: [
        {
          path: "/ui/tables/basic",
          name: "Basic",
          element: <BasicTables />,
          route: PrivateRoute,
        },
        // {
        //   path: "/ui/tables/advanced",
        //   name: "Advanced",
        //   element: <AdvancedTables />,
        //   route: PrivateRoute,
        // },
      ],
    },
    {
      path: "/ui/charts",
      name: "Charts",
      children: [
        {
          path: "/ui/charts/apex",
          name: "Apex",
          element: <ApexChart />,
          route: PrivateRoute,
        },
        {
          path: "/ui/charts/chartjs",
          name: "Chartjs",
          element: <ChartJs />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/ui/maps",
      name: "Maps",
      children: [
        {
          path: "/ui/googlemaps",
          name: "Google Maps",
          // element: <GoogleMaps />,
          route: PrivateRoute,
        },
        {
          path: "/ui/vectorMaps",
          name: "Google Maps",
          // element: <VectorMaps />,
          route: PrivateRoute,
        },
      ],
    },
  ],
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/admin/login",
    name: "Login",
    element: <Login />,
    route: Route,
  },
  {
    path: "/auth/login",
    name: "Login",
    element: <Landing />,
    route: Route,
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />,
    route: Route,
  },
  {
    path: "/auth/confirm",
    name: "Confirm",
    element: <Confirm />,
    route: Route,
  },
  {
    path: "/auth/forget-password",
    name: "Forget Password",
    element: <ForgetPassword />,
    route: Route,
  },
  {
    path: "/auth/signin-signup",
    name: "SignIn-SignUp",
    element: <SignInSignUp />,
    route: Route,
  },
  {
    path: "/auth/lock-screen",
    name: "Lock Screen",
    element: <LockScreen />,
    route: Route,
  },
  {
    path: "/auth/logout",
    name: "Logout",
    element: <Logout />,
    route: Route,
  },
  {
    path: "/auth/employee/login",
    name: "Login2",
    element: <Login2 />,
    route: Route,
  },
  {
    path: "/auth/logout2",
    name: "Logout2",
    element: <Logout2 />,
    route: Route,
  },
  {
    path: "/auth/register2",
    name: "Register2",
    element: <Register2 />,
    route: Route,
  },
  {
    path: "/auth/confirm2",
    name: "Confirm2",
    element: <Confirm2 />,
    route: Route,
  },
  {
    path: "/auth/forget-password2", 
    name: "Forget Password2",
    element: <ForgetPassword2 />,
    route: Route,
  },
  {
    path: "/auth/signin-signup2",
    name: "SignIn-SignUp2",
    element: <SignInSignUp2 />,
    route: Route,
  },
  {
    path: "/auth/lock-screen2",
    name: "Lock Screen2",
    element: <LockScreen2 />,
    route: Route,
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: "/landing",
    name: "landing",
    element: <Landing />,
    route: Route,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    element: <Maintenance />,
    route: Route,
  },
  {
    path: "/error-404",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/error-404-two",
    name: "Error - 404 Two",
    element: <Error404Two />,
    route: Route,
  },
  {
    path: "/error-500",
    name: "Error - 500",
    element: <Error500 />,
    route: Route,
  },
  {
    path: "/error-500-two",
    name: "Error - 500 Two",
    element: <Error500Two />,
    route: Route,
  },
  {
    path: "/upcoming",
    name: "Coming Soon",
    element: <Upcoming />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  dashboardRoutes,
  ...appRoutes,
  extrapagesRoutes,
  uiRoutes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
