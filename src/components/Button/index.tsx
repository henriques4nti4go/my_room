import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,ActivityIndicator  } from 'react-native';
import {connect} from 'react-redux';
interface IProps {
    children: any;
    onPress: Function;
    colors_theme?: any;
    loading?:boolean;
}

const Button = (props: IProps) => {
    const [loading,setLoading] = React.useState(props.loading ? true : false);
  return (
        <TouchableOpacity
        disabled={loading}
        style={{
            backgroundColor:props.colors_theme.PRIMARY,
            minHeight:30,
            paddingHorizontal:10,
            paddingVertical:10,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5
        }}
        onPress={() => props.onPress()}
        >
            <View style={{flexDirection:'row'}}>
                {
                    !loading &&
                    <Text style={{fontWeight:'bold',color:'white',marginRight:10}}>{props.children}</Text>
                }
                {
                    loading &&
                    <ActivityIndicator size='small' color='white' />
                }
            </View>
        </TouchableOpacity>
  );
};

const mapState = (state:any) => ({
    profile_user: state.profile_user,
    user_id: state.user.user_id,
    colors_theme: state.device.colors_theme
})
  
const mapDispatchToProp = ( dispatch:any ) => {
    return{
    }
}

export default connect(mapState,mapDispatchToProp)(Button);

const styles = StyleSheet.create({
  container: {}
});
