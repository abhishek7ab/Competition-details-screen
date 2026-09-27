import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

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
}) {
  if (!visible) return null;

  const states = ['AUTO', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'SUBMISSIONS_OPEN', 'COMPLETED'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="hardware-chip-outline" size={16} color={THEME.colors.primary} />
          <Text style={styles.headerTitle}>Evaluator Control Panel</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={18} color={THEME.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>1. Switch Demo Persona:</Text>
      <View style={styles.userRow}>
        {users.map((u) => {
          const isSelected = activeUser?._id === u._id;
          return (
            <TouchableOpacity
              key={u._id}
              style={[styles.userChip, isSelected && styles.userChipSelected]}
              onPress={() => onSelectUser(u)}
              activeOpacity={0.8}
            >
              <Text style={[styles.userChipText, isSelected && styles.userChipTextSelected]}>
                {u.name} {u.name === 'Pooja Sharma' ? '(Registered)' : '(New)'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>2. Force State Machine Override:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stateRow}>
        {states.map((st) => {
          const isSelected = currentState === st;
          return (
            <TouchableOpacity
              key={st}
              style={[styles.stateChip, isSelected && styles.stateChipSelected]}
              onPress={() => onOverrideState(st)}
              activeOpacity={0.8}
            >
              <Text style={[styles.stateChipText, isSelected && styles.stateChipTextSelected]}>
                {st}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footerRow}>
        <Text style={styles.statsText}>
          Live Quota: <Text style={styles.statsBold}>{bookedSpots}/20 booked</Text> ({spotsRemaining} left)
        </Text>
        <TouchableOpacity style={styles.resetBtn} onPress={onResetDemo} activeOpacity={0.8}>
          <Ionicons name="refresh" size={13} color={THEME.colors.white} />
          <Text style={styles.resetBtnText}>Reset Demo DB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.primaryBorder,
    padding: 14,
    ...Platform.select({
      web: { boxShadow: '0 4px 20px rgba(0,0,0,0.6)' },
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
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textMuted,
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
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  userChipSelected: {
    backgroundColor: THEME.colors.primaryBg,
    borderColor: THEME.colors.primary,
  },
  userChipText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.medium,
  },
  userChipTextSelected: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.weights.bold,
  },
  stateRow: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 4,
  },
  stateChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  stateChipSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  stateChipText: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.semibold,
  },
  stateChipTextSelected: {
    color: THEME.colors.bg,
    fontWeight: THEME.typography.weights.black,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  statsText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  statsBold: {
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.colors.rose,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.sm,
  },
  resetBtnText: {
    fontSize: 11,
    color: THEME.colors.white,
    fontWeight: THEME.typography.weights.bold,
  },
});
