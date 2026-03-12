

import { Stack, usePathname } from 'expo-router';
import BottomBar from '../components/BottomBar';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function Layout() {
  const pathname = usePathname();

  // Define routes where BottomBar should NOT be shown
  const hideBottomBarRoutes = ['/welcome', '/notification', '/login'];

  const shouldShowBottomBar = !hideBottomBarRoutes.includes(pathname);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }} />
          {shouldShowBottomBar && <BottomBar />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
