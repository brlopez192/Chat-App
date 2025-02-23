import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start'
import Chat from './components/Chat'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'



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
        {props => <Chat db={db} {...props} />}

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