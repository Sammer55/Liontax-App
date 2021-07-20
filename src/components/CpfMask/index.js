import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export function CpfMask({ value, onChangeText }) {
    return (
        <View>
            <TextInputMask
                style={styles.textInput}
                placeholder='Ex: 000.000.000-00'
                type='custom'
                value={value}
                onChangeText={onChangeText}
                options={{ mask: "99999999999" }}
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