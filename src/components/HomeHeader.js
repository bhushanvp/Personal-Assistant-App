import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Header({ username }) {

    return (
        <View style={style.header} >
            <View style={{
            padding: 10,
            }} >
                <Text style={style.salutation_text} >Hello, <Text style={style.highlight}>{username}</Text></Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    profile_icon_box: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 7,
    },
    profile_icon_image: {
        width: 37,
        height: 37
    },
    highlight: {
        fontWeight: '700',
        fontSize: 25
    },
    salutation_text: {
        fontSize: 20,
        width: "100%",
        color: "black"
    }
})

export default Header