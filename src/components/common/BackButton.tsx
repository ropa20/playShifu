import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '../../theme';

type BackButtonProps = {
  onPress: () => void;
};

export function BackButton({ onPress }: BackButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('common.back')}
      hitSlop={12}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.arrow}>‹</Text>
      <Text style={styles.label}>{t('common.back')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  arrow: {
    marginRight: spacing.xs,
    color: colors.primary,
    fontSize: 35,
    lineHeight: 35,
  },

  label: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.6,
  },
});
