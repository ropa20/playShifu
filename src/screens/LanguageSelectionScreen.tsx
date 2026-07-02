import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { LovabiesButton } from '../components/common/LovabiesButton';
import i18n from '../localization/i18n';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

type SupportedLanguage = 'en' | 'pl';

const roundedFont = Platform.select({
  android: 'sans-serif-rounded',
  default: undefined,
});

export function LanguageSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isTablet = Math.min(width, height) >= 600;
  const isCompactHeight = height < 700;

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
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.lovabiesPurple}
      />

      <View style={[styles.page, isCompactHeight && styles.compactPage]}>
        <View style={[styles.content, isTablet && styles.tabletContent]}>
          <View style={styles.headingSection}>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              numberOfLines={2}
              style={[styles.title, isCompactHeight && styles.compactTitle]}
            >
              {t('language.title')}
            </Text>

            <Text
              style={[
                styles.subtitle,
                isCompactHeight && styles.compactSubtitle,
              ]}
            >
              {t('language.subtitle')}
            </Text>
          </View>

          <View
            style={[styles.options, isCompactHeight && styles.compactOptions]}
          >
            <LanguageOption
              label={t('language.english')}
              selected={selectedLanguage === 'en'}
              compact={isCompactHeight}
              onPress={() => {
                void selectLanguage('en');
              }}
            />

            <LanguageOption
              label={t('language.polish')}
              selected={selectedLanguage === 'pl'}
              compact={isCompactHeight}
              onPress={() => {
                void selectLanguage('pl');
              }}
            />
          </View>

          <LovabiesButton
            label={t('language.confirm')}
            variant="dark"
            onPress={confirmLanguage}
            style={[
              styles.confirmButton,
              isCompactHeight && styles.compactConfirmButton,
            ]}
            labelStyle={[
              styles.confirmLabel,
              isCompactHeight && styles.compactConfirmLabel,
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

type LanguageOptionProps = {
  label: string;
  selected: boolean;
  compact: boolean;
  onPress: () => void;
};

function LanguageOption({
  label,
  selected,
  compact,
  onPress,
}: LanguageOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        compact && styles.compactOption,
        selected && styles.selectedOption,
        pressed && styles.pressedOption,
      ]}
    >
      <View style={[styles.radioOuter, compact && styles.compactRadioOuter]}>
        {selected ? (
          <View style={[styles.radioDot, compact && styles.compactRadioDot]} />
        ) : null}
      </View>

      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        numberOfLines={1}
        style={[styles.optionLabel, compact && styles.compactOptionLabel]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lovabiesPurple,
  },

  page: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  compactPage: {
    paddingVertical: spacing.md,
  },

  content: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },

  tabletContent: {
    maxWidth: 680,
  },

  headingSection: {
    width: '100%',
  },

  title: {
    color: colors.white,
    fontFamily: 'DynaPuff',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 42,
  },

  compactTitle: {
    fontSize: 27,
    lineHeight: 35,
  },

  subtitle: {
    width: '100%',
    maxWidth: 520,
    marginTop: spacing.md,

    color: colors.white,
    fontFamily: roundedFont,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
  },

  compactSubtitle: {
    marginTop: spacing.sm,
    fontSize: 17,
    lineHeight: 23,
  },

  options: {
    width: '100%',
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },

  compactOptions: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },

  option: {
    width: '100%',
    minHeight: 94,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: radius.md,

    backgroundColor: colors.lovabiesPanel,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  compactOption: {
    minHeight: 72,
    paddingVertical: spacing.sm,
  },

  selectedOption: {
    borderColor: colors.white,
  },

  pressedOption: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  radioOuter: {
    width: 33,
    height: 33,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: radius.pill,
  },

  compactRadioOuter: {
    width: 28,
    height: 28,
  },

  radioDot: {
    width: 20,
    height: 20,

    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },

  compactRadioDot: {
    width: 17,
    height: 17,
  },

  optionLabel: {
    flex: 1,
    marginLeft: spacing.lg,

    color: colors.white,
    fontFamily: 'DynaPuff',
    fontSize: 28,
    fontWeight: '500',
  },

  compactOptionLabel: {
    fontSize: 23,
  },

  confirmButton: {
    marginTop: spacing.xxl,
  },

  compactConfirmButton: {
    marginTop: spacing.lg,
  },

  confirmLabel: {
    fontFamily: 'DynaPuff',
    fontSize: 22,
    fontWeight: '500',
  },

  compactConfirmLabel: {
    fontSize: 19,
  },
});
