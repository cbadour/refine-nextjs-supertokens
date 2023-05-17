import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";
import supertokensNode from "supertokens-node";
import { backendConfig } from "./config/backendConfig";
import Session from 'supertokens-node/recipe/session';

const mockUsers = [
  {
    name: "John Doe",
    email: "johndoe@mail.com",
    roles: ["admin"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    roles: ["editor"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
];

export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers[0];

    if (user) {
      nookies.set(null, "auth", JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    nookies.destroy(null, "auth");
    return {
      success: true,
      redirectTo: "/auth",
    };
  },
  check: async (context: any) => {

    // this runs on the backend, so we must call init on supertokens-node SDK
    supertokensNode.init(backendConfig())

    // this will contain the session object post verification
    let session;

    try {
      // getSession will do session verification for us
      session = await Session.getSession(context.req, context.res, {
        overrideGlobalClaimValidators: () => {
          // this makes it so that no custom session claims are checked
          return []
        }
      });

      return {
        authenticated: true
      }
    } catch (err: any) {

      return {
        authenticated: false,
        logout: true,
        redirectTo: "/auth",
      };

      // if (err.type === Session.Error.TRY_REFRESH_TOKEN) {

      //   // in this case, the session is still valid, only the access token has expired.
      //   // The refresh token is not sent to this route as it's tied to the /api/auth/session/refresh API paths.
      //   // So we must send a "signal" to the frontend which will then call the 
      //   // refresh API and reload the page.

      //   return { props: { fromSupertokens: 'needs-refresh' } }
      //   // or return {fromSupertokens: 'needs-refresh'} in case of getInitialProps
      // } else if (err.type === Session.Error.UNAUTHORISED) {
      //   // in this case, there is no session, or it has been revoked on the backend.
      //   // either way, sending this response will make the frontend try and refresh
      //   // which will fail and redirect the user to the login screen.
      //   return { props: { fromSupertokens: 'needs-refresh' } }
      // }

      // throw err
    }


    // console.log('checking',)
    // const cookies = nookies.get(ctx);
    // if (cookies["auth"]) {
    //   return {
    //     authenticated: true,
    //   };
    // }

    // return {
    //   authenticated: false,
    //   logout: true,
    //   redirectTo: "/auth",
    // };
  },
  getPermissions: async () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
