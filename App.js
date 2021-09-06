import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';


const App = () => {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() =>{
    const cotizarCriptomoneda = async () =>{
      if(consultarAPI){
        //Consultar la API para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

        guardarConsultarAPI(false);
      }
    }
    cotizarCriptomoneda();
  },[consultarAPI]);

  return (
    <>
      <Header></Header>
      <Image 
      style={styles.imagen}
      source={require('./assets/img/cryptomonedas.png')}></Image>

      <View style={styles.contenido}>
        <Formulario moneda={moneda} criptomoneda={criptomoneda}
        guardarMoneda={guardarMoneda}
        guardarCriptomoneda={guardarCriptomoneda}
        guardarConsultarAPI={guardarConsultarAPI}
        ></Formulario>

        <Cotizacion resultado={resultado}></Cotizacion>
      </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
