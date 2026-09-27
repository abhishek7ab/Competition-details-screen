import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function HomeScreen({ activeUser, competition, onGoToContest, onSelectCategory, language }) {
  const categories = [
    { name: 'Classical Dance', emoji: '💃', count: '12 Live' },
    { name: 'Vocal Music', emoji: '🎤', count: '8 Live' },
    { name: 'Fine Arts', emoji: '🎨', count: '15 Live' },
    { name: 'Instrumental', emoji: '🎻', count: '6 Live' },
  ];

  const featured = [
    {
      id: 'current',
      title: language === 'hi' ? 'फीडएंट्स क्लासिकल डांस' : 'Feedants Classical Dance',
      prize: '₹1,500',
      fee: '₹99',
      badge: '🔥 Closes Soon',
      category: 'Dance',
    },
    {
      id: 'music-1',
      title: 'Hindustani Classical Vocal',
      prize: '₹3,000',
      fee: '₹149',
      badge: '✨ New',
      category: 'Music',
    },
    {
      id: 'art-1',
      title: 'Digital Folk Art Showcase',
      prize: '₹2,000',
      fee: '₹79',
      badge: '🎯 8 Spots Left',
      category: 'Art',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeTextCol}>
          <Text style={styles.greeting}>
            {language === 'hi' ? 'नमस्ते,' : 'Hello,'} {activeUser?.name || 'Artist'} 👋
          </Text>
          <Text style={styles.subGreeting}>
            {language === 'hi'
              ? 'आज आपकी प्रतिभा का मंच तैयार है!'
              : 'Discover competitions, submit entries, and win cash rewards!'}
          </Text>
        </View>
        <Image
          source={{
            uri: activeUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          }}
          style={styles.avatar}
        />
      </View>

      {/* Hero Spotlight: Current Competition */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {language === 'hi' ? '🏆 विशेष प्रतियोगिता' : '🏆 FEATURED SPOTLIGHT'}
        </Text>
      </View>

      <TouchableOpacity style={styles.spotlightCard} onPress={onGoToContest} activeOpacity={0.85}>
        <View style={styles.spotlightBadgeRow}>
          <View style={styles.liveTag}>
            <View style={styles.pulsingDot} />
            <Text style={styles.liveTagText}>LIVE NOW</Text>
          </View>
          <Text style={styles.spotlightFee}>Entry: ₹{competition?.entryFee || 99}</Text>
        </View>

        <Text style={styles.spotlightTitle}>
          {language === 'hi' ? competition?.titleHindi || 'फीडएंट्स क्लासिकल डांस' : competition?.title || 'Feedants Classical Dance'}
        </Text>

        <Text style={styles.spotlightSubtitle}>
          Judged by {competition?.judge?.name || 'Manju Dubey'} • {competition?.rewards?.length || 6} Winning Tiers
        </Text>

        <View style={styles.spotlightBottomRow}>
          <View>
            <Text style={styles.spotlightPrizeLabel}>Prize Pool</Text>
            <Text style={styles.spotlightPrize}>₹{(competition?.prizePool || 1500).toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.enterBtn}>
            <Text style={styles.enterBtnText}>
              {language === 'hi' ? 'विवरण देखें →' : 'View Details →'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {language === 'hi' ? '🎨 श्रेणियां' : '🎨 BROWSE CATEGORIES'}
        </Text>
      </View>

      <View style={styles.categoryGrid}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.categoryCard}
            onPress={() => onSelectCategory && onSelectCategory(cat.name)}
            activeOpacity={0.8}
          >
            <Text style={styles.catEmoji}>{cat.emoji}</Text>
            <Text style={styles.catName}>{cat.name}</Text>
            <Text style={styles.catCount}>{cat.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trending List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {language === 'hi' ? '🔥 लोकप्रिय प्रतियोगिताएं' : '🔥 TRENDING COMPETITIONS'}
        </Text>
      </View>

      {featured.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.trendingCard}
          onPress={onGoToContest}
          activeOpacity={0.8}
        >
          <View style={styles.trendingLeft}>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>{item.badge}</Text>
            </View>
            <Text style={styles.trendingTitle}>{item.title}</Text>
            <Text style={styles.trendingCategory}>{item.category} • Certified Jury</Text>
          </View>

          <View style={styles.trendingRight}>
            <Text style={styles.trendingPrize}>{item.prize}</Text>
            <Text style={styles.trendingFee}>Fee: {item.fee}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 14,
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  welcomeTextCol: {
    flex: 1,
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
  },
  subGreeting: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  sectionHeader: {
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    letterSpacing: 1.5,
  },
  spotlightCard: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    ...Platform.select({
      web: { boxShadow: `0 0 24px ${THEME.colors.primaryGlow}` },
    }),
  },
  spotlightBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 77, 106, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.rose,
  },
  liveTagText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.rose,
    letterSpacing: 0.5,
  },
  spotlightFee: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  spotlightTitle: {
    fontSize: 17,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  spotlightSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginBottom: 16,
  },
  spotlightBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: 12,
  },
  spotlightPrizeLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
  },
  spotlightPrize: {
    fontSize: 18,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.gold,
  },
  enterBtn: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
  },
  enterBtnText: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.bg,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: THEME.colors.surface,
    padding: 14,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    gap: 4,
  },
  catEmoji: {
    fontSize: 24,
  },
  catName: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  catCount: {
    fontSize: 10,
    color: THEME.colors.primary,
    fontWeight: THEME.typography.weights.semibold,
  },
  trendingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  trendingLeft: {
    flex: 1,
    gap: 3,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.surfaceGlass,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgePillText: {
    fontSize: 9,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
  },
  trendingTitle: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  trendingCategory: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  trendingRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  trendingPrize: {
    fontSize: 15,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.gold,
  },
  trendingFee: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
});
