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
    buttonTitle = language === 'hi' ? 'प्रस्तुति अपलोड करें' : 'Upload Submission';
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
        : `Register for Contest • ₹${competition?.entryFee || 99}`;
    buttonSubtext =
      spotsRemaining > 0
        ? language === 'hi'
          ? `🔥 केवल ${spotsRemaining} स्थान शेष हैं`
          : `🔥 Fast Filling • Only ${spotsRemaining} seats remaining`
        : '';
    actionHandler = onRegisterPress;
    buttonIcon = 'flash';
  }

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.entryFeeLabel}>ENTRY FEE</Text>
          <Text style={styles.entryFeeValue}>₹{competition?.entryFee || 99}</Text>
        </View>
        <View style={styles.prizePoolBox}>
          <Text style={styles.prizeLabel}>TOTAL PRIZE</Text>
          <Text style={styles.prizeValue}>₹{(competition?.prizePool || 1500).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTopRow}>
          <Text style={styles.progressLabel}>Capacity Quota</Text>
          <Text style={styles.progressCount}>{bookedSpots}/{maxSpots} Booked</Text>
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

      {/* Action CTA Button */}
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
                size={17}
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

      <Text style={styles.guaranteeText}>
        🛡️ Instant confirmation & 100% refund guarantee
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    gap: 14,
    ...Platform.select({
      web: {
        boxShadow: `0 0 24px ${THEME.colors.primaryGlow}`,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  entryFeeLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    letterSpacing: 1,
  },
  entryFeeValue: {
    fontSize: 22,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
  },
  prizePoolBox: {
    alignItems: 'flex-end',
  },
  prizeLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    letterSpacing: 1,
  },
  prizeValue: {
    fontSize: 22,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.gold,
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
  },
  progressCount: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  track: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
    borderRadius: 4,
  },
  actionBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: `0 4px 18px ${THEME.colors.primaryGlow}` },
    }),
  },
  btnSuccess: {
    backgroundColor: THEME.colors.primary,
  },
  btnDisabled: {
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    boxShadow: 'none',
  },
  btnContent: {
    alignItems: 'center',
    gap: 3,
  },
  btnTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  btnTitle: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.bg,
    letterSpacing: 0.3,
  },
  btnTitleDisabled: {
    color: THEME.colors.textMuted,
  },
  btnSubtext: {
    fontSize: 11,
    color: 'rgba(8,12,20,0.85)',
    fontWeight: THEME.typography.weights.semibold,
  },
  btnSubtextDisabled: {
    color: THEME.colors.textMuted,
  },
  guaranteeText: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    textAlign: 'center',
  },
});
