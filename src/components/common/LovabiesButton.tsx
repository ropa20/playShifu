import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type LovabiesButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'dark' | 'light';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const BUTTON_HEIGHT = 60;
const FACE_HEIGHT = 50;
const SHADOW_OFFSET = 10;

const buttonColors = {
  darkFace: '#302C62',
  darkShadow: '#141043',

  lightFace: '#FFFFFF',
  lightShadow: '#B3ACDA',

  darkText: '#FFFFFF',
  lightText: '#302C62',
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
    <View style={[style, styles.wrapper, disabled && styles.disabled]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        style={styles.pressable}
      >
        {({ pressed }) => (
          <>
            {/* Solid lower layer */}
            <View
              pointerEvents="none"
              style={[
                styles.shadowLayer,
                {
                  backgroundColor: isLight
                    ? buttonColors.lightShadow
                    : buttonColors.darkShadow,
                },
              ]}
            />

            {/* Main button face */}
            <View
              style={[
                styles.buttonFace,
                {
                  backgroundColor: isLight
                    ? buttonColors.lightFace
                    : buttonColors.darkFace,
                },
                pressed && !disabled && styles.pressedFace,
              ]}
            >
              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                numberOfLines={1}
                style={[
                  styles.label,
                  {
                    color: isLight
                      ? buttonColors.lightText
                      : buttonColors.darkText,
                  },
                  labelStyle,
                ]}
              >
                {label}
              </Text>
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: BUTTON_HEIGHT,
    minHeight: BUTTON_HEIGHT,

    backgroundColor: 'transparent',
  },

  pressable: {
    position: 'relative',

    width: '100%',
    height: BUTTON_HEIGHT,
  },

  shadowLayer: {
    position: 'absolute',

    top: SHADOW_OFFSET,
    right: 0,
    left: 0,

    height: FACE_HEIGHT,

    borderRadius: 999,
  },

  buttonFace: {
    position: 'absolute',

    top: 0,
    right: 0,
    left: 0,

    height: FACE_HEIGHT,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 999,

    paddingHorizontal: 28,
  },

  pressedFace: {
    transform: [{ translateY: 5 }],
  },

  label: {
    fontFamily: 'sans-serif-rounded',
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 28,

    textAlign: 'center',
    includeFontPadding: false,
  },

  disabled: {
    opacity: 0.45,
  },
});
