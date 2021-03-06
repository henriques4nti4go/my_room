import React, { Component } from 'react';
import { View, Text, TextInput,StyleSheet, } from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

interface IProps {
    placeholder: string;
    colors_theme?: any;
    nameIcon: string;
    typeIcon: string;
    value: string;
    multiline: boolean;
    maxLength: number;
    onChangeText: Function;
    label: string;
    error: string;
    editable: boolean;
    secureTextEntry:boolean;
    borderColor?: string;
    placeholderColor?:string;
    fontColor?:string;
}

function index(props:IProps) {

    // PRIMARY: '#00B0A6',
    //         BACKGROUND_VIEW:'#DBDBDB',
    //         SECONDARY: 'white',
    //         FONT_COLOR: 'black',
    //         BORDER_COLOR: '#C4C4C4'

    const [colorsBorder,setColorBorder] = React.useState(props.borderColor || props.colors_theme.BORDER_COLOR || '#C4C4C4');
    const [showError,setShowError] = React.useState(props.error ? true : false);
    const localStyle = StyleSheet.create({
        boderInput:{
            borderWidth:2
        },
        paddingInput: {
            paddingHorizontal: 10,
            paddingVertical: 10
        },
        borderRadiusInput: {
            borderRadius: 5
        },
        colorBorder:{
            borderColor: colorsBorder,
        },
        flex: {
            flex:1
        },
        cardError: {
            height:50,
            width:'100%',
            backgroundColor:'red',
            borderBottomEndRadius:5,
            borderBottomLeftRadius:5,
            paddingVertical:10,
            paddingHorizontal:10
        }
    })
    return (
        <View>
            <View style={[
                localStyle.boderInput,
                localStyle.paddingInput,
                localStyle.borderRadiusInput,
                localStyle.colorBorder,
                {flexDirection:'row'}
            ]}>
                <View style={{alignSelf:'center',marginRight:10}}>
                    <Icon size={20} color={colorsBorder}  name={props.nameIcon || 'user'} type={props.typeIcon || 'font-awesome-5'} />
                </View>
                <TextInput 
    
                secureTextEntry={props.secureTextEntry}
                placeholderTextColor={props.placeholderColor || props.colors_theme.FONT_COLOR}
                editable={props.editable}
                multiline={props.multiline}
                maxLength={props.maxLength}
                value={props.value}
                onChangeText={(text) => props.onChangeText(text)}
                onFocus={() => setColorBorder(props.colors_theme.PRIMARY || '#00B0A6') }
                onBlur={() => setColorBorder(props.colors_theme.BORDER_COLOR || '#C4C4C4') }
                style={[
                    localStyle.flex,
                    {color:props.fontColor || props.colors_theme.FONT_COLOR}
                ]}
                placeholder={props.placeholder}/>
            </View>
            {
                showError && 
                <View style={[localStyle.cardError,{flexDirection:'row'}]}>
                    <View style={{flex:1}}>
                        <Text style={{color:'white',fontWeight:'bold'}}>Ocorreu um erro</Text>
                    </View>
                    <TouchableOpacity style={{width:'100%'}} onPress={() => setShowError(false)}>
                        <Icon name='window-close' color='white' size={20} type='font-awesome-5' />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}




const mapState = (state:any) => ({
    profile_user: state.profile_user,
    user_id: state.user.user_id,
    colors_theme: state.device.colors_theme
})
  
const mapDispatchToProp = ( dispatch:any ) => {
    return{
    }
}
  
export default connect(mapState,mapDispatchToProp)(index);

