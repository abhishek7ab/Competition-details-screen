import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function TabsSection({ competition, language }) {
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'parameters' | 'rules'
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    { key: 'about', label: language === 'hi' ? 'विवरण' : 'About' },
    { key: 'parameters', label: language === 'hi' ? 'मापदंड' : 'Judging' },
    { key: 'rules', label: language === 'hi' ? 'नियम' : 'Rules' },
  ];

  const aboutText =
    language === 'hi'
      ? competition?.aboutText?.hi || 'यह सभी आयु वर्ग के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है।'
      : competition?.aboutText?.en ||
        'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>
        {language === 'hi' ? '📋 विवरण व नियम' : '📋 SPECIFICATIONS'}
      </Text>

      <View style={styles.card}>
        {/* Tab Switcher Segmented Control */}
        <View style={styles.tabHeadersRow}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabHeader, isActive && styles.tabHeaderActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabHeaderText, isActive && styles.tabHeaderTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content Box */}
        <View style={styles.contentBox}>
          {/* Tab 1: About Competition */}
          {activeTab === 'about' && (
            <View>
              <Text
                style={styles.paragraph}
                numberOfLines={isExpanded ? undefined : 4}
              >
                {aboutText}
              </Text>

              <TouchableOpacity
                style={styles.viewMoreButton}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
              >
                <Text style={styles.viewMoreText}>
                  {isExpanded
                    ? language === 'hi'
                      ? 'कम देखें'
                      : 'Show less'
                    : language === 'hi'
                    ? 'और पढ़ें'
                    : 'Read more'}
                </Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={THEME.colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* Tab 2: Judging Parameters */}
          {activeTab === 'parameters' && (
            <View style={styles.paramList}>
              {(competition?.judgingParameters || []).map((item, idx) => (
                <View key={idx} style={styles.paramItem}>
                  <View style={styles.paramTop}>
                    <Text style={styles.paramName}>
                      {language === 'hi' && item.parameterHindi ? item.parameterHindi : item.parameter}
                    </Text>
                    <View style={styles.weightChip}>
                      <Text style={styles.weightText}>{item.weightage}</Text>
                    </View>
                  </View>
                  {item.description ? (
                    <Text style={styles.paramDesc}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {/* Tab 3: Rules & Eligibility */}
          {activeTab === 'rules' && (
            <View style={styles.rulesList}>
              {(competition?.rulesAndEligibility || []).map((item, idx) => (
                <View key={idx} style={styles.ruleItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={THEME.colors.primary}
                    style={styles.ruleIcon}
                  />
                  <Text style={styles.ruleText}>
                    {language === 'hi' && item.ruleHindi ? item.ruleHindi : item.rule}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: THEME.colors.bg,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 2px 16px rgba(0,0,0,0.4)' },
    }),
  },
  tabHeadersRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    gap: 4,
  },
  tabHeader: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.borderRadius.sm,
  },
  tabHeaderActive: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
  },
  tabHeaderText: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.textMuted,
  },
  tabHeaderTextActive: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.weights.bold,
  },
  contentBox: {
    padding: 16,
  },
  paragraph: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 22,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.full,
    backgroundColor: THEME.colors.primaryBg,
  },
  viewMoreText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  paramList: {
    gap: 10,
  },
  paramItem: {
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  paramTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paramName: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  weightChip: {
    backgroundColor: THEME.colors.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  weightText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  paramDesc: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 6,
    lineHeight: 16,
  },
  rulesList: {
    gap: 10,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: THEME.colors.surfaceElevated,
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  ruleIcon: {
    marginTop: 1,
  },
  ruleText: {
    flex: 1,
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
});
