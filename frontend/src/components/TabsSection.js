import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, getThemeColors } from '../constants/theme';

export default function TabsSection({ competition, language, isDarkMode = false }) {
  const colors = getThemeColors(isDarkMode);
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'parameters' | 'rules'
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    { key: 'about', label: language === 'hi' ? 'प्रतियोगिता विवरण' : 'About Competition' },
    { key: 'parameters', label: language === 'hi' ? 'निर्णय मापदंड' : 'Judging Parameters' },
    { key: 'rules', label: language === 'hi' ? 'नियम और पात्रता' : 'Rules & Eligibility' },
  ];

  const aboutText =
    language === 'hi'
      ? competition?.aboutText?.hi || 'यह सभी आयु वर्ग के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है।'
      : competition?.aboutText?.en ||
        'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.';

  const handleParamPress = (item) => {
    Alert.alert(
      item.parameter,
      `Weightage: ${item.weightage}\n\n${item.description || 'Evaluated strictly according to standard Indian classical choreography standards by Judge Manju Dubey.'}`
    );
  };

  const handleRulePress = (rule) => {
    Alert.alert('Competition Rule', rule);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Authentic Underlined Tab Headers */}
      <View style={[styles.tabHeadersRow, { borderBottomColor: colors.border }]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabHeader}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabHeaderText,
                  { color: isActive ? colors.primary : colors.textMuted },
                  isActive && { fontWeight: '700' },
                ]}
              >
                {tab.label}
              </Text>
              {isActive && (
                <View style={[styles.activeUnderline, { backgroundColor: colors.primary }]} />
              )}
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
              style={[styles.paragraph, { color: colors.textSecondary }]}
              numberOfLines={isExpanded ? undefined : 4}
            >
              {aboutText}
            </Text>

            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => setIsExpanded(!isExpanded)}
              activeOpacity={0.7}
            >
              <Text style={[styles.viewMoreText, { color: colors.primary }]}>
                {isExpanded
                  ? language === 'hi'
                    ? 'कम देखें'
                    : 'View less'
                  : language === 'hi'
                  ? 'और पढ़ें'
                  : 'View more'}
              </Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={14}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Tab 2: Judging Parameters */}
        {activeTab === 'parameters' && (
          <View style={styles.paramList}>
            {(competition?.judgingParameters || []).map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.paramItem,
                  {
                    backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleParamPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.paramTop}>
                  <Text style={[styles.paramName, { color: colors.textPrimary }]}>
                    {language === 'hi' && item.parameterHindi ? item.parameterHindi : item.parameter}
                  </Text>
                  <View style={[styles.weightChip, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
                    <Text style={[styles.weightText, { color: colors.primary }]}>{item.weightage}</Text>
                  </View>
                </View>
                {item.description ? (
                  <Text style={[styles.paramDesc, { color: colors.textMuted }]}>{item.description}</Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tab 3: Rules & Eligibility */}
        {activeTab === 'rules' && (
          <View style={styles.rulesList}>
            {(competition?.rulesAndEligibility || []).map((item, idx) => {
              const ruleTextStr = language === 'hi' && item.ruleHindi ? item.ruleHindi : item.rule;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.ruleItem,
                    {
                      backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleRulePress(ruleTextStr)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.primary}
                    style={styles.ruleIcon}
                  />
                  <Text style={[styles.ruleText, { color: colors.textSecondary }]}>
                    {ruleTextStr}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  tabHeadersRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabHeader: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 2.5,
    borderRadius: 2,
  },
  contentBox: {
    padding: 16,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 21,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
    alignSelf: 'center',
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  paramList: {
    gap: 10,
  },
  paramItem: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
  },
  paramTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paramName: {
    fontSize: 13,
    fontWeight: '700',
  },
  weightChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightText: {
    fontSize: 11,
    fontWeight: '700',
  },
  paramDesc: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },
  rulesList: {
    gap: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  ruleIcon: {
    marginTop: 1,
  },
  ruleText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
});
