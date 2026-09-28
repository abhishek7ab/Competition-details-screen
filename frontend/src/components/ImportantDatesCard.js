import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function ImportantDatesCard({ competition, language, isDarkMode = false, onShowToast }) {
  const colors = getThemeColors(isDarkMode);

  const formatDateParts = (dateString, fallbackDate, fallbackTime) => {
    if (!dateString) return { dateStr: fallbackDate, timeStr: fallbackTime };
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { dateStr: fallbackDate, timeStr: fallbackTime };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);
    const dateStr = `${day} ${month} ${year}`;

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
      id: 'reg',
      icon: 'calendar-outline',
      label: language === 'hi' ? 'पंजीकरण अंतिम तिथि' : 'Register Before',
      date: regDate.dateStr,
      time: regDate.timeStr,
      detail: language === 'hi' ? 'पंजीकरण बंद होने से पहले अपना स्थान आरक्षित करें।' : 'Deadline to register and secure your spot in the competition.',
    },
    {
      id: 'sub_start',
      icon: 'send',
      label: language === 'hi' ? 'प्रस्तुति प्रारंभ' : 'Submission Starts',
      date: subStartDate.dateStr,
      time: subStartDate.timeStr,
      detail: language === 'hi' ? 'प्रतिभागी अपना नृत्य वीडियो अपलोड करना शुरू कर सकते हैं।' : 'Submission portal opens for uploading your performance video.',
    },
    {
      id: 'sub_end',
      icon: 'upload',
      label: language === 'hi' ? 'प्रस्तुति समाप्ति' : 'Submission Ends',
      date: subEndDate.dateStr,
      time: subEndDate.timeStr,
      detail: language === 'hi' ? 'इस समय के बाद कोई प्रस्तुति स्वीकार नहीं की जाएगी।' : 'Final cut-off time for performance video uploads.',
    },
    {
      id: 'result',
      icon: 'trophy-outline',
      label: language === 'hi' ? 'परिणाम तिथि' : 'Result Date',
      date: resultDate.dateStr,
      time: resultDate.timeStr,
      detail: language === 'hi' ? 'जूरी मंजू दुबे द्वारा विजेता और पुरस्कारों की घोषणा।' : 'Winners & cash rewards announced by Head Judge Manju Dubey.',
    },
  ];

  const handleDatePress = (item) => {
    Alert.alert(
      item.label,
      `${item.detail}\n\n📅 Date: ${item.date}\n⏰ Time: ${item.time}\n\n🔔 Reminder notification set!`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {language === 'hi' ? 'महत्वपूर्ण तिथियां' : 'Important Dates'}
      </Text>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.grid}>
          {items.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.cell,
                idx % 2 === 0 && [styles.cellLeft, { borderRightColor: colors.border }],
                idx < 2 && [styles.cellTop, { borderBottomColor: colors.border }],
              ]}
              onPress={() => handleDatePress(item)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
                <Icon name={item.icon} size={18} color={colors.primary} />
              </View>
              <View style={styles.cellContent}>
                <Text style={[styles.label, { color: colors.textMuted }]}>{item.label}</Text>
                <Text style={[styles.dateText, { color: colors.primary }]}>{item.date}</Text>
                <Text style={[styles.timeText, { color: colors.textPrimary }]}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    paddingLeft: 2,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
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
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  cellLeft: {
    borderRightWidth: 1,
  },
  cellTop: {
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContent: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '800',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
});
