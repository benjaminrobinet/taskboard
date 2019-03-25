import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, Modal, SafeAreaView, TextInput, FlatList} from 'react-native';
import TaskModel from "../Models/Task";
import Detail from "./Detail";

const Realm = require('realm');

type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            realm: null,
            createModalVisible: false,
            detailModalVisible: false,
            title: '',
            content: '',
            tasks: [],
            currentTask: null
        };
    }

    componentWillMount() {
        Realm.open({
            schema: [TaskModel]
        }).then(realm => {
            this.setState({ realm });
            this.setState({ tasks: realm.objects('Task').sorted('created_at', true) });
        });
    }

    setCreateModalVisible(state) {
        this.setState({createModalVisible: state});
    }

    setDetailModalVisible(state) {
        this.setState({detailModalVisible: state});
    };

    setTaskDone(state){
        this.state.realm.write(() => {
            this.state.currentTask.done = state;
            this.setState({currentTask: this.state.currentTask})
            // this.state.realm.create('Task', {id:task.id, done: state}, true)
        });
    }

    deleteTask(){
        this.state.realm.write(() => {
            this.state.realm.delete(this.state.currentTask);
            this.setDetailModalVisible(false);

            this.setState({currentTask: null})
        });
    }

    _keyExtractor = (item, index) => item.id;

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    addTask() {
        let task = {
            id: this.guid(),
            title: this.state.title,
            content: this.state.content,
            created_at: new Date(),
            updated_at: new Date()
        };

        this.state.realm.write(() => {
            this.state.realm.create('Task', task);
        });
    }

    itemPress(task) {
        this.setState({currentTask: task});
        this.setState({detailModalVisible: true});
    }

    render() {
        let detailModal = null;
        if(this.state.currentTask){
            detailModal =<Detail visible={this.state.detailModalVisible} task={this.state.currentTask} closeHandler={this.setDetailModalVisible.bind(this)} setTaskDone={this.setTaskDone.bind(this)} deleteTask={this.deleteTask.bind(this)} />
        }
        return (
            <View style={styles.container}>
                {detailModal}
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
                                    onChangeText={(title) => this.setState({title})}
                                />
                                <TextInput
                                    style={styles.modal__input}
                                    placeholder="Content of your task (optional)"
                                    onChangeText={(content) => this.setState({content})}
                                />
                            </View>
                            <Button
                                style={styles.modal__submit}
                                onPress={() => {
                                    this.addTask();
                                    this.setCreateModalVisible(!this.state.createModalVisible);
                                }}
                                title={'Add task'}
                            />
                        </View>
                    </SafeAreaView>
                </Modal>
                <View style={styles.content}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.tasks}
                        style={styles.flatlist}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) => <Text onPress={() => this.itemPress(item)} style={[styles.item, {color: (item.done === true ? '#00ff00' : '#ff0000')}]}>{item.title}</Text>}
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
        flex: 1,
        flexDirection: 'column',
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
    flatlist: {
        flexGrow: 1
    },
    navbar: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
        paddingBottom: 40,
        paddingTop: 30
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: "#ffffff"
    },
});
