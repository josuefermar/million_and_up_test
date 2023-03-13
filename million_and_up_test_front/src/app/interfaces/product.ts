import { Time } from "@angular/common";

export interface Product {
    id: number,
    name: string,
    description: string,
    rating: number,
    stock: number,
    price: number,
    image: string,
    id_origin: string,
    category_id: number,
    created_at: Time,
    updated_at: Time,
    category_name?: string
}