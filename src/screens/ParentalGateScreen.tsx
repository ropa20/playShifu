import React, { useState } from 'react';
import {
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
import { colors, spacing } from '../theme';

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

      <View
        style={[
          styles.page,
          isTablet && styles.tabletPage,
          isCompactHeight && styles.compactPage,
        ]}
      >
        <Text style={[styles.title, isTablet && styles.tabletTitle]}>
          {t('parental.title')}
        </Text>

        <Text
          style={[
            styles.subtitle,
            isTablet && styles.tabletSubtitle,
            isCompactHeight && styles.compactSubtitle,
          ]}
        >
          {t('parental.subtitle')}
        </Text>

        <Text style={[styles.equation, isTablet && styles.tabletEquation]}>
          {t('parental.question')}
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            accessibilityLabel={t('parental.placeholder')}
            keyboardType="number-pad"
            multiline
            numberOfLines={5}
            onChangeText={value => {
              setAnswer(value);
              if (hasError) {
                setHasError(false);
              }
            }}
            onSubmitEditing={handleNext}
            placeholder={t('parental.placeholder')}
            placeholderTextColor="#8E8E8E"
            style={[
              styles.input,
              isTablet && styles.tabletInput,
              hasError && styles.inputError,
            ]}
            textAlignVertical="top"
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
            isTablet && styles.tabletNextButton,
            isCompactHeight && styles.compactNextButton,
          ]}
          labelStyle={[
            styles.nextButtonLabel,
            isTablet && styles.tabletNextButtonLabel,
          ]}
        />

        <View style={styles.bottomSpacer} />
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
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 28,
  },

  tabletPage: {
    maxWidth: 920,
    paddingHorizontal: 48,
    paddingTop: 28,
  },

  compactPage: {
    paddingTop: 12,
    paddingBottom: 20,
  },

  screenLabel: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },

  tabletScreenLabel: {
    fontSize: 28,
    lineHeight: 34,
  },

  title: {
    marginTop: 42,
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
  },

  tabletTitle: {
    fontSize: 50,
    lineHeight: 58,
  },

  subtitle: {
    maxWidth: 420,
    marginTop: 28,
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 28,
  },

  compactSubtitle: {
    marginTop: 20,
    fontSize: 17,
    lineHeight: 24,
  },

  tabletSubtitle: {
    maxWidth: 620,
    fontSize: 28,
    lineHeight: 38,
  },

  equation: {
    marginTop: 40,
    marginLeft: 24,
    color: colors.yellow,
    fontFamily: 'sans-serif-rounded',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 48,
  },

  tabletEquation: {
    marginTop: 54,
    fontSize: 58,
    lineHeight: 68,
  },

  inputWrapper: {
    marginTop: 34,
  },

  input: {
    minHeight: 170,
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 20,
    color: colors.text,
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
    minHeight: 230,
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 24,
    fontSize: 28,
  },

  inputError: {
    borderWidth: 2,
    borderColor: colors.danger,
  },

  errorText: {
    marginTop: 10,
    color: '#FFD9D6',
    fontSize: 14,
    fontWeight: '600',
  },

  nextButton: {
    minHeight: 66,
    marginTop: 38,
  },

  compactNextButton: {
    marginTop: 28,
    minHeight: 60,
  },

  tabletNextButton: {
    minHeight: 82,
    marginTop: 48,
  },

  nextButtonLabel: {
    fontSize: 22,
    fontWeight: '900',
  },

  tabletNextButtonLabel: {
    fontSize: 30,
  },

  bottomSpacer: {
    flex: 1,
  },
});
