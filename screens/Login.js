import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { signUp } from '../db/db';

export default function Login({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const uploadData = async () => {
        const textError = checkValidation(email, password)
        setError(textError)
    }
    const checkValidation = (email, password) => {
        const error = {}
        if (email === "") {
            error.title = "Please  enter Email"
        }
        if (password === "") {
            error.password = "Please  enter Password"
        } else if (password.length < 7) {
            error.description = "Password sholud be greater then 7 words lettters"
        }
        return error
    }
    useEffect(async () => {
        if (Object.keys(error).length === 0) {
            console.log("SignUp Sucsess")
            const ifData = await signUp(email, password)
            Toast.show({
                type: "success",
                text1: "SignUp Data Has Been Created"
            })
            setTimeout(() => {
                navigation.goBack()
            }, 2000);
        }
    }, [error])

    return (
        <View style={styles.body} >
            <Text style={styles.text}>
                LOGIN
            </Text>
            <TextInput 
                value={email} 
                onChangeText={(e) => setEmail(e)} 
                multiline={false} 
                onKeyPress={() => setError({ ...error, email: null })} 
                placeholder='Enter Your Email' 
                style={styles.input} />
            <TextInput
                value={password} 
                onChangeText={(e) => setPassword(e)} 
                multiline={false} 
                onKeyPress={() => setError({ ...error, password: null })} 
                placeholder='Enter Your Password' 
                style={styles.input} />
            <TouchableOpacity style={styles.btn} onPress={uploadData, () => navigation.navigate("Home")}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Upload</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff',
        paddingTop: 60,
    },
    logo: {
        width: 200,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 130,
    },
    input: {
        width: 350,
        height: 50,
        borderWidth: 2,
        borderColor: '#555',
        borderRadius: 50,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    btn: {
        width: 100,
        height: 50,
        backgroundColor: "#00887e",
        paddingVertical: 15,
        alignItems: "center", justifyContent: "center", borderRadius: 8,
    },
})