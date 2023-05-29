import { DataProvider } from "@refinedev/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { generateFilter, handleError } from "./utils";

export const dataProvider = (
    supabaseClient: SupabaseClient
): Required<DataProvider> => {
    return {
        getList: async ({ resource, pagination, filters, sorters, meta }) => {
            const {
                current = 1,
                pageSize = 10,
                mode = "server",
            } = pagination ?? {};


            const { data, error } = await supabaseClient.functions.invoke(`${resource}/list`, {
                body: {
                    page: current, pageSize: pageSize, sorters: sorters
                }
            });

            if (error) {
                return handleError(error);
            }

            return {
                data: data || [],
                total: data.length || 0,
            } as any;
        },
        getMany: async ({ resource, ids, meta }) => {
            return { data: [] } as any;
        },
        create: async ({ resource, variables, meta }) => {
            const { data, error } = await supabaseClient.functions.invoke(`${resource}/create`, {
                body: {
                    data: variables
                }
            })

            if (error) {
                return handleError(error);
            }

            return {
                data: (data || [])[0] as any,
            };
        },
        createMany: async ({ resource, variables, meta }) => {
            return { data: [] };
        },
        update: async ({ resource, id, variables, meta }) => {
            const { data, error } = await supabaseClient.functions.invoke(`${resource}/update`, {
                body: {
                    data: variables
                }
            })

            if (error) {
                return handleError(error);
            }

            return {
                data: (data || [])[0] as any,
            };
        },
        updateMany: async ({ resource, ids, variables, meta }) => {
            return { data: [] }
        },
        getOne: async ({ resource, id, meta }) => {
            const { data, error } = await supabaseClient.functions.invoke(`${resource}/get`, {
                body: {
                    id: id
                }
            })

            if (error) {
                return handleError(error);
            }

            return {
                data: data as any,
            };
        },
        deleteOne: async ({ resource, id, meta }) => {
            const { data, error } = await supabaseClient.functions.invoke(`${resource}/delete`, {
                body: {
                    id: id
                }
            })

            if (error) {
                return handleError(error);
            }

            return {
                data: data as any,
            };
        },
        deleteMany: async ({ resource, ids, meta }) => {
            const { data, error } = await supabaseClient.functions.invoke(`${resource}/deleteMany`, {
                body: {
                    ids: ids
                }
            })

            if (error) {
                return handleError(error);
            }

            return {
                data: data as any,
            };
        },
        getApiUrl: () => {
            throw Error("Not implemented on data provider.");
        },
        custom: () => {
            throw Error("Not implemented on data provider.");
        }
    }
}
