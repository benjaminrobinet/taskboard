import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, Modal, SafeAreaView} from 'react-native';

type Props = {};
export default class Detail extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            task: props.task
        };
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <SafeAreaView>
                    <View>
                        <Text style={{color: '#000000'}}>{this.state.task !== null ? this.state.task.title : ''}</Text>
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
