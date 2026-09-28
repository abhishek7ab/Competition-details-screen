import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function ProfileScreen({
  activeUser,
  onShowToast,
  onGoToContest,
  language,
  isDarkMode = false,
  isDesktop = false,
}) {
  const colors = getThemeColors(isDarkMode);
  const isPooja = activeUser?.name === 'Pooja Sharma';

  const handleWalletPress = () => {
    Alert.alert(
      'Feedants Artist Wallet',
      'Balance: ₹250\n\nYour winnings from past competitions are held in escrow and can be withdrawn directly to UPI at any time with 0% processing fee.'
    );
  };

  const handleSecurityPolicyPress = () => {
    Alert.alert(
      'Security & Refund Guarantee',
      'Feedants guarantees 100% refund on cancelled contests via Razorpay. All user submissions and judging scorecards are recorded securely.'
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header Card */}
      <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Image
          source={{
            uri: activeUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
          }}
          style={[styles.avatar, { borderColor: colors.primary }]}
        />
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.textPrimary }]}>{activeUser?.name || 'Artist'}</Text>
            <Icon name="checkmark-circle" size={16} color={colors.primary} />
          </View>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {activeUser?.email || 'user@feedants.com'}
          </Text>
          <View
            style={[
              styles.roleBadge,
              { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' },
            ]}
          >
            <Text style={[styles.roleText, { color: colors.primary }]}>
              {isPooja ? 'Registered Performer' : 'Participant'}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Counter */}
      <View style={[styles.statsRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.textPrimary }]}>{isPooja ? '1' : '0'}</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Contests Joined</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.textPrimary }]}>{isPooja ? '1' : '0'}</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Submissions</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <TouchableOpacity style={styles.statBox} onPress={handleWalletPress} activeOpacity={0.7}>
          <Text style={[styles.statNum, { color: colors.gold }]}>₹250</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Wallet Balance</Text>
        </TouchableOpacity>
      </View>

      {/* Active Registrations Card */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          {language === 'hi' ? '🎟️ मेरी प्रतियोगिताएं' : '🎟️ MY ACTIVE ENTRIES'}
        </Text>
      </View>

      {isPooja ? (
        <TouchableOpacity
          style={[
            styles.entryCard,
            {
              backgroundColor: colors.surface,
              borderColor: isDarkMode ? '#14B8A6' : '#0A7075',
            },
          ]}
          onPress={onGoToContest}
          activeOpacity={0.85}
        >
          <View style={styles.entryTop}>
            <Text
              style={[
                styles.entryBadge,
                { color: colors.primary, backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' },
              ]}
            >
              Kathak Dance
            </Text>
            <Text style={[styles.entryStatus, { color: colors.primary }]}>Spot Reserved ✓</Text>
          </View>
          <Text style={[styles.entryTitle, { color: colors.textPrimary }]}>
            Feedants Classical Dance Championship
          </Text>
          <Text style={[styles.entrySub, { color: colors.textSecondary }]}>
            Jury: Manju Dubey • Deadline: 10 Aug
          </Text>
          <View style={[styles.entryActionRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.entryOpenLink, { color: colors.primary }]}>
              Open Entry & Upload Video →
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={[styles.emptyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Icon name="ticket-outline" size={28} color={colors.textMuted} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No registered competitions yet.</Text>
          <TouchableOpacity
            style={[styles.browseNowBtn, { backgroundColor: colors.primary }]}
            onPress={onGoToContest}
            activeOpacity={0.8}
          >
            <Text style={styles.browseNowText}>Register for Classical Dance</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings / Options List */}
      <View style={[styles.optionsList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.optionRow, { borderBottomColor: colors.border }]}
          onPress={() => onShowToast && onShowToast('Referral code copied!')}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Icon name="gift-outline" size={18} color={colors.primary} />
            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>
              Referral Program (Code: {activeUser?.referralCode || 'feed123'})
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionRow, { borderBottomColor: colors.border }]}
          onPress={handleSecurityPolicyPress}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Icon name="shield-checkmark-outline" size={18} color={colors.primary} />
            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>Security & Refund Policy</Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
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
    fontWeight: '800',
  },
  email: {
    fontSize: 12,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statNum: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
  },
  statDivider: {
    width: 1,
  },
  entryCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  entryStatus: {
    fontSize: 11,
    fontWeight: '700',
  },
  entryTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  entrySub: {
    fontSize: 11,
  },
  entryActionRow: {
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 4,
  },
  entryOpenLink: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
  },
  emptyText: {
    fontSize: 12,
  },
  browseNowBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  browseNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  optionsList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
});
