import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export default function BlogPostList() {
  return (
    <SessionAuth>
      <AntdListInferencer />
    </SessionAuth>
  )
}

// export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
//   const { authenticated, redirectTo } = await authProvider.check(context);

//   if (!authenticated) {
//     return {
//       props: {},
//       redirect: {
//         destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
