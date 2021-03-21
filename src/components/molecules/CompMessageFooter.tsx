import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../styles';

interface MessageFooterProps {}

const MessageFooter = (props: MessageFooterProps) => {
    const [message, setMessage]= React.useState('');

    return (
        <View style={styles.container}>
            <View
                style={{
                borderRadius: 30,
                width: '80%',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                }}
            >
                <TouchableOpacity
                style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10
                }}
                >
                    <Icon type='feather' color='gray' name='smile' />
                </TouchableOpacity>
                <TextInput 
                style={{
                    minHeight: 50,
                    width: 200,
                    maxHeight:100,
                }}
                onChangeText={(text) => setMessage(text)}
                value={message}
                multiline={true}
                />
            </View>
            <View
            style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
                <TouchableOpacity 
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: colors.PRIMARY,
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                // onPress={() => sendMessages()}
                >
                    <Icon type='feather' name='send' color='white' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MessageFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight: 10,
    marginBottom: 10,
  }
});
