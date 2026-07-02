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

  const contentPanelHeight = isLandscape ? height : height / 2;
  const isCompactPanel = contentPanelHeight < 430;

  return (
    <View style={styles.safeArea}>
      <StatusBar hidden />
      <View style={[styles.page, isLandscape && styles.landscapePage]}>
        <View style={styles.heroSection}>
          <Image
            accessibilityLabel="Lovabies bear and unicorn toys"
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={heroImage}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.contentSection}>
          <View
            style={[
              styles.contentInner,
              isCompactPanel && styles.compactContentInner,
            ]}
          >
            <View style={styles.textSection}>
              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                numberOfLines={1}
                style={[styles.title, isCompactPanel && styles.compactTitle]}
              >
                {t('welcome.title')}
              </Text>

              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                numberOfLines={2}
                style={[
                  styles.subtitle,
                  isCompactPanel && styles.compactSubtitle,
                ]}
              >
                {t('welcome.subtitle')}
              </Text>
            </View>

            <View
              style={[styles.actions, isCompactPanel && styles.compactActions]}
            >
              <LovabiesButton
                label={t('welcome.yes')}
                onPress={() => {
                  navigation.navigate('PlushSelection');
                }}
                style={[styles.cta, isCompactPanel && styles.compactCta]}
                labelStyle={[
                  styles.ctaLabel,
                  isCompactPanel && styles.compactCtaLabel,
                ]}
              />

              <LovabiesButton
                label={t('welcome.no')}
                variant="light"
                onPress={() => {
                  navigation.navigate('Benefits');
                }}
                style={[styles.cta, isCompactPanel && styles.compactCta]}
                labelStyle={[
                  styles.ctaLabel,
                  isCompactPanel && styles.compactCtaLabel,
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
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

  /*
   * Both main sections use flex: 1.
   * This creates an exact 1:1 ratio in portrait and landscape.
   */
  heroSection: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.lovabiesButton,
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  contentSection: {
    flex: 1,
    backgroundColor: colors.lovabiesPurple,
  },

  /*
   * No maxWidth is used here.
   * The content fills the full available half of the screen
   * on phones and tablets.
   */
  contentInner: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',

    paddingHorizontal: 30,
    paddingVertical: 24,
  },

  compactContentInner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  textSection: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'DynaPuff',
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 42,
  },

  compactTitle: {
    fontSize: 32,
    lineHeight: 38,
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
