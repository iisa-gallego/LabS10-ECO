// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtK1oSV6qB3xv-CMR4Tfnz8MZCALph_fE",
    authDomain: "labs10--isabella-gallego.firebaseapp.com",
    databaseURL: "https://labs10--isabella-gallego-default-rtdb.firebaseio.com",
    projectId: "labs10--isabella-gallego",
    storageBucket: "labs10--isabella-gallego.appspot.com",
    messagingSenderId: "691916830584",
    appId: "1:691916830584:web:391f067c881b29bc88ba8d",
    measurementId: "G-4RDLCJ5Q1N"
  };

  export function getFirebaseConfig(){
    if(!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    }else{
        return firebaseConfig;
    }
  }
