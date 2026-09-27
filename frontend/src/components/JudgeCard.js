import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function JudgeCard({ judge, onPlayVideo, language }) {
  if (!judge) return null;

  return (
    <View style={styles.card}>
      <View style={styles.leftCol}>
        <Image
          source={{
            uri:
              judge.avatarUrl ||
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
          }}
          style={styles.avatar}
        />
        <View style={styles.bio}>
          <Text style={styles.sectionLabel}>
            {language === 'hi' ? 'निर्णायक' : 'Judge'}
          </Text>
          <Text style={styles.judgeName}>{judge.name || 'Manju Dubey'}</Text>
          <Text style={styles.judgeRole}>
            {judge.role || 'Professional Kathak Dancer'}
          </Text>
          <Text style={styles.judgeExp}>
            {judge.experience || '12+ Years of Experience'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.videoBtn}
        onPress={() => onPlayVideo(judge.introVideoUrl || '', judge.name)}
        activeOpacity={0.7}
      >
        <View style={styles.playCircle}>
          <Ionicons name="play" size={16} color="#0A7075" style={{ marginLeft: 2 }} />
        </View>
        <Text style={styles.videoLabel}>
          {language === 'hi' ? 'परिचय वीडियो' : 'Intro Video'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#64748B',
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  judgeRole: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  judgeExp: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '400',
  },
  videoBtn: {
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0A7075',
  },
});


