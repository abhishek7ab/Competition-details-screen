import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function ImportantDatesCard({ competition, language }) {
  // Format date helper
  const formatDateParts = (dateString, fallbackDate, fallbackTime) => {
    if (!dateString) return { dateStr: fallbackDate, timeStr: fallbackTime };
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { dateStr: fallbackDate, timeStr: fallbackTime };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);
    const dateStr = `${day} ${month} '${year}`;

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    return { dateStr, timeStr };
  };

  const regDate = formatDateParts(competition?.registrationDeadline, '10 Aug 26', '11:50 PM');
  const subStartDate = formatDateParts(competition?.submissionStartDate, '6 Aug 26', '04:00 AM');
  const subEndDate = formatDateParts(competition?.submissionEndDate, '30 Aug 26', '11:55 PM');
  const resultDate = formatDateParts(competition?.resultDate, '1 Sept 26', '11:50 PM');

  const items = [
    {
      icon: 'calendar-outline',
      iconType: 'ionicons',
      label: language === 'hi' ? 'पंजीकरण अंतिम तिथि' : 'Register Before',
      date: regDate.dateStr,
      time: regDate.timeStr,
      highlight: true,
      badgeColor: THEME.colors.amber,
      badgeBg: THEME.colors.amberBg,
    },
    {
      icon: 'send',
      iconType: 'feather',
      label: language === 'hi' ? 'प्रस्तुति प्रारंभ' : 'Submission Starts',
      date: subStartDate.dateStr,
      time: subStartDate.timeStr,
      highlight: false,
      badgeColor: THEME.colors.primary,
      badgeBg: THEME.colors.primaryBg,
    },
    {
      icon: 'upload',
      iconType: 'feather',
      label: language === 'hi' ? 'प्रस्तुति समाप्ति' : 'Submission Ends',
      date: subEndDate.dateStr,
      time: subEndDate.timeStr,
      highlight: false,
      badgeColor: THEME.colors.rose,
      badgeBg: THEME.colors.roseBg,
    },
    {
      icon: 'trophy-outline',
      iconType: 'ionicons',
      label: language === 'hi' ? 'परिणाम तिथि' : 'Result Date',
      date: resultDate.dateStr,
      time: resultDate.timeStr,
      highlight: false,
      badgeColor: THEME.colors.gold,
      badgeBg: THEME.colors.goldBg,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>
        {language === 'hi' ? '📅 महत्वपूर्ण तिथियां' : '📅 TIMELINE & DATES'}
      </Text>

      <View style={styles.card}>
        <View style={styles.grid}>
          {items.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.cell,
                idx % 2 === 0 && styles.cellLeft,
                idx < 2 && styles.cellTop,
              ]}
            >
              <View style={[styles.iconWrap, { backgroundColor: item.badgeBg }]}>
                {item.iconType === 'ionicons' ? (
                  <Ionicons name={item.icon} size={18} color={item.badgeColor} />
                ) : (
                  <Feather name={item.icon} size={16} color={item.badgeColor} />
                )}
              </View>
              <View style={styles.cellContent}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={[styles.dateText, item.highlight && styles.dateHighlight]}>
                  {item.date}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
          ))}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    gap: 10,
  },
  cellLeft: {
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
  },
  cellTop: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContent: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.medium,
    marginBottom: 3,
  },
  dateText: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  dateHighlight: {
    color: THEME.colors.primary,
  },
  timeText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
});
