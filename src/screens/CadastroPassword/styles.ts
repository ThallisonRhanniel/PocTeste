import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F3F5',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    padding: 24,
  },
  content: {
    width: '100%',
  },
  footer: {
    width: '100%',
    padding: 24,
    marginBottom: useSafeAreaInsets().bottom + 24,
  },
});
