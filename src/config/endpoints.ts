import {DATABASE_HOST} from "@env";

const address_api = `${DATABASE_HOST}/api/v1`;

export const endpoints  = {
    logon: {
        signUp:`${address_api}/signUp`,
    },
    user:{
        edit_profile: `${address_api}/user/edit_profile`,
        search_user: `${address_api}/user/search_user`,
        get_user: `${address_api}/user`,
        messages: {
            get_messages: `${address_api}/user/messages/get_messages_room`,
            send_message_room: `${address_api}/user/messages/send_message_room`
        }
    },
    room: {
        get_rooms: `${address_api}/room`,
        create: `${address_api}/create`,
        update: `${address_api}/update`,
        delete: `${address_api}/delete`,
    },
    token: `${address_api}/getToken`,
    teste: `${DATABASE_HOST}`
}