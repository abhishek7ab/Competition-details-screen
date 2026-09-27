import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function PreviousWinners({ winners, onPlayVideo, language }) {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {language === 'hi' ? 'पूर्व विजेता' : 'Previous Winners'}
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
            activeOpacity={0.8}
          >
            {/* Thumbnail Image */}
            <View style={styles.imageWrapper}>
              <Image source={{ uri: winner.avatarUrl }} style={styles.image} />
              {/* Circular Play Badge Icon */}
              <View style={styles.playBadge}>
                <Ionicons name="play" size={11} color="#FFFFFF" style={{ marginLeft: 1 }} />
              </View>
            </View>

            {/* Winner Info */}
            <View style={styles.infoWrapper}>
              <Text style={styles.name} numberOfLines={1}>
                {winner.name}
              </Text>
              <Text style={styles.rankTitle} numberOfLines={1}>
                {winner.rankTitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    paddingLeft: 2,
  },
  scrollContent: {
    gap: 10,
    paddingRight: 10,
  },
  winnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: 175,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  imageWrapper: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F5F9',
  },
  playBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A7075',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    gap: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  rankTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A7075',
  },
});

