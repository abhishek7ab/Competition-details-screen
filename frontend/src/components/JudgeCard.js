import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function JudgeCard({ judge, onPlayVideo, language, isDarkMode = false }) {
  if (!judge) return null;
  const colors = getThemeColors(isDarkMode);

  const handleJudgePress = () => {
    Alert.alert(
      judge.name || 'Manju Dubey',
      `${judge.role} with ${judge.experience}. Head of classical dance jury panel for Feedants competitions. Watch the intro video to understand her judging criteria.`
    );
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TouchableOpacity
        style={styles.leftCol}
        onPress={handleJudgePress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Judge Profile"
      >
        <Image
          source={{
            uri:
              judge.avatarUrl ||
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
          }}
          style={styles.avatar}
        />
        <View style={styles.bio}>
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            {language === 'hi' ? 'निर्णायक' : 'Judge'}
          </Text>
          <Text style={[styles.judgeName, { color: colors.textPrimary }]}>{judge.name || 'Manju Dubey'}</Text>
          <Text style={[styles.judgeRole, { color: colors.textSecondary }]}>
            {judge.role || 'Professional Kathak Dancer'}
          </Text>
          <Text style={[styles.judgeExp, { color: colors.textMuted }]}>
            {judge.experience || '12+ Years of Experience'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.videoBtn}
        onPress={() => onPlayVideo(judge.introVideoUrl || '', judge.name)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Watch Intro Video"
      >
        <View style={[styles.playCircle, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
          <Icon name="play" size={16} color={colors.primary} style={{ marginLeft: 2 }} />
        </View>
        <Text style={[styles.videoLabel, { color: colors.primary }]}>
          {language === 'hi' ? 'परिचय वीडियो' : 'Intro Video'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
  },
  bio: {
    gap: 2,
    flex: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  judgeRole: {
    fontSize: 13,
    fontWeight: '500',
  },
  judgeExp: {
    fontSize: 12,
    fontWeight: '400',
  },
  videoBtn: {
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
