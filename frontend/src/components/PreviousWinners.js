import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function PreviousWinners({ winners, onPlayVideo, language }) {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>
        {language === 'hi' ? '👑 पूर्व विजेता' : '👑 HALL OF FAME'}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {winners.map((winner, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.winnerCard}
            onPress={() => onPlayVideo(winner.videoUrl, `${winner.name} (${winner.rankTitle})`)}
            activeOpacity={0.85}
          >
            {/* Thumbnail Image */}
            <View style={styles.imageWrapper}>
              <Image source={{ uri: winner.avatarUrl }} style={styles.image} />
              {/* Play Badge Icon */}
              <View style={styles.playBadge}>
                <Ionicons name="play" size={12} color={THEME.colors.bg} style={{ marginLeft: 2 }} />
              </View>
            </View>

            {/* Winner Info */}
            <View style={styles.infoWrapper}>
              <Text style={styles.name} numberOfLines={1}>
                {winner.name}
              </Text>
              <View style={styles.rankRow}>
                <Ionicons name="trophy" size={11} color={THEME.colors.gold} />
                <Text style={styles.rankTitle} numberOfLines={1}>
                  {winner.rankTitle}
                </Text>
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
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: THEME.colors.bg,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  winnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    width: 195,
    ...Platform.select({
      web: { boxShadow: '0 2px 14px rgba(0,0,0,0.4)' },
    }),
  },
  imageWrapper: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: THEME.borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.surfaceElevated,
  },
  playBadge: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    gap: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rankTitle: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.gold,
  },
});
