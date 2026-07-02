import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import i18n from '../localization/i18n';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

type SupportedLanguage = 'en' | 'pl';

export function LanguageSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const initialLanguage: SupportedLanguage = i18n.language.startsWith('pl')
    ? 'pl'
    : 'en';

  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(initialLanguage);

  const selectLanguage = async (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    await i18n.changeLanguage(language);
  };

  const confirmLanguage = () => {
    navigation.navigate('Welcome');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>{t('language.title')}</Text>

      <Text style={styles.subtitle}>{t('language.subtitle')}</Text>

      <View style={styles.options}>
        <LanguageOption
          label={t('language.english')}
          selected={selectedLanguage === 'en'}
          onPress={() => {
            void selectLanguage('en');
          }}
        />

        <LanguageOption
          label={t('language.polish')}
          selected={selectedLanguage === 'pl'}
          onPress={() => {
            void selectLanguage('pl');
          }}
        />
      </View>

      <PrimaryButton label={t('language.confirm')} onPress={confirmLanguage} />
    </ScreenContainer>
  );
}

type LanguageOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function LanguageOption({ label, selected, onPress }: LanguageOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && styles.selectedOption,
        pressed && styles.pressedOption,
      ]}
    >
      <View style={[styles.radio, selected && styles.selectedRadio]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>

      <Text
        style={[styles.optionLabel, selected && styles.selectedOptionLabel]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 36,
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

  options: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },

  option: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },

  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  pressedOption: {
    opacity: 0.75,
  },

  radio: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
  },

  selectedRadio: {
    borderColor: colors.primary,
  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },

  optionLabel: {
    marginLeft: spacing.md,
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },

  selectedOptionLabel: {
    color: colors.primary,
  },
});
