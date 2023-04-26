import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { store } from "redux/store";
import { Provider } from "react-redux";
import GlobalStyle from "../styles/globalStyles";
import { ConfigProvider } from "antd";
import { NextRouter, useRouter } from "next/router";
import WebLayout from "layout/web";
import AdminLayout from "../layout/admin/index";
import tr_TR from "antd/lib/locale/tr_TR";
import en_US from "antd/lib/locale/en_US";
import ar_EG from "antd/lib/locale/ar_EG";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import theam from "config/theam";
import "swiper/css/bundle";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: string | undefined;
};

const centerLayouts: any = {
  WebLayout: WebLayout,
  Admin: AdminLayout,
  Default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const lang: any = {
  tr: tr_TR,
  en: en_US,
  ar: ar_EG,
};

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppPropsWithLayout & { companyInformation: any }) {
  const { locale }: NextRouter = useRouter();
  // Use the layout defined at the page level, if available
  const Layout = centerLayouts[Component.layout ?? "Default"] ?? Component;
  const [queryClient] = React.useState(() => new QueryClient());
  const [width, setWidth] = useState<boolean>();
  useEffect(() => {
    if (window.innerWidth < 991) {
      setWidth(true);
    }
  }, []);

  if (width) {
    return "شاشة جهازك يتم تجهيزها , يرجى الدخول من شاشة لابتوب"
  }
  return (
    <ThemeProvider theme={theam}>
      <Head>
        <title>gasfdas</title>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <ConfigProvider
        locale={lang[locale ?? "ar_EG"]}
        direction={theam.dir ?? "rtl"}
        theme={theam}
      // direction={locale == "ar" ? "rtl" : "ltr"}
      >
        <GlobalStyle />
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <Layout>
                <Component {...pageProps} />
                {/* <Button onClick={() => {
                  signOut({
                    redirect: false
                  });
                }}>signOut</Button> */}
              </Layout>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}
export default MyApp;
