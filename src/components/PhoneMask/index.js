import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export function PhoneMask({ value, onChangeText }) {

    return (
        <View>
            <TextInputMask
                style={styles.textInput}
                placeholder="Ex: (00) 0000-0000"
                keyboardType='number-pad'
                type='cel-phone'
                value={value}
                onChangeText={onChangeText}
                options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
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