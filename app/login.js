import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const translations = {
  en: {
    login: 'Log in',
    guest: 'Use as a Guest',
    createAccount: 'Create Account',
    emergency: 'FOR ANY IMMEDIATE EMERGENCIES',
    or: 'OR',
    username: 'Username:',
    password: 'Password:',
    usernamePlaceholder: 'Enter username...',
    passwordPlaceholder: 'Enter password...',
  },
  zh: {
    login: '登录',
    guest: '以访客身份使用',
    createAccount: '创建账户',
    emergency: '如遇紧急情况请联系',
    or: '或',
    username: '用户名：',
    password: '密码：',
    usernamePlaceholder: '输入用户名...',
    passwordPlaceholder: '输入密码...',
  },
  ta: {
    login: 'உள்நுழைக',
    guest: 'விருந்தினராக பயன்படுத்தவும்',
    createAccount: 'கணக்கை உருவாக்கவும்',
    emergency: 'எழுந்துரைக்கும் அவசரங்களுக்கு',
    or: 'அல்லது',
    username: 'பயனர் பெயர்:',
    password: 'கடவுச்சொல்:',
    usernamePlaceholder: 'பயனர்பெயரை உள்ளிடுக...',
    passwordPlaceholder: 'கடவுச்சொல்லை உள்ளிடுக...',
  },
  ms: {
    login: 'Log masuk',
    guest: 'Guna sebagai tetamu',
    createAccount: 'Buat Akaun',
    emergency: 'UNTUK KECEMASAN SEGERA',
    or: 'ATAU',
    username: 'Nama pengguna:',
    password: 'Kata laluan:',
    usernamePlaceholder: 'Masukkan nama pengguna...',
    passwordPlaceholder: 'Masukkan kata laluan...',
  },
};


export default function SignInScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');
  const t = translations[language];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.iconDropdown}>
          <Picker
            selectedValue={language}
            onValueChange={setLanguage}
            style={styles.pickerStyle}
          >
            <Picker.Item label="EN" value="en" />
            <Picker.Item label="中文" value="zh" />
            <Picker.Item label="தமிழ்" value="ta" />
            <Picker.Item label="MS" value="ms" />
          </Picker>
          <Ionicons name="language" size={20} color="#000" style={styles.iconOverlay} />
        </View>

        <View style={styles.iconDropdown}>
          <Picker
            selectedValue={fontSize}
            onValueChange={setFontSize}
            style={styles.pickerStyle}
          >
            <Picker.Item label="S" value="small" />
            <Picker.Item label="N" value="normal" />
            <Picker.Item label="L" value="large" />
            <Picker.Item label="XL" value="xlarge" />
          </Picker>
          <Ionicons name="text" size={20} color="#000" style={styles.iconOverlay} />
        </View>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>

        <View style={{ height: 20 }} />
        <View style={styles.inputBlock}>
          <Text style={styles.label}>{t.username}</Text>
          <TextInput
            style={styles.input}
            placeholder={t.usernamePlaceholder}
            placeholderTextColor="#999"
          />
        </View>

        <View style={{ height: 30 }} />

        <View style={styles.inputBlock}>
          <Text style={styles.label}>{t.password}</Text>
          <TextInput
            style={styles.input}
            placeholder={t.passwordPlaceholder}
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/home')}>
          <Text style={styles.loginButtonText}>{t.login}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>

        
        <TouchableOpacity style={styles.singpassImageButton}>
          <Image
            source={require('../Images/Singpass.png')}
            style={styles.singpassImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.emergencyText}>{t.emergency}</Text>

        <TouchableOpacity style={styles.outlinedButton} onPress={() => router.push('/home')}>
          <Text style={styles.outlinedButtonText}>{t.guest}</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>{t.or}</Text>

        <TouchableOpacity style={styles.outlinedButton}>
          <Text style={styles.outlinedButtonText}>{t.createAccount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#f8bcbc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

  topBar: {
    flex: 0.08,
    backgroundColor: '#f8bcbc',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
    gap: 10,
    paddingTop: 10,
  },
  iconDropdown: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
  },
  pickerStyle: {
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  iconOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  middleSection: {
    flex: 0.45,  
    backgroundColor: '#ffeced',
    paddingHorizontal: 30,
    justifyContent: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    // Shadow for Android
    elevation: 8,

    // To elevate above the next section
    zIndex: 2,
    marginBottom: 10,
  },

  inputBlock: {
    marginBottom: 20,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 16, 
    marginBottom: 5,
    alignSelf: 'flex-start',
  },

  input: {
    backgroundColor: '#FFF6F6',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FADADD',
    width: '100%',
  },


  loginButton: {
    marginTop : 20,
    backgroundColor: '#ffdedd',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },

  loginButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },

  bottomSection: {
    flex: 0.42,
    backgroundColor: '#f8bcbc',
    paddingHorizontal: 30,
    paddingTop: 10,  // Add this line (new)
    justifyContent: 'flex-start',  // Changed from 'center'
  },

  singpassImageButton: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10, // Add if needed to control spacing
  },

  singpassImage: {
    width: 300,
    height: 50,
    marginTop: 15,
    marginBottom: 10,
  },


  emergencyText: {
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,  // increased from default
  },



  outlinedButton: {
    fontFamily: 'Inter_700Bold',
    backgroundColor: '#ffcccb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e29d9e',
    paddingVertical: 12,
    paddingHorizontal: 20, // Add horizontal padding
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: 10,   // Make button size fit to content
    marginBottom: 10,
  },

  outlinedButtonText: {
    fontFamily: 'Inter_700Bold',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15, // Increased font size
  },

  orText: {
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});


