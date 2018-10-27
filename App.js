/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions,Image} from 'react-native';
import ActionSheet from "./ActionSheet";

const {width,height} = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={() => {this.refs.sheet.show()}}>Click Me!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <ActionSheet
                    ref='sheet'
                    title='主标题'
                    titleSecond='主标题第二行'
                    subTitle='副标题'
                    content={this._renderContent()}
                />
            </View>
        );
    }

    _renderContent(){
        return(
            <View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent:'center',
                        width:width *0.45,
                        height:width *0.11,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: width *0.055,
                        borderWidth: 2,
                        borderColor:'#26D0CA',
                        marginBottom:10,
                    }}
                    onPress={() =>{
                        alert('相机')
                    }}
                >
                    <Image
                        style={{width:width *0.056,height:width *0.051,marginRight:12}}
                        resizeMode={'contain'}
                        source={require('./image/cameraImg.png')}
                    />
                    <Text style={{fontSize:15,color:'#26D0CA',width:width *0.2,textAlign:'center'}}>相机</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent:'center',
                        width:width *0.45,
                        height:width *0.11,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderRadius: width *0.055,
                        borderWidth: 2,
                        borderColor:'#26D0CA',
                        marginBottom:20,
                    }}
                    onPress={() =>{
                        this.refs.sheet.hide()
                    }}
                >
                    <Image
                        style={{width:width *0.043,height:width *0.035,marginRight:12}}
                        resizeMode={'contain'}
                        source={require('./image/Picture.png')}
                    />
                    <Text style={{fontSize:15,color:'#26D0CA',width:width *0.2,textAlign:'center'}}>相册</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
