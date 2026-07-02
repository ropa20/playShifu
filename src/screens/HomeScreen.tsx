import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '../components/common/ScreenContainer';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen(_: Props) {
  const { t } = useTranslation();

  const cards = [
    {
      icon: '📖',
      title: t('home.stories'),
      description: t('home.storiesDescription'),
    },
    {
      icon: '☀️',
      title: t('home.routines'),
      description: t('home.routinesDescription'),
    },
    {
      icon: '🧸',
      title: t('home.toyProfile'),
      description: t('home.toyProfileDescription'),
    },
  ];

  return (
    <ScreenContainer backgroundColor={colors.primarySoft}>
      <Text style={styles.title}>{t('home.title')}</Text>

      <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

      <View style={styles.cards}>
        {cards.map(card => (
          <View key={card.title} style={styles.card}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{card.icon}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{card.title}</Text>

              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: spacing.sm,
    color: colors.mutedText,
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
  },

  cards: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },

  iconContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },

  icon: {
    fontSize: 32,
  },

  cardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  cardTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },

  cardDescription: {
    marginTop: spacing.xs,
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 21,
  },
});
