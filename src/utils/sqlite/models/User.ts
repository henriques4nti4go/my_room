import Sqlite from '../index';

export default class User extends Sqlite {
    constructor(){
        super();
        this.tableName = 'users';
        this.fields = {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            email: 'varchar(255)',
            password: 'varchar(255)',
        }
        this.createTable();
    }
}