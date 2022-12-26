export interface productProps {
    _id: string,
    name: string,
    description: string,
    image: string,
    price: number,
    amount?: number,
}

export interface productAddedProps {
    amount: number | undefined,
    productId: string,
}

export interface categoryProductProps{
    _id: string, 
    name: string, 
    image: string,
    listProducts: { 
        _id: string,
        name: string,
        description: string,
        image: string,
        price: number, 
        amount?: number,
    }
}

export interface userOrder {
    fullname: string,
    phone: string;
}

interface orderListProps {
    amount: string,
    productId: {
        name: string
    }
}

export interface ordersByUserProps {
    totalProducts: number,
    finalPrice: number,
    status: string,
    date: Date,
    orderList: Array<orderListProps>
}