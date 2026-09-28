import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function BrowseScreen({ onGoToContest, language, isDarkMode = false, initialCategory = 'All' }) {
  const colors = getThemeColors(isDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = ['All', 'Dance', 'Music', 'Fine Arts', 'Drama'];

  const contests = [
    {
      id: 'current',
      title: 'Feedants Classical Dance Championship',
      category: 'Dance',
      judge: 'Manju Dubey (Kathak)',
      prize: '₹1,500',
      fee: '₹99',
      status: 'Open for Registration',
      statusColor: colors.primary,
      icon: 'sparkles',
    },
    {
      id: '2',
      title: 'National Bharatanatyam Solo 2026',
      category: 'Dance',
      judge: 'Dr. Padmashree Iyer',
      prize: '₹5,000',
      fee: '₹199',
      status: 'Submissions Open',
      statusColor: '#D97706',
      icon: 'flame',
    },
    {
      id: '3',
      title: 'Sufi & Ghazal Online Vocal Cup',
      category: 'Music',
      judge: 'Ustad Tariq Khan',
      prize: '₹2,500',
      fee: '₹120',
      status: 'Closes in 2 Days',
      statusColor: '#DC2626',
      icon: 'stopwatch-outline',
    },
    {
      id: '4',
      title: 'Contemporary Watercolor Expression',
      category: 'Fine Arts',
      judge: 'Ananya Sen',
      prize: '₹3,000',
      fee: '₹80',
      status: 'Open for Registration',
      statusColor: colors.primary,
      icon: 'sparkles',
    },
  ];

  const filteredContests = contests.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.judge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Search Input Bar */}
      <View
        style={[
          styles.searchWrap,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Icon name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Search competitions, dances, judges..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
            <Icon name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catPillsRow}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catPill,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.catPillText,
                  { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                  isSelected && { fontWeight: '700' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Contests List */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
          Showing {filteredContests.length} {filteredContests.length === 1 ? 'Contest' : 'Contests'}
        </Text>

        {filteredContests.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onGoToContest}
            activeOpacity={0.85}
          >
            <View style={styles.cardTop}>
              <View style={[styles.cardCategoryBadge, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
                <Text style={[styles.cardCategoryText, { color: colors.primary }]}>{item.category}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
                <Icon name={item.icon} size={12} color={item.statusColor} />
                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
              </View>
            </View>

            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.cardJudge, { color: colors.textSecondary }]}>Jury: {item.judge}</Text>

            <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
              <View>
                <Text style={[styles.footerLabel, { color: colors.textMuted }]}>Prize Pool</Text>
                <Text style={[styles.footerPrize, { color: colors.primary }]}>{item.prize}</Text>
              </View>
              <TouchableOpacity
                style={[styles.viewContestBtn, { backgroundColor: colors.primary }]}
                onPress={onGoToContest}
                activeOpacity={0.8}
              >
                <Text style={styles.viewContestText}>Open Contest →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  catPillsRow: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 10,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  catPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 4,
    paddingBottom: 32,
    gap: 12,
  },
  resultsCount: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', cursor: 'pointer' },
    }),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardCategoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardCategoryText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardJudge: {
    fontSize: 12,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  footerLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  footerPrize: {
    fontSize: 16,
    fontWeight: '800',
  },
  viewContestBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  viewContestText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
