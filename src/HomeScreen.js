import React, { Component } from 'react'
import {
    View,
    Dimensions,
    Image
} from 'react-native'
import CustomCarousel from './CustomCarousel'

const images = [
    'https://images.template.net/wp-content/uploads/2016/04/27051847/Cool-Nature-Wallpapaer-for-Download.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]

const itemWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height
const item = (image, i) => {
    return(
        <Image
        key={`image${i}`}
        source={{uri: image}}
        style={{ width: itemWidth, height: itemHeight }}
      />
    )
}

export default class HomeScreen extends Component {

    render() {
        return (
            <View>
                <CustomCarousel
                    data={images}
                    delayTime={500}
                    renderItem = {item}
                    childWidth= {itemWidth}
                >

                </CustomCarousel>
            </View>
        )
    }
}