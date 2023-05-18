import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function CategoryList() {
  return (
    <SessionAuth>
      <AntdListInferencer />
    </SessionAuth>
  )
}
