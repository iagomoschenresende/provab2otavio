import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { info } from '../Data/Dados';

function Card({ elemento }) {
  const [showDetails, setShowDetails] = useState(false); 

  const toggleDetails = () => {
    setShowDetails(!showDetails); 
  };

  return (
    <View style={styles.card}>
      <Text style={styles.pCard}>Grupo: {elemento.nome}</Text>
      
      <TouchableOpacity onPress={toggleDetails}>
        <Text style={styles.toggleText}>{showDetails ? 'Ver Menos' : 'Ver Mais'}</Text>
      </TouchableOpacity>

      {showDetails && (
        <>
          <Text style={styles.pCard}>Informações: {elemento.descricao}</Text>
          <Text style={styles.pCard}>Pessoas: {elemento.integrantes.join(', ')}</Text>
        </>
      )}
    </View>
  );
}

export default function Main({ navigation }) {
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.p}>Bem-vindo!</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {info.map((x, index) => (
            <Card key={index} elemento={x} />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Retornar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Fundo mais claro
  },

  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '85%',
    height: '90%',
    borderRadius: 15,
    elevation: 10, // Adiciona sombra para dar destaque
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    padding: 20,
  },

  card: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FFDECE', // Cor suave para o fundo do card
    marginBottom: 20,
    padding: 15,
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 3, // Sombra para o card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  pCard: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  toggleText: {
    color: '#FF5600', // Cor vibrante para interação
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,
    textDecorationLine: 'underline', // Texto sublinhado para indicar que é interativo
  },

  p: {
    fontWeight: 'bold',
    color: '#271811', // Cor mais escura para o título
    fontSize: 30,
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },

  scrollView: {
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#FF5600', // Cor vibrante
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 30,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
