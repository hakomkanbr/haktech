
import axios from "axios";
import CollectionCreateForm from "components/elements/modal/modal-create-edit";
import CustumerLoginView from "components/views/auth/custumer-login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import pointsSite from "points.site";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAll, removeFromCart } from "redux/web/cart-slice";
import axiosConfig, { getAccessToken } from "services/api";
import ContentType from "types/products";

interface InCustumerContextProps {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
    openOrCloseLogin: () => void;
    checkUser: () => Promise<boolean>,
    redirectUrl: (redirectUrl: string) => void;
}

export const CustumerContext = React.createContext<InCustumerContextProps>({
    user: {},
    loading: true,
    setUser: () => { },
    setLoading: () => { },
    openOrCloseLogin: () => { },
    checkUser: () => Promise.resolve(false),
    redirectUrl: () => { },
});

export const CustumerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [redirectUrl, setRedirectUrl] = useState<string>("");
    const cart = useSelector((store: any) => store.virtualCustumer?.cart);
    const router = useRouter();
    const dispatch = useDispatch();
    const checkUser = async () => {
        const token = await getAccessToken();
        if ((token.length > 80)) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
    const openOrCloseLogin = () => {
        setLoginModal(!loginModal);
    }
    const returnUrl = (redirectUrl: string) => {
        setRedirectUrl(redirectUrl);
    }

    const onFinish = useCallback(async (values: any) => {
        try {
            setIsLoading(true);
            await signIn("credentials", {
                username: values.username,
                password: values.password,
                redirect: false,
            });
            if (cart && cart.length) {
                const el = cart.map((item: ContentType, index: number) => ({
                    "ProductSlug": item.slug,
                    "CategorySlug": item.categorySlug,
                    "CompanySlug": router.query["company-slug"]
                }))

                const data = await (await axiosConfig().post(pointsSite.custumerSite_AddOrderItems, el)).data;
                localStorage.setItem("cart", JSON.stringify(data?.order?.orderItems));
            }
            setLoginModal(false);
            if (redirectUrl) {
                router.push(redirectUrl);
                setRedirectUrl("")
            }
            return Promise.resolve(true);
        } catch (err) {
            setLoginModal(false);
        } finally {
            setIsLoading(false);
        }
        return Promise.reject(true);
    }, [cart, redirectUrl]);

    return (
        <CustumerContext.Provider
            value={{
                user: currentUser,
                loading: isLoading,
                setUser: setCurrentUser,
                setLoading: setIsLoading,
                openOrCloseLogin: openOrCloseLogin,
                checkUser: checkUser,
                redirectUrl: returnUrl
            }}
        >
            {children}
            <CollectionCreateForm
                title="تسجيل الدخول"
                open={loginModal}
                loading={isLoading}
                onCreate={onFinish}
                onCancel={() => {
                    setLoginModal(false);
                }}
            >
                <CustumerLoginView />
            </CollectionCreateForm>
        </CustumerContext.Provider>
    );
};

export default CustumerProvider;
