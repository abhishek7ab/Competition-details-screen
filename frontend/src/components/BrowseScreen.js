import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function BrowseScreen({ onGoToContest, language }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      statusColor: THEME.colors.primary,
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
      statusColor: THEME.colors.amber,
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
      statusColor: THEME.colors.rose,
      icon: 'time',
    },
    {
      id: '4',
      title: 'Contemporary Watercolor Expression',
      category: 'Fine Arts',
      judge: 'Ananya Sen',
      prize: '₹3,000',
      fee: '₹80',
      status: 'Open for Registration',
      statusColor: THEME.colors.primary,
      icon: 'sparkles',
    },
  ];

  const filteredContests = contests.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.judge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <View style={styles.container}>
      {/* Search Input Bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={THEME.colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search competitions, dances, judges..."
          placeholderTextColor={THEME.colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={THEME.colors.textMuted} />
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
              style={[styles.catPill, isSelected && styles.catPillSelected]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.catPillText, isSelected && styles.catPillTextSelected]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Contests List */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsCount}>
          Showing {filteredContests.length} {filteredContests.length === 1 ? 'Contest' : 'Contests'}
        </Text>

        {filteredContests.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={onGoToContest}
            activeOpacity={0.85}
          >
            <View style={styles.cardTop}>
              <View style={styles.cardCategoryBadge}>
                <Text style={styles.cardCategoryText}>{item.category}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
                <Ionicons name={item.icon} size={11} color={item.statusColor} />
                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardJudge}>Jury: {item.judge}</Text>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.footerLabel}>Prize Pool</Text>
                <Text style={styles.footerPrize}>{item.prize}</Text>
              </View>
              <View style={styles.viewContestBtn}>
                <Text style={styles.viewContestText}>Open Contest →</Text>
              </View>
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
    backgroundColor: THEME.colors.bg,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
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
    color: THEME.colors.textPrimary,
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
    borderRadius: THEME.borderRadius.full,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  catPillSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  catPillText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.textSecondary,
  },
  catPillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  resultsCount: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' },
    }),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategoryBadge: {
    backgroundColor: THEME.colors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardCategoryText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  cardJudge: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: 10,
    marginTop: 4,
  },
  footerLabel: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
  },
  footerPrize: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.gold,
  },
  viewContestBtn: {
    backgroundColor: THEME.colors.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.sm,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  viewContestText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
});
