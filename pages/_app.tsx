import {
  ThemedLayoutV2,
  ThemedSiderV2,
  notificationProvider,
} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import simpleRestDataProvider from "@refinedev/simple-rest";
import { authProvider } from "src/authProvider";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "src/config/frontendConfig";
import Image from 'next/image';
const API_URL = "https://api.fake-rest.refine.dev";
import { supabaseClient } from "src/config/supabaseClient";
import { supabase } from "src/lib/supabase";

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
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <SuperTokensWrapper>
            <Refine
              routerProvider={routerProvider}
              dataProvider={{
                default: simpleRestDataProvider(API_URL),
                supabase: supabase.dataProvider(supabaseClient)
              }}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    canDelete: true,
                    parent: 'User Management'
                  },
                },
                {
                  name: "roles",
                  list: "/roles",
                  create: "/roles/create",
                  edit: "/roles/edit/:id",
                  show: "/roles/show/:id",
                  meta: {
                    canDelete: true,
                    parent: 'User Management'
                  },
                },
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "clients",
                  list: "/clients",
                  create: "/clients/create",
                  edit: "/clients/edit/:id",
                  show: "/clients/show/:id",
                  meta: {
                    canDelete: true,
                    dataProviderName: 'supabase'
                  }
                }
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}>
              {renderComponent()}
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </SuperTokensWrapper>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
