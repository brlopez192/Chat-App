import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { GiftedChat } from "react-native-gifted-chat";



const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const backgroundColor = route.params.backgroundColor;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages (previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello Developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     }
    //   }
    // ])
  }, []);

 return (

   <View style={[styles.container, {backgroundColor:backgroundColor}]}>
    {/* <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1
    }}
    /> */}
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;