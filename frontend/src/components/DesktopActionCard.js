import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function DesktopActionCard({
  competition,
  computed,
  onRegisterPress,
  onSubmitPress,
  loading,
  language,
}) {
  const isRegistered = computed?.userState?.isRegistered;
  const hasSubmitted = computed?.userState?.hasSubmitted;
  const currentState = computed?.currentState || 'REGISTRATION_OPEN';
  const spotsRemaining = computed?.spotsRemaining ?? 19;
  const bookedSpots = competition?.bookedSpots ?? 1;
  const maxSpots = competition?.maxSpots ?? 20;
  const progressRatio = Math.min(1, Math.max(0, bookedSpots / maxSpots));
  const isRegistrationFull = computed?.isRegistrationFull || spotsRemaining <= 0;

  let buttonTitle = '';
  let buttonSubtext = '';
  let isActionDisabled = false;
  let actionHandler = onRegisterPress;
  let buttonVariant = 'primary';
  let buttonIcon = 'flash';

  if (hasSubmitted) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति देखें' : 'View Your Submission';
    buttonSubtext = language === 'hi' ? 'समीक्षाधीन' : '✓ Entry Submitted & Under Review';
    actionHandler = onSubmitPress;
    buttonVariant = 'success';
    buttonIcon = 'eye-outline';
  } else if (isRegistered) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति अपलोड करें' : 'Upload Dance Submission';
    buttonSubtext = language === 'hi' ? 'आप पंजीकृत हैं' : '✓ Spot Reserved! Ready for submission';
    actionHandler = onSubmitPress;
    buttonVariant = 'primary';
    buttonIcon = 'cloud-upload-outline';
  } else if (isRegistrationFull) {
    buttonTitle = language === 'hi' ? 'सभी स्थान भरे हुए हैं' : 'Registration Full (Sold Out)';
    buttonSubtext = language === 'hi' ? 'पंजीकरण बंद' : 'All 20/20 seats booked';
    isActionDisabled = true;
    buttonVariant = 'disabled';
    buttonIcon = 'lock-closed-outline';
  } else if (currentState === 'REGISTRATION_CLOSED') {
    buttonTitle = language === 'hi' ? 'पंजीकरण बंद' : 'Registration Closed';
    buttonSubtext = language === 'hi' ? 'समय सीमा समाप्त' : 'Deadline has passed';
    isActionDisabled = true;
    buttonVariant = 'disabled';
    buttonIcon = 'time-outline';
  } else {
    buttonTitle =
      language === 'hi'
        ? `अभी पंजीकरण करें • ₹${competition?.entryFee || 99}`
        : `REGISTER NOW • ₹${competition?.entryFee || 99}`;
    buttonSubtext =
      spotsRemaining > 0
        ? language === 'hi'
          ? `🔥 केवल ${spotsRemaining} स्थान शेष हैं`
          : `🔥 Fast Filling • Only ${spotsRemaining} spots left`
        : '';
    actionHandler = onRegisterPress;
    buttonIcon = 'flash';
  }

  return (
    <View style={styles.card}>
      {/* Top Header Badge */}
      <View style={styles.topBadgeRow}>
        <View style={styles.officialBadge}>
          <Ionicons name="sparkles" size={12} color={THEME.colors.primary} />
          <Text style={styles.officialBadgeText}>OFFICIAL REGISTRATION</Text>
        </View>
        <Text style={styles.spotsCounterText}>{spotsRemaining} Spots Left</Text>
      </View>

      {/* Pricing and Prize Row */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.entryFeeLabel}>ENTRY FEE</Text>
          <View style={styles.priceRow}>
            <Text style={styles.entryFeeValue}>₹{competition?.entryFee || 99}</Text>
            <Text style={styles.perEntryText}>/ performer</Text>
          </View>
        </View>
        <View style={styles.prizePoolBox}>
          <Text style={styles.prizeLabel}>CASH POOL</Text>
          <Text style={styles.prizeValue}>₹{(competition?.prizePool || 1500).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {/* Progress Quota Track */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTopRow}>
          <Text style={styles.progressLabel}>Capacity Quota</Text>
          <Text style={styles.progressCount}>{bookedSpots}/{maxSpots} Booked ({Math.round(progressRatio * 100)}%)</Text>
        </View>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${progressRatio * 100}%` },
              isRegistrationFull && { backgroundColor: THEME.colors.rose },
            ]}
          />
        </View>
      </View>

      {/* Primary Action CTA Button */}
      <TouchableOpacity
        style={[
          styles.actionBtn,
          buttonVariant === 'success' && styles.btnSuccess,
          buttonVariant === 'disabled' && styles.btnDisabled,
        ]}
        onPress={actionHandler}
        disabled={isActionDisabled || loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color={THEME.colors.bg} size="small" />
        ) : (
          <View style={styles.btnContent}>
            <View style={styles.btnTitleRow}>
              <Ionicons
                name={buttonIcon}
                size={18}
                color={buttonVariant === 'disabled' ? THEME.colors.textMuted : THEME.colors.bg}
              />
              <Text
                style={[
                  styles.btnTitle,
                  buttonVariant === 'disabled' && styles.btnTitleDisabled,
                ]}
              >
                {buttonTitle}
              </Text>
            </View>
            {buttonSubtext ? (
              <Text
                style={[
                  styles.btnSubtext,
                  buttonVariant === 'disabled' && styles.btnSubtextDisabled,
                ]}
              >
                {buttonSubtext}
              </Text>
            ) : null}
          </View>
        )}
      </TouchableOpacity>

      {/* Security & Trust Badges */}
      <View style={styles.trustBadgesRow}>
        <View style={styles.trustItem}>
          <Ionicons name="lock-closed" size={12} color={THEME.colors.primary} />
          <Text style={styles.trustText}>Razorpay 256-Bit</Text>
        </View>
        <View style={styles.trustItem}>
          <Ionicons name="flash" size={12} color={THEME.colors.gold} />
          <Text style={styles.trustText}>Instant UPI Payout</Text>
        </View>
        <View style={styles.trustItem}>
          <Ionicons name="shield-checkmark" size={12} color={THEME.colors.primary} />
          <Text style={styles.trustText}>100% Refundable</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.xl,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 245, 184, 0.35)',
    gap: 16,
    ...Platform.select({
      web: {
        background:
          'linear-gradient(135deg, rgba(14, 21, 34, 0.95) 0%, rgba(21, 31, 50, 0.9) 100%)',
        boxShadow: '0 8px 32px rgba(0, 245, 184, 0.25)',
      },
    }),
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  officialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0, 245, 184, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 184, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  officialBadgeText: {
    fontSize: 9,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.primary,
    letterSpacing: 0.6,
  },
  spotsCounterText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.borderStrong,
  },
  entryFeeLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.textMuted,
    letterSpacing: 1,
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  entryFeeValue: {
    fontSize: 26,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
    letterSpacing: -0.5,
  },
  perEntryText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.medium,
  },
  prizePoolBox: {
    alignItems: 'flex-end',
  },
  prizeLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.gold,
    letterSpacing: 1,
    marginBottom: 2,
  },
  prizeValue: {
    fontSize: 26,
    fontWeight: THEME.typography.weights.black,
    color: '#FFE57F',
    letterSpacing: -0.5,
  },
  progressContainer: {
    gap: 6,
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.medium,
  },
  progressCount: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  track: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
    borderRadius: 4,
    ...Platform.select({
      web: {
        boxShadow: '0 0 10px rgba(0, 245, 184, 0.6)',
      },
    }),
  },
  actionBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 15,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 245, 184, 0.45)',
        cursor: 'pointer',
      },
    }),
  },
  btnSuccess: {
    backgroundColor: THEME.colors.primary,
  },
  btnDisabled: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    boxShadow: 'none',
  },
  btnContent: {
    alignItems: 'center',
    gap: 4,
  },
  btnTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnTitle: {
    fontSize: 15,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.bg,
    letterSpacing: 0.5,
  },
  btnTitleDisabled: {
    color: THEME.colors.textMuted,
  },
  btnSubtext: {
    fontSize: 11,
    color: 'rgba(8, 12, 20, 0.85)',
    fontWeight: THEME.typography.weights.bold,
  },
  btnSubtextDisabled: {
    color: THEME.colors.textMuted,
  },
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.semibold,
  },
});

