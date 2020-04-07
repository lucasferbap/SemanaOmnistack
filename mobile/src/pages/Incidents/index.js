import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import {useNavigation} from "@react-navigation/native"
import api from '../../services/api'
import logoImg from '../../assets/logo.png'

export default function Incidents(){
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigation =  useNavigation();

    async function loadingIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return
        }

        setLoading(true)
        const response = await api.get('incidents', {
            params: { page }
        })
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false)
        console.log("pagina: ",page)
    }

    function navigateToDatail(incident){
        navigation.navigate('Details', { incident })
    }

    async function loadIncidents(){
        const response = await api.get('incidents');
        setIncidents(response.data)
        setTotal(response.headers['x-total-count']);
    }

    useEffect(()=>{
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}
                data={incidents}
                onEndReached={loadingIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                <View style={styles.incidentList}>
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG: </Text>
                        <Text style={styles.incidentValue}>{incident.name}/{incident.id}</Text>

                        <Text style={styles.incidentProperty}>CASO: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR: </Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style : 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigateToDatail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>
                                Ver Mais Detalhes
                            </Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                </View>
               )} 
            />

            
        </View>
    )
}