import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import Router from 'next/router'

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            ThirdPartyEmailPasswordReact.init({
                signInAndUpFeature: {
                    providers: [
                        ThirdPartyEmailPasswordReact.Google.init(),
                        ThirdPartyEmailPasswordReact.Facebook.init(),
                        ThirdPartyEmailPasswordReact.Github.init(),
                        ThirdPartyEmailPasswordReact.Apple.init(),
                    ],
                },
                style: `
                    [data-supertokens~=container] {
                        --palette-background: 51, 51, 51;
                        --palette-inputBackground: 41, 41, 41;
                        --palette-inputBorder: 41, 41, 41;
                        --palette-textTitle: 255, 255, 255;
                        --palette-textLabel: 255, 255, 255;
                        --palette-textPrimary: 255, 255, 255;
                        --palette-error: 173, 46, 46;
                        --palette-textInput: 169, 169, 169;
                        --palette-textLink: 169, 169, 169;
                    }
                    [data-supertokens~=button] {
                        background-color: #252571;
                        border: 0px;
                        margin: 0 auto;
                        color: #FFFFFF
                    }
                `
            }),
            SessionReact.init(),
        ],
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
                        Router.push(href)
                    },
                },
            }
        },
    }
}