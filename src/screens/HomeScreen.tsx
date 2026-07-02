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
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

const featuredImage = require('../assets/images/Img1.png');

export function HomeScreen(_: Props) {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  /*
   * Do not use Math.min(width, height) here.
   * In tablet landscape, the height can be small and incorrectly
   * activate the mobile layout.
   */
  const isTablet = width >= 600;
  const isShortTablet = isTablet && height < 600;

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
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor={colors.lovabiesPurple}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.page,
            isTablet ? styles.tabletPage : styles.mobilePage,
            isShortTablet && styles.shortTabletPage,
          ]}
        >
          <View style={styles.header}>
            <View
              style={[styles.avatar, isShortTablet && styles.shortTabletAvatar]}
            >
              <Text
                style={[
                  styles.avatarText,
                  isShortTablet && styles.shortTabletAvatarText,
                ]}
              >
                🧸
              </Text>
            </View>

            <View style={styles.headerText}>
              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                numberOfLines={1}
                style={[
                  styles.greeting,
                  isShortTablet && styles.shortTabletGreeting,
                ]}
              >
                {t('home.greeting')}
              </Text>

              <Text
                numberOfLines={1}
                style={[
                  styles.subtitle,
                  isShortTablet && styles.shortTabletSubtitle,
                ]}
              >
                {t('home.subtitle')}
              </Text>
            </View>
          </View>

          {isTablet ? (
            /*
             * Tablet featured section:
             *
             * ┌───────────────┬───────────────┐
             * │     Image     │ Text + button │
             * └───────────────┴───────────────┘
             */
            <View
              style={[
                styles.tabletFeaturedCard,
                isShortTablet && styles.shortTabletFeaturedCard,
              ]}
            >
              <View style={styles.tabletImageColumn}>
                <Image
                  accessibilityLabel="Cuffy and ZeeZee"
                  accessibilityIgnoresInvertColors
                  resizeMode="cover"
                  source={featuredImage}
                  style={styles.featuredImage}
                />
              </View>

              <View
                style={[
                  styles.tabletTextColumn,
                  isShortTablet && styles.shortTabletTextColumn,
                ]}
              >
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  numberOfLines={2}
                  style={[
                    styles.featuredTitle,
                    isShortTablet && styles.shortTabletFeaturedTitle,
                  ]}
                >
                  {t('home.featuredTitle')}
                </Text>

                <Text
                  numberOfLines={isShortTablet ? 3 : 4}
                  style={[
                    styles.featuredDescription,
                    isShortTablet && styles.shortTabletFeaturedDescription,
                  ]}
                >
                  {t('home.featuredDescription')}
                </Text>

                <LovabiesButton
                  label={t('home.play')}
                  onPress={() => {}}
                  style={[
                    styles.playButton,
                    isShortTablet && styles.shortTabletPlayButton,
                  ]}
                  labelStyle={[
                    styles.playButtonLabel,
                    isShortTablet && styles.shortTabletPlayButtonLabel,
                  ]}
                />
              </View>
            </View>
          ) : (
            /*
             * Mobile featured section:
             * image above the text.
             */
            <View style={styles.mobileFeaturedCard}>
              <View style={styles.mobileImageContainer}>
                <Image
                  accessibilityLabel="Cuffy and ZeeZee"
                  accessibilityIgnoresInvertColors
                  resizeMode="cover"
                  source={featuredImage}
                  style={styles.featuredImage}
                />
              </View>

              <View style={styles.mobileFeaturedContent}>
                <Text style={styles.featuredTitle}>
                  {t('home.featuredTitle')}
                </Text>

                <Text style={styles.featuredDescription}>
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
          )}

          <View
            style={[
              styles.sectionHeader,
              isShortTablet && styles.shortTabletSectionHeader,
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                isShortTablet && styles.shortTabletSectionTitle,
              ]}
            >
              {t('home.subtitle')}
            </Text>
          </View>

          <View style={styles.grid}>
            {features.map(feature => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={() => {}}
      style={({ pressed }) => [
        styles.featureCard,
        pressed && styles.featureCardPressed,
      ]}
    >
      <View style={styles.featureIconContainer}>
        <Text style={styles.featureIcon}>{icon}</Text>
      </View>

      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        numberOfLines={2}
        style={styles.featureTitle}
      >
        {title}
      </Text>

      <Text numberOfLines={3} style={styles.featureDescription}>
        {description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lovabiesPurple,
  },

  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lovabiesPurple,
  },

  scrollContent: {
    width: '100%',
    paddingBottom: 80,
    backgroundColor: colors.lovabiesPurple,
  },

  page: {
    width: '100%',
  },

  mobilePage: {
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  /*
   * No maxWidth on tablet.
   * This removes the large empty spaces on the left and right.
   */
  tabletPage: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  shortTabletPage: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 58,
    height: 58,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 29,

    backgroundColor: colors.lovabiesPanel,
  },

  shortTabletAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  avatarText: {
    fontSize: 31,
  },

  shortTabletAvatarText: {
    fontSize: 26,
  },

  headerText: {
    flex: 1,
    minWidth: 0,
    marginLeft: 16,
  },

  greeting: {
    color: colors.white,
    lineHeight: 31,
    fontFamily: 'DynaPuff',
    fontWeight: '700',
    fontSize: 28,
  },

  shortTabletGreeting: {
    fontSize: 22,
    lineHeight: 27,
  },

  subtitle: {
    marginTop: 4,

    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.9,
  },

  shortTabletSubtitle: {
    fontSize: 14,
    lineHeight: 19,
  },

  /*
   * MOBILE FEATURED CARD
   */

  mobileFeaturedCard: {
    width: '100%',
    overflow: 'hidden',

    marginTop: 26,

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

  mobileImageContainer: {
    width: '100%',
    aspectRatio: 1024 / 637,

    overflow: 'hidden',
    backgroundColor: colors.lovabiesButton,
  },

  mobileFeaturedContent: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  /*
   * TABLET FEATURED CARD
   *
   * Both columns use flexBasis: 50%, so they are exactly 1:1.
   */

  tabletFeaturedCard: {
    width: '100%',
    height: 280,

    flexDirection: 'row',
    alignItems: 'stretch',

    overflow: 'hidden',
    marginTop: 22,

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

  shortTabletFeaturedCard: {
    height: 220,
    marginTop: 16,
  },

  tabletImageColumn: {
    width: '50%',
    maxWidth: '50%',
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,

    height: '100%',
    overflow: 'hidden',

    backgroundColor: colors.lovabiesButton,
  },

  tabletTextColumn: {
    width: '50%',
    maxWidth: '50%',
    flexBasis: '50%',
    flexGrow: 0,
    flexShrink: 0,

    height: '100%',
    justifyContent: 'center',

    paddingHorizontal: 28,
    paddingVertical: 24,

    backgroundColor: colors.white,
  },

  shortTabletTextColumn: {
    paddingHorizontal: 22,
    paddingVertical: 18,
  },

  featuredImage: {
    width: '100%',
    height: '100%',
  },

  featuredTitle: {
    color: colors.lovabiesButton,
    fontFamily: 'sans-serif-rounded',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },

  shortTabletFeaturedTitle: {
    fontSize: 21,
    lineHeight: 26,
  },

  featuredDescription: {
    marginTop: 10,

    color: colors.mutedText,
    fontFamily: 'sans-serif-rounded',
    fontSize: 16,
    lineHeight: 23,
  },

  shortTabletFeaturedDescription: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 19,
  },

  playButton: {
    minHeight: 54,
    marginTop: 18,
  },

  shortTabletPlayButton: {
    minHeight: 46,
    marginTop: 12,
  },

  playButtonLabel: {
    fontSize: 18,
  },

  shortTabletPlayButtonLabel: {
    fontSize: 16,
  },

  sectionHeader: {
    marginTop: 32,
  },

  shortTabletSectionHeader: {
    marginTop: 22,
  },

  sectionTitle: {
    color: colors.white,
    fontFamily: 'sans-serif-rounded',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },

  shortTabletSectionTitle: {
    fontSize: 21,
    lineHeight: 26,
  },

  /*
   * FEATURE GRID
   *
   * Always exactly two cards per row.
   */

  grid: {
    width: '100%',

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    marginTop: 18,
    rowGap: 16,
  },

  featureCard: {
    width: '48.5%',
    minHeight: 150,

    borderRadius: 18,
    backgroundColor: colors.white,

    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,

    shadowColor: colors.lovabiesButtonShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5,

    elevation: 5,
  },

  featureCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  featureIconContainer: {
    width: 48,
    height: 48,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 14,
    backgroundColor: colors.primarySoft,
  },

  featureIcon: {
    fontSize: 26,
  },

  featureTitle: {
    marginTop: 12,

    color: colors.lovabiesButton,
    fontFamily: 'sans-serif-rounded',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },

  featureDescription: {
    marginTop: 6,

    color: colors.mutedText,
    fontFamily: 'sans-serif-rounded',
    fontSize: 13,
    lineHeight: 18,
  },
});
