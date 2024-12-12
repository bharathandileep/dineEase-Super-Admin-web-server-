import user1 from "../../../../assets/images/users/user-10.jpg";
import user2 from "../../../../assets/images/users/user-2.jpg";
import user3 from "../../../../assets/images/users/user-8.jpg";
import user4 from "../../../../assets/images/users/user-3.jpg";
import user5 from "../../../../assets/images/users/user-9.jpg";
import user6 from "../../../../assets/images/users/user-1.jpg";

export interface TicketDetailsItems {
  id: string;
  restaurantName: string;
  requested_by: {
    name: string;
    image: string;
  };
  location: string;
  mobNo: string;
  order: string;
  company: string;
  status: string;
  Category: string;
  created_date: string;
  due_date: string;
}

const ticketDetails: TicketDetailsItems[] = [
  {
    id: "#1256",
   
    requested_by: {
      name: "George A. Llanes",
      image: user6,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Active",
    restaurantName:"chicking",
    Category:"Veg",
    created_date: "2017-04-28",
    due_date: "2017-04-28",

  },
  {
    id: "#2542",
    restaurantName:"Plated",
    requested_by: {
      name: "Jose D. Delacruz",
      image: user5,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Active",
    Category:"Non-Veg",
    created_date: "2008-04-25",
    due_date: "2008-04-25",
  },
  {
    id: "#320",
    restaurantName:"KFC",
    requested_by: {
      name: "Phyllis K. Maciel",
      image: user4,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Non-Veg",
    created_date: "2017-04-20",
    due_date: "2017-04-25",
  },
  {
    id: "#1254",
    restaurantName:"Burger King",
    requested_by: {
      name: "Margeret V. Ligon",
      image: user3,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Active",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#1020",
    restaurantName:"ChocoLick",
    requested_by: {
      name: "Erwin E. Brown",
      image: user2,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Non-Veg",
    created_date: "2013-08-11",
    due_date: "2013-08-30",
  },
  {
    id: "#854",
    restaurantName:"Street Menu",
    requested_by: {
      name: "William L. Trent",
      image: user1,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Non-Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#9501",
    restaurantName:"Thaal",
    requested_by: {
      name: "Amy R. Barnaby",
      image: user6,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Active",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#3652",
    restaurantName:"Nasi n Me",
    requested_by: {
      name: "Jessica T. Phillips",
      image: user5,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Non-Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#9852",
    restaurantName:"Little soi",
    requested_by: {
      name: "Debra J. Wilson",
      image: user4,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#3652",
    restaurantName:"Monqo",
    requested_by: {
      name: "Luke J. Sain",
      image: user3,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#1352",
    restaurantName:"Mingswok",
    requested_by: {
      name: "Karen R. Doyle",
      image: user2,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#3562",
    restaurantName:"Chopstick",
    requested_by: {
      name: "Freddie J. Plourde",
      image: user1,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#3658",
    restaurantName:"Chiyang",
    requested_by: {
      name: "Darrell J. Cook",
      image: user6,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Deactive",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#2251",
    restaurantName:"salt",
    requested_by: {
      name: "Mark C. Diaz",
      image: user5,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Active",
    Category:"Non-Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
  {
    id: "#3654",
    restaurantName:"Alakapuri",
    requested_by: {
      name: "Robert K. Joseph",
      image: user4,
    },
    location: "Support for theme",
    mobNo: "89572790284020",
    order: "recieved",
    company: "Google",
    status: "Active",
    Category:"Veg",
    created_date: "2017-01-04",
    due_date: "21/05/2017",
  },
];

export { ticketDetails };
