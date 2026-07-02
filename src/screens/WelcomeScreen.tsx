import React from 'react';
import {
  Image,
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
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const heroImage = require('../assets/images/Img1.png');

export function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;
  const isCompactHeight = height < 700;

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <StatusBar hidden />

      <View style={[styles.page, isLandscape && styles.landscapePage]}>
        <View
          style={[
            styles.heroSection,
            isLandscape && styles.landscapeHeroSection,
          ]}
        >
          <Image
            accessibilityLabel="Lovabies bear and unicorn toys"
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={heroImage}
            style={styles.heroImage}
          />
        </View>

        <View
          style={[
            styles.contentSection,
            isLandscape && styles.landscapeContentSection,
          ]}
        >
          <View
            style={[
              styles.contentInner,
              isTablet && styles.tabletContentInner,
              isLandscape && styles.landscapeContentInner,
            ]}
          >
            <View style={styles.textSection}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[
                  styles.title,
                  isTablet && styles.tabletTitle,
                  isCompactHeight && styles.compactTitle,
                ]}
              >
                {t('welcome.title')}
              </Text>

              <Text
                adjustsFontSizeToFit
                numberOfLines={2}
                style={[
                  styles.subtitle,
                  isTablet && styles.tabletSubtitle,
                  isCompactHeight && styles.compactSubtitle,
                ]}
              >
                {t('welcome.subtitle')}
              </Text>
            </View>

            <View
              style={[styles.actions, isCompactHeight && styles.compactActions]}
            >
              <LovabiesButton
                label={t('welcome.yes')}
                style={[styles.cta, isCompactHeight && styles.compactCta]}
                labelStyle={[
                  styles.ctaLabel,
                  isCompactHeight && styles.compactCtaLabel,
                ]}
                onPress={() => {
                  navigation.navigate('PlushSelection');
                }}
              />

              <LovabiesButton
                label={t('welcome.no')}
                variant="light"
                style={[styles.cta, isCompactHeight && styles.compactCta]}
                labelStyle={[
                  styles.ctaLabel,
                  isCompactHeight && styles.compactCtaLabel,
                ]}
                onPress={() => {
                  navigation.navigate('Benefits');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    backgroundColor: colors.lovabiesPurple,
  },

  landscapePage: {
    flexDirection: 'row',
  },

  heroSection: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.lovabiesButton,
  },

  landscapeHeroSection: {
    width: '50%',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  contentSection: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lovabiesPurple,
  },

  landscapeContentSection: {
    width: '50%',
  },

  contentInner: {
    flex: 1,
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    justifyContent: 'space-evenly',

    paddingHorizontal: 30,
    paddingVertical: 24,
  },

  tabletContentInner: {
    maxWidth: 820,
    paddingHorizontal: spacing.xxl,
  },

  landscapeContentInner: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },

  textSection: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 48,
    textAlign: 'center',
  },

  compactTitle: {
    fontSize: 32,
    lineHeight: 38,
  },

  tabletTitle: {
    fontSize: 50,
    lineHeight: 58,
  },

  subtitle: {
    width: '100%',
    marginTop: spacing.lg,

    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 21,
    fontWeight: '400',
    lineHeight: 30,
    textAlign: 'center',
  },

  compactSubtitle: {
    marginTop: spacing.sm,
    fontSize: 17,
    lineHeight: 23,
  },

  tabletSubtitle: {
    fontSize: 26,
    lineHeight: 36,
  },

  actions: {
    width: '100%',
    gap: 28,
  },

  compactActions: {
    gap: 18,
  },

  cta: {
    minHeight: 70,
  },

  compactCta: {
    minHeight: 56,
  },

  ctaLabel: {
    fontSize: 24,
  },

  compactCtaLabel: {
    fontSize: 18,
  },
});
