import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function JudgeCard({ judge, onPlayVideo, language }) {
  if (!judge) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>
        {language === 'hi' ? '👨‍⚖️ निर्णायक' : '👨‍⚖️ JUDGE'}
      </Text>
      <View style={styles.card}>
        {/* Left: Avatar with teal ring */}
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: judge.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' }}
            style={styles.avatar}
          />
          <View style={styles.verifiedDot}>
            <Ionicons name="checkmark-circle" size={16} color={THEME.colors.primary} />
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bio}>
          <Text style={styles.judgeName}>{judge.name || 'Manju Dubey'}</Text>
          <Text style={styles.judgeRole}>{judge.role || 'Professional Kathak Dancer'}</Text>
          <View style={styles.expRow}>
            <Ionicons name="star" size={11} color={THEME.colors.gold} />
            <Text style={styles.judgeExp}>{judge.experience || '12+ Years Experience'}</Text>
          </View>
        </View>

        {/* Intro Video Button */}
        <TouchableOpacity
          style={styles.videoBtn}
          onPress={() => onPlayVideo(judge.introVideoUrl || '', judge.name)}
          activeOpacity={0.8}
        >
          <View style={styles.playCircle}>
            <Ionicons name="play" size={14} color={THEME.colors.bg} style={{ marginLeft: 2 }} />
          </View>
          <Text style={styles.videoLabel}>
            {language === 'hi' ? 'वीडियो' : 'Intro'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
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
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 14,
    ...Platform.select({
      web: { boxShadow: '0 2px 12px rgba(0,0,0,0.4)' },
    }),
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: THEME.colors.primaryBorder,
  },
  verifiedDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: THEME.colors.surface,
    borderRadius: 10,
  },
  bio: {
    flex: 1,
    gap: 2,
  },
  judgeName: {
    fontSize: 15,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  judgeRole: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  expRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  judgeExp: {
    fontSize: 11,
    color: THEME.colors.gold,
    fontWeight: THEME.typography.weights.semibold,
  },
  videoBtn: {
    alignItems: 'center',
    gap: 5,
  },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: `0 0 14px ${THEME.colors.primaryGlow}` },
    }),
  },
  videoLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
});
