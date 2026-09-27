import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function CountdownBanner({ targetDate, language }) {
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

  const isUrgent = timeLeft.days === '00';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.banner, isUrgent && styles.bannerUrgent]}>
        {/* Left label */}
        <View style={styles.leftSide}>
          <Ionicons
            name="hourglass"
            size={14}
            color={timeLeft.isExpired ? THEME.colors.rose : THEME.colors.amber}
          />
          <Text style={styles.label}>
            {timeLeft.isExpired
              ? language === 'hi' ? 'पंजीकरण समाप्त' : 'Closed'
              : language === 'hi' ? 'समाप्त होने में' : 'Closes in'}
          </Text>
        </View>

        {/* Timer blocks */}
        <View style={styles.timerRow}>
          {[
            { val: timeLeft.days, unit: language === 'hi' ? 'दिन' : 'D' },
            { val: timeLeft.hours, unit: language === 'hi' ? 'घं' : 'H' },
            { val: timeLeft.minutes, unit: language === 'hi' ? 'मि' : 'M' },
            { val: timeLeft.seconds, unit: language === 'hi' ? 'से' : 'S' },
          ].map((item, idx) => (
            <View key={idx} style={styles.timerBlockWrap}>
              <View style={[styles.timerBlock, isUrgent && styles.timerBlockUrgent]}>
                <Text style={[styles.timerNum, isUrgent && styles.timerNumUrgent]}>
                  {item.val}
                </Text>
              </View>
              <Text style={styles.timerUnit}>{item.unit}</Text>
              {idx < 3 && <Text style={styles.colon}>:</Text>}
            </View>
          ))}
        </View>

        {/* Right label */}
        {!timeLeft.isExpired && (
          <Text style={[styles.hurry, isUrgent && styles.hurryUrgent]}>
            {language === 'hi' ? '🔥 जल्दी!' : '🔥 Hurry!'}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: THEME.colors.bg,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.amberBg,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,140,66,0.3)',
    ...Platform.select({
      web: { boxShadow: '0 2px 12px rgba(255,140,66,0.15)' },
    }),
  },
  bannerUrgent: {
    backgroundColor: THEME.colors.roseBg,
    borderColor: 'rgba(255,77,106,0.35)',
    ...Platform.select({
      web: { boxShadow: '0 2px 16px rgba(255,77,106,0.2)' },
    }),
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  timerBlockWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  timerBlock: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'rgba(255,140,66,0.2)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    minWidth: 26,
    alignItems: 'center',
  },
  timerBlockUrgent: {
    borderColor: 'rgba(255,77,106,0.3)',
  },
  timerNum: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.amber,
    letterSpacing: -0.5,
  },
  timerNumUrgent: {
    color: THEME.colors.rose,
  },
  timerUnit: {
    fontSize: 9,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.bold,
  },
  colon: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.bold,
  },
  hurry: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
  },
  hurryUrgent: {
    color: THEME.colors.rose,
  },
});
