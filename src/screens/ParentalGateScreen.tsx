import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { LovabiesButton } from '../components/common/LovabiesButton';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentalGate'>;

const CORRECT_ANSWER = 30;

export function ParentalGateScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isTablet = Math.min(width, height) >= 600;
  const isCompactHeight = height < 760;

  const [answer, setAnswer] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleNext = () => {
    if (Number(answer.trim()) === CORRECT_ANSWER) {
      setHasError(false);
      navigation.replace('Home');
      return;
    }

    setHasError(true);
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight: height,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.page,
              isTablet && styles.tabletPage,
              isCompactHeight && styles.compactPage,
            ]}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[styles.title, isCompactHeight && styles.compactTitle]}
            >
              {t('parental.title')}
            </Text>

            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={[
                styles.subtitle,
                isCompactHeight && styles.compactSubtitle,
              ]}
            >
              {t('parental.subtitle')}
            </Text>

            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                styles.equation,
                isCompactHeight && styles.compactEquation,
              ]}
            >
              {t('parental.question')}
            </Text>

            <View
              style={[
                styles.inputWrapper,
                isCompactHeight && styles.compactInputWrapper,
              ]}
            >
              <TextInput
                accessibilityLabel={t('parental.placeholder')}
                keyboardType="number-pad"
                maxLength={3}
                onChangeText={value => {
                  setAnswer(value);

                  if (hasError) {
                    setHasError(false);
                  }
                }}
                onSubmitEditing={handleNext}
                placeholder={t('parental.placeholder')}
                placeholderTextColor="#8E8E8E"
                returnKeyType="done"
                style={[
                  styles.input,
                  isTablet && styles.tabletInput,
                  isCompactHeight && styles.compactInput,
                  hasError && styles.inputError,
                ]}
                textAlignVertical="center"
                value={answer}
              />

              {hasError ? (
                <Text style={styles.errorText}>{t('parental.error')}</Text>
              ) : null}
            </View>

            <LovabiesButton
              label={t('parental.next')}
              onPress={handleNext}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lovabiesPurple,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.lovabiesPurple,
  },

  page: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',

    paddingHorizontal: 28,
    paddingVertical: 28,
  },

  /*
   * Tablet keeps the same mobile sizing.
   * Only the maximum content width changes slightly.
   */
  tabletPage: {
    maxWidth: 700,
    paddingHorizontal: 36,
  },

  compactPage: {
    paddingVertical: 16,
  },

  title: {
    color: colors.white,
    fontFamily: 'DynaPuff',
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 42,
  },

  compactTitle: {
    fontSize: 29,
    lineHeight: 35,
  },

  subtitle: {
    maxWidth: 480,
    marginTop: 24,

    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 28,
  },

  compactSubtitle: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 22,
  },

  equation: {
    marginTop: 36,
    marginLeft: 24,

    color: colors.yellow,
    fontFamily: 'sans-serif-rounded',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 48,
  },

  compactEquation: {
    marginTop: 22,
    fontSize: 34,
    lineHeight: 41,
  },

  inputWrapper: {
    width: '100%',
    marginTop: 30,
  },

  compactInputWrapper: {
    marginTop: 20,
  },

  /*
   * This is deliberately smaller than the old 170–230px box.
   * It still resembles the reference but allows the full page to fit.
   */
  input: {
    height: 120,
    width: '100%',

    borderRadius: 16,
    backgroundColor: colors.white,

    paddingHorizontal: 22,
    paddingVertical: 16,

    color: colors.text,
    fontFamily: 'sans-serif-rounded',
    fontSize: 22,

    shadowColor: colors.lovabiesButtonShadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,

    elevation: 6,
  },

  tabletInput: {
    height: 125,
  },

  compactInput: {
    height: 90,
    paddingVertical: 12,
    fontSize: 19,
  },

  inputError: {
    borderWidth: 2,
    borderColor: colors.danger,
  },

  errorText: {
    marginTop: 8,

    color: '#FFD9D6',
    fontFamily: 'sans-serif-rounded',
    fontSize: 14,
    fontWeight: '600',
  },

  nextButton: {
    minHeight: 66,
    marginTop: 34,
  },

  compactNextButton: {
    minHeight: 54,
    marginTop: 22,
  },

  nextButtonLabel: {
    fontSize: 22,
    fontWeight: '900',
    fontFamily: 'DynaPuff',
  },

  compactNextButtonLabel: {
    fontSize: 18,
  },
});
