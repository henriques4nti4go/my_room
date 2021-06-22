import { endpoints } from '_config/endpoints';

export default class Ws {
    private ws:any = new WebSocket(endpoints.user.messages.websocket);
    private params:any;
    constructor(params:any){
        this.params = params;
    }

    public connectToSever(){
        return new Promise((resolve,reject) => {
            this.ws.onopen = () => {
                this.ws.send(JSON.stringify(this.params));
                resolve(this.ws);
            }
        })
    }

    public client(){
        return this.ws;
    }

}