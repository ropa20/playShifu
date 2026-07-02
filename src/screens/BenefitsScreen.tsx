import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { ComparisonTable } from '../components/benefits/ComparisonTable';
import { LovabiesButton } from '../components/common/LovabiesButton';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Benefits'>;

const heroImage = require('../assets/images/Img2.png');

export function BenefitsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;

  const heroHeight = isLandscape
    ? Math.min(height * 0.72, 420)
    : Math.min(width * 0.88, isTablet ? 560 : 380);

  const goToParentalGate = () => {
    navigation.navigate('ParentalGate');
  };

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.heroSection,
            {
              height: heroHeight,
            },
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

        <View style={[styles.content, isTablet && styles.tabletContent]}>
          <View style={styles.textSection}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={[styles.title, isTablet && styles.tabletTitle]}
            >
              {t('benefits.title')}
            </Text>

            <Text style={[styles.subtitle, isTablet && styles.tabletSubtitle]}>
              {t('benefits.subtitle')}
            </Text>
          </View>

          <View style={styles.tableContainer}>
            <ComparisonTable />
          </View>

          <View style={styles.actions}>
            <LovabiesButton
              label={t('benefits.primary')}
              onPress={goToParentalGate}
              style={[styles.button, isTablet && styles.tabletButton]}
              labelStyle={[
                styles.primaryButtonLabel,
                isTablet && styles.tabletButtonLabel,
              ]}
            />

            <LovabiesButton
              label={t('benefits.secondary')}
              onPress={goToParentalGate}
              variant="light"
              style={[styles.button, isTablet && styles.tabletButton]}
              labelStyle={[
                styles.secondaryButtonLabel,
                isTablet && styles.tabletButtonLabel,
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lovabiesPurple,
  },

  scrollContent: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.lovabiesPurple,
  },

  heroSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.lovabiesButton,
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',

    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 48,
  },

  tabletContent: {
    width: '100%',
    maxWidth: 920,

    paddingHorizontal: 56,
    paddingTop: 28,
    paddingBottom: 64,
  },

  textSection: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    maxWidth: 360,
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'DynaPuff',
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 42,
  },

  tabletTitle: {
    maxWidth: 600,
    fontSize: 50,
    lineHeight: 56,
  },

  subtitle: {
    maxWidth: 350,
    marginTop: 14,

    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 27,
    textAlign: 'center',
  },

  tabletSubtitle: {
    maxWidth: 650,
    fontSize: 26,
    lineHeight: 36,
  },

  tableContainer: {
    width: '100%',
    marginTop: 24,
  },

  actions: {
    width: '100%',
    marginTop: 34,
    gap: 30,
  },

  button: {
    minHeight: 66,
  },

  tabletButton: {
    minHeight: 78,
  },

  primaryButtonLabel: {
    fontSize: 21,
    fontWeight: '700',
  },

  secondaryButtonLabel: {
    fontSize: 19,
    fontWeight: '700',
  },

  tabletButtonLabel: {
    fontSize: 25,
  },
});
