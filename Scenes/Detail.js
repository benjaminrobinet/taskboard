import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

type Props = {};
export default class Detail extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>Nique ta mere</Text>
                </View>
                <View style={styles.navbar}>
                    <Button onPress={console.log('ok')} title={'Add task'}/>
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
    navbar: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        paddingBottom: 40,
        paddingTop: 30
    }
});
