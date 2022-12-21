import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { Text, Button as PaperButton } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import TextInput from '../components/TextInput'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nameError) {
        setName({ ...name, error: nameError })
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
        }
        navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
        })
    }

    return (
        <View>
            <BackButton goBack={navigation.goBack()} />
            <Text>Create Account</Text>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <PaperButton
                style={[
                    styles.button,
                    mode === 'outlined' && { backgroundColor: blue600 },
                    style,
                ]}
                labelStyle={'Register'}
                mode = 'contained'
                onPress = {onLoginPressed}
            />
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    }

    const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: 'black',
    },
})