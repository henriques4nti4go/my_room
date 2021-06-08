import {DATABASE_HOST} from "@env";

const address_api = `${DATABASE_HOST}/api/v1`;

export const endpoints  = {
    logon: {
        signUp:`${address_api}/signUp`,
    },
    user:{
        edit_profile: `${address_api}/user/edit_profile`,
        search_user: `${address_api}/user/search_user`,
        get_user: `${address_api}/user`
    },
    token: `${address_api}/getToken`,
    teste: `${DATABASE_HOST}`
}