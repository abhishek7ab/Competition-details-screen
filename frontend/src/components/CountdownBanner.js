import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, getThemeColors } from '../constants/theme';

export default function CountdownBanner({ targetDate, language, isDarkMode = false }) {
  const colors = getThemeColors(isDarkMode);
  const [timeLeft, setTimeLeft] = useState({
    days: '01', hours: '06', minutes: '28', seconds: '32', isExpired: false,
  });

  useEffect(() => {
    if (!targetDate) return;
    const calculateTime = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true });
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        isExpired: false,
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <View style={[styles.banner, { backgroundColor: colors.primaryBg }]}>
      {/* Left: Hourglass + Registration closes in */}
      <View style={styles.leftSide}>
        <Ionicons name="hourglass-outline" size={15} color={colors.primary} />
        <Text style={[styles.label, { color: colors.primary }]}>
          {language === 'hi' ? 'पंजीकरण समाप्त' : 'Registration closes in'}
        </Text>
      </View>

      {/* Center: Clean Countdown String 01d : 06h : 28m : 32s */}
      <Text style={[styles.timerText, { color: colors.primary }]}>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </Text>

      {/* Right: Hurry up! */}
      <View style={styles.rightSide}>
        <Ionicons name="stopwatch-outline" size={14} color={colors.primary} />
        <Text style={[styles.hurryText, { color: colors.primary }]}>
          {language === 'hi' ? 'जल्दी करें!' : 'Hurry up!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hurryText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
