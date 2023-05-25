import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";

import {
    EditButton,
    List,
    ShowButton,
    TextField,
    useTable
} from "@refinedev/antd";

import { Button, Space, Table } from "antd";
import React from "react";
import { IRole } from "src/interfaces/models";
import Image from "next/image";
import { useRouter } from "next/router";

const UsersList: React.FC<IResourceComponentsProps> = () => {

    const { tableProps } = useTable<IRole>();
    const { push } = useRouter();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="email"
                    title="Email"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="name"
                    title="Name"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="phoneNumber"
                    title="Phone Number"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="address"
                    title="Address"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="profileImagePath"
                    title="Profile"
                    render={(value) => <Image src={value} width={30} height={30} alt="user image" />}
                />

                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <Button
                                onClick={() => push(`/users/${record.id}/roles`)}>
                                Roles
                            </Button>
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