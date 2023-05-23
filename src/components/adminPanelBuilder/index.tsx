import { Refine } from '@refinedev/core';
import React, { PropsWithChildren } from 'react'
import { notificationProvider } from "@refinedev/antd";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, { UnsavedChangesNotifier } from "@refinedev/nextjs-router";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import simpleRestDataProvider from "@refinedev/simple-rest";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/config/supabaseClient";
import { supabase } from "src/lib/supabase";
import { useAccessControl } from "src/lib/accessControl/useAccessControl";
const API_URL = "https://api.fake-rest.refine.dev";

const AdminPanelBuilder: React.FC<PropsWithChildren> = ({ children }) => {

    const { canAccess } = useAccessControl();

    return (
        <RefineKbarProvider>
            <ColorModeContextProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={{
                        default: simpleRestDataProvider(API_URL),
                        supabase: supabase.dataProvider(supabaseClient)
                    }}
                    accessControlProvider={{
                        can: async ({ resource, action }) => {
                            return { can: true }
                            // if (canAccess({ resource, action })) {
                            //     return { can: true }
                            // }

                            // return {
                            //     can: false,
                            //     reason: "Unauthorized"
                            // };
                        }
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
                                parent: 'User Management',
                                dataProviderName: 'supabase'
                            }
                        },
                        // {
                        //   name: "blog_posts",
                        //   list: "/blog-posts",
                        //   create: "/blog-posts/create",
                        //   edit: "/blog-posts/edit/:id",
                        //   show: "/blog-posts/show/:id",
                        //   meta: {
                        //     canDelete: true,
                        //   },
                        // },
                        // {
                        //   name: "categories",
                        //   list: "/categories",
                        //   create: "/categories/create",
                        //   edit: "/categories/edit/:id",
                        //   show: "/categories/show/:id",
                        //   meta: {
                        //     canDelete: true,
                        //   },
                        // },
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
                        },
                        {
                            name: "userProfiles",
                            edit: "/me",
                            meta: {
                                dataProviderName: 'supabase'
                            }
                        }
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}>
                    {children}
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                </Refine>
            </ColorModeContextProvider>
        </RefineKbarProvider>
    )
}

export default AdminPanelBuilder;