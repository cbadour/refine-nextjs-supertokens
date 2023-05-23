import { IResourceComponentsProps, useMany, useNavigation } from "@refinedev/core";

import {
    EditButton,
    List,
    ShowButton,
    TextField,
    useTable
} from "@refinedev/antd";

import { Table, Space } from "antd";
import React from "react";
import { IRole } from "src/interfaces/models";

const ClientsList: React.FC<IResourceComponentsProps> = () => {
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
                    dataIndex="name"
                    title="Name"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column<any>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
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

export default ClientsList;