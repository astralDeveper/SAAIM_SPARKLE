import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Congraj = () => {
  return (
    <SafeAreaView style={{
        flex:1,backgroundColor: "#11002F",
    }}>
   <Image source={require("../../assets/Images/PNG/Cong.png")}
   style={{
    height:height,width:width
   }}
   />
    </SafeAreaView>
  )
}
const {height,width}=Dimensions.get("window")
export default Congraj