import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = () => {
  return (
    <View style={styles.container}>
      <Svg height="50" width="100" style={styles.discountBadge}>
        <Polygon points="0,0 100,0 0,50" fill="#FF3E3E" />
      </Svg>
      <Text style={styles.discountText}>10% OFF</Text>
      <View style={styles.buttonContent}>
        <Image
          source={{ uri: 'https://example.com/diamond.png' }} // Replace with your image URL
          style={styles.image}
        />
        <Text style={styles.itemText}>X 80</Text>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.priceText}>$10</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#E13E73', '#A13DFF']}
        style={styles.gradientBackground}
      >
        <Text style={styles.popularText}>Most Popular</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2B2B2B',
    marginBottom: 20,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: 30,
  },
  discountText: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  priceButton: {
    backgroundColor: '#FF3E3E',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  gradientBackground: {
    padding: 10,
    borderRadius: 10,
  },
  popularText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CustomButton;
