import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function ReferralCard({ user, onShowToast, language }) {
  const [copied, setCopied] = useState(false);
  const referralCode = user?.referralCode || 'referral123';
  const referralUrl = `https://feedants.com/r/${referralCode}`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
    }
    setCopied(true);
    onShowToast(language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Referral link copied!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconWrap}>
          <Ionicons name="megaphone-outline" size={24} color="#16A34A" />
        </View>

        <View style={styles.contentCol}>
          <Text style={styles.title}>
            {language === 'hi' ? 'रेफ़र करें और अधिक छूट पाएं' : 'Refer & Earn more discount'}
          </Text>

          <View style={styles.inputAndActionsRow}>
            {/* Link Box */}
            <View style={styles.linkBox}>
              <Text style={styles.linkText} numberOfLines={1}>
                {referralUrl}
              </Text>
              <TouchableOpacity style={styles.copyBtn} onPress={handleCopy} activeOpacity={0.7}>
                <Text style={styles.copyBtnText}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Refer Now Button & Note */}
            <View style={styles.btnWrap}>
              <TouchableOpacity style={styles.referBtn} onPress={handleCopy} activeOpacity={0.8}>
                <Text style={styles.referBtnText}>
                  {language === 'hi' ? 'रेफ़र करें' : 'Refer Now'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.rewardNote}>
                {language === 'hi' ? 'प्रति साइनअप ₹10 पाएं' : 'You earn ₹10 for every signup'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8F6F0',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1EAE0',
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  inputAndActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  linkBox: {
    flex: 1.4,
    minWidth: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  copyBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  btnWrap: {
    alignItems: 'center',
  },
  referBtn: {
    backgroundColor: '#0A7075',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  referBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rewardNote: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },
});
