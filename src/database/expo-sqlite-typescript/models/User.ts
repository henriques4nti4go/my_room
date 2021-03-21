import OperationsSQLite from '../SQLite/OperationsSQLite';
import InterfaceModels from './InterfaceModels';

export default class User extends OperationsSQLite implements InterfaceModels {
    public tableName:string = 'User';
    public fields:object = {
        id: 'integer',
        name: 'string',
        address: 'string',
        mais_um_campo: 'string'
    };
}