import { Configuration, LogLevel } from '@azure/msal-browser'

const AzureClientId: string | undefined = process.env.AZURE_CLIENT_ID
const AzureTenantId: string | undefined = process.env.AZURE_TENANT_ID
const loginRedirectUri: string | undefined = process.env.AZURE_REDIRECT_URI


export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: AzureClientId,
    authority: `https://login.microsoftonline.com/${AzureTenantId}/`,
    redirectUri: loginRedirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: number,
        message: string,
        containsPii: any
      ): void => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
    },
  },
}
