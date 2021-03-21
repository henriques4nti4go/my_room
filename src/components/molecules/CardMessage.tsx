import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    Avatar as AvatarElements,
    Icon
} from 'react-native-elements';

interface componentNameProps {
    data: any
}


function dateProcessing(date:Date) 
{
  let day:any      = (String(date.getDate()).length < 2) ? ((`0${date.getDate()}`)) : date.getDate() ;
  let month:any    = (String(date.getMonth()).length < 2) ? ((`0${date.getMonth()}`)) : date.getMonth() ;;
  let year:any     = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const index = (props: componentNameProps) => {
    let item = props.data;
    let color = item.login == 'paulo' ? 'white' : '#e6e0ff';
    let align = item.login == 'paulo' ? 'flex-end' : 'flex-start';
    let checkIcon = item.login == 'paulo' ? true : false;
    return (
        <View
        style={{
          padding:5,
          backgroundColor: color ,
          borderRadius: 5,
          marginBottom:10,
          paddingLeft:10,
          // paddingRight:25,
          flexDirection: 'column',
          alignSelf: align,
        }}
        >
            <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}
            >
                <View
                style={{
                    marginRight:10,
                    alignSelf: 'flex-start'
                }}
                >
                    <AvatarElements
                    size={50} 
                    rounded={true}
                    source={{uri:'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70'}} 
                    />
                </View>
                <View
                >
                    <View
                    style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    maxWidth: 200
                    }}
                    >
                    <Text
                    >{props.data.message}
                    </Text>
                    </View>
                </View>
            </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'space-between'
            }}
            >
              <Text
              style={{
                color:'grey',
                fontSize:10,
                alignSelf: 'flex-start',
              }}
              >
                {dateProcessing(item.date)}
              </Text>
              {checkIcon && <Icon 
                type='feather' name='check-circle' color='grey' size={10} 
                style={{
                  alignSelf: 'flex-end',
                }}
                />
              }
              {/* <ActivityIndicator color='grey' size={10} style={{alignSelf:'flex-end'}} /> */}
            </View>
        </View>  
      );

};

export default index;

const styles = StyleSheet.create({
  container: {}
});
