import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = () =>{

    const [moneda, guardarMoneda] = useState('');
    const [criptomoneda, guardarCriptomoneda] = useState('');
    const [criptomonedas, guardarCriptomonedas] = useState([]);

    useEffect(() =>{
        const consultarAPI = async () =>{
            
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //Almacena las selecciones del usuario:
    const obtenerMoneda = moneda =>{
        guardarMoneda(moneda);
    }

    const obtenerCriptomoneda = cripto => {
        guardarCriptomoneda(cripto);
    }

    return(
        <View>
            <Text style={styles.label}>Monedas</Text>
            <Picker 
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value=""></Picker.Item>
                <Picker.Item label="Dolar de Estados Unidos" value="USD"></Picker.Item>
                <Picker.Item label="Peso Mexicano" value="MXN"></Picker.Item>
                <Picker.Item label="Euro" value="EUR"></Picker.Item>
                <Picker.Item label="Libra Esterlina" value="GBP"></Picker.Item>
            </Picker>

            <Text style={styles.label}>Criptomonedas</Text>
            <Picker 
                selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value="" />
                {criptomonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
        </View>
    );
}

const styles= StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize:22,
        marginVertical: 20
    }
});

export default Formulario;