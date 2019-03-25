import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, Modal, SafeAreaView, Switch} from 'react-native';
import Moment from 'moment';

export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            switchValue: false
        }
    }

    render() {
        var deleteTask = null;

        if(this.props.task.done){
            deleteTask = <Button title={'Delete'} onPress={() => this.props.deleteTask()}/>;
        }
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <SafeAreaView>
                    <View style={{paddingLeft: 30, paddingRight: 30}}>
                        <Text style={{color: '#000000'}}>Title: {this.props.task.title}</Text>
                        <Text style={{color: '#000000'}}>Content: {this.props.task.content}</Text>
                        <Text style={{color: '#000000'}}>Created at: {Moment(this.props.task.created_at, 'YYYYMMDD').fromNow()}</Text>
                        <Text style={{color: '#000000'}}>Done: <Switch onValueChange={(state) => this.props.setTaskDone(state)} value={this.props.task.done}/></Text>
                        {deleteTask}
                        <Button title={'Close'} onPress={() => this.props.closeHandler(false)}/>
                    </View>
                </SafeAreaView>
            </Modal>
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
    navbar: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingBottom: 40,
        paddingTop: 30
    }
});
