import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function DesktopActionCard({
  competition,
  computed,
  onRegisterPress,
  onSubmitPress,
  onShowInfo,
  loading,
  language,
  isDarkMode = false,
}) {
  const colors = getThemeColors(isDarkMode);
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
    buttonSubtext = language === 'hi' ? 'समीक्षाधीन' : 'Entry Submitted & Under Review';
    actionHandler = onSubmitPress;
    buttonVariant = 'success';
    buttonIcon = 'checkmark-circle';
  } else if (isRegistered) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति अपलोड करें' : 'Upload Dance Submission';
    buttonSubtext = language === 'hi' ? 'आप पंजीकृत हैं' : 'Spot Reserved! Ready for submission';
    actionHandler = onSubmitPress;
    buttonVariant = 'primary';
    buttonIcon = 'upload';
  } else if (isRegistrationFull) {
    buttonTitle = language === 'hi' ? 'सभी स्थान भरे हुए हैं' : 'Registration Full (Sold Out)';
    buttonSubtext = language === 'hi' ? 'पंजीकरण बंद' : 'All 20/20 seats booked';
    isActionDisabled = true;
    buttonVariant = 'disabled';
    buttonIcon = 'lock-closed';
  } else if (currentState === 'REGISTRATION_CLOSED') {
    buttonTitle = language === 'hi' ? 'पंजीकरण बंद' : 'Registration Closed';
    buttonSubtext = language === 'hi' ? 'समय सीमा समाप्त' : 'Deadline has passed';
    isActionDisabled = true;
    buttonVariant = 'disabled';
    buttonIcon = 'stopwatch-outline';
  } else {
    buttonTitle =
      language === 'hi'
        ? `अभी पंजीकरण करें • ₹${competition?.entryFee || 99}`
        : `REGISTER NOW • ₹${competition?.entryFee || 99}`;
    buttonSubtext =
      spotsRemaining > 0
        ? language === 'hi'
          ? `केवल ${spotsRemaining} स्थान शेष हैं`
          : `Fast Filling • Only ${spotsRemaining} spots left`
        : '';
    actionHandler = onRegisterPress;
    buttonIcon = 'flash';
  }

  const handleDisabledPress = () => {
    if (onShowInfo) {
      if (isRegistrationFull) {
        onShowInfo(
          'Registration Full',
          'All available spots for this competition have been filled. You can test open states or switch personas using the Evaluator Dev Tools (hardware chip icon in header).',
          'lock-closed-outline'
        );
      } else {
        onShowInfo(
          'Registration Closed',
          'The deadline for registration has passed. You can use the Evaluator Dev Tools (hardware chip icon in header) to test REGISTRATION_OPEN or reset the demo.',
          'stopwatch-outline'
        );
      }
    }
  };

  const handleTrustPress = (type) => {
    if (!onShowInfo) return;
    if (type === 'razorpay') {
      onShowInfo(
        'Razorpay 256-Bit SSL',
        'All payment transactions are encrypted with PCI-DSS Level 1 compliance. Safe and immediate spot confirmation.',
        'lock-closed'
      );
    } else if (type === 'upi') {
      onShowInfo(
        'Instant UPI Disbursal',
        'Prizes and registration fees support all major UPI applications including Google Pay, PhonePe, Paytm, and BHIM.',
        'flash'
      );
    } else if (type === 'refund') {
      onShowInfo(
        '100% Refund Guarantee',
        'If the competition is cancelled or rescheduled by Feedants, full entry fee refund is processed within 24 hours.',
        'shield-checkmark'
      );
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Top Header Badge */}
      <View style={styles.topBadgeRow}>
        <View
          style={[
            styles.officialBadge,
            {
              backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6',
              borderColor: isDarkMode ? '#1A4D54' : '#B2E2E4',
            },
          ]}
        >
          <Icon name="sparkles" size={12} color={colors.primary} />
          <Text style={[styles.officialBadgeText, { color: colors.primary }]}>OFFICIAL REGISTRATION</Text>
        </View>
        <Text style={[styles.spotsCounterText, { color: colors.primary }]}>{spotsRemaining} Spots Left</Text>
      </View>

      {/* Pricing and Prize Row */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.entryFeeLabel, { color: colors.textMuted }]}>ENTRY FEE</Text>
          <View style={styles.priceRow}>
            <Text style={[styles.entryFeeValue, { color: colors.textPrimary }]}>₹{competition?.entryFee || 99}</Text>
            <Text style={[styles.perEntryText, { color: colors.textMuted }]}>/ performer</Text>
          </View>
        </View>
        <View style={styles.prizePoolBox}>
          <Text style={[styles.prizeLabel, { color: colors.textMuted }]}>CASH POOL</Text>
          <Text style={[styles.prizeValue, { color: colors.primary }]}>
            ₹{(competition?.prizePool || 2000).toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      {/* Progress Quota Track */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTopRow}>
          <Text style={[styles.progressLabel, { color: colors.textMuted }]}>Capacity Quota</Text>
          <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
            {bookedSpots}/{maxSpots} Booked ({Math.round(progressRatio * 100)}%)
          </Text>
        </View>
        <View style={[styles.track, { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }]}>
          <View
            style={[
              styles.fill,
              { width: `${progressRatio * 100}%`, backgroundColor: colors.primary },
              isRegistrationFull && { backgroundColor: colors.rose },
            ]}
          />
        </View>
      </View>

      {/* Primary Action CTA Button */}
      <TouchableOpacity
        style={[
          styles.actionBtn,
          { backgroundColor: colors.primary },
          buttonVariant === 'disabled' && [styles.btnDisabled, { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }],
        ]}
        onPress={isActionDisabled ? handleDisabledPress : actionHandler}
        disabled={loading}
        activeOpacity={0.85}
        accessibilityRole="button"
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.btnContent}>
            <View style={styles.btnTitleRow}>
              <Icon
                name={buttonIcon}
                size={18}
                color={buttonVariant === 'disabled' ? colors.textMuted : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.btnTitle,
                  buttonVariant === 'disabled' && { color: colors.textMuted },
                ]}
              >
                {buttonTitle}
              </Text>
            </View>
            {buttonSubtext ? (
              <Text
                style={[
                  styles.btnSubtext,
                  buttonVariant === 'disabled' && { color: colors.textMuted },
                ]}
              >
                {buttonSubtext}
              </Text>
            ) : null}
          </View>
        )}
      </TouchableOpacity>

      {/* Security & Trust Badges */}
      <View style={[styles.trustBadgesRow, { borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={styles.trustItem}
          onPress={() => handleTrustPress('razorpay')}
          activeOpacity={0.7}
        >
          <Icon name="lock-closed" size={12} color={colors.primary} />
          <Text style={[styles.trustText, { color: colors.textSecondary }]}>Razorpay 256-Bit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trustItem}
          onPress={() => handleTrustPress('upi')}
          activeOpacity={0.7}
        >
          <Icon name="flash" size={12} color={colors.gold} />
          <Text style={[styles.trustText, { color: colors.textSecondary }]}>Instant UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trustItem}
          onPress={() => handleTrustPress('refund')}
          activeOpacity={0.7}
        >
          <Icon name="shield-checkmark" size={12} color={colors.primary} />
          <Text style={[styles.trustText, { color: colors.textSecondary }]}>100% Refundable</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    gap: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  officialBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  spotsCounterText: {
    fontSize: 11,
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryFeeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  entryFeeValue: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  perEntryText: {
    fontSize: 11,
    fontWeight: '500',
  },
  prizePoolBox: {
    alignItems: 'flex-end',
  },
  prizeLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  prizeValue: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 2,
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
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 11,
    fontWeight: '700',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnContent: {
    alignItems: 'center',
    gap: 2,
  },
  btnTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  btnSubtext: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '500',
  },
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
