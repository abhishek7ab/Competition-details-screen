import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function BottomBar({
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
  const isRegistrationFull = computed?.isRegistrationFull || spotsRemaining <= 0;

  let buttonTitle = '';
  let buttonSubtext = '';
  let isActionDisabled = false;
  let actionHandler = onRegisterPress;
  let buttonVariant = 'primary'; // 'primary' | 'success' | 'disabled'
  let buttonIcon = 'flash';

  if (hasSubmitted) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति देखें' : 'View Your Submission';
    buttonSubtext = language === 'hi' ? 'समीक्षाधीन' : '✓ Submitted & Under Review';
    actionHandler = onSubmitPress;
    buttonVariant = 'success';
    buttonIcon = 'eye-outline';
  } else if (isRegistered) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति अपलोड करें' : 'Upload Submission';
    buttonSubtext = language === 'hi' ? 'आप पंजीकृत हैं' : '✓ You are registered!';
    actionHandler = onSubmitPress;
    buttonVariant = 'primary';
    buttonIcon = 'cloud-upload-outline';
  } else if (isRegistrationFull) {
    buttonTitle = language === 'hi' ? 'सभी स्थान भरे हुए हैं' : 'Sold Out';
    buttonSubtext = language === 'hi' ? 'पंजीकरण बंद' : 'All spots are booked';
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
        ? `अभी पंजीकरण करें  ₹${competition?.entryFee || 99}`
        : `Register Now  ₹${competition?.entryFee || 99}`;
    buttonSubtext =
      spotsRemaining > 0
        ? language === 'hi'
          ? `🔥 केवल ${spotsRemaining} स्थान शेष`
          : `🔥 Only ${spotsRemaining} spots left`
        : '';
    actionHandler = onRegisterPress;
    buttonIcon = 'flash';
  }

  const btnStyle = [
    styles.button,
    buttonVariant === 'success' && styles.buttonSuccess,
    buttonVariant === 'disabled' && styles.buttonDisabled,
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={btnStyle}
        onPress={actionHandler}
        disabled={isActionDisabled || loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#000" size="small" />
        ) : (
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Ionicons
                name={buttonIcon}
                size={16}
                color={buttonVariant === 'disabled' ? THEME.colors.textMuted : THEME.colors.bg}
              />
              <Text style={[styles.buttonTitle, buttonVariant === 'disabled' && styles.buttonTitleDisabled]}>
                {buttonTitle}
              </Text>
            </View>
            {buttonSubtext ? (
              <Text style={[styles.buttonSubtext, buttonVariant === 'disabled' && styles.buttonSubtextDisabled]}>
                {buttonSubtext}
              </Text>
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    ...Platform.select({
      web: { boxShadow: '0 -4px 20px rgba(0,0,0,0.5)' },
    }),
  },
  button: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: `0 0 20px ${THEME.colors.primaryGlow}` },
    }),
  },
  buttonSuccess: {
    backgroundColor: THEME.colors.violet,
    ...Platform.select({
      web: { boxShadow: '0 0 16px rgba(151,71,255,0.35)' },
    }),
  },
  buttonDisabled: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.bg,
    letterSpacing: 0.2,
  },
  buttonTitleDisabled: {
    color: THEME.colors.textMuted,
  },
  buttonSubtext: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.medium,
    color: 'rgba(8,12,20,0.7)',
  },
  buttonSubtextDisabled: {
    color: THEME.colors.textMuted,
  },
});
