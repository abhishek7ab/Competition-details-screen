import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

// 1. Video Player Modal
export function VideoModal({ visible, onClose, videoUrl, title, isDarkMode = false }) {
  if (!visible) return null;
  const colors = getThemeColors(isDarkMode);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]} numberOfLines={1}>
              {title || 'Video Preview'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7} accessibilityRole="button">
              <Icon name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Web video iframe or placeholder */}
          <View style={styles.videoPlayerContainer}>
            {Platform.OS === 'web' ? (
              <video
                src={videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                controls
                autoPlay
                style={{ width: '100%', height: '240px', borderRadius: 12, backgroundColor: '#000' }}
              />
            ) : (
              <View style={[styles.mobileVideoPlaceholder, { backgroundColor: colors.surface }]}>
                <Icon name="play-circle" size={54} color={colors.primary} />
                <Text style={[styles.mobileVideoText, { color: colors.textPrimary }]}>Playing: {title}</Text>
                <Text style={[styles.videoUrlText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {videoUrl}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.dismissBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onClose}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Text style={[styles.dismissBtnText, { color: colors.textPrimary }]}>Close Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// 2. Submission Upload Modal
export function SubmissionModal({
  visible,
  onClose,
  onSubmit,
  loading,
  initialData,
  language,
  isDarkMode = false,
}) {
  const [title, setTitle] = useState(initialData?.title || 'Classical Kathak Performance');
  const [videoUrl, setVideoUrl] = useState(
    initialData?.videoUrl || 'https://youtube.com/watch?v=feedants_classical_dance'
  );
  const [danceStyle, setDanceStyle] = useState(initialData?.danceStyle || 'Kathak');
  const colors = getThemeColors(isDarkMode);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!title.trim() || !videoUrl.trim()) return;
    onSubmit({ title, videoUrl, danceStyle });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {initialData ? 'Your Submission' : 'Upload Submission'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7} accessibilityRole="button">
              <Icon name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
            Submit your classical dance link for official jury evaluation by Manju Dubey.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Performance Title</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Traditional Kathak Tarana"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Classical Dance Style</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              value={danceStyle}
              onChangeText={setDanceStyle}
              placeholder="Kathak / Bharatanatyam / Odissi"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Video Link (YouTube / Drive / MP4)</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              value={videoUrl}
              onChangeText={setVideoUrl}
              placeholder="https://..."
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: colors.primary }, loading && styles.btnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryActionBtnText}>
                {initialData ? 'Update Submission' : 'Confirm & Submit Entry'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// 3. Razorpay Payment Simulator Modal
export function PaymentModal({
  visible,
  onClose,
  onConfirm,
  entryFee,
  spotsRemaining,
  loading,
  isDarkMode = false,
}) {
  if (!visible) return null;
  const colors = getThemeColors(isDarkMode);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
        <View style={[styles.paymentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.paymentHeader, { borderBottomColor: colors.border }]}>
            <View style={styles.razorpayRow}>
              <Icon name="flash" size={16} color="#58A6FF" />
              <Text style={styles.razorpayLogo}>Payment Demo</Text>
              <Text style={styles.secureBadge}>Demo mode</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7} accessibilityRole="button">
              <Icon name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentBody}>
            <Text style={[styles.paymentCompTitle, { color: colors.textPrimary }]}>
              National Classical Dance Contest
            </Text>
            <View style={styles.spotsBadge}>
              <Icon name="flame" size={14} color="#D97706" />
              <Text style={styles.paymentSpotsAlert}>Only {spotsRemaining} spots left</Text>
            </View>

            <View
              style={[
                styles.amountBox,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>Total Registration Fee</Text>
              <Text style={[styles.amountValue, { color: colors.primary }]}>₹ {entryFee || 99}</Text>
            </View>

            <View
              style={[
                styles.paymentMethod,
                {
                  backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6',
                  borderColor: isDarkMode ? '#1A4D54' : '#B2E2E4',
                },
              ]}
            >
              <Icon name="shield-checkmark" size={16} color={colors.primary} />
              <Text style={[styles.paymentMethodText, { color: colors.primary }]}>
                Instant UPI / Card Payment (Simulated Sandbox)
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.payNowBtn, { backgroundColor: colors.primary }, loading && styles.btnDisabled]}
            onPress={onConfirm}
            disabled={loading}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.payNowBtnText}>Pay ₹{entryFee || 99} & Reserve Spot</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// 4. Create Contest / Upload Post Modal
export function CreateModal({ visible, onClose, onCreateSuccess, isDarkMode = false }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dance');
  const [prize, setPrize] = useState('1000');
  const colors = getThemeColors(isDarkMode);

  if (!visible) return null;

  const handleCreate = () => {
    onClose();
    if (onCreateSuccess) {
      onCreateSuccess(title || 'Custom Community Contest');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Host a Competition</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7} accessibilityRole="button">
              <Icon name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
            Create your own stage on Feedants. Invite talent and set prize pools.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Contest Title</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Inter-College Kathak Showdown"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              value={category}
              onChangeText={setCategory}
              placeholder="Dance / Music / Art"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Prize Pool (₹)</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              value={prize}
              onChangeText={setPrize}
              keyboardType="numeric"
              placeholder="1000"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: colors.primary }]}
            onPress={handleCreate}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Text style={styles.primaryActionBtnText}>Launch Competition</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// 5. Dancer Reviews & Testimonials Modal
