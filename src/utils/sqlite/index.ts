import * as SQLite from 'expo-sqlite';
export default class Sqlite {
    private db;
    private databaseName = 'teste';
    protected tableName = '';
    protected fields = {};

    constructor(){
        this.db = SQLite.openDatabase(this.databaseName);
    }
    
    protected async createTable(){
        let query = `create table if not exists ${this.tableName} `;
        let queryFields = '';
        const arrayObj = Object.entries(this.fields);
        arrayObj.forEach(element => {
            const nameField = element[0];
            const typeField = element[1];
            queryFields += ` ${nameField} ${typeField}, `
        });

        // retira a virgula da query
        queryFields = queryFields.substring(0,queryFields.lastIndexOf(','));
        const queryMaster = `${query} (${queryFields});`
        await this.exec(queryMaster);
    }

    public async exec(query:string){
        return new Promise((resolve,reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(query,[], 
                (none,response) => {
                    resolve({
                        error:false,
                        response
                    });
                },
                
                (response,error) => {
                    resolve({
                        error:true,
                        response:error
                    })
                    return true;
                })
            });
        });
    }

}
