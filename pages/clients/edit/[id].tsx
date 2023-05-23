import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const ClientsEdit: React.FC = () => {
    return (
        <SessionAuth>
            <AntdEditInferencer />
        </SessionAuth>
    )
};

export default ClientsEdit;
