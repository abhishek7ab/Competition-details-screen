import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function TabsSection({ competition, language }) {
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

  return (
    <View style={styles.card}>
      {/* Authentic Underlined Tab Headers */}
      <View style={styles.tabHeadersRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabHeader, isActive && styles.tabHeaderActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabHeaderText, isActive && styles.tabHeaderTextActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeUnderline} />}
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
                    : 'View less'
                  : language === 'hi'
                  ? 'और पढ़ें'
                  : 'View more'}
              </Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={14}
                color="#0A7075"
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
                  color="#0A7075"
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 12,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  tabHeadersRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabHeader: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabHeaderActive: {},
  tabHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  tabHeaderTextActive: {
    color: '#0A7075',
    fontWeight: '700',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 2.5,
    backgroundColor: '#0A7075',
    borderRadius: 2,
  },
  contentBox: {
    padding: 16,
  },
  paragraph: {
    fontSize: 13,
    color: '#475569',
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
    color: '#0A7075',
  },
  paramList: {
    gap: 10,
  },
  paramItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  paramTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paramName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  weightChip: {
    backgroundColor: '#E8F6F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0A7075',
  },
  paramDesc: {
    fontSize: 12,
    color: '#64748B',
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
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ruleIcon: {
    marginTop: 1,
  },
  ruleText: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
});

