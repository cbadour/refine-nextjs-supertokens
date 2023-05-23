import { IResourceComponentsProps } from "@refinedev/core";
import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const ClientsShow: React.FC<IResourceComponentsProps> = () => {
    return (
        <SessionAuth>
            <AntdShowInferencer />
        </SessionAuth>
    )
};

export default ClientsShow;
