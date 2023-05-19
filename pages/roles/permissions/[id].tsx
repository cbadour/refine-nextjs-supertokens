import { axiosInstance } from "@refinedev/simple-rest";
import { Button } from "antd";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface AssignPermissionsProps {
    roleId: number
}

const AssignPermissions: React.FC<AssignPermissionsProps> = ({ roleId }) => {

    const [permissions, setPermissions] = useState<string[]>([]);

    const assignPermissions = async () => {
        const url = `http://localhost:8000/api/roles/add`;
        const { data } = await axiosInstance.post(url, { name: roleId, permissions: ['read', 'write'] }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('')}`
            }
        });

        return {
            data
        };
    }

    useEffect(() => {
        if (!roleId) return;
        const url = `http://localhost:8000/api/roles/${roleId}/permissions`;
        axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('')}`
            }
        }).then(result => {
            setPermissions(result.data?.permissions);
        });
    }, [roleId])

    return (
        <>
            <div>
                <strong>Permissions: </strong>
                {permissions && permissions.map((permission: string) => (
                    <span>{permission} &nbsp;</span>
                ))}
            </div>
            <br /> <br />
            <Button onClick={assignPermissions}>Assign Permissions Test</Button>
        </>
    )
}

export default AssignPermissions;


export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            roleId: 1
        }
    }
}
