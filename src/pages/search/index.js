import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import api from '../../service/api';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';
import { PhoneMask } from '../../components/PhoneMask';
import { CpfMask } from '../../components/CpfMask';
import { formatTel } from '../../components/TextFormat/formatTel';
import { formatCpf } from '../../components/TextFormat/formatCpf';
import { Formik } from 'formik';

export default function Search() {

    const [data, setData] = useState([])

    async function getClients() {
        const response = await api.get('/client')
            .then((res) => setData(res.data)).catch((err) => console.log(err))
    }

    useEffect(() => {
        getClients();
    }, [])

    async function deleteClient(obj) {
        const response = await api.delete('/client/' + (obj))
            .then((res) => setData(res.data)).catch((err) => console.log(err));
        onRefresh();
    }

    const [visible, setVisible] = useState(false);

    const [initialName, setInitialName] = useState();
    const [initialCpf, setInitialCpf] = useState();
    const [initialEmail, setInitialEmail] = useState();
    const [initialTel, setInitialTel] = useState();
    const [id, setId] = useState();

    async function viewClient(obj) {
        
        const data = await api.get('/client/' + obj)
        setInitialName(data.data.name)
        setInitialCpf(data.data.cpf)
        setInitialEmail(data.data.email)
        setInitialTel(data.data.tel)
        setId(data.data.id)
        setVisible(true)
    }

    const initialValues = {
        name: initialName,
        cpf: initialCpf,
        email: initialEmail,
        tel: initialTel
    }

    console.log('initialName', initialName);

    const ReviewSchema = yup.object({
        name: yup
            .string()
            .required('Insira seu nome para continuar.'),
        cpf: yup.
            string()
            .required('Insira seu CPF.')
            .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Insira seu CPF.'),
        email: yup
            .string()
            .required('Insira seu e-mail.')
            .email('Insira seu e-mail.'),
        tel: yup
            .string()
            .required('Insira seu telefone.')
            .matches(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, 'Insira seu telefone.'),
    })

    const renderItem = (data) => (
        <View style={styles.item}>
            <View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.title}>Nome</Text>
                    <Text style={styles.subtitle}>{data.item.name}</Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.title}>CPF</Text>
                    <Text style={styles.subtitle}>{data.item.cpf}</Text>
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.subtitle}>{data.item.email}</Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.title}>Telefone</Text>
                    <Text style={styles.subtitle}>{data.item.tel}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#DC3545', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 5, alignSelf: 'flex-end', borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => deleteClient(data.item.id)}>
                        <Ionicons name="md-trash-sharp" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 5, flexDirection: 'row', backgroundColor: '#17AAC1', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 5, borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => viewClient(data.item.id)}>
                        <Ionicons name="ios-pencil-sharp" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={visible} animationType='fade'>
                <View style={{ flex: 1, backgroundColor: '#c5c5c5', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.card}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, { resetForm }) => {
                                setFormatedCpf(values.cpf)
                                setFormatedTel(values.tel)

                                const formated_cpf = formatCpf(cpf)
                                const formated_tel = formatTel(tel)

                                const response = await api.put('/client/' + (id), {
                                    name: (values.name),
                                    cpf: formated_cpf,
                                    email: (values.email),
                                    tel: formated_tel
                                })
                                    .then((res) => {
                                        Alert.alert(
                                            'Cadastro realizado!',
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
                                                <Ionicons name='warning' size={24} color='#fff' />
                                                <Text style={{ color: '#fff', fontSize: 16 }}> {props.errors.name || props.errors.cpf || props.errors.email || props.errors.tel} </Text>
                                            </View> :
                                            <View style={styles.noError} />
                                    }

                                    <Text style={styles.label}>Nome</Text>
                                    <TextInput autoCapitalize="characters" value={props.values.name} onChangeText={props.handleChange('name')} style={styles.input} placeholder="Ex: Fulano de Tal" />

                                    <Text style={styles.label}>CPF</Text>
                                    <CpfMask value={props.values.cpf} onChangeText={props.handleChange('cpf')} />

                                    <Text style={styles.label}>Email</Text>
                                    <TextInput value={props.values.email} onChangeText={props.handleChange('email')} style={styles.input} placeholder="Ex: fulanodetal@gmail.com" />

                                    <Text style={styles.label}>Telefone</Text>
                                    <PhoneMask value={props.values.tel} onChangeText={props.handleChange('tel')} />

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
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
            </Modal>
        </View>
    );

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
        getClients();
    }, []);

    const endReach = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
        getClients();
    })

    return (
        <View style={styles.container}>
            <Text style={styles.titlePage}>Lista de clientes</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                initialNumToRender={10}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onEndReached={endReach}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 17,
        marginTop: 20,
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
    card: {
        width: '80%',
        height: '80%',
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderColor: "#c5c5c5",
        backgroundColor: '#fff'
    },
    item: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderColor: "#c5c5c5",
        backgroundColor: '#fff',
        marginTop: 15,
        marginBottom: 15
    },
    error: {
        backgroundColor: '#DC3545',
        borderRadius: 5,
        paddingVertical: 7,
        justifyContent: 'center',
        marginTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },

    noError: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 5,
    },
    titlePage: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginTop: 40,
        backgroundColor: '#fff',
        borderColor: "#c5c5c5",
        borderWidth: 2,
        width: '60%',
        textAlign: 'center',
        borderRadius: 10
    },
    subtitle: {
        fontSize: 20,
        color: '#c5c5c5',
        paddingHorizontal: 10,
    },
    button: {
        padding: 10,
        backgroundColor: "#000",
        marginTop: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonClear: {
        padding: 10,
        backgroundColor: "#DC3545",
        marginTop: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
