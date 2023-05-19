import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function BlogPostList() {
  return (
    <SessionAuth>
      <AntdListInferencer />
    </SessionAuth>
  )
}
