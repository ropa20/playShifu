import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing } from '../../theme';

type LovabiesButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'dark' | 'light';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function LovabiesButton({
  label,
  onPress,
  variant = 'dark',
  disabled = false,
  style,
  labelStyle,
}: LovabiesButtonProps) {
  const isLight = variant === 'light';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isLight ? styles.lightButton : styles.darkButton,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[
          styles.label,
          isLight ? styles.lightLabel : styles.darkLabel,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 62,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: radius.pill,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,

    shadowColor: colors.lovabiesButtonShadow,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 8,
  },

  darkButton: {
    backgroundColor: colors.lovabiesButton,
  },

  lightButton: {
    backgroundColor: colors.white,
  },

  label: {
    fontFamily: 'sans-serif-rounded',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

  darkLabel: {
    color: colors.white,
  },

  lightLabel: {
    color: colors.lovabiesButton,
  },

  pressed: {
    opacity: 0.9,
    transform: [{ translateY: 3 }],
  },

  disabled: {
    opacity: 0.45,
  },
});
