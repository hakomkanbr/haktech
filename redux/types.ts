import ContentType from "types/products";

export interface AppReducers {
    datatableSetting: object;
    pageDir: string;
}

export interface CartReducers {
    cart: ContentType[],
    cartTotal: number;
    favorites: ContentType[]
    favoritesTotal: number;
    loading: boolean;
    has_auth:boolean
}
export interface UserReducers {
    user: object,
    loading: boolean
}