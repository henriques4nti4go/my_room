import Colors from './Colors';

export class ProcessDate {

    public dateWithPattern(date:Date){
        date = new Date(date);
        const day       =   date.getDate();
        const month     =   date.getMonth();
        const year      =   date.getFullYear();
        const hours     =   date.getHours();
        const minutes   =   date.getMinutes();
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}

export {
    Colors
};