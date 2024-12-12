import { number } from "yup";


export interface Users {
    id: number;
    name: string;
    MobNumber: string;
    address: string;
    email: string;
    orders: string;
  }
  
  const usersInfo: Users[] = [
    {
      id: 1,
      name: "Raj",
      MobNumber: "9898554145",
      address:
        "Amazon.com, Inc., doing business as Amazon, is an American electronic commerce and cloud computing company based in Seattle..",
        email: "raj@gmail.com",
        orders: "20",
     
    },
    {
      id: 2,
      
      name: "Anz",
      MobNumber: "652865289728",
      address:
        "Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells..",
        email: "raj@gmail.com",
        orders: "20",
    },
    {
      id: 3,
      name: "Don",
      MobNumber: "454354354531",
      address:
        "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include..",
        email: "raj@gmail.com",
        orders: "20",
    },
    {
      id: 4,
      name: "Tommy",
      MobNumber: "674926942909",
      address:
        "A‌i‌r‌b‌n‌b‌, ‌ ‌I‌n‌c‌.‌ is a company based in San Francisco that operates an online marketplace and hospitality service for people to lease or rent..",
        email: "raj@gmail.com",
        orders: "20",
    },
    {
      id: 5,
      name: "Fahad",
      MobNumber: "4027509270",
      address:
        "Facebook is an American online social media and social networking service company based in Menlo Park, California..",
        email: "raj@gmail.com",
        orders: "20",
    },
    
  ];
  
  export { usersInfo };
  