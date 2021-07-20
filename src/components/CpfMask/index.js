import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export function CpfMask({ value, onChangeText }) {
    return (
        <View>
            <TextInputMask
                style={styles.textInput}
                placeholder='Ex: 000.000.000-00'
                type='cpf'
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#c5c5c5',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 2
    }
})