import  React,{ useState, useRef, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Keyboard,
  Dimensions
} from 'react-native';
import {
  ActivityIndicator,
  Avatar
} from 'react-native-paper';
import {
  Icon,
  Avatar as AvatarElements
} from 'react-native-elements';
import { style, colors } from '_styles';
import CardMessage from '_components/molecules/CardMessage';
import MessageFooter from '_components/molecules/CompMessageFooter';
interface componentNameProps {}

class GenerateMessages {
  private size:number;

  constructor(size:number){
      this.size = size;
  }

  private generateName() {
      return Math.random().toString(36).replace('.','');
  }

  private generateMessage() {
      let text:string = '';
      for (let index = 0; index < Math.round(Math.random()*40); index++) {
          text += Math.random().toString(36).replace('.','');
      }
      return text;
  }

  private generateDate() {
      return new Date();
  }

  public generateData() {
      let data = [];
      
      for (let index = 0; index < this.size; index++) {
          data.push({
              name: this.generateName(),
              login: this.generateName(),
              message: this.generateMessage(),
              date: this.generateDate(),
          });
      }
      return data;
  }

}

const componentName = (props: componentNameProps) => {

  let [message,setMessage] = useState('');
  let [data, setData] = useState([]);
  let [render, setRender] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() =>{
    interaction_user()
  },[])

  
  function sendMessages() {
    if (message.length === 0) return;

    let user_data = {
        "date": new Date(),
        "login": "paulo",
        message,
        "name": "Paulo",
    };

    data.reverse().push(user_data);
    setRender(!render);
    setData(data.reverse());
    setMessage('');
    Keyboard.dismiss();
  }

  function interaction_user() {
    setTimeout(() => {
      let generate = new GenerateMessages(1);
      let new_data = generate.generateData()[0];
      data.reverse().push(new_data);
      setRender(!render);
      setData(data.reverse());
    },1000)
  }
  
  return (
    <View style={[
      style.container,
      style.body,
      {
        
      }
    ]}>
      <View
      style={{
        margin: 10,
        flex:1
      }}
      >
        <FlatList
        showsVerticalScrollIndicator={false}
        // inverted
        data={data}
        extraData={render}
        renderItem={({item}) => <CardMessage data={item} /> }
        
        />
      </View>
      <View
      style={{
        alignSelf:'center'
      }}
      >
        <MessageFooter />
      </View>
    </View>
  );
};

export default componentName;


