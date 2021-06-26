import { endpoints } from '_config/endpoints';

export default class Ws {
    private ws:any;
    private urlWebsocket:string;
    constructor(user_id:any,room_id:any,token:string){
        const params = this.queryParams(user_id,room_id,token);
        this.urlWebsocket = `${endpoints.user.messages.websocket}?${params}`;
    }

    private queryParams(user_id:any,room_id:any,token:string){
        const params = new URLSearchParams({
            room_id,
            token,
            user_id,
        });
        return params.toString();
    }

    public async  connectToSever(){
        return new Promise((resolve) => {
            const ws = new WebSocket(this.urlWebsocket); 
            ws.onopen = () => {
                'user connected'
            }

            resolve(ws);
        });
          
    }

}