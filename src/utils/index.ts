import Colors from './Colors';

export class ProcessDate {

    public dateWithPattern(date:Date){
        date = new Date(date);
        const day       =   date.getDate();
        const month     =   date.getMonth();
        const year      =   date.getFullYear();
        const hours     =   date.getHours();
        const minutes   =   date.getMinutes();
        return `${this.formatNumber(day)}/${this.formatNumber(month)}/${this.formatNumber(year)} ${this.formatNumber(hours)}:${this.formatNumber(minutes)}`;
    }

    private formatNumber(number:number) {
        if (number > 9) return number;
        return `0${number}`;
    }
}

export {
    Colors
};