import React, { Component } from 'react'
import { View, Text, ImageBackground, ActivityIndicator, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Card, ListItem, Button, CheckBox, Image, Input, Overlay, PricingCard, Rating, AirbnbRating, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Button } from '../components'
import { ScaledSheet, scale } from 'react-native-size-matters/extend';
import { NavigationActions } from '../utils'
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { sliderWidth, itemWidth } from 'example/src/styles/SliderEntry.style';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
// import SliderEntry from 'example/src/components/SliderEntry';
import SliderEntry from '../components/SliderEntry';
// import styles, { colors } from 'example/src/styles/index.style';
import styles, { colors } from '../styles/index.style';
// import { ENTRIES1, ENTRIES2 } from 'example/src/static/entries';
import { ENTRIES1, ENTRIES2 } from '../static/entries';
// import { scrollInterpolators, animatedStyles } from 'example/src/utils/animations';
import { scrollInterpolators, animatedStyles } from '../utils/animations';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
@connect()
class Home extends Component {

    state = {
        users: [
            {
                name: 'brynn',
                avatar: 'http://pic15.nipic.com/20110629/5078207_164705330000_2.jpg'
            },
        ],
        checked: true,
        isVisible: false,
        slider1ActiveSlide: 1

    }
    static navigationOptions = {
        tabBarLabel: 'Home',
        headerStyle: {
            color: 'red'
        },
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[{ width: 32, height: 32 }, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/house.png')}
            />
        ),
    }
    componentWillMount() {

        // this.props.dispatch({
        //     type: 'app/getStoreConfig',
        //     payload: { storeId: 2123 }
        // })
        console.log(scale(1920), '++++++++++++++++++++')
    }
    gotoDetail = () => {
        // this.props.navigation.openDrawer();
        console.log(this.props.navigation)
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }
    handleChange(e) {
        console.log(e)
    }
    handleClick() {
        this.setState({
            isVisible: true
        })
    }
    onBackdropPress() {
        console.log(123)
        this.setState({
            isVisible: false
        })
    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem({ item, index }) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem({ item, index }) {
        return <SliderEntry data={item} even={true} />;
    }
    render() {
        const { users } = this.state
        return (
            <View style={styles.img}>
                {/* <Carousel layout={'tinder'} layoutCardOffset={`9`} />
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                /> */}
                <View style={styles.exampleContainer}>
                    <Text style={styles.title}>{`Example ${1}`}</Text>
                    <Text style={styles.subtitle}>{123}</Text>
                    <Carousel
                        ref={c => this._slider1Ref = c}
                        data={ENTRIES1}
                        layout={'tinder'}
                        renderItem={this._renderItemWithParallax}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        hasParallaxImages={true}
                        firstItem={1}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        inactiveSlideShift={20}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContentContainer}
                        loop={true}
                        loopClonesPerSide={2}
                        autoplay={false}
                        autoplayDelay={500}
                        autoplayInterval={3000}
                        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                    />
                    {/* <Pagination
                        dotsLength={ENTRIES1.length}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={styles.paginationContainer}
                        dotColor={'rgba(255, 255, 255, 0.92)'}
                        dotStyle={styles.paginationDot}
                        inactiveDotColor={colors.black}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={this._slider1Ref}
                        tappableDots={!!this._slider1Ref}
                    /> */}
                </View>
            </View>
        )
    }
}

// const styles = ScaledSheet.create({
//     img: {
//         flex: 1
//     },
//     box: {
//         width: "50%"
//     },
//     container: {
//         width: '1920@s', // = scale(100)
//         // height: '288@vs',
//         backgroundColor: 'yellow',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         marginTop: 10

//     },
//     tips: {
//         fontSize: '40@s',
//         color: 'pink'
//     },
//     icon: {
//         width: 32,
//         height: 32,
//     },
// })

export default Home
