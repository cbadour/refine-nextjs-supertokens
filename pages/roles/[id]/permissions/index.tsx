import { IResourceComponentsProps, useMany } from "@refinedev/core";
import {
    DeleteButton,
    List,
    TextField,
    useModal,
    useTable
} from "@refinedev/antd";
import { Table, Space, Button, Modal } from "antd";
import React from "react";
import { IRolePermissions } from "src/interfaces/models";
import PermissionsList from "@components/permissions/permissionsList/permissionsList";
import { GetServerSideProps } from "next";

interface RolePermissionsProps extends IResourceComponentsProps {
    roleId: number
}

const RolePermissions: React.FC<RolePermissionsProps> = ({ roleId }) => {

    const { tableProps, tableQueryResult } = useTable<IRolePermissions>({
        resource: 'rolePermissions',
        dataProviderName: 'supabase',
        filters: {
            permanent: [
                {
                    field: 'roleId',
                    operator: 'eq',
                    value: roleId
                }
            ]
        }
    });

    const rolePermissions = tableQueryResult?.data?.data ?? [];

    // Fetches the category of each post. It uses the useMany hook to fetch the category data from the API.
    const { data: permissionsData } = useMany({
        resource: "permissions",
        dataProviderName: 'supabase',
        // Creates the array of ids. This will filter and fetch the category data for the relevant posts.
        ids: rolePermissions.map((rolePermission) => rolePermission?.permissionId),
        queryOptions: {
            // Set to true only if the posts array is not empty.
            enabled: !!rolePermissions.length
        },
    });

    const { show, modalProps } = useModal({
        modalProps: {
            footer: null
        }
    });

    return (
        <React.Fragment>
            <List
                title={`Permissions for Admin`}
                headerButtons={() => (
                    <Button type="primary" onClick={show}>Manage Permissions</Button>
                )}>
                <Table {...tableProps} rowKey="id">
                    <Table.Column
                        dataIndex="id"
                        title="ID"
                        render={(value) => <TextField value={value} />}
                    />
                    <Table.Column
                        dataIndex="permissionId"
                        title="Permission"
                        render={(value) => <TextField value={
                            <span>
                                {permissionsData?.data.find(data => data.id === value)?.name as any}
                            </span>
                        } />}
                    />
                    <Table.Column<any>
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record) => (
                            <Space>
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                    dataProviderName="supabase"
                                    resource="rolePermissions"
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>

            <Modal {...modalProps}>
                <PermissionsList roleId={roleId} />
            </Modal>
        </React.Fragment>
    )
}

export default RolePermissions;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    return {
        props: {
            roleId: params?.id
        }
    }
}