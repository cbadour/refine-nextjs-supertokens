import { IResourceComponentsProps, useMany, useNavigation } from "@refinedev/core";

import {
    List,
    TextField,
    useTable
} from "@refinedev/antd";

import { Table, Space, Button } from "antd";
import React from "react";
import { IRole } from "src/interfaces/models";

const ClientsList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IRole>();

   // const { push } = useNavigation();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="name"
                    title="Name"
                    render={(value) => <TextField value={value} />}
                />
                {/* <Table.Column<any>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <Button onClick={() => push(`assignPermissions/${record.name}`)}>Permissions</Button>
                        </Space>
                    )}
                /> */}
            </Table>
        </List>
    );
};

export default ClientsList;