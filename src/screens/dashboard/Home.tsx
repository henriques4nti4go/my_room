import * as React from 'react';
import { Text, View,StyleSheet,FlatList, TouchableOpacity } from 'react-native';
import { AirbnbRating } from "react-native-elements";
import {style} from '_styles/index';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Drawer
} from 'react-native-paper';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Data from '../../test/GenerateData';


let data = new Data(5).returnData();

interface componentNameProps {
  navigation:any;
  user_access_token:string;
}




const Index = (props: componentNameProps) => {

  return (
    <Drawer.Section title="Some title" >
      <Drawer.Item
        label="First Item"
        active={false}
        onPress={() => console.log('drawer')}
      />
    </Drawer.Section>
  );

  return (
    <View style={[
        style.container,
        style.body
    ]}>
      <View>
        <Button onPress={() => firebase.auth().signOut()}>sair</Button>
      </View>
      <View style={[
        style.align,
      ]}>
        <FlatList
          style={[
            {
              width: '100%',
            }
          ]}
          keyExtractor={(item,index) => index.toString()}
          data={data}
          renderItem={({item}) => {
            
            return (
              <TouchableOpacity
              onPress={() => props.navigation.navigate('Room')}
              >
                <Card style={[
                  style.width,
                  {
                    alignSelf: 'center',
                    marginBottom: 20,
                  }
                ]}>
                  <Card.Title title={item.name} subtitle="Card Subtitle" />
                  <Card.Content>
                    <Title>😀</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                  {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Actions>
                    <Button>Entrar</Button>
                    {/* <Button>Cancel</Button> */}
                    
                    <AirbnbRating
                      count={5}
                      reviews={[1,2,3,4,5]}
                      defaultRating={1}
                      size={20}
                    />
                  </Card.Actions>
                </Card>
              </TouchableOpacity>
            );
          }}
          />
      </View>
    </View>
  );
};

const mapState = (state:any) => ({
  user_access_token: state.user.user_access_token,
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}

export default connect(mapState,mapDispatch)(Index);

