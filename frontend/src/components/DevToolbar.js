import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, getThemeColors } from '../constants/theme';

export default function DevToolbar({
  visible,
  onClose,
  users,
  activeUser,
  onSelectUser,
  currentState,
  onOverrideState,
  onResetDemo,
  spotsRemaining,
  bookedSpots,
  isDarkMode = false,
}) {
  if (!visible) return null;
  const colors = getThemeColors(isDarkMode);

  const states = ['AUTO', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'SUBMISSIONS_OPEN', 'COMPLETED'];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="hardware-chip-outline" size={16} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: colors.primary }]}>Evaluator Control Panel</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
          <Ionicons name="close" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>1. Switch Demo Persona:</Text>
      <View style={styles.userRow}>
        {users.map((u) => {
          const isSelected = activeUser?._id === u._id;
          return (
            <TouchableOpacity
              key={u._id}
              style={[
                styles.userChip,
                {
                  backgroundColor: isSelected
                    ? isDarkMode ? '#132E35' : '#E8F6F6'
                    : isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onSelectUser(u)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.userChipText,
                  { color: isSelected ? colors.primary : colors.textSecondary },
                  isSelected && { fontWeight: '700' },
                ]}
              >
                {u.name} {u.name === 'Pooja Sharma' ? '(Registered)' : '(New)'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>2. Force State Machine Override:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stateRow}>
        {states.map((st) => {
          const isSelected = currentState === st;
          return (
            <TouchableOpacity
              key={st}
              style={[
                styles.stateChip,
                {
                  backgroundColor: isSelected ? colors.primary : isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onOverrideState(st)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.stateChipText,
                  { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                  isSelected && { fontWeight: '700' },
                ]}
              >
                {st}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={[styles.footerRow, { borderTopColor: colors.border }]}>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          Live Quota:{' '}
          <Text style={[styles.statsBold, { color: colors.primary }]}>{bookedSpots}/20 booked</Text> ({spotsRemaining} left)
        </Text>
        <TouchableOpacity style={styles.resetBtn} onPress={onResetDemo} activeOpacity={0.8}>
          <Ionicons name="refresh" size={13} color="#FFFFFF" />
          <Text style={styles.resetBtnText}>Reset Demo DB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 14,
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 8,
    marginBottom: 5,
  },
  userRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  userChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  userChipText: {
    fontSize: 11,
    fontWeight: '500',
  },
  stateRow: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 4,
  },
  stateChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  stateChipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  statsText: {
    fontSize: 11,
  },
  statsBold: {
    fontWeight: '700',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E11D48',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resetBtnText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
