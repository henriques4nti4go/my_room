import axios from 'axios';
interface IParamsRequest {
    url: string;
    method: any;
    data?: object;
    header?: string[]
}
export class RequestResponsePattern {
    private url = '';
    private method;
    private data:object | undefined;
    private header:string[] | undefined;

    constructor(params:IParamsRequest){
        this.url = params.url;
        this.method = params.method;
        this.data = params.data;
        this.header = params.header;
    }

    public async request(){
        const {data}  = await axios({
            url:this.url,
            data:this.data,
            method: this.method,
            headers: this.header
        });
        console.log(data)
    }
}