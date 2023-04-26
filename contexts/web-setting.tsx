
import CollectionCreateForm from "components/elements/modal/modal-create-edit";
import CustumerLoginView from "components/views/auth/custumer-login";
import pointsSite from "points.site";
import React, { useState, useEffect } from "react";
import axiosConfig from "services/api";

export interface InWebSettingContextProps {
    generalData: any;
}

export const WebSettingContext = React.createContext<InWebSettingContextProps>({
    generalData: [],
});

export const WebSettingProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<InWebSettingContextProps>();
    useEffect(() => {
        const fetch = async () => {
            const data = await (await axiosConfig().post(pointsSite.getCompanyProfile + "?slug=string")).data;
            setData(data.data);
            console.info("data.data?.company", data.data);
        }
        fetch();
    }, []);
    return (
        <WebSettingContext.Provider
            value={{
                generalData: data,
            }}
        >
            {children}
        </WebSettingContext.Provider>
    );
};

export default WebSettingProvider;
