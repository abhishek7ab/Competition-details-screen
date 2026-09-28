import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function HomeScreen({
  activeUser,
  competition,
  onGoToContest,
  onSelectCategory,
  language,
  isDarkMode = false,
}) {
  const colors = getThemeColors(isDarkMode);

  const categories = [
    { name: 'Classical Dance', categoryKey: 'Dance', icon: 'musical-notes', count: '12 Live' },
    { name: 'Vocal Music', categoryKey: 'Music', icon: 'mic', count: '8 Live' },
    { name: 'Fine Arts', categoryKey: 'Fine Arts', icon: 'color-palette', count: '15 Live' },
    { name: 'Drama & Theatre', categoryKey: 'Drama', icon: 'sparkles', count: '6 Live' },
  ];

  const featured = [
    {
      id: 'current',
      title: language === 'hi' ? 'फीडएंट्स क्लासिकल डांस' : 'Feedants Classical Dance',
      prize: '₹1,500',
      fee: '₹99',
      badge: 'Closes Soon',
      category: 'Dance',
    },
    {
      id: 'music-1',
      title: 'Hindustani Classical Vocal',
      prize: '₹3,000',
      fee: '₹149',
      badge: 'New',
      category: 'Music',
    },
    {
      id: 'art-1',
      title: 'Digital Folk Art Showcase',
      prize: '₹2,000',
      fee: '₹79',
      badge: '8 Spots Left',
      category: 'Fine Arts',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Banner */}
      <View style={[styles.welcomeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.welcomeTextCol}>
          <Text style={[styles.greeting, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'नमस्ते,' : 'Hello,'} {activeUser?.name || 'Artist'}
          </Text>
          <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>
            {language === 'hi'
              ? 'आज आपकी प्रतिभा का मंच तैयार है!'
              : 'Discover competitions, submit entries, and win cash rewards!'}
          </Text>
        </View>
        <Image
          source={{
            uri: activeUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
          }}
          style={[styles.avatar, { borderColor: colors.primary }]}
        />
      </View>

      {/* Hero Spotlight: Current Competition */}
      <View style={styles.sectionHeader}>
        <Icon name="trophy" size={17} color="#D97706" />
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {language === 'hi' ? 'विशेष प्रतियोगिता' : 'FEATURED SPOTLIGHT'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.spotlightCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={onGoToContest}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="View Competition Details"
      >
        <View style={styles.spotlightBadgeRow}>
          <View style={styles.liveTag}>
            <View style={styles.pulsingDot} />
            <Text style={styles.liveTagText}>LIVE NOW</Text>
          </View>
          <Text style={[styles.spotlightFee, { color: colors.primary }]}>
            Entry: ₹{competition?.entryFee || 99}
          </Text>
        </View>

        <Text style={[styles.spotlightTitle, { color: colors.textPrimary }]}>
          {language === 'hi' ? competition?.titleHindi || 'फीडएंट्स क्लासिकल डांस' : competition?.title || 'Feedants Classical Dance'}
        </Text>

        <Text style={[styles.spotlightSubtitle, { color: colors.textSecondary }]}>
          Judged by {competition?.judge?.name || 'Manju Dubey'} • {competition?.rewards?.length || 6} Winning Tiers
        </Text>

        <View style={[styles.spotlightBottomRow, { borderTopColor: colors.border }]}>
          <View>
            <Text style={[styles.spotlightPrizeLabel, { color: colors.textMuted }]}>Prize Pool</Text>
            <Text style={[styles.spotlightPrize, { color: colors.primary }]}>
              ₹{(competition?.prizePool || 1500).toLocaleString('en-IN')}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.enterBtn, { backgroundColor: colors.primary }]}
            onPress={onGoToContest}
            activeOpacity={0.8}
          >
            <Text style={styles.enterBtnText}>
              {language === 'hi' ? 'विवरण देखें →' : 'View Details →'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Icon name="grid" size={17} color={colors.textMuted} />
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {language === 'hi' ? 'श्रेणियां' : 'BROWSE CATEGORIES'}
        </Text>
      </View>

      <View style={styles.categoryGrid}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => onSelectCategory && onSelectCategory(cat.categoryKey)}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={cat.name}
          >
            <View style={[styles.catIconWrap, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
              <Icon name={cat.icon} size={22} color={colors.primary} />
            </View>
            <Text style={[styles.catName, { color: colors.textPrimary }]}>{cat.name}</Text>
            <Text style={[styles.catCount, { color: colors.primary }]}>{cat.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trending List */}
      <View style={styles.sectionHeader}>
        <Icon name="trending-up" size={17} color={colors.textMuted} />
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {language === 'hi' ? 'लोकप्रिय प्रतियोगिताएं' : 'TRENDING COMPETITIONS'}
        </Text>
      </View>

      {featured.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.trendingCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={() => {
            if (item.id === 'current') {
              onGoToContest();
            } else if (onSelectCategory) {
              onSelectCategory(item.category);
            }
          }}
          activeOpacity={0.8}
        >
          <View style={styles.trendingLeft}>
            <View style={[styles.badgePill, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
              <Text style={[styles.badgePillText, { color: colors.primary }]}>{item.badge}</Text>
            </View>
            <Text style={[styles.trendingTitle, { color: colors.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.trendingCategory, { color: colors.textSecondary }]}>
              {item.category} • Certified Jury
            </Text>
          </View>

          <View style={styles.trendingRight}>
            <Text style={[styles.trendingPrize, { color: colors.gold }]}>{item.prize}</Text>
            <Text style={[styles.trendingFee, { color: colors.textMuted }]}>Fee: {item.fee}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  welcomeTextCol: {
    flex: 1,
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '800',
  },
  subGreeting: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  spotlightCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', cursor: 'pointer' },
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
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  liveTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
    letterSpacing: 0.5,
  },
  spotlightFee: {
    fontSize: 11,
    fontWeight: '700',
  },
  spotlightTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  spotlightSubtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  spotlightBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  spotlightPrizeLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  spotlightPrize: {
    fontSize: 18,
    fontWeight: '800',
  },
  enterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  enterBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  catIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  catCount: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  trendingLeft: {
    flex: 1,
    gap: 3,
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgePillText: {
    fontSize: 9,
    fontWeight: '700',
  },
  trendingTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  trendingCategory: {
    fontSize: 11,
  },
  trendingRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  trendingPrize: {
    fontSize: 15,
    fontWeight: '800',
  },
  trendingFee: {
    fontSize: 10,
  },
});
