import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { BackButton } from '../components/common/BackButton';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentalGate'>;

export function ParentalGateScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const [answer, setAnswer] = useState('');
  const [hasError, setHasError] = useState(false);

  const verifyAnswer = () => {
    if (Number(answer.trim()) === 7) {
      setHasError(false);
      navigation.replace('Home');
      return;
    }

    setHasError(true);
  };

  return (
    <ScreenContainer>
      <BackButton onPress={navigation.goBack} />

      <Text style={styles.title}>{t('parental.title')}</Text>

      <Text style={styles.subtitle}>{t('parental.subtitle')}</Text>

      <View style={styles.gateCard}>
        <Text style={styles.question}>{t('parental.question')}</Text>

        <TextInput
          accessibilityLabel={t('parental.placeholder')}
          keyboardType="number-pad"
          maxLength={3}
          onChangeText={value => {
            setAnswer(value);
            setHasError(false);
          }}
          onSubmitEditing={verifyAnswer}
          placeholder={t('parental.placeholder')}
          placeholderTextColor={colors.mutedText}
          returnKeyType="done"
          style={[styles.input, hasError && styles.errorInput]}
          value={answer}
        />

        {hasError ? (
          <Text style={styles.error}>{t('parental.error')}</Text>
        ) : null}
      </View>

      <PrimaryButton
        disabled={!answer.trim()}
        label={t('parental.continue')}
        onPress={verifyAnswer}
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

  gateCard: {
    marginVertical: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },

  question: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },

  input: {
    minHeight: 58,
    marginTop: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 20,
    textAlign: 'center',
  },

  errorInput: {
    borderColor: colors.danger,
  },

  error: {
    marginTop: spacing.sm,
    color: colors.danger,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
