interface IColors {
    PRIMARY: string;
    BACKGROUND_VIEW: string;
    SECONDARY: string;
    FONT_COLOR: string;
}

export function colors(theme:string):IColors{ 
    if (theme === 'default') {
        return {
            PRIMARY: '#00B0A6',
            BACKGROUND_VIEW:'#D8D8D8',
            SECONDARY: 'white',
            FONT_COLOR: 'black',
        }
    }
    if (theme == 'dark') {
        return {
            PRIMARY: '#00B0A6',
            BACKGROUND_VIEW:'#393939',
            SECONDARY: 'black',
            FONT_COLOR: 'white',
        }
    }

    return {
        PRIMARY: '#00B0A6',
        BACKGROUND_VIEW:'#D8D8D8',
        SECONDARY: 'white',
        FONT_COLOR: 'black',
    }
}

