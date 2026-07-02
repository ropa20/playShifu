import React, { useState } from 'react';
import {
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
import { PlushOptionCard } from '../components/plush/PlushOptionCard';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PlushSelection'>;

type PlushId = 'zeezee' | 'cuffy';

const zeezeeImage = require('../assets/images/zeezee_full.png');
const cuffyImage = require('../assets/images/guffy_full.png');

/*
 * Both supplied card images are approximately 1.72:1.
 *
 * ZeeZee: 1480 / 860
 * Cuffy: 1290 / 750
 */
const CARD_ASPECT_RATIO = 1.72;

export function PlushSelectionScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;
  const isCompactHeight = height < 760;

  const [selectedPlush, setSelectedPlush] = useState<PlushId>('zeezee');

  const horizontalPadding = isTablet ? 48 : 36;
  const maximumCardWidth = isTablet ? 680 : 560;

  const cardWidth = Math.min(width - horizontalPadding * 2, maximumCardWidth);

  const portraitCardWrapperStyle = {
    width: cardWidth,
    aspectRatio: CARD_ASPECT_RATIO,
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

      <View
        style={[
          styles.page,
          isLandscape && styles.landscapePage,
          {
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        <View style={[styles.header, isLandscape && styles.landscapeHeader]}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={[
              styles.title,
              isTablet && styles.tabletTitle,
              isCompactHeight && styles.compactTitle,
            ]}
          >
            {t('plush.title')}
          </Text>

          <Text
            adjustsFontSizeToFit
            numberOfLines={3}
            style={[
              styles.subtitle,
              isTablet && styles.tabletSubtitle,
              isCompactHeight && styles.compactSubtitle,
            ]}
          >
            {t('plush.subtitle')}
          </Text>
        </View>

        <View style={[styles.main, isLandscape && styles.landscapeMain]}>
          <View
            style={[
              styles.options,
              isCompactHeight && styles.compactOptions,
              isLandscape && styles.landscapeOptions,
            ]}
          >
            <View
              collapsable={false}
              renderToHardwareTextureAndroid
              style={[
                styles.cardWrapper,
                isLandscape
                  ? styles.landscapeCardWrapper
                  : portraitCardWrapperStyle,
              ]}
            >
              <PlushOptionCard
                key={`zeezee-${
                  selectedPlush === 'zeezee' ? 'selected' : 'unselected'
                }`}
                accessibilityLabel={t('plush.zeezee')}
                imageScale={1.12}
                onPress={() => {
                  setSelectedPlush('zeezee');
                }}
                selected={selectedPlush === 'zeezee'}
                source={zeezeeImage}
                style={styles.cardFill}
              />
            </View>

            <View
              collapsable={false}
              renderToHardwareTextureAndroid
              style={[
                styles.cardWrapper,
                isLandscape
                  ? styles.landscapeCardWrapper
                  : portraitCardWrapperStyle,
              ]}
            >
              <PlushOptionCard
                key={`cuffy-${
                  selectedPlush === 'cuffy' ? 'selected' : 'unselected'
                }`}
                accessibilityLabel={t('plush.cuffy')}
                imageScale={1.12}
                onPress={() => {
                  setSelectedPlush('cuffy');
                }}
                selected={selectedPlush === 'cuffy'}
                source={cuffyImage}
                style={styles.cardFill}
              />
            </View>
          </View>

          <LovabiesButton
            label={t('plush.next')}
            onPress={() => {
              navigation.navigate('ParentalGate');
            }}
            style={[
              styles.nextButton,
              isCompactHeight && styles.compactNextButton,
            ]}
            labelStyle={[
              styles.nextButtonLabel,
              isCompactHeight && styles.compactNextButtonLabel,
            ]}
          />
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
    maxWidth: 820,
    alignSelf: 'center',

    paddingTop: 28,
    paddingBottom: 28,
  },

  landscapePage: {
    maxWidth: 1200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
  },

  header: {
    width: '100%',
  },

  landscapeHeader: {
    flex: 0.75,
  },

  title: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 37,
    fontWeight: '800',
    lineHeight: 45,
  },

  compactTitle: {
    fontSize: 31,
    lineHeight: 37,
  },

  tabletTitle: {
    fontSize: 48,
    lineHeight: 57,
  },

  subtitle: {
    marginTop: 12,

    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 29,
  },

  compactSubtitle: {
    fontSize: 17,
    lineHeight: 23,
  },

  tabletSubtitle: {
    fontSize: 25,
    lineHeight: 35,
  },

  main: {
    width: '100%',
    alignItems: 'center',
  },

  landscapeMain: {
    flex: 1.25,
  },

  options: {
    width: '100%',
    alignItems: 'center',

    marginTop: 48,
    gap: 18,
  },

  compactOptions: {
    marginTop: 28,
    gap: 12,
  },

  landscapeOptions: {
    flexDirection: 'row',
    marginTop: 0,
  },

  cardWrapper: {
    overflow: 'visible',
    backgroundColor: 'transparent',
  },

  cardFill: {
    width: '100%',
    height: '100%',
  },

  landscapeCardWrapper: {
    flex: 1,
    aspectRatio: CARD_ASPECT_RATIO,
  },

  nextButton: {
    width: '100%',
    minHeight: 66,
    marginTop: 44,
  },

  compactNextButton: {
    minHeight: 56,
    marginTop: 24,
  },

  nextButtonLabel: {
    fontSize: 22,
    fontWeight: '800',
  },

  compactNextButtonLabel: {
    fontSize: 18,
  },
});
