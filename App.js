import React, {useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/drawer';

const getFonts = () => Font.loadAsync({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'patrick-hand': require('./assets/fonts/PatrickHandSC-Regular.ttf'),
    'ropasans': require('./assets/fonts/RopaSans-Regular.ttf'),
  });




export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Navigator/>
    );
  }

  else {
    return(
    <AppLoading 
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
    />
    )}
}