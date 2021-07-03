import * as React from 'react';
import { Text, View, StyleSheet,Modal, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {style} from '_styles/'
interface IProps {
    visible:boolean;
    onRequestClose?:Function;
    children:any;
    colors_theme?:any;
    close:Function;
}   

const componentName = (props: IProps) => {
    return (
        <Modal
        // animationType="slide"
        
        transparent={true}
        visible={props.visible}>
            <View style={{flex:1,justifyContent:'center',backgroundColor:'rgba(1,1,1,0.6)'}}>
                <View style={[
                    style.shadowBox,
                    {
                        backgroundColor:props.colors_theme.SECONDARY,
                        width:'90%',
                        alignSelf:'center',
                        minHeight:150,
                        paddingHorizontal:10,
                        paddingVertical:10,
                        borderRadius:5
                    }
                    ]}>
                    <View>
                        <TouchableOpacity
                        style={{alignSelf:'flex-end'}}
                        onPress={() => props.close()}
                        >
                            <Icon name='window-close' color={props.colors_theme.FONT_COLOR} type='font-awesome-5' />
                        </TouchableOpacity>
                    </View>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
};

const mapState = (state:any) => ({
    user_access_token: state.user.user_access_token,
    profile_user: state.profile_user,
    device_theme: state.device.device_theme,
    colors_theme: state.device.colors_theme,
    user_id: state.user.user_id
  })
  
  const mapDispatch = (dispatch:any) => {
    return {
    }
  }
  
  export default connect(mapState,mapDispatch)(componentName);
  
const styles = StyleSheet.create({
  container: {}
});
