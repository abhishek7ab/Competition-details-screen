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
          <Ionicons name="hardware-chip-outline" size={16} color="#0A7075" />
          <Text style={styles.headerTitle}>Evaluator Control Panel</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
          <Ionicons name="close" size={18} color="#64748B" />
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
          <Ionicons name="refresh" size={13} color="#FFFFFF" />
          <Text style={styles.resetBtnText}>Reset Demo DB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
    color: '#0A7075',
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
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
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userChipSelected: {
    backgroundColor: '#E8F6F6',
    borderColor: '#0A7075',
  },
  userChipText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  userChipTextSelected: {
    color: '#0A7075',
    fontWeight: '700',
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
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stateChipSelected: {
    backgroundColor: '#0A7075',
    borderColor: '#0A7075',
  },
  stateChipText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  stateChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  statsText: {
    fontSize: 11,
    color: '#475569',
  },
  statsBold: {
    fontWeight: '700',
    color: '#0A7075',
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
