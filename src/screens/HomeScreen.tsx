import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
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
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const featuredImage = require('../assets/images/Img1.png');

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  isTablet: boolean;
};

export function HomeScreen(_: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;

  const features = [
    {
      icon: '📖',
      title: t('home.stories'),
      description: t('home.storiesDescription'),
    },
    {
      icon: '🎵',
      title: t('home.songs'),
      description: t('home.songsDescription'),
    },
    {
      icon: '☀️',
      title: t('home.routines'),
      description: t('home.routinesDescription'),
    },
    {
      icon: '⚙️',
      title: t('home.parents'),
      description: t('home.parentsDescription'),
    },
  ];

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={styles.safeArea}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.lovabiesPurple}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.page, isTablet && styles.tabletPage]}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>🧸</Text>
            </View>

            <View style={styles.headerText}>
              <Text
                style={[styles.greeting, isTablet && styles.tabletGreeting]}
              >
                {t('home.greeting')}
              </Text>

              <Text
                style={[styles.subtitle, isTablet && styles.tabletSubtitle]}
              >
                {t('home.subtitle')}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.featuredCard,
              isLandscape && styles.landscapeFeaturedCard,
            ]}
          >
            <View
              style={[
                styles.featuredImageContainer,
                isLandscape && styles.landscapeFeaturedImageContainer,
              ]}
            >
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="cover"
                source={featuredImage}
                style={styles.featuredImage}
              />
            </View>

            <View
              style={[
                styles.featuredContent,
                isLandscape && styles.landscapeFeaturedContent,
              ]}
            >
              <Text
                style={[
                  styles.featuredTitle,
                  isTablet && styles.tabletFeaturedTitle,
                ]}
              >
                {t('home.featuredTitle')}
              </Text>

              <Text
                style={[
                  styles.featuredDescription,
                  isTablet && styles.tabletFeaturedDescription,
                ]}
              >
                {t('home.featuredDescription')}
              </Text>

              <LovabiesButton
                label={t('home.play')}
                onPress={() => {}}
                style={styles.playButton}
                labelStyle={styles.playButtonLabel}
              />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                isTablet && styles.tabletSectionTitle,
              ]}
            >
              {t('home.subtitle')}
            </Text>
          </View>

          <View style={[styles.grid, isTablet && styles.tabletGrid]}>
            {features.map(feature => (
              <FeatureCard
                key={feature.title}
                description={feature.description}
                icon={feature.icon}
                isTablet={isTablet}
                title={feature.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, title, description, isTablet }: FeatureCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={() => {}}
      style={({ pressed }) => [
        styles.featureCard,
        isTablet && styles.tabletFeatureCard,
        pressed && styles.featureCardPressed,
      ]}
    >
      <View
        style={[
          styles.featureIconContainer,
          isTablet && styles.tabletFeatureIconContainer,
        ]}
      >
        <Text
          style={[styles.featureIcon, isTablet && styles.tabletFeatureIcon]}
        >
          {icon}
        </Text>
      </View>

      <Text
        style={[styles.featureTitle, isTablet && styles.tabletFeatureTitle]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.featureDescription,
          isTablet && styles.tabletFeatureDescription,
        ]}
      >
        {description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lovabiesPurple,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.lovabiesPurple,
  },

  page: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',

    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  tabletPage: {
    maxWidth: 1100,
    paddingHorizontal: 48,
    paddingTop: 32,
    paddingBottom: 60,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 62,
    height: 62,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 31,

    backgroundColor: colors.lovabiesPanel,
  },

  avatarText: {
    fontSize: 34,
  },

  headerText: {
    flex: 1,
    marginLeft: 16,
  },

  greeting: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },

  tabletGreeting: {
    fontSize: 38,
    lineHeight: 46,
  },

  subtitle: {
    marginTop: 4,

    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.9,
  },

  tabletSubtitle: {
    fontSize: 21,
    lineHeight: 29,
  },

  featuredCard: {
    width: '100%',
    overflow: 'hidden',

    marginTop: 28,

    borderRadius: 22,
    backgroundColor: colors.white,

    shadowColor: colors.lovabiesButtonShadow,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    elevation: 8,
  },

  landscapeFeaturedCard: {
    flexDirection: 'row',
  },

  featuredImageContainer: {
    width: '100%',
    aspectRatio: 1024 / 637,

    overflow: 'hidden',
    backgroundColor: colors.lovabiesButton,
  },

  landscapeFeaturedImageContainer: {
    width: '52%',
    aspectRatio: undefined,
    minHeight: 280,
  },

  featuredImage: {
    width: '100%',
    height: '100%',
  },

  featuredContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  landscapeFeaturedContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },

  featuredTitle: {
    color: colors.lovabiesButton,
    fontFamily: 'sans-serif-rounded',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },

  tabletFeaturedTitle: {
    fontSize: 34,
    lineHeight: 41,
  },

  featuredDescription: {
    marginTop: 10,

    color: colors.mutedText,
    fontFamily: 'sans-serif-rounded',
    fontSize: 16,
    lineHeight: 23,
  },

  tabletFeaturedDescription: {
    fontSize: 21,
    lineHeight: 29,
  },

  playButton: {
    minHeight: 54,
    marginTop: 18,
  },

  playButtonLabel: {
    fontSize: 18,
  },

  sectionHeader: {
    marginTop: 34,
  },

  sectionTitle: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },

  tabletSectionTitle: {
    fontSize: 34,
    lineHeight: 42,
  },

  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    marginTop: 18,
    rowGap: 16,
  },

  tabletGrid: {
    rowGap: 24,
  },

  featureCard: {
    width: '48%',

    borderRadius: 18,
    backgroundColor: colors.white,

    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,

    shadowColor: colors.lovabiesButtonShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5,

    elevation: 5,
  },

  tabletFeatureCard: {
    width: '23.5%',
    minHeight: 230,
    padding: 22,
  },

  featureCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  featureIconContainer: {
    width: 52,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 15,
    backgroundColor: colors.primarySoft,
  },

  tabletFeatureIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 19,
  },

  featureIcon: {
    fontSize: 28,
  },

  tabletFeatureIcon: {
    fontSize: 38,
  },

  featureTitle: {
    marginTop: 14,

    color: colors.lovabiesButton,
    fontFamily: 'sans-serif-rounded',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },

  tabletFeatureTitle: {
    fontSize: 24,
    lineHeight: 30,
  },

  featureDescription: {
    marginTop: 7,

    color: colors.mutedText,
    fontFamily: 'sans-serif-rounded',
    fontSize: 13,
    lineHeight: 18,
  },

  tabletFeatureDescription: {
    fontSize: 17,
    lineHeight: 23,
  },
});
