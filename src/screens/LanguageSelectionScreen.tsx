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
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '../components/common/ScreenContainer';
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

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;

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
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.lovabiesPurple}
      />

      <ScreenContainer backgroundColor={colors.lovabiesPurple}>
        <View
          style={[
            styles.content,
            isTablet && styles.tabletContent,
            isLandscape && styles.landscapeContent,
          ]}
        >
          <View
            style={[
              styles.headingSection,
              isLandscape && styles.landscapeHeadingSection,
            ]}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={[styles.title, isTablet && styles.tabletTitle]}
            >
              {t('language.title')}
            </Text>

            <Text style={[styles.subtitle, isTablet && styles.tabletSubtitle]}>
              {t('language.subtitle')}
            </Text>
          </View>

          <View
            style={[
              styles.controlsSection,
              isLandscape && styles.landscapeControlsSection,
            ]}
          >
            <View
              style={[styles.options, isLandscape && styles.landscapeOptions]}
            >
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

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('language.confirm')}
              onPress={confirmLanguage}
              style={({ pressed }) => [
                styles.confirmButton,
                isTablet && styles.tabletConfirmButton,
                pressed && styles.confirmButtonPressed,
              ]}
            >
              <Text
                style={[
                  styles.confirmLabel,
                  isTablet && styles.tabletConfirmLabel,
                ]}
              >
                {t('language.confirm')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScreenContainer>
    </>
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
      <View style={styles.radioOuter}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>

      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.optionLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },

  tabletContent: {
    maxWidth: 760,
  },

  landscapeContent: {
    maxWidth: 980,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
  },

  headingSection: {
    width: '100%',
  },

  landscapeHeadingSection: {
    flex: 0.85,
  },

  controlsSection: {
    width: '100%',
  },

  landscapeControlsSection: {
    flex: 1.15,
  },

  title: {
    color: colors.white,
    fontFamily: roundedFont,
    fontSize: 39,
    fontWeight: '900',
    lineHeight: 47,
  },

  tabletTitle: {
    fontSize: 50,
    lineHeight: 59,
  },

  subtitle: {
    maxWidth: 520,
    marginTop: spacing.md,
    color: colors.white,
    fontFamily: roundedFont,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
  },

  tabletSubtitle: {
    fontSize: 25,
    lineHeight: 36,
  },

  options: {
    width: '100%',
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },

  landscapeOptions: {
    marginTop: 0,
  },

  option: {
    minHeight: 94,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: radius.md,

    backgroundColor: colors.lovabiesPanel,

    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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

  radioDot: {
    width: 20,
    height: 20,

    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },

  optionLabel: {
    flex: 1,
    marginLeft: spacing.lg,

    color: colors.white,
    fontFamily: roundedFont,
    fontSize: 28,
    fontWeight: '900',
  },

  confirmButton: {
    minHeight: 66,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: spacing.xxl,

    borderRadius: radius.pill,
    backgroundColor: colors.lovabiesButton,

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

  tabletConfirmButton: {
    minHeight: 78,
  },

  confirmButtonPressed: {
    opacity: 0.9,
    transform: [
      {
        translateY: 3,
      },
    ],
  },

  confirmLabel: {
    color: colors.white,
    fontFamily: roundedFont,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },

  tabletConfirmLabel: {
    fontSize: 25,
  },
});
