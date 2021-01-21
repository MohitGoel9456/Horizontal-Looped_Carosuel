import React, {Component, createRef} from 'react';
import {ScrollView} from 'react-native';

let selectedIndex = 0;
let onscrollBegin = false;

export default class CustomCarousel extends Component {
     scrollRef = createRef();
     timer;
     offset;
     

     componentDidMount() {
        this.setUpTimer();
    }

     setUpTimer = () => {
        this.clearTimer();
        this.timer = setTimeout(this.goToNextPage, this.props.delayTime);
    }

     clearTimer = () => {
        clearTimeout(this.timer);
    }

    // auto scrolling
     goToNextPage = () => {
        const childlenth = this.getCustomData().length;
        selectedIndex = selectedIndex + 1;
        this.clearTimer();
        if (selectedIndex === childlenth) {
            this.scrollRef.current.scrollTo({ offset: 0, animated: false, nofix: true });
            selectedIndex = 1;
        }
        this.scrollRef.current.scrollTo({
            animated: true,
            x: this.props.childWidth * selectedIndex,
        });
        this.setUpTimer();
    }

    // pushing 1st element at last
     getCustomData() {
        const {data} = this.props;
        const finaldata = [];
        finaldata.push(...data);
        finaldata.push(data[0]);
        return finaldata;
    }

     calculateNextPage = (direction, viewSize) => {
        const ratio = this.offset / viewSize;
        const page = direction === 'right' ? Math.ceil(ratio) : Math.floor(ratio);
        return this.normalizePageNumber(page);
    }

     normalizePageNumber = (page) => {
        const childlenth = this.getCustomData().length;
        if (page === childlenth) {
            return 0;
        } else if (page > childlenth) {
            return 1;
        } else if (page < 0) {
            return childlenth - 1;
        }
        return page;
    }

    // when user starts scrolling banner
     onScrollBegin = () => {
        onscrollBegin = true;
        this.clearTimer();
    }

    // when user scrolls banner then we calculate the current page from offeset
     onScroll = (event) => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const currentOffset = event.nativeEvent.contentOffset.x;
        const direction = currentOffset > this.offset ? 'right' : 'left';
        this.offset = currentOffset;
        const nextPage = this.calculateNextPage(direction, viewSize);
        selectedIndex = nextPage;
        if (onscrollBegin) {
            this.setUpTimer();
            onscrollBegin = false;
        }
    }

     render() {
        return (
            <ScrollView
                pagingEnabled={true}
                horizontal={true}
                ref={this.scrollRef}
                snapToInterval={this.props.childWidth}
                onScroll={this.onScroll}
                onScrollBeginDrag={this.onScrollBegin}
                scrollEventThrottle={16}
            >
                {this.getCustomData().map((item, index) => {
                    return (
                        this.props.renderItem(item, index)
                    );
                })}
            </ScrollView>
        );
    }
}
