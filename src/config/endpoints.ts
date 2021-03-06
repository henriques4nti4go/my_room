import {DATABASE_HOST,WEBSOCKET_HOST} from "@env";

const address_api = `${DATABASE_HOST}/api/v1`;
const address_websocket = `${WEBSOCKET_HOST}`;
export const endpoints  = {
    logon: {
        signUp:`${address_api}/signUp`,
    },
    user:{
        edit_profile: `${address_api}/user/edit_profile`,
        search_user: `${address_api}/user/search_user`,
        get_user: `${address_api}/user`,
        update_user_name: `${address_api}/user/update_user_name`,
        messages: {
            get_messages: `${address_api}/user/messages/get_messages_room`,
            send_message_room: `${address_api}/user/messages/send_message_room`,
            websocket: address_websocket
        },
        update_profile_photo: `${address_api}/user/media/update_profile_photo`,
        setTheme: `${address_api}/user/set_theme`,
        deleteUser: `${address_api}/user/delete_user`,
        signUp: `${address_api}/signUp`
    },
    room: {
        get_rooms: `${address_api}/room`,
        create: `${address_api}/room/create`,
        update: `${address_api}/room/update`,
        delete: `${address_api}/room/delete`,
        my_rooms: `${address_api}/room/my_rooms`
    },
    token: `${address_api}/getToken`,
    teste: `${DATABASE_HOST}`,
    
}