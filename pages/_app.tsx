import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { Header } from "@components/header";
import "@refinedev/antd/dist/reset.css";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "src/config/frontendConfig";
import Image from 'next/image';
import AdminPanelBuilder from "@components/adminPanelBuilder";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {

  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Sider={() => <ThemedSiderV2
          fixed
          Title={({ collapsed }) => (
            collapsed ?
              <Image
                height={40}
                width={40}
                src='/icons/app-logo-collapsed.ico'
                alt="app-main-logo"
              />
              :
              <Image
                height={40}
                width={140}
                src='/icons/app-logo-colored.svg'
                alt="app-main-logo"
              />
          )}
        />}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <SuperTokensWrapper>
      <AdminPanelBuilder>
        {renderComponent()}
      </AdminPanelBuilder>
    </SuperTokensWrapper>
  )
}

export default MyApp;
