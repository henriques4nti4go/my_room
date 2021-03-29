import {DATABASE_HOST} from "@env";

const address_api = `${DATABASE_HOST}/api/v1`;

export const routes  = {
    logon: {
        signIn:`${address_api}/signIn`,
        signUp:`${address_api}/signUp`,
    },
    teste: `${DATABASE_HOST}`
}