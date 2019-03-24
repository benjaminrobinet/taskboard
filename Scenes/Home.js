import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, Modal, SafeAreaView, TextInput, FlatList} from 'react-native';
import TaskModel from "../Models/Task";

const Realm = require('realm');

type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            realm: null,
            createModalVisible: false,
        };
    }

    componentWillMount() {
        Realm.open({
            schema: [TaskModel]
        }).then(realm => {
            // realm.write(() => {
                // realm.create('Dog', {name: 'Rex'});
            // });
            this.setState({ realm });
        });
    }

    setCreateModalVisible(state) {
        this.setState({createModalVisible: state});
    };

    render() {
        const tasks = this.state.realm.objects('Task');

        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.createModalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <SafeAreaView>
                        <Button
                            style={styles.modal__close}
                            onPress={() => {
                                this.setCreateModalVisible(false);
                            }}
                            title={'Cancel'}
                        />
                        <View style={styles.modal}>
                            <View>
                                <Text style={styles.modal__title}>Create a new task</Text>
                                <TextInput
                                    style={styles.modal__input}
                                    placeholder="Title of your task"
                                    onChangeText={(text) => this.setState({text})}
                                />
                                <TextInput
                                    style={styles.modal__input}
                                    placeholder="Content of your task (optional)"
                                    onChangeText={(text) => this.setState({text})}
                                />
                            </View>
                            <Button
                                style={styles.modal__submit}
                                onPress={() => {
                                    this.setCreateModalVisible(!this.state.createModalVisible);
                                }}
                                title={'Add task'}
                            />
                        </View>
                    </SafeAreaView>
                </Modal>
                <View style={styles.content}>
                    <FlatList
                        data={[
                            {key: 'Devin'},
                            {key: 'Jackson'},
                            {key: 'James'},
                            {key: 'Joel'},
                            {key: 'John'},
                            {key: 'Jillian'},
                            {key: 'Jimmy'},
                            {key: 'Julie'},
                        ]}
                        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                    />
                </View>
                <View style={styles.navbar}>
                    <Button onPress={() => {
                        this.setCreateModalVisible(!this.state.createModalVisible);
                    }} title={'Create'}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
    },
    modal: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 50
    },
    modal__close: {
        textAlign: 'left'
    },
    modal__title: {
        fontSize: 22,
        marginBottom: 20
    },
    modal__input: {
        height: 40
    },
    modal__submit: {
        marginTop: 20
    },
    navbar: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingBottom: 40,
        paddingTop: 30
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
