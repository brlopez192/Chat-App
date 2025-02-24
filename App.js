import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox, Alert } from 'react-native';
import Start from './components/Start'
import Chat from './components/Chat'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo }from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCrmRtfHTjBTpk3bfUl-9HmWD-Ei80tEfg",
    authDomain: "chat-app-c2718.firebaseapp.com",
    projectId: "chat-app-c2718",
    storageBucket: "chat-app-c2718.firebasestorage.app",
    messagingSenderId: "668834401791",
    appId: "1:668834401791:web:aced35f43348fc991b2bca"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const Storage = getStorage(app);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected === false) {
      Alert.alert("Connection lost")
      disableNetwork(db);
    } else if (netInfo.isConnected === true) {
      enableNetwork(db);
    }
  }, [netInfo.isConnected]);




  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Start'>
        <Stack.Screen
        name='Start'
        component={Start}
        />
        <Stack.Screen
        name='Chat'>
        {props => <Chat db={db} Storage={Storage} isConnected={netInfo.isConnected} {...props} />}

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;