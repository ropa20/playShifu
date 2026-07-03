import React, { useCallback, useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { LovabiesButton } from '../components/common/LovabiesButton';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentalGate'>;

type MathChallenge = {
  question: string;
  answer: number;
};

type ErrorType = 'empty' | 'incorrect' | null;

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMathChallenge(): MathChallenge {
  const challengeType = getRandomNumber(1, 4);

  switch (challengeType) {
    case 1: {
      const firstNumber = getRandomNumber(3, 15);
      const secondNumber = getRandomNumber(2, 12);

      return {
        question: `${firstNumber} + ${secondNumber}`,
        answer: firstNumber + secondNumber,
      };
    }

    case 2: {
      /*
       * Generate subtraction without negative answers.
       */
      const answer = getRandomNumber(2, 15);
      const numberToSubtract = getRandomNumber(2, 10);
      const firstNumber = answer + numberToSubtract;

      return {
        question: `${firstNumber} − ${numberToSubtract}`,
        answer,
      };
    }

    case 3: {
      const firstNumber = getRandomNumber(2, 9);
      const secondNumber = getRandomNumber(2, 8);

      return {
        question: `${firstNumber} × ${secondNumber}`,
        answer: firstNumber * secondNumber,
      };
    }

    default: {
      const outsideNumber = getRandomNumber(2, 5);
      const firstInsideNumber = getRandomNumber(1, 4);
      const secondInsideNumber = getRandomNumber(1, 4);

      return {
        question:
          `${outsideNumber} × ` +
          `(${firstInsideNumber} + ${secondInsideNumber})`,
        answer: outsideNumber * (firstInsideNumber + secondInsideNumber),
      };
    }
  }
}

export function ParentalGateScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isTablet = Math.min(width, height) >= 600;
  const isCompactHeight = height < 760;

  const [challenge, setChallenge] = useState<MathChallenge>(() =>
    createMathChallenge(),
  );

  const [answer, setAnswer] = useState('');
  const [errorType, setErrorType] = useState<ErrorType>(null);

  /*
   * Generate a new equation every time this screen
   * becomes active.
   */
  useFocusEffect(
    useCallback(() => {
      setChallenge(createMathChallenge());
      setAnswer('');
      setErrorType(null);
    }, []),
  );

  const handleAnswerChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    setAnswer(numericValue);

    if (errorType !== null) {
      setErrorType(null);
    }
  };

  const handleNext = () => {
    const trimmedAnswer = answer.trim();

    if (!trimmedAnswer) {
      setErrorType('empty');
      return;
    }

    if (Number(trimmedAnswer) !== challenge.answer) {
      setErrorType('incorrect');
      return;
    }

    setErrorType(null);
    navigation.replace('Home');
  };

  const errorMessage =
    errorType === 'empty'
      ? t('parental.emptyError', {
          defaultValue: 'Please enter your answer.',
        })
      : errorType === 'incorrect'
      ? t('parental.incorrectError', {
          defaultValue: "Oops! That answer isn't right. Please try again.",
        })
      : null;

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
              minimumFontScale={0.8}
              numberOfLines={1}
              style={[styles.title, isCompactHeight && styles.compactTitle]}
            >
              {t('parental.title')}
            </Text>

            <Text
              style={[
                styles.subtitle,
                isCompactHeight && styles.compactSubtitle,
              ]}
            >
              {t('parental.subtitle')}
            </Text>

            <Text
              accessibilityLabel={`Equation: ${challenge.question}`}
              style={[
                styles.equation,
                isCompactHeight && styles.compactEquation,
              ]}
            >
              {challenge.question}
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
                onChangeText={handleAnswerChange}
                onSubmitEditing={handleNext}
                placeholder={t('parental.placeholder')}
                placeholderTextColor="#8E8E8E"
                returnKeyType="done"
                style={[
                  styles.input,
                  isTablet && styles.tabletInput,
                  isCompactHeight && styles.compactInput,
                  errorType !== null && styles.inputError,
                ]}
                textAlignVertical="center"
                value={answer}
              />

              {errorMessage ? (
                <Text accessibilityLiveRegion="polite" style={styles.errorText}>
                  {errorMessage}
                </Text>
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
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 44,
  },

  compactTitle: {
    fontSize: 29,
    lineHeight: 37,
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
    fontFamily: 'DynaPuff',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 52,
  },

  compactEquation: {
    marginTop: 22,
    fontSize: 34,
    lineHeight: 44,
  },

  inputWrapper: {
    width: '100%',
    marginTop: 30,
  },

  compactInputWrapper: {
    marginTop: 20,
  },

  input: {
    width: '100%',
    height: 120,

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
    borderWidth: 3,
    borderColor: colors.danger,
  },

  errorText: {
    marginTop: 10,

    color: '#FFD9D6',
    fontFamily: 'sans-serif-rounded',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },

  nextButton: {
    marginTop: 30,
  },

  compactNextButton: {
    marginTop: 22,
  },

  nextButtonLabel: {
    fontSize: 22,
  },

  compactNextButtonLabel: {
    fontSize: 18,
  },
});
