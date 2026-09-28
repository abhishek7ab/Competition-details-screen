import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function HeroCard({ competition, computed, language, isDarkMode = false, onShowInfo }) {
  const colors = getThemeColors(isDarkMode);
  const isRegistered = computed?.userState?.isRegistered;
  const spotsRemaining = computed?.spotsRemaining ?? 19;
  const bookedSpots = competition?.bookedSpots ?? 1;
  const maxSpots = competition?.maxSpots ?? 20;
  const progressRatio = Math.min(1, Math.max(0, bookedSpots / maxSpots));
  const isSoldOut = spotsRemaining <= 0;

  const title = language === 'hi' ? competition?.titleHindi : competition?.title;
  const badgeText = language === 'hi' ? competition?.badgeTextHindi : competition?.badgeText;

  const handleTagPress = (tag) => {
    const msg =
      tag === 'Multi-Win'
        ? 'Participants can submit multiple classical entries or win in multiple prize categories!'
        : `Category: ${tag}. Standard Feedants judging criteria applies. All choreography must be traditional classical.`;
    if (onShowInfo) {
      onShowInfo(tag, msg, 'pricetag-outline');
    } else {
      Alert.alert(tag, msg);
    }
  };

  const handleCertPress = () => {
    const msg =
      'All top 6 winners and participating finalists receive an official Feedants Certified Performer certificate signed by Judge Manju Dubey.';
    if (onShowInfo) {
      onShowInfo('Verified Certificate Guarantee', msg, 'trophy-outline');
    } else {
      Alert.alert('Verified Certificate Guarantee', msg);
    }
  };

  const handleRegisteredPress = () => {
    const msg =
      'You have an active spot reserved in this competition. You can upload your performance video submission anytime before the submission deadline!';
    if (onShowInfo) {
      onShowInfo('Registration Verified', msg, 'checkmark-circle');
    } else {
      Alert.alert('Registration Verified', msg);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Top Title & Registered Status Row */}
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
          {title || 'Feedants Classical Dance'}
        </Text>

        {isRegistered && (
          <TouchableOpacity
            style={[styles.registeredBadge, { backgroundColor: colors.primaryBg }]}
            activeOpacity={0.8}
            onPress={handleRegisteredPress}
          >
            <Icon name="checkmark-circle" size={15} color={colors.primary} />
            <Text style={[styles.registeredText, { color: colors.primary }]}>
              {language === 'hi' ? 'पंजीकृत' : 'Registered'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Tags & Certificate Guarantee */}
      <View style={styles.tagsRow}>
        <TouchableOpacity
          style={[styles.categoryPill, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}
          onPress={() => handleTagPress(competition?.category || 'Dance')}
          activeOpacity={0.7}
        >
          <Text style={[styles.categoryPillText, { color: colors.textSecondary }]}>
            {competition?.category || 'Dance'}
          </Text>
        </TouchableOpacity>

        {competition?.tags?.filter(t => t !== 'Dance').map((tag, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.categoryPill, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}
            onPress={() => handleTagPress(tag)}
            activeOpacity={0.7}
          >
            <Text style={[styles.categoryPillText, { color: colors.textSecondary }]}>{tag}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.certRow} onPress={handleCertPress} activeOpacity={0.7}>
          <Icon name="trophy-outline" size={14} color={colors.primary} />
          <Text style={[styles.certText, { color: colors.primary }]}>
            {badgeText || 'Winners get certificate'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Metrics Row: Prize Pool | Entry Fee | Spots Quota */}
      <View style={styles.metricsRow}>
        {/* 1. Prize Pool */}
        <View style={styles.metricBox}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
            {language === 'hi' ? 'पुरस्कार राशि' : 'Prize Pool'}
          </Text>
          <Text style={[styles.prizePoolText, { color: colors.primary }]}>
            ₹ {(competition?.prizePool || 2000).toLocaleString('en-IN')}
          </Text>
        </View>

        {/* 2. Entry Fee */}
        <View style={styles.metricBox}>
          <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
            {language === 'hi' ? 'प्रवेश शुल्क' : 'Entry Fee'}
          </Text>
          <Text style={[styles.entryFeeText, { color: colors.textPrimary }]}>
            ₹ {competition?.entryFee || 99}
          </Text>
        </View>

        {/* 3. Capacity & Progress */}
        <View style={styles.spotsBox}>
          <View style={styles.spotsTopRow}>
            <Icon name="people-outline" size={14} color={colors.primary} />
            <Text style={[styles.spotsLabel, { color: colors.primary }, isSoldOut && { color: colors.rose }]}>
              {isSoldOut
                ? (language === 'hi' ? 'हाउसफुल' : 'Sold out')
                : language === 'hi'
                ? `केवल ${spotsRemaining} स्थान शेष`
                : `Only ${spotsRemaining} spots left`}
            </Text>
          </View>

          <View style={[styles.progressTrack, { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressRatio * 100}%`, backgroundColor: colors.primary },
                isSoldOut && { backgroundColor: colors.rose },
              ]}
            />
          </View>

          <Text style={[styles.bookedText, { color: colors.textMuted }]}>
            {bookedSpots} / {maxSpots} {language === 'hi' ? 'बुक किए गए' : 'Booked'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)' },
    }),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    flex: 1,
    letterSpacing: -0.55,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  registeredText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  categoryPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  certRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 2,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  certText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 22,
    gap: 12,
  },
  metricBox: {
    gap: 2,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  prizePoolText: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  entryFeeText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  spotsBox: {
    gap: 4,
    minWidth: 120,
    alignItems: 'flex-end',
  },
  spotsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  spotsLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    width: 120,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  bookedText: {
    fontSize: 10,
    fontWeight: '500',
  },
});
