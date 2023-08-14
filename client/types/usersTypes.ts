import Restaurants from "./restaurantTypes";

type User = {
    id: string;
    image: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    role: string;
    password: string;
    address: string;
    notes: string;
    description: string;
    Restaurant: Restaurants[];
}

export default User;