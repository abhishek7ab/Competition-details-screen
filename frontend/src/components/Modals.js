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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

// 1. Video Player Modal
export function VideoModal({ visible, onClose, videoUrl, title }) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {title || 'Video Preview'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textSecondary} />
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
              <View style={styles.mobileVideoPlaceholder}>
                <Ionicons name="play-circle" size={54} color={THEME.colors.primary} />
                <Text style={styles.mobileVideoText}>Playing: {title}</Text>
                <Text style={styles.videoUrlText} numberOfLines={1}>{videoUrl}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.dismissBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.dismissBtnText}>Close Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// 2. Submission Upload Modal
export function SubmissionModal({ visible, onClose, onSubmit, loading, initialData, language }) {
  const [title, setTitle] = useState(initialData?.title || 'Classical Kathak Performance');
  const [videoUrl, setVideoUrl] = useState(
    initialData?.videoUrl || 'https://youtube.com/watch?v=demo_classical_dance'
  );
  const [danceStyle, setDanceStyle] = useState(initialData?.danceStyle || 'Kathak');

  if (!visible) return null;

  const handleSubmit = () => {
    if (!title.trim() || !videoUrl.trim()) return;
    onSubmit({ title, videoUrl, danceStyle });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {initialData ? 'Your Submission' : 'Upload Submission'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.formSubtitle}>
            Submit your classical dance link for official jury evaluation by Manju Dubey.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Performance Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Traditional Kathak Tarana"
              placeholderTextColor={THEME.colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Classical Dance Style</Text>
            <TextInput
              style={styles.input}
              value={danceStyle}
              onChangeText={setDanceStyle}
              placeholder="Kathak / Bharatanatyam / Odissi"
              placeholderTextColor={THEME.colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Video Link (YouTube / Drive / MP4)</Text>
            <TextInput
              style={styles.input}
              value={videoUrl}
              onChangeText={setVideoUrl}
              placeholder="https://..."
              placeholderTextColor={THEME.colors.textMuted}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryActionBtn, loading && styles.btnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={THEME.colors.bg} size="small" />
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
export function PaymentModal({ visible, onClose, onConfirm, entryFee, spotsRemaining, loading }) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <View style={styles.razorpayRow}>
              <Ionicons name="flash" size={16} color="#58A6FF" />
              <Text style={styles.razorpayLogo}>Razorpay</Text>
              <Text style={styles.secureBadge}>Verified</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentBody}>
            <Text style={styles.paymentCompTitle}>National Classical Dance Contest</Text>
            <View style={styles.spotsBadge}>
              <Ionicons name="flame" size={12} color={THEME.colors.amber} />
              <Text style={styles.paymentSpotsAlert}>Only {spotsRemaining} spots left</Text>
            </View>

            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>Total Registration Fee</Text>
              <Text style={styles.amountValue}>₹ {entryFee || 99}</Text>
            </View>

            <View style={styles.paymentMethod}>
              <Ionicons name="shield-checkmark" size={16} color={THEME.colors.primary} />
              <Text style={styles.paymentMethodText}>Instant UPI / Card Payment (Simulated Sandbox)</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.payNowBtn, loading && styles.btnDisabled]}
            onPress={onConfirm}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={THEME.colors.bg} size="small" />
            ) : (
              <Text style={styles.payNowBtnText}>Pay ₹{entryFee || 99} & Reserve Spot</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
// 4. Create Contest / Upload Post Modal
export function CreateModal({ visible, onClose, onCreateSuccess }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dance');
  const [prize, setPrize] = useState('1000');

  if (!visible) return null;

  const handleCreate = () => {
    onClose();
    if (onCreateSuccess) {
      onCreateSuccess(title || 'Custom Community Contest');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Host a Competition</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={20} color={THEME.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.formSubtitle}>
            Create your own stage on Feedants. Invite talent and set prize pools.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contest Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Inter-College Kathak Showdown"
              placeholderTextColor={THEME.colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Dance / Music / Art"
              placeholderTextColor={THEME.colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Prize Pool (₹)</Text>
            <TextInput
              style={styles.input}
              value={prize}
              onChangeText={setPrize}
              keyboardType="numeric"
              placeholder="1000"
              placeholderTextColor={THEME.colors.textMuted}
            />
          </View>

          <TouchableOpacity
            style={styles.primaryActionBtn}
            onPress={handleCreate}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryActionBtnText}>Launch Competition</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 6, 12, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    ...Platform.select({
      web: { boxShadow: '0 8px 32px rgba(0,0,0,0.8)' },
    }),
  },
  paymentCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(88, 166, 255, 0.3)',
    ...Platform.select({
      web: { boxShadow: '0 8px 32px rgba(0,0,0,0.8)' },
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
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
    flex: 1,
  },
  modalCloseBtn: {
    padding: 4,
  },
  formSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  videoPlayerContainer: {
    borderRadius: THEME.borderRadius.md,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000',
  },
  mobileVideoPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.surface,
    padding: 16,
  },
  mobileVideoText: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
    marginTop: 8,
  },
  videoUrlText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 4,
  },
  dismissBtn: {
    backgroundColor: THEME.colors.surface,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  dismissBtnText: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: THEME.colors.textPrimary,
  },
  primaryActionBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    marginTop: 10,
    ...Platform.select({
      web: { boxShadow: `0 4px 18px ${THEME.colors.primaryGlow}` },
    }),
  },
  primaryActionBtnText: {
    color: THEME.colors.bg,
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
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
    borderBottomColor: THEME.colors.border,
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
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  spotsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  paymentSpotsAlert: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
  },
  amountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    padding: 14,
    borderRadius: THEME.borderRadius.md,
    marginTop: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  amountLabel: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.primary,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: THEME.colors.primaryBg,
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  paymentMethodText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.primary,
    flex: 1,
  },
  payNowBtn: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: `0 4px 18px ${THEME.colors.primaryGlow}` },
    }),
  },
  payNowBtnText: {
    color: THEME.colors.bg,
    fontSize: 14,
    fontWeight: THEME.typography.weights.black,
    letterSpacing: 0.3,
  },
});