export function ReviewsModal({ visible, onClose, isDarkMode = false, language }) {
  if (!visible) return null;
  const colors = getThemeColors(isDarkMode);

  const reviews = [
    {
      name: 'Ananya Sharma',
      city: 'New Delhi',
      rating: 5,
      date: 'Aug 2026',
      badge: 'Previous 1st Rank Winner',
      text: 'The feedback from Judge Manju Dubey helped me refine my Kathak footwork and Abhinaya tremendously. Prize money was credited instantly!',
    },
    {
      name: 'Priya Mukherjee',
      city: 'Kolkata',
      rating: 5,
      date: 'July 2026',
      badge: 'Classical Finalist',
      text: 'Best platform for young artists to get recognized. The verified certificate and smooth video upload process made the entire experience seamless.',
    },
    {
      name: 'Rohan Deshmukh',
      city: 'Pune',
      rating: 5,
      date: 'June 2026',
      badge: 'Kathak Performer',
      text: 'Very transparent judging breakdown and clear criteria. 100% genuine platform for competitive artists.',
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.modalHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon name="chatbubble-ellipses" size={20} color={colors.primary} />
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                {language === 'hi' ? 'प्रतिभागी समीक्षाएं' : 'Community Reviews (4.9★)'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7} accessibilityRole="button">
              <Icon name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
            Verified feedback from classical dance artists who competed on Feedants.
          </Text>

          <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
            {reviews.map((rev, idx) => (
              <View
                key={idx}
                style={[
                  styles.reviewItem,
                  {
                    backgroundColor: isDarkMode ? '#172234' : '#F8FAFC',
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.reviewTopRow}>
                  <View>
                    <Text style={[styles.reviewerName, { color: colors.textPrimary }]}>{rev.name}</Text>
                    <Text style={[styles.reviewerCity, { color: colors.textMuted }]}>
                      {rev.city} • {rev.badge}
                    </Text>
                  </View>
                  <View style={styles.starRow}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Icon key={i} name="star" size={13} color="#F59E0B" />
                    ))}
                  </View>
                </View>
                <Text style={[styles.reviewBodyText, { color: colors.textSecondary }]}>"{rev.text}"</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.dismissBtn, { backgroundColor: colors.primary, marginTop: 14 }]}
            onPress={onClose}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Text style={[styles.dismissBtnText, { color: '#FFFFFF' }]}>Back to Competition</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    ...Platform.select({
      web: { boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' },
    }),
  },
  paymentCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    ...Platform.select({
      web: { boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  modalCloseBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  formSubtitle: {
    fontSize: 12,
    marginBottom: 16,
    lineHeight: 18,
  },
  videoPlayerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000',
  },
  mobileVideoPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mobileVideoText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  videoUrlText: {
    fontSize: 11,
    marginTop: 4,
  },
  dismissBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  dismissBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
  },
  primaryActionBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(10, 112, 117, 0.25)', cursor: 'pointer' },
    }),
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  razorpayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  razorpayLogo: {
    fontSize: 18,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#58A6FF',
  },
  secureBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#58A6FF',
    backgroundColor: 'rgba(88, 166, 255, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  paymentBody: {
    paddingVertical: 16,
  },
  paymentCompTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  spotsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  paymentSpotsAlert: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  amountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginTop: 14,
    borderWidth: 1,
  },
  amountLabel: {
    fontSize: 12,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  paymentMethodText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
  payNowBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  payNowBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  reviewItem: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  reviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
  },
  reviewerCity: {
    fontSize: 11,
    marginTop: 1,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewBodyText: {
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
