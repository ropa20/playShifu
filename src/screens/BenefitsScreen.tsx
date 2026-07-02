import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { BackButton } from '../components/common/BackButton';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Benefits'>;

export function BenefitsScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const benefits = [
    t('benefits.item1'),
    t('benefits.item2'),
    t('benefits.item3'),
  ];

  return (
    <ScreenContainer>
      <BackButton onPress={navigation.goBack} />

      <Text style={styles.title}>{t('benefits.title')}</Text>

      <Text style={styles.subtitle}>{t('benefits.subtitle')}</Text>

      <View style={styles.benefitList}>
        {benefits.map(benefit => (
          <View key={benefit} style={styles.benefitCard}>
            <View style={styles.bullet}>
              <Text style={styles.check}>✓</Text>
            </View>

            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton
        label={t('benefits.continue')}
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
    lineHeight: 25,
    textAlign: 'center',
  },

  benefitList: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },

  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },

  bullet: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },

  check: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },

  benefitText: {
    flex: 1,
    marginLeft: spacing.md,
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
});
