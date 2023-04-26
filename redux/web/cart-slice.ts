import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pointsSite from "points.site";
import { CartReducers } from "redux/types";
import axiosConfig from "services/api";
import ContentType from "types/products";

const initialState: CartReducers = {
    cart: [],
    cartTotal: 0,
    favorites: [],
    favoritesTotal: 0,
    loading: false,
    has_auth: false
};

export const fetchCardProductRedux: any = createAsyncThunk(
    "virtualCustumer/fetchProductRedux", async (_, thunkAPI) => {
        try {
            let user: any = thunkAPI?.getState();
            let check: any = Object.keys(user.user.user).length;
            const localData = JSON.parse(localStorage.getItem("cart") ?? "[]");
            if (check > 0) {
                console.info("user : ", user.user.user);
                const fetch = await axiosConfig().post(pointsSite.custumerSite_getItemInTheSella + "?companySlug=" + user?.user?.user?.CompanySlug);
                console.info("has login_02");
                const data = await fetch.data;
                console.info("has login_03");
                const all = [...localData, ...data?.order?.orderItems]
                console.info("has login_04");
                const uniqBy = (a: any, key: any) => {
                    let seen = new Set();
                    return a.filter((item: any) => {
                        let k = key(item);
                        return seen.has(k) ? false : seen.add(k);
                    })
                }
                const arr = uniqBy(all, (t: any) => t.slug);
                localStorage.setItem("cart", JSON.stringify(arr));
                return {
                    data: arr,
                    has_auth: true
                };
            } else {
                console.info("no login");
                return {
                    data: localData,
                    has_auth: false
                };
            }
        } catch (err) {
            return err;
        }
    }
)
export const addToCart: any = createAsyncThunk(
    "virtualCustumer/AddOrderItem", async (data: ContentType, thunkAPI) => {
        try {
            let state: any = thunkAPI?.getState();
            let check: any = Object.keys(state.user.user).length;
            console.info("_ : ", data);
            if (check > 0) {
                await axiosConfig()
                    .post(pointsSite.custumerSite_AddOrderItem, {
                        "ProductSlug": data.slug,
                        "CategorySlug": data.categorySlug,
                        "CompanySlug": state?.user?.user?.CompanySlug
                    });
                return {
                    data,
                    has_auth: false
                };;
            } else {
                return {
                    data,
                    has_auth: false
                };
            }
        } catch (err) {
            return err;
        }
    }
)

export const virtualCustumer = createSlice({
    name: "virtualCustumer",
    initialState,
    reducers: {
        // action.payload = {has_auth:true}
        // addToCart(state, action) {
        //     console.info("action : ", action)
        //     if (state.has_auth) {
        //         const localData: [] = JSON.parse(localStorage.getItem("cart") ?? "[]");
        //         axiosConfig()
        //             .post(pointsSite.custumerSite_AddOrderItem, {
        //                 "ProductSlug": action.payload.slug,
        //                 "CategorySlug": action.payload.categorySlug,
        //                 "CompanySlug": "test2Company"
        //             })
        //             .then(res => {
        //                 let data = res.data;
        //                 state.cart = data;
        //                 localStorage.setItem("cart", JSON.stringify(data));
        //             })
        //     } else {
        //         const parsedJson = state.cart;
        //         //if that action product has already in cart then if block will work
        //         const itemIndex = parsedJson.findIndex(
        //             (item: any) => item.slug === action.payload.slug
        //         );
        //         if (itemIndex >= 0) {
        //             parsedJson[itemIndex].quantity += 1;
        //         } else {
        //             const product = { ...action.payload, quantity: 1 };
        //             parsedJson.push(product);
        //         }
        //         state.cart = parsedJson;
        //         localStorage.setItem("cart", JSON.stringify(parsedJson));
        //     }
        // },
        removeFromCart(state, action) {
            const updatedCart = state.cart.filter((p: any) => p.slug !== action.payload.slug);
            state.cart = updatedCart;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeAll(state, action) {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        reduceProduct(state, action) {
            const itemIndex = state.cart.findIndex(
                (item: any) => item.slug === action.payload.slug
            );

            if (state.cart[itemIndex].quantity > 1) {
                state.cart[itemIndex].quantity -= 1;
            } else if (state.cart[itemIndex].quantity === 1) {
                const updatedCart = state.cart.filter(
                    (p: any) => p.slug !== action.payload.slug
                );
                state.cart = updatedCart;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        incrementProduct(state, action) {
            const itemIndex = state.cart.findIndex(
                (item: any) => item.slug === action.payload.slug
            );
            if (state.cart[itemIndex].quantity >= 1) {
                state.cart[itemIndex].quantity += 1;
            }
        },
    },
    extraReducers: {
        [fetchCardProductRedux.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCardProductRedux.fulfilled]: (state, action) => {
            state.loading = false;
            console.info("fetchCardProductRedux fulfilled : ", action);
            state.has_auth = action.payload.has_auth;
            state.cart = action.payload.data;
        },
        [fetchCardProductRedux.rejected]: (state, action) => {
            state.loading = false;
        },
        [addToCart.pending]: (state, action) => { },
        [addToCart.fulfilled]: (state, action) => {
            const data = action.payload.data;
            const parsedJson = state.cart;
            //if that action product has already in cart then if block will work
            const itemIndex = parsedJson?.findIndex(
                (item: any) => item.slug === data.slug
            );
            if (itemIndex >= 0) {
                parsedJson[itemIndex].quantity += 1;
            } else {
                const product = { ...data, quantity: 1 };
                parsedJson.push(product);
            }
            state.cart = parsedJson;
            localStorage.setItem("cart", JSON.stringify(parsedJson));
        },
        [addToCart.rejected]: (state, action) => { },
    },
});

export const {
    removeFromCart,
    removeAll,
    reduceProduct,
    incrementProduct,
} = virtualCustumer.actions;
export default virtualCustumer.reducer;
