import React, { useEffect, useState } from "react";
import { LayoutProps } from "../pageWithLayouts";
import Topbar from "../../components/containers/topbar/topbar";
import Navbar from "components/containers/navbar";
import Footer from "components/containers/footer/footer";
import axiosConfig from "services/api";
import pointsSite from "points.site";
import CustumerProvider, { CustumerContext } from "contexts/custumer-context";
import { useDispatch } from "react-redux";
import { fetchCardProductRedux } from "redux/web/cart-slice";
import { useRouter } from "next/router";
import categoriesType from "types/categories";
import { checkUserLogin } from "redux/web/user-slice";
import WebSettingProvider from "contexts/web-setting";

const Children: LayoutProps = ({ children }) => {
  const custumerContext = React.useContext(CustumerContext);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkUserLogin());
    setTimeout(() => {
      dispatch(fetchCardProductRedux());
    }, 1200);
  }, []);


  return (
    <main style={{ backgroundColor: "#f9f9f969" }}>
      {children}
    </main>
  )
}

const StoresLayout: LayoutProps = ({ children }) => {
  const router = useRouter();
  const [data, setData] = useState<categoriesType[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosConfig()
      .post(pointsSite.getCategoriesTree, {
        slug: router.query["company-slug"],
        placeTest: "layout",
        pageSize: 10,
        currentPage: 1,
      })
      .then((res: any) => {
        setData(res.data)
      });
  }, [])

  return (
    <CustumerProvider>
      <WebSettingProvider>
        <div className="page">
          <Topbar />
          <Navbar data={data} />
          <Children>
            {children}
          </Children>
          <Footer data={data} />
        </div>
      </WebSettingProvider>
    </CustumerProvider >
  );
};

export default StoresLayout;
