import { Time } from "@angular/common";

export interface Category {
    id: number,
    name: string,
    created_at: Time,
    updated_at: Time
}