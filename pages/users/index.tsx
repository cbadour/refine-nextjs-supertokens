import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";

import {
    EditButton,
    List,
    ShowButton,
    TextField,
    useTable
} from "@refinedev/antd";

import { Space, Table } from "antd";
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

                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
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

export default UsersList;