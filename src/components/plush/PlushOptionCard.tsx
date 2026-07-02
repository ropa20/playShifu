import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../../theme';

type PlushOptionCardProps = {
  source: ImageSourcePropType;
  selected: boolean;
  accessibilityLabel: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  imageScale?: number;
};

export function PlushOptionCard({
  source,
  selected,
  accessibilityLabel,
  onPress,
  style,
  imageScale = 1,
}: PlushOptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        style,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.selectionFrame, selected && styles.selectedFrame]}>
        <View style={styles.imageClip}>
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={source}
            style={[
              styles.image,
              {
                transform: [{ scale: imageScale }],
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    overflow: 'visible',
  },

  selectionFrame: {
    flex: 1,
    width: '100%',
    height: '100%',

    borderRadius: 15,
    overflow: 'hidden',
  },

  selectedFrame: {
    borderWidth: 5,
    borderColor: colors.white,
  },

  imageClip: {
    flex: 1,
    width: '100%',
    height: '100%',

    borderRadius: 12,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
