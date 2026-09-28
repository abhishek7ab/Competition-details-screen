import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { apiService } from './src/services/api';
import { THEME, getThemeColors } from './src/constants/theme';
import Icon from './src/components/Icon';

// Components
import Header from './src/components/Header';
import HeroCard from './src/components/HeroCard';
import JudgeCard from './src/components/JudgeCard';
import CountdownBanner from './src/components/CountdownBanner';
import ImportantDatesCard from './src/components/ImportantDatesCard';
import PreviousWinners from './src/components/PreviousWinners';
import TabsSection from './src/components/TabsSection';
import RewardsList from './src/components/RewardsList';
import TrustSection from './src/components/TrustSection';
import ReferralCard from './src/components/ReferralCard';
import UserFeedbackBanner from './src/components/UserFeedbackBanner';
import BottomBar from './src/components/BottomBar';
import BottomNav from './src/components/BottomNav';
import HomeScreen from './src/components/HomeScreen';
import BrowseScreen from './src/components/BrowseScreen';
import ProfileScreen from './src/components/ProfileScreen';
import DevToolbar from './src/components/DevToolbar';
import SidebarNav from './src/components/SidebarNav';
import DesktopActionCard from './src/components/DesktopActionCard';
import {
  VideoModal,
  SubmissionModal,
  PaymentModal,
  CreateModal,
  ReviewsModal,
} from './src/components/Modals';

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [computed, setComputed] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [demoUsers, setDemoUsers] = useState([]);
  const [devToolbarVisible, setDevToolbarVisible] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Navigation & Interactive Modals State
  const [activeTab, setActiveTab] = useState('contests'); // 'home' | 'browse' | 'create' | 'contests' | 'profile'
  const [browseCategory, setBrowseCategory] = useState('All');
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [videoModal, setVideoModal] = useState({ visible: false, url: '', title: '' });
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const colors = getThemeColors(isDarkMode);

  const handleSelectTab = (tab) => {
    if (tab === 'create') {
      setCreateModalVisible(true);
      return;
    }
    setActiveTab(tab);
    if (tab === 'home') showToast('Switched to Home Feed');
    else if (tab === 'browse') {
      setBrowseCategory('All');
      showToast('Browse Competitions');
    } else if (tab === 'profile') {
      showToast(`Profile: ${activeUser?.name || 'User'}`);
    } else if (tab === 'contests') {
      showToast('Competition Details Screen');
    }
  };

  const handleBackPress = () => {
    if (activeTab !== 'contests') {
      setActiveTab('contests');
      showToast('Back to Competition Details');
    } else {
      showToast('You are on the Competition Details screen');
    }
  };

  // Show temporary toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  // 1. Initial Load: Fetch Users & Competition Data
  const loadData = useCallback(
    async (selectedUserId) => {
      try {
        const fetchedUsers = await apiService.getDemoUsers();
        setDemoUsers(fetchedUsers);

        const userToUse =
          selectedUserId || activeUser?._id || (fetchedUsers.length > 0 ? fetchedUsers[0]._id : null);

        if (fetchedUsers.length > 0 && !activeUser) {
          setActiveUser(fetchedUsers[0]);
        }

        const compData = await apiService.getCompetition(userToUse);
        setCompetition(compData.competition);
        setComputed(compData.computed);
      } catch (err) {
        console.error('Failed to load competition data:', err);
        showToast('Backend connection error. Make sure backend is running on :5000');
      } finally {
        setLoading(false);
      }
    },
    [activeUser]
  );

  useEffect(() => {
    loadData();
  }, []);

  // Evaluator Dev Controls
  const handleSelectUser = async (user) => {
    setActiveUser(user);
    setLoading(true);
    await loadData(user._id);
    showToast(`Switched active user to: ${user.name}`);
  };

  const handleOverrideState = async (state) => {
    if (!competition) return;
    try {
      await apiService.overrideState(competition._id, state);
      await loadData(activeUser?._id);
      showToast(`Lifecycle forced to: ${state}`);
    } catch (err) {
      showToast(`Failed to override state: ${err.message}`);
    }
  };

  const handleResetDemo = async () => {
    try {
      await apiService.resetDemoState();
      await loadData(activeUser?._id);
      showToast('Demo state reset: 1/20 booked, 19 spots left');
    } catch (err) {
      showToast(`Reset failed: ${err.message}`);
    }
  };

  // 3. Handle Registration CTA
  const handleRegisterPress = () => {
    setPaymentModalVisible(true);
  };

  const handleConfirmPayment = async () => {
    if (!activeUser || !competition) return;
    setActionLoading(true);
    try {
      const res = await apiService.registerForCompetition(competition._id, activeUser._id);
      setPaymentModalVisible(false);
      showToast(res.message || 'Registration successful! Spot reserved.');
      await loadData(activeUser._id);
    } catch (err) {
      Alert.alert('Registration Issue', err.message);
      showToast(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Handle Submission CTA
  const handleSubmitPress = () => {
    setSubmissionModalVisible(true);
  };

  const handleConfirmSubmission = async (submissionPayload) => {
    if (!activeUser || !competition) return;
    setActionLoading(true);
    try {
      const res = await apiService.submitEntry(competition._id, {
        userId: activeUser._id,
        ...submissionPayload,
      });
      setSubmissionModalVisible(false);
      showToast('Submission uploaded successfully!');
      await loadData(activeUser._id);
    } catch (err) {
      Alert.alert('Submission Issue', err.message);
      showToast(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Video player helper
  const handlePlayVideo = (url, title) => {
    setVideoModal({
      visible: true,
      url: url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: title || 'Video Preview',
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? '#020617' : '#E2E8F0' },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#0F172A' : '#FFFFFF'}
      />

      {/* ═══════════════════════════════════════════════════════════
         RESPONSIVE LAYOUT CONTAINER
         Mobile (< 900px): Clean centered mobile view + BottomNav
         Desktop (>= 900px): Expansive 3-column dashboard with Sidebar
         ═══════════════════════════════════════════════════════════ */}
      <View style={[styles.mainLayoutWrapper, isDesktop && styles.desktopLayoutRow]}>
        {/* Left Sidebar (Desktop Only) */}
        {isDesktop && (
          <SidebarNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            activeUser={activeUser}
            onCreatePress={() => setCreateModalVisible(true)}
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode((v) => !v)}
          />
        )}

        {/* Center Screen Container */}
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: colors.bg,
              ...(Platform.OS === 'web'
                ? {
                    boxShadow: isDarkMode
                      ? '0 0 40px rgba(0,0,0,0.5)'
                      : '0 0 30px rgba(0,0,0,0.06)',
                  }
                : {}),
            },
            isDesktop
              ? {
                  maxWidth: 600,
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: colors.border,
                }
              : {
                  maxWidth: 480,
                  width: '100%',
                },
          ]}
        >
          {/* Top Header */}
          <Header
            activeTab={activeTab}
            onBackPress={handleBackPress}
            language={language}
            setLanguage={setLanguage}
            onToggleDevToolbar={() => setDevToolbarVisible((v) => !v)}
            isDevToolbarOpen={devToolbarVisible}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode((v) => !v)}
          />

          {/* Evaluator DevToolbar */}
          <DevToolbar
            visible={devToolbarVisible}
            onClose={() => setDevToolbarVisible(false)}
            users={demoUsers}
            activeUser={activeUser}
            onSelectUser={handleSelectUser}
            currentState={computed?.currentState}
            onOverrideState={handleOverrideState}
            onResetDemo={handleResetDemo}
            spotsRemaining={computed?.spotsRemaining ?? 19}
            bookedSpots={competition?.bookedSpots ?? 1}
            isDarkMode={isDarkMode}
          />

          {/* Toast Banner */}
          {toastMessage ? (
            <View
              style={[
                styles.toastContainer,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#0F172A',
                  borderColor: isDarkMode ? '#334155' : '#1E293B',
                },
              ]}
            >
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          ) : null}

          {/* Screen Routing based on activeTab */}
          {loading ? (
            <View style={[styles.loadingContainer, { backgroundColor: colors.bg }]}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.loadingText, { color: colors.primary }]}>
                Connecting to Feedants API...
              </Text>
            </View>
          ) : !competition && activeTab === 'contests' ? (
            <View style={[styles.loadingContainer, { backgroundColor: colors.bg }]}>
              <Icon name="cloud-offline-outline" size={40} color="#DC2626" />
              <Text style={[styles.loadingText, { color: '#DC2626', marginTop: 10 }]}>
                Unable to reach Backend API (:5000)
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  loadData();
                }}
                style={[styles.retryBtn, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
              >
                <Text style={styles.retryBtnText}>Retry Connection</Text>
              </TouchableOpacity>
            </View>
          ) : activeTab === 'home' ? (
            <HomeScreen
              activeUser={activeUser}
              competition={competition}
              onGoToContest={() => {
                setActiveTab('contests');
                showToast('Competition Details Screen');
              }}
              onSelectCategory={(cat) => {
                setBrowseCategory(cat);
                setActiveTab('browse');
                showToast(`Browsing ${cat}`);
              }}
              language={language}
              isDarkMode={isDarkMode}
            />
          ) : activeTab === 'browse' ? (
            <BrowseScreen
              onGoToContest={() => {
                setActiveTab('contests');
                showToast('Competition Details Screen');
              }}
              initialCategory={browseCategory}
              language={language}
              isDarkMode={isDarkMode}
            />
          ) : activeTab === 'profile' ? (
            <ProfileScreen
              activeUser={activeUser}
              onShowToast={showToast}
              onGoToContest={() => {
                setActiveTab('contests');
                showToast('Competition Details Screen');
              }}
              language={language}
              isDarkMode={isDarkMode}
            />
          ) : (
            /* Default: Full Competition Details Screen */
            <ScrollView
              style={[styles.scrollView, { backgroundColor: colors.bg }]}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* 1. Hero Card */}
              <HeroCard
                competition={competition}
                computed={computed}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 2. Judge Card */}
              <JudgeCard
                judge={competition?.judge}
                onPlayVideo={(url, name) => handlePlayVideo(url, `Judge: ${name}`)}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 3. Live Countdown Banner */}
              <CountdownBanner
                targetDate={competition?.registrationDeadline}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 4. Important Dates */}
              <ImportantDatesCard
                competition={competition}
                language={language}
                isDarkMode={isDarkMode}
                onShowToast={showToast}
              />

              {/* 5. Previous Winners */}
              <PreviousWinners
                winners={competition?.previousWinners}
                onPlayVideo={handlePlayVideo}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 6. Tabs (About, Judging, Rules) */}
              <TabsSection
                competition={competition}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 7. Rewards List */}
              <RewardsList
                rewards={competition?.rewards}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 8. Trust & Policies */}
              <TrustSection
                disclaimer={competition?.disclaimer}
                onWatchPrizeVideo={() =>
                  handlePlayVideo(
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    'Prize Distribution Process'
                  )
                }
                onOpenRefundPolicy={() =>
                  Alert.alert(
                    'Feedants Refund Policy',
                    '100% refund is issued if the competition is cancelled by Feedants. Registrations can be transferred up to 24 hours before the registration deadline.'
                  )
                }
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 9. Referral Card */}
              <ReferralCard
                user={activeUser}
                onShowToast={showToast}
                language={language}
                isDarkMode={isDarkMode}
              />

              {/* 10. Feedback & Ad */}
              <UserFeedbackBanner
                onFeedbackPress={() => setReviewsModalVisible(true)}
                language={language}
                isDarkMode={isDarkMode}
              />
            </ScrollView>
          )}

          {/* Sticky Action CTA Button (Mobile Only when on Contests) */}
          {!isDesktop && !loading && activeTab === 'contests' && (
            <BottomBar
              competition={competition}
              computed={computed}
              onRegisterPress={handleRegisterPress}
              onSubmitPress={handleSubmitPress}
              loading={actionLoading}
              language={language}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Bottom Navigation (Mobile Only) */}
          {!isDesktop && (
            <BottomNav
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              activeUser={activeUser}
              language={language}
              isDarkMode={isDarkMode}
            />
          )}
        </View>

        {/* Right Action Column (Desktop Only when on Contests) */}
        {isDesktop && activeTab === 'contests' && (
          <View style={styles.desktopActionColumn}>
            <DesktopActionCard
              competition={competition}
              computed={computed}
              onRegisterPress={handleRegisterPress}
              onSubmitPress={handleSubmitPress}
              loading={actionLoading}
              language={language}
              isDarkMode={isDarkMode}
            />
          </View>
        )}
      </View>

      {/* Interactive Modals */}
      <VideoModal
        visible={videoModal.visible}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={() => setVideoModal({ visible: false, url: '', title: '' })}
        isDarkMode={isDarkMode}
      />

      <SubmissionModal
        visible={submissionModalVisible}
        onClose={() => setSubmissionModalVisible(false)}
        onSubmit={handleConfirmSubmission}
        loading={actionLoading}
        initialData={computed?.userState?.submission}
        language={language}
        isDarkMode={isDarkMode}
      />

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={handleConfirmPayment}
        entryFee={competition?.entryFee}
        spotsRemaining={computed?.spotsRemaining}
        loading={actionLoading}
        isDarkMode={isDarkMode}
      />

      <CreateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreateSuccess={(newTitle) => showToast(`Created: ${newTitle}`)}
        isDarkMode={isDarkMode}
      />

      <ReviewsModal
        visible={reviewsModalVisible}
        onClose={() => setReviewsModalVisible(false)}
        isDarkMode={isDarkMode}
        language={language}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  mainLayoutWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desktopLayoutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1280,
    ...Platform.select({
      web: {
        height: '100vh',
        overflow: 'hidden',
      },
    }),
  },
  desktopActionColumn: {
    width: 350,
    padding: 20,
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
      },
    }),
  },
  retryBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  appContainer: {
    flex: 1,
    ...Platform.select({
      web: {
        height: '100vh',
        minHeight: '100vh',
      },
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    top: 54,
    left: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 9999,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      },
    }),
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
