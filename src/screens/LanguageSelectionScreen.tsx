import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
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

type LanguageOptionProps = {
  label: string;
  selected: boolean;
  compact: boolean;
  onPress: () => void;
};

const LANGUAGE_OPTIONS = [
  {
    code: 'en',
    translationKey: 'language.english',
  },
  {
    code: 'pl',
    translationKey: 'language.polish',
  },
] as const;

const roundedFont = Platform.select({
  android: 'sans-serif-rounded',
  default: undefined,
});

function getInitialLanguage(): SupportedLanguage {
  return i18n.resolvedLanguage?.startsWith('pl') ||
    i18n.language.startsWith('pl')
    ? 'pl'
    : 'en';
}

export function LanguageSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;
  const isCompactHeight = height < 680;

  const useTwoColumnLayout = isLandscape && width >= 700;

  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(getInitialLanguage);

  const selectLanguage = async (language: SupportedLanguage) => {
    if (language === selectedLanguage) {
      return;
    }

    const previousLanguage = selectedLanguage;

    setSelectedLanguage(language);

    try {
      await i18n.changeLanguage(language);
    } catch {
      setSelectedLanguage(previousLanguage);
    }
  };

  const confirmLanguage = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={styles.safeArea}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isCompactHeight && styles.compactScrollContent,
        ]}
      >
        <View
          style={[
            styles.content,
            isTablet && styles.tabletContent,
            useTwoColumnLayout && styles.twoColumnContent,
          ]}
        >
          <View
            style={[
              styles.headingSection,
              useTwoColumnLayout && styles.headingColumn,
            ]}
          >
            <Text
              accessibilityRole="header"
              style={[
                styles.title,
                isTablet && styles.tabletTitle,
                isCompactHeight && styles.compactTitle,
              ]}
            >
              {t('language.title')}
            </Text>

            <Text
              style={[
                styles.subtitle,
                isTablet && styles.tabletSubtitle,
                isCompactHeight && styles.compactSubtitle,
              ]}
            >
              {t('language.subtitle')}
            </Text>
          </View>

          <View
            style={[
              styles.actionSection,
              useTwoColumnLayout && styles.actionColumn,
            ]}
          >
            <View
              accessibilityRole="radiogroup"
              style={[
                styles.options,
                isCompactHeight && styles.compactOptions,
                useTwoColumnLayout && styles.twoColumnOptions,
              ]}
            >
              {LANGUAGE_OPTIONS.map(option => (
                <LanguageOption
                  key={option.code}
                  label={t(option.translationKey)}
                  selected={selectedLanguage === option.code}
                  compact={isCompactHeight}
                  onPress={() => {
                    void selectLanguage(option.code);
                  }}
                />
              ))}
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
      </ScrollView>
    </SafeAreaView>
  );
}

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
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.12)',
      }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        compact && styles.compactOption,
        selected && styles.selectedOption,
        pressed && styles.pressedOption,
      ]}
    >
      <View
        importantForAccessibility="no-hide-descendants"
        style={[styles.radioOuter, compact && styles.compactRadioOuter]}
      >
        {selected ? (
          <View style={[styles.radioDot, compact && styles.compactRadioDot]} />
        ) : null}
      </View>

      <Text
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

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  compactScrollContent: {
    paddingVertical: spacing.md,
  },

  content: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },

  tabletContent: {
    maxWidth: 720,
  },

  twoColumnContent: {
    maxWidth: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
  },

  headingSection: {
    width: '100%',
  },

  headingColumn: {
    flex: 1,
  },

  actionSection: {
    width: '100%',
  },

  actionColumn: {
    flex: 1,
  },

  title: {
    color: colors.white,
    fontFamily: 'DynaPuff',
    fontSize: 30,
    lineHeight: 42,
  },

  tabletTitle: {
    fontSize: 34,
    lineHeight: 46,
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
    lineHeight: 30,
  },

  tabletSubtitle: {
    fontSize: 22,
    lineHeight: 32,
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

  twoColumnOptions: {
    marginTop: 0,
  },

  option: {
    width: '100%',
    minHeight: 94,

    flexDirection: 'row',
    alignItems: 'center',

    overflow: 'hidden',

    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: radius.md,

    backgroundColor: colors.lovabiesPanel,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  compactOption: {
    minHeight: 68,
    paddingVertical: spacing.sm,
  },

  selectedOption: {
    borderColor: colors.white,
  },

  pressedOption: {
    opacity: 0.88,
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
    flexShrink: 1,
    marginLeft: spacing.lg,

    color: colors.white,
    fontFamily: 'DynaPuff',
    fontSize: 28,
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
  },

  compactConfirmLabel: {
    fontSize: 19,
  },
});
