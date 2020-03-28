import * as React from 'react';
import { StatusBar, AsyncStorage, View, Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import CustomAppearanceContext from './CustomAppearanceContext';

const appearanceStorageKey = '@ReactNativeDirectory:CustomAppearanceContext';
const shouldRehydrate = true;

const defaultState = { isDark: false };

interface Props {
  children: React.ReactNode;
}

export default function CustomAppearanceProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(
    Platform.OS === 'web' ? false : colorScheme === 'dark'
  );
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const rehydrateAsync = async () => {
      try {
        const { isDark: isDarkNew } = await rehydrateAppearanceState();
        setIsDark(isDarkNew);
      } catch (ignored) {
        //
      }
      setLoaded(true);
    };

    rehydrateAsync();
  }, []);

  React.useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
  }, [isDark]);

  if (!isLoaded) {
    return <View />;
  }
  return (
    <CustomAppearanceContext.Provider
      value={{
        isDark,
        setIsDark: isDarkNew => {
          setIsDark(isDarkNew);
          cacheAppearanceState({ isDark: isDarkNew });
        },
      }}>
      {children}
    </CustomAppearanceContext.Provider>
  );
}

async function cacheAppearanceState(appearance) {
  await AsyncStorage.setItem(appearanceStorageKey, JSON.stringify(appearance));
}

async function rehydrateAppearanceState() {
  if (!shouldRehydrate || !AsyncStorage) {
    return defaultState;
  }

  try {
    const item = await AsyncStorage.getItem(appearanceStorageKey);
    return item ? JSON.parse(item) : null;
  } catch (ignored) {
    return defaultState;
  }
}
