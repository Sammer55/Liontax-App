import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import api from "../../service/api";
import { Ionicons } from "@expo/vector-icons";

export default function Edit(res) {

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Formik
                    initialValues={{ name: res.route.params.name, cpf: res.route.params.cpf, email: res.route.params.email, tel: telDeform }}
                    onSubmit={async (values) => {
                        const response = await api.put("/client/" + (values.route.params.id), {
                            name: (values.name),
                            cpf: (values.cpf),
                            email: (values.email),
                            tel: (values.tel)
                        })
                            .then((res) => {
                                Alert.alert(
                                    "Edição concluída!",
                                    `O cliente ${values.name} foi alterado com sucesso.`,
                                    [
                                        {
                                            text: "Ok",
                                            onPress: () => console.log("Ok pressed")
                                        }
                                    ]
                                );
                            })
                            .catch((error) => console.log(error));
                    }}>
                    {(props) => (
                        <View>
                            <Text style={styles.title}>Editar cliente</Text>
                            <Text style={styles.subtitle}>Altere os dados do cliente editando os campos abaixo</Text>

                            <Text style={styles.label}>Nome</Text>
                            <TextInput value={props.values.name} onChangeText={props.handleChange("name")} style={styles.input} placeholder="Ex: Fulano de Tal" />

                            <Text style={styles.label}>CPF</Text>
                            <TextInput value={props.values.cpf} onChangeText={props.handleChange("cpf")} style={styles.input} placeholder="Ex: 000.000.000-00" />

                            <Text style={styles.label}>Email</Text>
                            <TextInput value={props.values.email} onChangeText={props.handleChange("email")} style={styles.input} placeholder="Ex: fulanodetal@gmail.com" />

                            <Text style={styles.label}>Telefone</Text>
                            <TextInput value={props.values.tel} onChangeText={props.handleChange("tel")} style={styles.input} placeholder="Ex: (00) 0000-0000" />

                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <TouchableOpacity style={styles.button} onPress={props.handleReset}>
                                    <Ionicons name="md-trash-sharp" size={24} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonClear} onPress={props.handleSubmit}>
                                    <Text style={{ color: "#fff", fontSize: 16 }}>Cadastrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    button: {
        padding: 10,
        backgroundColor: "#DC3545",
        marginTop: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    buttonClear: {
        padding: 10,
        backgroundColor: "#000",
        marginTop: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    input: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#c5c5c5",
        backgroundColor: "#fff",
        marginTop: 3
    },

    title: {
        fontSize: 25,
    },

    subtitle: {
        fontSize: 20,
        color: "#c5c5c5"
    },

    label: {
        fontSize: 17,
        marginTop: 20,
    },

    card: {
        width: "80%",
        height: "80%",
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderColor: "#c5c5c5",
        backgroundColor: "#fff"
    }
});
