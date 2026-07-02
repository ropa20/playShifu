import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { BackButton } from '../components/common/BackButton';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <BackButton onPress={navigation.goBack} />

      <View style={styles.content}>
        <Text style={styles.title}>{t('welcome.title')}</Text>

        <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>

        <View style={styles.actions}>
          <PrimaryButton
            label={t('welcome.yes')}
            onPress={() => navigation.navigate('PlushSelection')}
          />

          <PrimaryButton
            label={t('welcome.no')}
            variant="secondary"
            onPress={() => navigation.navigate('Benefits')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: spacing.md,
    color: colors.mutedText,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },

  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});
