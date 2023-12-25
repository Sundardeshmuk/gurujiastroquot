import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect,useRef}from 'react';
import { StyleSheet,TouchableOpacity, Text, View ,SafeAreaView,Linking,Alert,Platform} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { captureRef } from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';
// import Share from 'react-native-share';
// import Share from 'react-native.'

export default function App() {
  const viewRef=useRef();
  const [color, setcolor] = useState('#98fb98');
  const [img, setimg] = useState('#98fb98');
  const [Quote, setQuote] = useState('Loading...');
  const [Author, setAuthor] = useState("Loading...");
  const [isloading, setisloading] = useState(false);
  
  const randomQuote = () => {
    setisloading(true);
fetch('https://api.quotable.io/quotes/random')
.then((res) => res.json())
.then((result) => {
if (result) {
setQuote(result[0].content);
setAuthor(result[0].author);
setisloading(false);
 }
})
}
useEffect(() => {
randomQuote();
}, [])
const SpeakNow=()=>{}
const CopyToClipboard=()=>{
  // Clipboard.setString(Quote);
  // Snackbar.show({text: 'Hello', duration:3000});
}
const sharedummyimage=async()=>{ 
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 0.8,
    });
    const ShareButton = ({ title, uri }) => {
      const handleShare = async () => {
        try {
          if (navigator.share) {
            const blob = new Blob([uri], { type: 'application/octet-stream' });
            const base64Data = await blobToBase64(blob);
    
            await navigator.share({
              title: title,
              text: 'Check out this data!',
              files: [
                {
                  data: base64Data,
                  type: 'application/octet-stream',
                },
              ],
            });
          } else {
            throw new Error('Web Share API is not supported in this browser.');
          }
        } catch (error) {
          console.error('Error sharing:', error.message);
        }
      };
    
      const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
    }
  }
  return (
    <View style={styles.container}>
    <View style={styles.container}>
      <View style={ {    width: '90%', backgroundColor: '#fff', borderRadius: 20, padding: 20,  justifyContent: 'center',  }}> 
  <ViewShot ref={viewRef} style={{backgroundColor:'red',borderRadius:8,padding:8}} options={{  format:'jpg', quality:0.7,result:'base64'}} >
        <Text style={styles.quotecontainer} >Quote of the day</Text>
        <FontAwesome5 name="quote-left" style={{ fontSize: 20, marginBottom: -18 }} color='#000' />
        <Text style={styles.quoteMessagecontainer} >{Quote}</Text>
        <FontAwesome5 name="quote-right" style={{ fontSize: 20, textAlign: 'right', marginTop: -28 }} color='#000' />
        <Text style={styles.Author} >{Author}</Text>
  </ViewShot>
        <TouchableOpacity onPress={randomQuote} style={{
    backgroundColor: isloading ? 'rgba(83,114,240,0.7)':'rgba(83,114,240,1)',
    padding: 20, borderRadius: 30, marginVertical: 20,
         } }>
          <Text style={styles.buttonText} >{isloading ? "loading" :"New Quote"}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
          <TouchableOpacity onPress={SpeakNow} style={{ borderWidth: 2, borderColor: '#533721f0', borderRadius: 50, padding: 50 }}>
            <FontAwesome5 name="volume-up" Size={20} color='#533721f0' />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={CopyToClipboard} style={{ borderWidth: 2, borderColor: '#533721f0', borderRadius: 50, padding: 50 }}>
            <FontAwesome name="copy" Size={20} color='#533721f0' />
          </TouchableOpacity> */}
         
          <TouchableOpacity onPress={sharedummyimage} style={{ borderWidth: 2, borderColor: '#533721f0', borderRadius: 50, padding: 50 }}>
            <FontAwesome5 name="share" Size={20} color='#533721f0' />

          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      <Text>
             </Text>
    </View>
      <StatusBar style="auto" />
    </View>
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
