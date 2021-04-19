import {DATABASE_HOST} from "@env";

const address_api = `${DATABASE_HOST}/api/v1`;

export const routes  = {
    logon: {
        signIn:`${address_api}/signIn`,
        signUp:`${address_api}/signUp`,
    },
    user:{
        edit_profile: `${address_api}/user/edit_profile`,
        search_user: `${address_api}/user/search_user`,
    },
    teste: `${DATABASE_HOST}`
}