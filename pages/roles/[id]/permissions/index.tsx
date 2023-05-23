import { IResourceComponentsProps } from "@refinedev/core";

import {
    DeleteButton,
    List,
    TextField,
    useTable
} from "@refinedev/antd";

import { Table, Space } from "antd";
import React from "react";
import { IRolePermissions } from "src/interfaces/models";

const RolePermissions: React.FC<IResourceComponentsProps> = () => {

    const { tableProps } = useTable<IRolePermissions>({
        resource: 'rolePermissions',
        dataProviderName: 'supabase'
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="roleId"
                    title="Role"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="permissionId"
                    title="Permission"
                    render={(value) => <TextField value={value} />}
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
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export default RolePermissions;