import React,{Component} from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native'
import PropTypes from "prop-types";

const {width,height} = Dimensions.get('window');

export default class ActionSheet extends Component{
    // 1.声明所需要的属性
    static propTypes= {
        title: PropTypes.string, // 标题
        titleSecond: PropTypes.string,//第二行标题
        subTitle: PropTypes.string,//副标题
        content: PropTypes.object, //  内容
        show: PropTypes.func, // 显示
        hide: PropTypes.func, // 隐藏
    }

    constructor(props) {
        super(props);

        this.state={
            visible: false,
            sheetAnim: new Animated.Value(height/2)
        }
    }

    render() {
        const {visible,sheetAnim} = this.state;

        return(
            <Modal
                visible={visible}
                transparent={true}
                animationType={'none'}
                onRequestClose={this.cancel.bind(this)}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={ styles.wrapper }
                    onPress={this.cancel.bind(this)}
                >
                    <TouchableOpacity
                        disabled={false}
                        activeOpacity={1}
                    >
                        <Animated.View
                            style={[styles.bd, {transform: [{translateY: sheetAnim}]}]}>
                            { this._renderTitle() }
                            {/*<ScrollView*/}
                            {/*// horizontal={ true }*/}
                            {/*showsHorizontalScrollIndicator={ false }>*/}

                            {/*{this._renderContainer()}*/}
                            {/*</ScrollView>*/}
                            {this._renderContainer()}
                        </Animated.View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    /**
     * 标题
     */
    _renderTitle() {
        const { title,titleSecond,subTitle,titleStyle, subTitleStyle} = this.props;
        if (!title) {
            return null
        }
        return (
            <View style={{alignItems:'center',marginBottom:10}}>
                <View style={{width:width *2/3 -20, marginTop: 10}}>
                    <TouchableOpacity
                        style={{width:width *0.05}}
                        onPress={() => {
                            this.hide();
                        }}
                    >
                        <Image
                            style={{
                                width:width *0.05,
                                height:width *0.05,
                            }}
                            source={require('./image/findMore.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.titleText,titleStyle]}>{title}</Text>
                <Text style={[styles.titleText,titleStyle]}>{titleSecond}</Text>
                {subTitle ? <Text style={[styles.subTitleText,subTitleStyle]}>{subTitle}</Text> : null}
            </View>
        )
    }

    /**
     * 内容布局
     */
    _renderContainer() {
        const { content } = this.props;
        return (
            <View style={styles.container}>
                { content }
            </View>
        )
    }

    /**
     * 控制Modal点击关闭，Android返回键关闭
     */
    cancel() {
        this.hide();
    }

    /**
     * 显示
     */
    show() {

        this.setState({ visible: true })
        Animated.timing(this.state.sheetAnim, {
            toValue: 0,
            duration: 300
        }).start();
    }

    /**
     * 隐藏
     */
    hide() {

        this.setState({ visible: false },()=>{
            Animated.timing(this.state.sheetAnim, {
                toValue: height/2,
                duration: 0,
            }).start();
        });
    }
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    container:{
        alignItems:'center'
    },
    titleText:{
        marginBottom: 5,
        color: '#333333',
        fontSize: 15,
        fontWeight: 'bold'
    },
    subTitleText:{
        marginBottom: 5,
        color: '#999',
        fontSize: 12,
    },
    bd:{
        backgroundColor:'white',
        width:width *2/3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:4,
    },
});