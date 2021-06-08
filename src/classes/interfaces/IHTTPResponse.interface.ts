export interface IHTTPResponse{
    code: number;
    error: boolean;
    descriptionCode: string;
    descriptionError?: string;
    response?: any;
}