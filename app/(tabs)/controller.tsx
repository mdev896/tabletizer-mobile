import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    GestureResponderEvent,
    SafeAreaView,
    StatusBar,
    View,
} from "react-native";
import "../../global.css";
import { useStore } from "../stores/data";

export default function Tab() {
    const widthFactor = 0.8;
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const viewRef = useRef<View>(null);
    const boxRef = useRef<View>(null);
    const [isHorizantal, setIsHorizantal] = useState<boolean>(false);
    const { ws, setWs } = useStore();
    const { isConnected, setIsConnected } = useStore();
    const { heightFactor, setHeightFactor } = useStore();
    const [horizantalWidthFactor, setHorizantalWidthFactor] = useState(1.0);
    const [CurrentLoc, setCurrentLoc] = useState({ x: 0, y: 0 });
    const [ViewLayout, setViewLayout] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [BoxLayout, setBoxLayout] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const PaddingBottom = Dimensions.get("screen").height - screenHeight;
    const onTouchMove = (event: GestureResponderEvent) => {
        console.log(horizantalWidthFactor);
        const touch = event.nativeEvent.touches[0];
        const x = touch.pageX;
        const y = touch.pageY;
        let ok = true;
        if (
            x < ViewLayout.x ||
            x > ViewLayout.x + ViewLayout.width ||
            y < ViewLayout.y ||
            y > ViewLayout.y + ViewLayout.height
        )
            ok = false;
        if (ok) {
            const relativeX = x - ViewLayout.x;
            const relativeY = y - ViewLayout.y;
            setCurrentLoc({ x: relativeX, y: relativeY - 20 });
            if (ws && isConnected) {
                ws?.send("pos" + JSON.stringify(CurrentLoc));
            }
        }
    };
    const onTouchEnd = () => {};
    useEffect(() => {
        viewRef.current?.measure((fx, fy, width, height, px, py) => {
            setViewLayout({ x: px, y: py, width, height });
        });
        boxRef.current?.measure((fx, fy, width, height, px, py) => {
            setBoxLayout({ x: px, y: py, width, height });
        });
        return () => {};
    }, []);
    useEffect(() => {
        setIsHorizantal(screenWidth > screenHeight);
        if (screenWidth > screenHeight) {
            const height = screenHeight * widthFactor * 0.95;
            console.log(height);
            const width = height / heightFactor;
            const newFactor = width / (screenWidth * widthFactor);
            setHorizantalWidthFactor(newFactor);
        } else setHorizantalWidthFactor(1.0);
        return () => {};
    }, [screenWidth]);
    return (
        <SafeAreaView
            style={{ paddingBottom: PaddingBottom }}
            className="flex-1 bg-slate-300 items-center justify-center"
        >
            <StatusBar hidden={true} />
            <View
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                ref={viewRef}
                className={`border-solid border-black border-4 ${ws && isConnected ? "visible" : "hidden"}`}
                style={{
                    width: screenWidth * widthFactor * horizantalWidthFactor,
                    height:
                        screenHeight *
                        widthFactor *
                        (isHorizantal ? 0.95 : heightFactor),
                }}
            ></View>
            <View
                className={`absolute h-[5vh] w-[5vh] bg-black ${ws && isConnected ? "visible" : "hidden"}`}
                ref={boxRef}
                style={{
                    left: CurrentLoc.x + ViewLayout.x - BoxLayout.width / 2,
                    top:
                        CurrentLoc.y +
                        ViewLayout.y * 0.8 -
                        BoxLayout.height / 2,
                }}
            ></View>
        </SafeAreaView>
    );
}
