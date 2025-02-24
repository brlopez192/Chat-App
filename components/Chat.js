import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, userID } = route.params;
  const backgroundColor = route.params.backgroundColor;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, async(docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, [isConnected]);

   const loadCachedMessages = async () => {
		try {
			const cachedMessages = await AsyncStorage.getItem('messages');
			if (cachedMessages) {
				setMessages(JSON.parse(cachedMessages));
			}
		} catch (error) {
			console.error('Failed to load messages from AsyncStorage', error);
		}
	};

  const cacheMessages = async (messagesToCache) => {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
		} catch (error) {
			console.error('Failed to cache messages', error);
		}
	};

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }
    
    

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={[styles.messContainer, {backgroundColor: backgroundColor}]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: userID,
          name: name
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      {Platform.OS === "ios" ?  <KeyboardAvoidingView behavior="padding" /> : null }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messContainer: {
    flex: 1
  }
});

export default Chat;