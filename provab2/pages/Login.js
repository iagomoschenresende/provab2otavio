import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async () => {
    setMessage('');
    setMessageType('');

    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        setMessage('E-mail ou senha incorretos.');
        setMessageType('error');
      } else if (data) {
        setMessage('Login realizado com sucesso!');
        setMessageType('success');

        setTimeout(() => {
          navigation.navigate('Main');
        }, 2000);
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.header}>Faça seu login</Text>

        {message ? (
          <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
            {message}
          </Text>
        ) : null}

        <TextInput
          label="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          theme={{ colors: { primary: '#ff5600' } }}
        />
        <TextInput
          label="Senha"
          style={styles.textInput}
          value={senha}
          secureTextEntry={true}
          onChangeText={setSenha}
          theme={{ colors: { primary: '#ff5600' } }}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Crie uma nova conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entre na Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Light background color
  },

  loginBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Adds shadow for modern effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  header: {
    marginBottom: 25,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  button: {
    backgroundColor: '#FF5600',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textInput: {
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    width: '100%',
    height: 50,
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 15,
  },

  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  link: {
    color: '#FF5600',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  message: {
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
  },

  error: {
    color: '#D9534F',
  },

  success: {
    color: '#5CB85C',
  },
});
