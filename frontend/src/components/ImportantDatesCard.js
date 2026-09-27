import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function ImportantDatesCard({ competition, language }) {
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
    },
    {
      icon: 'send',
      iconType: 'feather',
      label: language === 'hi' ? 'प्रस्तुति प्रारंभ' : 'Submission Starts',
      date: subStartDate.dateStr,
      time: subStartDate.timeStr,
    },
    {
      icon: 'upload',
      iconType: 'feather',
      label: language === 'hi' ? 'प्रस्तुति समाप्ति' : 'Submission Ends',
      date: subEndDate.dateStr,
      time: subEndDate.timeStr,
    },
    {
      icon: 'trophy-outline',
      iconType: 'ionicons',
      label: language === 'hi' ? 'परिणाम तिथि' : 'Result Date',
      date: resultDate.dateStr,
      time: resultDate.timeStr,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {language === 'hi' ? 'महत्वपूर्ण तिथियां' : 'Important Dates'}
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
              <View style={styles.iconWrap}>
                {item.iconType === 'ionicons' ? (
                  <Ionicons name={item.icon} size={18} color="#0A7075" />
                ) : (
                  <Feather name={item.icon} size={16} color="#0A7075" />
                )}
              </View>
              <View style={styles.cellContent}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    paddingLeft: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  },
  cellLeft: {
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  cellTop: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E8F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContent: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A7075',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
});
