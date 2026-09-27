import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function ProfileScreen({ activeUser, users, onSelectUser, onShowToast, onGoToContest, language }) {
  const isPooja = activeUser?.name === 'Pooja Sharma';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Profile Header Card */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: activeUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{activeUser?.name || 'Artist'}</Text>
            <Ionicons name="checkmark-circle" size={16} color={THEME.colors.primary} />
          </View>
          <Text style={styles.email}>{activeUser?.email || 'user@feedants.com'}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{isPooja ? 'Registered Performer' : 'Participant'}</Text>
          </View>
        </View>
      </View>

      {/* Stats Counter */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{isPooja ? '1' : '0'}</Text>
          <Text style={styles.statLabel}>Contests Joined</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{isPooja ? '1' : '0'}</Text>
          <Text style={styles.statLabel}>Submissions</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: THEME.colors.gold }]}>₹250</Text>
          <Text style={styles.statLabel}>Wallet Balance</Text>
        </View>
      </View>

      {/* Active Registrations Card */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {language === 'hi' ? '🎟️ मेरी प्रतियोगिताएं' : '🎟️ MY ACTIVE ENTRIES'}
        </Text>
      </View>

      {isPooja ? (
        <TouchableOpacity style={styles.entryCard} onPress={onGoToContest} activeOpacity={0.85}>
          <View style={styles.entryTop}>
            <Text style={styles.entryBadge}>Kathak Dance</Text>
            <Text style={styles.entryStatus}>Spot Reserved ✓</Text>
          </View>
          <Text style={styles.entryTitle}>Feedants Classical Dance Championship</Text>
          <Text style={styles.entrySub}>Jury: Manju Dubey • Deadline: 10 Aug</Text>
          <View style={styles.entryActionRow}>
            <Text style={styles.entryOpenLink}>Open Entry & Upload Video →</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="ticket-outline" size={28} color={THEME.colors.textMuted} />
          <Text style={styles.emptyText}>No registered competitions yet.</Text>
          <TouchableOpacity style={styles.browseNowBtn} onPress={onGoToContest} activeOpacity={0.8}>
            <Text style={styles.browseNowText}>Register for Classical Dance</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings / Options List */}
      <View style={styles.optionsList}>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => onShowToast('Referral code copied!')}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="gift-outline" size={18} color={THEME.colors.primary} />
            <Text style={styles.optionTitle}>Referral Program (Code: {activeUser?.referralCode || 'feed123'})</Text>
          </View>
          <Feather name="chevron-right" size={18} color={THEME.colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => onShowToast('Refund guarantee backed by Razorpay.')}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="shield-checkmark-outline" size={18} color={THEME.colors.primary} />
            <Text style={styles.optionTitle}>Security & Refund Policy</Text>
          </View>
          <Feather name="chevron-right" size={18} color={THEME.colors.textMuted} />
        </TouchableOpacity>
      </View>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    padding: 18,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  email: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  roleText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  sectionHeader: {
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statNum: {
    fontSize: 18,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: THEME.colors.border,
  },
  entryCard: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    gap: 6,
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryBadge: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
    backgroundColor: THEME.colors.primaryBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  entryStatus: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  entryTitle: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  entrySub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  entryActionRow: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: 8,
    marginTop: 4,
  },
  entryOpenLink: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  emptyCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  emptyText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  browseNowBtn: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
    marginTop: 4,
  },
  browseNowText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.bg,
  },
  optionsList: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.medium,
    color: THEME.colors.textPrimary,
  },
});
