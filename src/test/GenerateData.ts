interface RoomDataFields {
    name:           any;
    color:          any;
    image:          any;
    desciption:     any;
    usersTotal:      any;
}

class Data implements RoomDataFields {
    name:           any = null;
    color:          any = null;
    image:          any = null;
    desciption:     any = null;
    usersTotal:      any = null;
    sizeData:       number;
    // private sizeData:number;

    constructor(sizeData:number){
        this.sizeData = sizeData;
        this.generateData();
    }

    private generateName() {
        return Math.random().toString(36).replace('.','')
    }

    private generateColor() {
        return Math.floor(Math.random()*16777215).toString(16);
    }

    private generateDescription() {
        return '';
    }

    private generateUsersTotal() {
        return Math.round(Math.random()*100);
    }

    private randomData() {
        return Math.round(Math.random()*1);
    }

    private generateData() {
        this.name = this.generateName();
        if (this.randomData()) this.color = this.generateColor();
        if (this.randomData()) this.desciption = this.generateDescription();
        if (this.randomData()) this.usersTotal = this.generateUsersTotal();
    }

    public returnData(){
        let data = [];
        for (let index = 0; index < this.sizeData; index++) {
            this.generateData();
            data.push({
                name: this.name,
                description: this.desciption,
                color: this.color,
                image: this.image,
                usersTotal: this.usersTotal,
            });
        }
        return data;
    }
}

export default Data;