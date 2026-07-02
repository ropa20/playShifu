import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '../../theme';

const features = [
  {
    translationKey: 'benefits.listenOnPhone',
    appOnly: true,
    appPlus: true,
  },
  {
    translationKey: 'benefits.basicStories',
    appOnly: true,
    appPlus: true,
  },
  {
    translationKey: 'benefits.hugAnywhere',
    appOnly: false,
    appPlus: true,
  },
  {
    translationKey: 'benefits.offlinePlayback',
    appOnly: false,
    appPlus: true,
  },
  {
    translationKey: 'benefits.physicalButtons',
    appOnly: false,
    appPlus: true,
  },
  {
    translationKey: 'benefits.fullLibrary',
    appOnly: false,
    appPlus: true,
  },
  {
    translationKey: 'benefits.recordVoice',
    appOnly: false,
    appPlus: true,
  },
  {
    translationKey: 'benefits.sleepTimer',
    appOnly: false,
    appPlus: true,
  },
  {
    translationKey: 'benefits.contentUpdates',
    appOnly: false,
    appPlus: true,
  },
] as const;

export function ComparisonTable() {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isTablet = Math.min(width, height) >= 600;

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={styles.featureCell} />

        <View style={styles.statusCell}>
          <Text
            style={[styles.headerText, isTablet && styles.tabletHeaderText]}
          >
            {t('benefits.appOnly')}
          </Text>
        </View>

        <View style={styles.statusCell}>
          <Text
            style={[styles.headerText, isTablet && styles.tabletHeaderText]}
          >
            {t('benefits.appPlus')}
          </Text>
        </View>
      </View>

      {features.map(feature => (
        <View key={feature.translationKey} style={[styles.row, styles.dataRow]}>
          <View style={styles.featureCell}>
            <Text
              style={[styles.featureText, isTablet && styles.tabletFeatureText]}
            >
              {t(feature.translationKey)}
            </Text>
          </View>

          <View style={styles.statusCell}>
            <StatusIcon available={feature.appOnly} />
          </View>

          <View style={styles.statusCell}>
            <StatusIcon available={feature.appPlus} />
          </View>
        </View>
      ))}
    </View>
  );
}

type StatusIconProps = {
  available: boolean;
};

function StatusIcon({ available }: StatusIconProps) {
  return (
    <View
      accessibilityLabel={
        available ? 'Feature available' : 'Feature unavailable'
      }
      style={[
        styles.statusIcon,
        available ? styles.availableIcon : styles.unavailableIcon,
      ]}
    >
      <Text style={styles.statusIconText}>{available ? '✓' : '×'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    overflow: 'hidden',

    borderRadius: 18,
    backgroundColor: colors.comparisonTable,

    shadowColor: colors.lovabiesButtonShadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    elevation: 7,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  headerRow: {
    minHeight: 72,
  },

  dataRow: {
    minHeight: 50,
    borderTopWidth: 1,
    borderTopColor: colors.comparisonLine,
  },

  featureCell: {
    flex: 1.75,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  statusCell: {
    flex: 0.72,
    alignItems: 'center',
    justifyContent: 'center',

    borderLeftWidth: 1,
    borderLeftColor: colors.comparisonLine,

    paddingHorizontal: 5,
    paddingVertical: 6,
  },

  headerText: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
    textAlign: 'center',
  },

  tabletHeaderText: {
    fontSize: 19,
    lineHeight: 22,
  },

  featureText: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },

  tabletFeatureText: {
    fontSize: 18,
    lineHeight: 23,
  },

  statusIcon: {
    width: 27,
    height: 27,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 999,
  },

  availableIcon: {
    backgroundColor: colors.comparisonGreen,
  },

  unavailableIcon: {
    backgroundColor: colors.comparisonRed,
  },

  statusIconText: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 21,
    textAlign: 'center',
  },
});
