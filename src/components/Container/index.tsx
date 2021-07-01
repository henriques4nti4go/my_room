import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { style } from '_styles/';
import {colors,style as styles} from '_styles/'
import {connect} from 'react-redux';
interface ContainerProps {
    colors_theme:IColors;
    children:any
}

interface IColors {
    PRIMARY: string;
    BACKGROUND_VIEW: string;
    SECONDARY: string;
    FONT_COLOR: string;
}

const Container = (props:ContainerProps) => { console.log(props)
    return (
        <View style={[
            style.body,
            {
                backgroundColor: props.colors_theme.BACKGROUND_VIEW,
                flex:1
            }
        ]}>
            {/* <View style={[{
                backgroundColor: props.colors_theme.SECONDARY,paddingVertical:10,
            },styles.shadowBox]}>
                <View style={{width: '90%',alignSelf: 'center'}}>
                    <Image style={{width:114,height:22}} source={require('_assets/my_room.png')} />
                </View>
            </View> */}
            <View
            style={[
                {
                width: '90%',
                alignSelf: 'center',
                flex:1
                }
            ]}
            >
                {props.children}
            </View>
        </View>
    );
};

const mapState = (state:any) => ({
    colors_theme: state.device.colors_theme,
  })
  
  const mapDispatch = {
    
  }
  
  export default connect(mapState,mapDispatch)(Container);