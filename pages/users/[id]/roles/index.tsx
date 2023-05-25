import { IResourceComponentsProps, useMany, useOne, useShow } from "@refinedev/core";
import {
    DeleteButton,
    List,
    TextField,
    useModal,
    useTable
} from "@refinedev/antd";
import { Table, Space, Button, Modal } from "antd";
import React from "react";
import { IUserRoles } from "src/interfaces/models";
import { GetServerSideProps } from "next";
import AssignRoles from "@components/roles/assignRoles";

interface UserRolesProps extends IResourceComponentsProps {
    userId: number
}

const UserRoles: React.FC<UserRolesProps> = ({ userId }) => {

    const { tableProps, tableQueryResult } = useTable<IUserRoles>({
        resource: 'userRoles',
        filters: {
            permanent: [
                {
                    field: 'userId',
                    operator: 'eq',
                    value: userId
                }
            ]
        }
    });

    const userRoles = tableQueryResult?.data?.data ?? [];

    const { data: rolesData } = useMany({
        resource: "roles",
        ids: userRoles.map((userRole) => userRole?.roleId),
        queryOptions: {
            enabled: !!userRoles.length
        }
    });

    const { show, modalProps } = useModal({
        modalProps: {
            footer: null
        }
    });

    const { data: userData } = useOne({
        resource: 'users',
        id: userId
    })

    return (
        <React.Fragment>
            <List
                title={`Roles for ${userData?.data.name}`}
                headerButtons={() => (
                    <Button type="primary" onClick={show}>Manage Roles</Button>
                )}>
                <Table {...tableProps} rowKey="id">
                    <Table.Column
                        dataIndex="roleId"
                        title="Role"
                        render={(value) => <TextField value={
                            <span>
                                {rolesData?.data.find(data => data.id === value)?.name as any}
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
                                    resource="userRoles"
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>

            <Modal {...modalProps}>
                <AssignRoles
                    userId={userId}
                    userRoles={userRoles}
                />
            </Modal>
        </React.Fragment>
    )
}

export default UserRoles;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    return {
        props: {
            userId: params?.id
        }
    }
}