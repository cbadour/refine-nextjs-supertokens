import { IResourceComponentsProps } from "@refinedev/core";

import {
    List,
    TextField,
    useTable
} from "@refinedev/antd";

import { Table } from "antd";
import React from "react";
import { IRole } from "src/interfaces/models";

const UsersList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IRole>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="email"
                    title="Email"
                    render={(value) => <TextField value={value} />}
                />
            </Table>
        </List>
    );
};

export default UsersList;