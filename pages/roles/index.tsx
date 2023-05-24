import { IResourceComponentsProps } from "@refinedev/core";
import { DeleteButton, EditButton, List, TextField, useTable } from "@refinedev/antd";
import { Table, Space, Button } from "antd";
import React from "react";
import { IRole } from "src/interfaces/models";
import { useRouter } from "next/router";

const RolesList: React.FC<IResourceComponentsProps> = () => {

    const { tableProps } = useTable<IRole>();

    const { push } = useRouter();

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
                            <Button
                                onClick={() => push(`/roles/${record.id}/permissions`)}>
                                Permissions
                            </Button>

                            <EditButton
                                hideText
                                recordItemId={record.id}
                            />

                            <DeleteButton
                                hideText
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}

export default RolesList;