import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import api from "../../service/api";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { PhoneMask } from "../../components/PhoneMask";
import { CpfMask } from "../../components/CpfMask";

export default function Create() {

    const initialValues = {
        name: "",
        cpf: "",
        email: "",
        tel: ""
    }

    const ReviewSchema = yup.object({
        name: yup
            .string()
            .required("Insira seu nome para continuar."),
        cpf: yup.
            string()
            .required("Insira seu CPF.")
            .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Insira seu CPF."),
        email: yup
            .string()
            .required("Insira seu e-mail.")
            .email("Insira seu e-mail."),
        tel: yup
            .string()
            .required("Insira seu telefone.")
            .min(14, "Insira seu telefone.")
            .max(14, "Insira seu telefone.")
    })

    const [cpf, setFormatedCpf] = useState();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { resetForm }) => {
                        await api.post("/client", {
                            name: (values.name),
                            cpf: (values.cpf),
                            email: (values.email),
                            tel: (values.tel)
                        })
                            .then((res) => {
                                Alert.alert(
                                    "Cadastro realizado!",
                                    `O cliente ${values.name} foi cadastrado no sistema com sucesso.`,
                                    [
                                        {
                                            text: "Criar Outro",
                                            onPress: () => resetForm({ values: initialValues })
                                        },
                                        {
                                            text: "Ok",
                                        }
                                    ]
                                );
                            })
                            .catch((error) => console.log(error));
                    }}
                    validationSchema={ReviewSchema}>
                    {(props) => (
                        <View>
                            <Text style={styles.title}>Cadastro de cliente</Text>
                            <Text style={styles.subtitle}>Informe os dados abaixo para criar um novo cliente.</Text>

                            {
                                props.errors.name + props.errors.cpf + props.errors.email + props.errors.tel ?
                                    <View style={styles.error}>
                                        <Ionicons name="warning" size={24} color="#fff" />
                                        <Text style={{ color: "#fff", fontSize: 16 }}> {props.errors.name || props.errors.cpf || props.errors.email || props.errors.tel} </Text>
                                    </View> :
                                    <View style={styles.noError} />
                            }

                            <Text style={styles.label}>Nome</Text>
                            <TextInput autoCapitalize="characters" value={props.values.name} onChangeText={props.handleChange("name")} style={styles.input} placeholder="Ex: Fulano de Tal" />

                            <Text style={styles.label}>CPF</Text>
                            <CpfMask value={props.values.cpf} onChangeText={props.handleChange("cpf")} />

                            <Text style={styles.label}>Email</Text>
                            <TextInput value={props.values.email} onChangeText={props.handleChange("email")} style={styles.input} placeholder="Ex: fulanodetal@gmail.com" />

                            <Text style={styles.label}>Telefone</Text>
                            <PhoneMask value={props.values.tel} onChangeText={props.handleChange("tel")} />

                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <TouchableOpacity style={styles.buttonClear} onPress={props.handleReset}>
                                    <Ionicons name="md-trash-sharp" size={24} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
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
        backgroundColor: "#000",
        marginTop: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    buttonClear: {
        padding: 10,
        backgroundColor: "#DC3545",
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

    error: {
        backgroundColor: "#DC3545",
        borderRadius: 5,
        paddingVertical: 7,
        justifyContent: "center",
        marginTop: 3,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },

    noError: {},

    terms: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginTop: 10
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
