import React, { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';

type ScreenContainerProps = PropsWithChildren<{
  backgroundColor?: string;
}>;

export function ScreenContainer({
  children,
  backgroundColor = colors.background,
}: ScreenContainerProps) {
  const { width, height } = useWindowDimensions();

  const shortestSide = Math.min(width, height);
  const isTablet = shortestSide >= 600;

  const horizontalPadding = isTablet ? spacing.xxl : spacing.lg;
  const maximumContentWidth = isTablet ? 760 : 560;

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={[styles.safeArea, { backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.inner,
            {
              maxWidth: maximumContentWidth,
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  inner: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
});
