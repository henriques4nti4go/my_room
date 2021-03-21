import * as SQLite from 'expo-sqlite';
import {db_name} from '../index';

class ExecuteSQL {

    private db:any = SQLite.openDatabase(db_name);

    /**
     * exec
     */
    public async exec(query:string) 
    {
            console.log(process.env.SQLITE_DB_NAME);  
            return new Promise((resolve,reject)=>{
                this.db.exec([{ sql: query, args: [] }], false, ($:any,res:any) =>
                    resolve({
                        response:res[0],
                        data: res[0].rows,
                    })
                );
            })
    }
}

class ProcessData {
    /**
     * objectToKeyValue
     */
    public objectToKeyValue(object:object) : Array<object> 
    {
        let array:Array<any> = Object.entries(object);
        let arrayObject:Array<object> = [];

        array.forEach( (element:Array<string>) => {

            let objectFromArray : {key:string;value:string} = {key:'',value:''};

            objectFromArray['key']   = element[0];
            objectFromArray['value'] = element[1];
            arrayObject.push(objectFromArray);
        });

        return arrayObject;
    }

    /**
     * removeLastCaracter
     */
    public removeLastCaracter(string:string,caracter:string) {
        return string.substring(0,string.lastIndexOf(caracter)-1);
    }

    /**
     * stringRealTypeValues
     */
    public stringRealTypeValues(element:{key:string,value:string},objectKeyValue:any) {
        if(objectKeyValue[element.key] === 'string') return `'${element.value}'`;
        return element.value;
    }
}



export default class OperationsSQLite {
    public tableName:string = '';
    public fields:object = {};
    private query:string = '';
    private executeSQL:ExecuteSQL = new ExecuteSQL();
    private process:ProcessData = new ProcessData();

    /**
     * createTable
     */
    public async createTable() 
    {
        let queryCreate:string = ''; 
        let arrayObject:Array<any> = this.process.objectToKeyValue(this.fields);
        
        arrayObject.forEach( element => {
            queryCreate += ` ${element.key} ${element.value} ,`;
        });
        
        queryCreate = queryCreate.substring(0,queryCreate.lastIndexOf(',')-1)
        
        let query:string = `CREATE TABLE IF NOT EXISTS ${this.tableName} ( ${queryCreate} ) `
        await this.executeSQL.exec(query);
    }

    /**
     * select
     */
    public select(params?:Array<string>,distinct?:boolean) 
    {
        this.createTable();
        let fieldDistinct:string = distinct === true ? 'DISTINCT' : ''; 
        
        let querySelect:string = '';
        
        if (params && params.length > 0) {
            params.forEach(element => {
                querySelect += `${element} , `;
            });
            querySelect = this.process.removeLastCaracter(querySelect,',');
        } else {
            querySelect = ' * ';
        }

        this.query = ` SELECT ${fieldDistinct} ${querySelect} FROM ${this.tableName} `;

        return {
            exec: () => this.executeSQL.exec(this.query),
            where: (object:object) => this.where(object),
            orderBy: (columns:Array<string>) => this.orderBy(columns)    
        }
    }

    private where(object:object) 
    {
        let queryWhere:string = ' WHERE '; 
        let arrayObject:Array<any> = this.process.objectToKeyValue(object);
        
        arrayObject.forEach(element => {
            queryWhere += ` ${element.key} = '${element.value}' AND `; 
        });
        queryWhere = queryWhere.substring(0,queryWhere.lastIndexOf('AND')-1)

        this.query += ` ${queryWhere} `;

        return {
            exec: () => this.executeSQL.exec(this.query),
            orderBy: (columns:Array<string>) => this.orderBy(columns),  
        }

    }

    /**
     * insert
     */
    public insert(object:object) {
        this.createTable();
        let array = this.process.objectToKeyValue(this.fields);

        
        let queryColumns:string = '';
        let queryValues:string = '';

        let arrayObject:Array<any> = this.process.objectToKeyValue(object);
        
        arrayObject.forEach(element => {
            queryColumns    +=  `${element.key} ,`; 
            queryValues     +=  `${this.process.stringRealTypeValues(element,this.fields)} ,`;
        });

        queryColumns = this.process.removeLastCaracter(queryColumns,',');
        queryValues = this.process.removeLastCaracter(queryValues,',');

        this.query += ` INSERT INTO ${this.tableName} ( ${queryColumns} ) VALUES ( ${queryValues} ) `;

        return {
            exec: () => this.executeSQL.exec(this.query),
            orderBy: (columns:Array<string>) => this.orderBy(columns),  
        }
    }

    /**
     * update
     */
    public update(object:object) {
        this.createTable();
        let queryUpdate:string = '';
        
        let queryColumns:string = '';
        let queryValues:string = '';

        let arrayObject:Array<any> = this.process.objectToKeyValue(object);
        
        arrayObject.forEach(element => {
            queryColumns    =  `${element.key}`; 
            queryValues     =  `${this.process.stringRealTypeValues(element,this.fields)}`;
            queryUpdate     +=  `${queryColumns}=${queryValues} , `;
        });

        queryUpdate = this.process.removeLastCaracter(queryUpdate,',');

        this.query += ` UPDATE ${this.tableName} SET ${queryUpdate} `;

        return {
            exec: () => this.executeSQL.exec(this.query),
            where: (object:object) => this.where(object),
        }
    }

    /**
     * delete
     */
    public delete() {
        this.createTable();

        this.query += ` DELETE FROM ${this.tableName} `;

        return {
            exec: () => this.executeSQL.exec(this.query),
            where: (object:object) => this.where(object),
        }
    }

    /**
     * dropTable
     */
    public dropTable() {
        this.query = ` DROP TABLE IF EXISTS ${this.tableName} `;
        return {
            exec: () => this.executeSQL.exec(this.query),
        }
    }

    private orderBy(columns:Array<string>){
        let queryOrderBy = ' ORDER BY ';

        columns.forEach((element:string) => {
            queryOrderBy += ` ${element} ,`;
        });

        this.query += queryOrderBy.substring(0,queryOrderBy.lastIndexOf(',')-1)
        
        return {
            exec: () => this.executeSQL.exec(this.query),
            asc: () => this.asc(),
            desc: () => this.desc(),
        }

    }

    private asc(){
        let queryAsc = '';

        // columns.forEach((element:string) => {
        //     queryAsc += ` ${element} ASC ,`;
        // });

        // this.query += queryAsc.substring(0,queryAsc.lastIndexOf(',')-1);
        this.query += ' ASC ';
        return {
            exec: () => this.executeSQL.exec(this.query)
        }

    }

    private desc(){
        let queryDesc = '';

        // columns.forEach((element:string) => {
        //     queryDesc += ` ${element} DESC ,`;
        // });

        // this.query = queryDesc.substring(0,queryDesc.lastIndexOf(',')-1)
        this.query += ' DESC ';
        return {
            exec: () => this.executeSQL.exec(this.query)
        }

    }

    private innerJoin() {
        let queryJoin:string = ' WHERE '; 
        let arrayObject:Array<any> = this.process.objectToKeyValue(object);
        
        arrayObject.forEach(element => {
            queryJoin += ` ${element.key} = '${element.value}' AND `; 
        });
        queryJoin = queryJoin.substring(0,queryJoin.lastIndexOf('AND')-1)

        this.query += ` ${queryJoin} `;

        return {
            exec: () => this.executeSQL.exec(this.query),
            orderBy: (columns:Array<string>) => this.orderBy(columns),  
        }
    }



}

