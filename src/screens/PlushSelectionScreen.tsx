import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { BackButton } from '../components/common/BackButton';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PlushSelection'>;

const toys = ['plush.toy1', 'plush.toy2', 'plush.toy3'] as const;

export function PlushSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [selectedToy, setSelectedToy] = useState<string | null>(null);

  return (
    <ScreenContainer>
      <BackButton onPress={navigation.goBack} />

      <Text style={styles.title}>{t('plush.title')}</Text>

      <Text style={styles.subtitle}>{t('plush.subtitle')}</Text>

      <View style={styles.toys}>
        {toys.map(toyKey => {
          const selected = selectedToy === toyKey;

          return (
            <Pressable
              key={toyKey}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => setSelectedToy(toyKey)}
              style={({ pressed }) => [
                styles.toyCard,
                selected && styles.selectedToyCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.toyPlaceholder}>
                <Text style={styles.toyEmoji}>🧸</Text>
              </View>

              <Text
                style={[styles.toyName, selected && styles.selectedToyName]}
              >
                {t(toyKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <PrimaryButton
        disabled={!selectedToy}
        label={t('plush.continue')}
        onPress={() => navigation.navigate('ParentalGate')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: spacing.sm,
    color: colors.mutedText,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },

  toys: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },

  toyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },

  selectedToyCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  toyPlaceholder: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: '#F5EACB',
  },

  toyEmoji: {
    fontSize: 38,
  },

  toyName: {
    marginLeft: spacing.lg,
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },

  selectedToyName: {
    color: colors.primary,
  },

  pressed: {
    opacity: 0.75,
  },
});
