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
    created_at: string,
    updated_at: string,
    category_name?: string
}