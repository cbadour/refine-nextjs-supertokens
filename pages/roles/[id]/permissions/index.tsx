import { IResourceComponentsProps, useMany, useOne } from "@refinedev/core";
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
import { GetServerSideProps } from "next";
import AssignPermissions from "@components/permissions/assignPermissions";

interface RolePermissionsProps extends IResourceComponentsProps {
    roleId: number
}

const RolePermissions: React.FC<RolePermissionsProps> = ({ roleId }) => {

    const { tableProps, tableQueryResult } = useTable<IRolePermissions>({
        resource: 'rolePermissions',
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

    const { data: permissionsData } = useMany({
        resource: "permissions",
        ids: rolePermissions.map((rolePermission) => rolePermission?.permissionId),
        queryOptions: {
            enabled: !!rolePermissions.length
        },
    });

    const { show, modalProps } = useModal({
        modalProps: {
            footer: null
        }
    });

    const { data: roleData } = useOne({
        resource: 'roles',
        id: roleId
    })

    return (
        <React.Fragment>
            <List
                title={`Permissions for ${roleData?.data.name}`}
                headerButtons={() => (
                    <Button type="primary" onClick={show}>Manage Permissions</Button>
                )}>
                <Table {...tableProps} rowKey="id">
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
                                    resource="rolePermissions"
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>

            <Modal {...modalProps}>
                <AssignPermissions
                    roleId={roleId}
                    rolePermissions={rolePermissions}
                />
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