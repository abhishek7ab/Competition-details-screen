import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';

export default function BottomBar({
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
  const isRegistrationFull = computed?.isRegistrationFull || spotsRemaining <= 0;

  let buttonTitle = '';
  let buttonSubtext = '';
  let isActionDisabled = false;
  let actionHandler = onRegisterPress;
  let isPrimary = true;

  if (hasSubmitted) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति देखें' : 'View Submission';
    buttonSubtext = language === 'hi' ? 'समीक्षाधीन' : 'Submitted & Under Review';
    actionHandler = onSubmitPress;
  } else if (isRegistered) {
    buttonTitle = language === 'hi' ? 'प्रस्तुति अपलोड करें' : 'Upload Submission';
    buttonSubtext = language === 'hi' ? 'पंजीकृत' : 'Registered';
    actionHandler = onSubmitPress;
  } else if (isRegistrationFull) {
    buttonTitle = language === 'hi' ? 'सभी स्थान भरे हुए हैं' : 'Registration Full';
    buttonSubtext = language === 'hi' ? 'पंजीकरण बंद' : 'Sold Out';
    isActionDisabled = true;
    isPrimary = false;
  } else if (currentState === 'REGISTRATION_CLOSED') {
    buttonTitle = language === 'hi' ? 'पंजीकरण बंद' : 'Registration Closed';
    buttonSubtext = language === 'hi' ? 'समय सीमा समाप्त' : 'Deadline has passed';
    isActionDisabled = true;
    isPrimary = false;
  } else {
    buttonTitle = language === 'hi' ? 'अभी पंजीकरण करें' : 'Register Now';
    buttonSubtext =
      spotsRemaining > 0
        ? language === 'hi'
          ? `₹${competition?.entryFee || 99} • केवल ${spotsRemaining} स्थान शेष`
          : `₹${competition?.entryFee || 99} • ${spotsRemaining} spots left`
        : `₹${competition?.entryFee || 99}`;
    actionHandler = onRegisterPress;
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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isPrimary ? colors.primary : isDarkMode ? '#334155' : '#E2E8F0' },
        ]}
        onPress={isActionDisabled ? handleDisabledPress : actionHandler}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.buttonTitle,
                !isPrimary && { color: colors.textMuted },
              ]}
            >
              {buttonTitle}
            </Text>
            {buttonSubtext ? (
              <Text
                style={[
                  styles.buttonSubtext,
                  !isPrimary && { color: colors.textMuted },
                ]}
              >
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
    borderTopWidth: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    width: '100%',
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  button: {
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    gap: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  buttonSubtext: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
  },
});
