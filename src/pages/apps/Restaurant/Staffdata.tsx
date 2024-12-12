// DetailsInfo.ts
export interface Details {
    id: number;
    staffname: string;
    orders: string;
    products: string;
}

const detailsInfo: Details[] = [
    {
        id: 1,
        staffname: "John",
        orders: "10",
        products: "1030"
    },
    {
        id: 2,
        staffname: "Don",
        orders: "40",
        products: "6757"
    },  
    {
        id: 3,
        staffname: "Jonny",
        orders: "89",
        products: "6722"
    },
];

export { detailsInfo };
