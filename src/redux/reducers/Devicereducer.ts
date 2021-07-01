const initialState:{
    device_theme:string
    colors_theme:any
} = {
    device_theme: '',
    colors_theme : {}
}

interface IColors {
    PRIMARY: string;
    BACKGROUND_VIEW: string;
    SECONDARY: string;
    FONT_COLOR: string;
    BORDER_COLOR: string;
}

function colors(theme:string):IColors{ 
    if (theme === 'default') {
        return {
            PRIMARY: '#00B0A6',
            BACKGROUND_VIEW:'#DBDBDB',
            SECONDARY: 'white',
            FONT_COLOR: 'black',
            BORDER_COLOR: '#C4C4C4'
        }
    }
    
    if (theme == 'dark') {
        return {
            PRIMARY: '#00B0A6',
            BACKGROUND_VIEW:'#393939',
            SECONDARY: '#131313',
            FONT_COLOR: 'white',
            BORDER_COLOR: 'white'
        }
    }

    return {
        PRIMARY: '#00B0A6',
        BACKGROUND_VIEW:'#DBDBDB',
        SECONDARY: 'white',
        FONT_COLOR: 'black',
        BORDER_COLOR: '#white'
    }
}

const Reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'APP_THEME':
            state.device_theme = action.payload;
            state.colors_theme = colors(action.payload)
            return {...state}
    }
    return {...state}
}

export default Reducer;