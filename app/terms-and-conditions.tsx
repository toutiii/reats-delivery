import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
   Dimensions,
   Image,
   Platform,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PartnerOnboarding = () => {
   const [isChecked, setIsChecked] = useState(false);

   const toggleCheckbox = () => {
      setIsChecked(!isChecked);
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" />
         <LinearGradient
            colors={['#FFC0B3', '#FFDED5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
         >
            {/* Small white dots/stars - adjusted positions to match design */}
            <View style={[styles.dot, { top: '12%', left: '26%' }]} />
            <View style={[styles.dot, { top: '12%', right: '26%' }]} />
            <View style={[styles.dot, { top: '20%', left: '50%' }]} />

            {/* Main Illustration - adjusted ratio and position */}
            <View style={styles.illustrationContainer}>
               <Image
                  source={require('@/src/assets/images/onboarding/delivery-illustration.png')}
                  style={styles.illustration}
                  resizeMode="contain"
               />
            </View>

            {/* Content Container - adjusted spacing */}
            <View style={styles.contentContainer}>
               <Text style={styles.tagline}>Be a EatFit Partner</Text>
               <Text style={styles.headline}>
                  Get a stable monthly{'\n'}income
               </Text>

               {/* Checkbox and Terms - adjusted alignment and spacing */}
               <View style={styles.termsContainer}>
                  <TouchableOpacity
                     style={styles.checkbox}
                     onPress={toggleCheckbox}
                     activeOpacity={0.8}
                  >
                     {isChecked && <View style={styles.checkboxInner} />}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                     By signing up I agree to the{' '}
                     <Text style={styles.termsLink}>Terms of use</Text> and{' '}
                     <Text style={styles.termsLink}>Privacy Policy</Text>.
                  </Text>
               </View>

               {/* Continue Button - adjusted color and shadow */}
               <TouchableOpacity
                  style={styles.continueButton}
                  activeOpacity={0.9}
               >
                  <Text style={styles.continueText}>Continuer</Text>
               </TouchableOpacity>
            </View>

            {/* Home Indicator Line */}
            <View style={styles.homeIndicator} />
         </LinearGradient>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFC0B3', // Ensure no white flashes during loading
   },
   gradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: Platform.OS === 'ios' ? 0 : 20,
   },
   dot: {
      position: 'absolute',
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: 'white',
      opacity: 0.8,
   },
   illustrationContainer: {
      width: width * 0.85,
      height: height * 0.45,
      marginTop: height * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
   },
   illustration: {
      width: '100%',
      height: '100%',
   },
   contentContainer: {
      width: '100%',
      paddingHorizontal: 24,
      paddingBottom: Platform.OS === 'ios' ? 20 : 40,
      marginTop: -height * 0.08, // Pull content up closer to illustration
   },
   tagline: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
      marginBottom: 8,
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
   },
   headline: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 32,
      lineHeight: 34,
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
   },
   termsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 24,
   },
   checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#999',
      marginRight: 10,
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
   },
   checkboxInner: {
      width: 12,
      height: 12,
      backgroundColor: '#000',
      borderRadius: 1,
   },
   termsText: {
      fontSize: 14,
      color: '#333',
      flex: 1,
      lineHeight: 20,
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
   },
   termsLink: {
      color: '#E56B52',
      textDecorationLine: 'underline',
   },
   continueButton: {
      backgroundColor: '#F47458',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      ...Platform.select({
         ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
         },
         android: {
            elevation: 3,
         },
      }),
   },
   continueText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
   },
   homeIndicator: {
      width: 40,
      height: 5,
      backgroundColor: '#000',
      borderRadius: 3,
      opacity: 0.2,
      marginBottom: 8,
   },
});

export default PartnerOnboarding;
