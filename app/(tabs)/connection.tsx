import * as Network from "expo-network";
//import StatusBar from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    Button,
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
} from "react-native";
import "../../global.css";
import { useStore } from "../stores/data";

export default function Tab() {
    const widthFactor = 0.8;
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const { ws, setWs } = useStore();
    const [id, setId] = useState<String>("0");
    const [ip, setIp] = useState<String>("");
    const { isConnected, setIsConnected } = useStore();
    const { heightFactor, setHeightFactor } = useStore();
    const PaddingTop = Platform.OS == "android" ? StatusBar.currentHeight : 0;
    const PaddingBottom =
        Dimensions.get("screen").height -
        screenHeight -
        (PaddingTop ? PaddingTop : 0);
    const startServer = () => {
        const nakedIp = ip.split(".");
        nakedIp.pop();
        const wsUrl = "ws://" + nakedIp.join(".") + "." + id + ":8080";
        const local_ws = new WebSocket(wsUrl);

        local_ws.onopen = () => {
            console.log("Connected to WebSocket server");
            setIsConnected(true);
            local_ws?.send(`init${widthFactor * screenWidth}`);
        };

        local_ws.onerror = (event: Event) => {
            console.error("WebSocket error:", event);
        };

        local_ws.onmessage = (event: WebSocketMessageEvent) => {
            const ratio = (event.data as String).split("-");
            setHeightFactor(
                (parseInt(ratio[1]) * widthFactor) / parseFloat(ratio[0])
            );
        };

        local_ws.onclose = () => {
            console.log("WebSocket connection closed");
            setIsConnected(false);
        };
        setWs(local_ws);
        return () => {
            ws?.close();
        };
    };
    const getIP = async () => {
        const ipAddress = await Network.getIpAddressAsync();
        setIp(ipAddress);
    };
    useEffect(() => {
        getIP();
    }, []);

    const sendMessage = () => {
        console.log(ws);
        if (ws && isConnected) {
            ws.send("Ping from Expo TS!");
        }
    };
    return (
        <SafeAreaView
            style={{ marginTop: PaddingTop, paddingBottom: PaddingBottom }}
            className="flex-1 bg-slate-300 items-center justify-center"
        >
            <StatusBar hidden={true} />
            <Text className=" text-xl mb-20">Expo WebSocket (TSX)</Text>
            <Text>Status: {isConnected ? "Connected" : "Disconnected"}</Text>
            <TextInput
                keyboardType="numeric"
                value={id.toString()}
                onChangeText={(text) => {
                    setId(text.replace(/[^0-9]/g, ""));
                }}
            />
            <Button title="connect" onPress={startServer} />
            <Button
                title="Send Message"
                onPress={sendMessage}
                disabled={!isConnected}
            />
        </SafeAreaView>
    );
}
