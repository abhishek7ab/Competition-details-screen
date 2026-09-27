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
  useWindowDimensions,
} from 'react-native';
import { apiService } from './src/services/api';
import { THEME } from './src/constants/theme';

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
import DevToolbar from './src/components/DevToolbar';
import HomeScreen from './src/components/HomeScreen';
import BrowseScreen from './src/components/BrowseScreen';
import ProfileScreen from './src/components/ProfileScreen';
import SidebarNav from './src/components/SidebarNav';
import DesktopActionCard from './src/components/DesktopActionCard';
import { VideoModal, SubmissionModal, PaymentModal, CreateModal } from './src/components/Modals';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [computed, setComputed] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // Navigation & Interactive Modals State
  const [activeTab, setActiveTab] = useState('contests'); // 'home' | 'browse' | 'create' | 'contests' | 'profile'
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [devBarVisible, setDevBarVisible] = useState(false);
  const [videoModal, setVideoModal] = useState({ visible: false, url: '', title: '' });
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSelectTab = (tab) => {
    if (tab === 'create') {
      setCreateModalVisible(true);
      return;
    }
    setActiveTab(tab);
    if (tab === 'home') showToast('Switched to Home Feed');
    else if (tab === 'browse') showToast('Browse Competitions');
    else if (tab === 'profile') showToast(`Profile: ${activeUser?.name || 'User'}`);
    else if (tab === 'contests') showToast('Competition Details Screen');
  };

  const handleBackPress = () => {
    if (activeTab !== 'contests') {
      setActiveTab('contests');
      showToast('Back to Competition Details');
    } else {
      setActiveTab('home');
      showToast('Navigated to Feedants Home');
    }
  };

  // Show temporary toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // 1. Initial Load: Fetch Users & Competition Data
  const loadData = useCallback(async (selectedUserId) => {
    try {
      const demoUsers = await apiService.getDemoUsers();
      setUsers(demoUsers);

      const userToUse =
        selectedUserId || activeUser?._id || (demoUsers.length > 0 ? demoUsers[0]._id : null);

      if (demoUsers.length > 0 && !activeUser) {
        setActiveUser(demoUsers[0]);
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
  }, [activeUser]);

  useEffect(() => {
    loadData();
  }, []);

  // 2. Handle switching demo user
  const handleSelectUser = async (user) => {
    setActiveUser(user);
    setLoading(true);
    await loadData(user._id);
    showToast(`Switched user to: ${user.name}`);
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

  // 6. Evaluator overrides & demo reset
  const handleOverrideState = async (state) => {
    if (!competition) return;
    try {
      await apiService.overrideState(competition._id, state);
      showToast(`State set to: ${state}`);
      await loadData(activeUser?._id);
    } catch (err) {
      showToast(err.message);
    }
  };

  const handleResetDemo = async () => {
    try {
      await apiService.resetDemoState();
      showToast('Database reset to clean demo state (1/20 booked)');
      await loadData(activeUser?._id);
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {isDesktop ? (
        /* ═══════════════════════════════════════════════════════════
           DESKTOP RESPONSIVE LAYOUT (>= 900px)
           Sidebar navigation on left, 2-column split dashboard on right
           ═══════════════════════════════════════════════════════════ */
        <View style={styles.desktopLayout}>
          {/* Left Sidebar Navigation */}
          <SidebarNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            activeUser={activeUser}
            onToggleDevBar={() => setDevBarVisible(!devBarVisible)}
            onCreatePress={() => setCreateModalVisible(true)}
            language={language}
            setLanguage={setLanguage}
          />

          {/* Right Main Content Panel */}
          <View style={styles.desktopMainView}>
            {/* Desktop Header */}
            <Header
              activeTab={activeTab}
              onBackPress={handleBackPress}
              language={language}
              setLanguage={setLanguage}
              onToggleDevBar={() => setDevBarVisible(!devBarVisible)}
            />

            {/* Optional Evaluator Controls Bar */}
            <DevToolbar
              visible={devBarVisible}
              onClose={() => setDevBarVisible(false)}
              users={users}
              activeUser={activeUser}
              onSelectUser={handleSelectUser}
              currentState={computed?.currentState}
              onOverrideState={handleOverrideState}
              onResetDemo={handleResetDemo}
              spotsRemaining={computed?.spotsRemaining}
              bookedSpots={competition?.bookedSpots}
            />

            {/* Toast Banner */}
            {toastMessage ? (
              <View style={styles.toastContainer}>
                <Text style={styles.toastText}>{toastMessage}</Text>
              </View>
            ) : null}

            {/* Desktop Screen Content */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={THEME.colors.primary} />
                <Text style={styles.loadingText}>Connecting to Feedants API...</Text>
              </View>
            ) : !competition && activeTab === 'contests' ? (
              <View style={styles.loadingContainer}>
                <Ionicons name="cloud-offline-outline" size={40} color={THEME.colors.rose} />
                <Text style={[styles.loadingText, { color: THEME.colors.rose, marginTop: 10 }]}>
                  Unable to reach Backend API (:5000)
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    loadData();
                  }}
                  style={styles.retryBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.retryBtnText}>Retry Connection</Text>
                </TouchableOpacity>
              </View>
            ) : activeTab === 'home' ? (
              <HomeScreen
                activeUser={activeUser}
                competition={competition}
                onGoToContest={() => setActiveTab('contests')}
                onSelectCategory={(cat) => {
                  setActiveTab('browse');
                  showToast(`Browsing ${cat}`);
                }}
                language={language}
              />
            ) : activeTab === 'browse' ? (
              <BrowseScreen
                onGoToContest={() => setActiveTab('contests')}
                language={language}
              />
            ) : activeTab === 'profile' ? (
              <ProfileScreen
                activeUser={activeUser}
                users={users}
                onSelectUser={handleSelectUser}
                onShowToast={showToast}
                onGoToContest={() => setActiveTab('contests')}
                language={language}
              />
            ) : (
              /* Desktop Split 2-Column Contest Details */
              <View style={styles.desktopTwoColContainer}>
                {/* Left Column: Hero, Jury, Criteria & Rules, Hall of Fame */}
                <ScrollView
                  style={styles.desktopLeftScroll}
                  contentContainerStyle={styles.desktopLeftScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <HeroCard competition={competition} computed={computed} language={language} />
                  <JudgeCard
                    judge={competition?.judge}
                    onPlayVideo={(url, name) => handlePlayVideo(url, `Judge: ${name}`)}
                    language={language}
                  />
                  <TabsSection competition={competition} language={language} />
                  <RewardsList rewards={competition?.rewards} language={language} />
                  <PreviousWinners
                    winners={competition?.previousWinners}
                    onPlayVideo={handlePlayVideo}
                    language={language}
                  />
                </ScrollView>

                {/* Right Column: Pricing, Live Action CTA, Dates, Trust, Referral */}
                <ScrollView
                  style={styles.desktopRightScroll}
                  contentContainerStyle={styles.desktopRightScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <CountdownBanner
                    targetDate={competition?.registrationDeadline}
                    language={language}
                  />
                  <DesktopActionCard
                    competition={competition}
                    computed={computed}
                    onRegisterPress={handleRegisterPress}
                    onSubmitPress={handleSubmitPress}
                    loading={actionLoading}
                    language={language}
                  />
                  <ImportantDatesCard competition={competition} language={language} />
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
                  />
                  <ReferralCard user={activeUser} onShowToast={showToast} language={language} />
                  <UserFeedbackBanner
                    onFeedbackPress={() =>
                      showToast('Feedants reviews: 4.8/5 based on 1,200+ dancers.')
                    }
                    language={language}
                  />
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      ) : (
        /* ═══════════════════════════════════════════════════════════
           MOBILE RESPONSIVE LAYOUT (< 900px)
           Clean stacked phone view with sticky BottomBar and BottomNav
           ═══════════════════════════════════════════════════════════ */
        <View style={styles.appContainer}>
          {/* Top Header */}
          <Header
            activeTab={activeTab}
            onBackPress={handleBackPress}
            language={language}
            setLanguage={setLanguage}
            onToggleDevBar={() => setDevBarVisible(!devBarVisible)}
          />

          {/* Optional Evaluator Controls Bar */}
          <DevToolbar
            visible={devBarVisible}
            onClose={() => setDevBarVisible(false)}
            users={users}
            activeUser={activeUser}
            onSelectUser={handleSelectUser}
            currentState={computed?.currentState}
            onOverrideState={handleOverrideState}
            onResetDemo={handleResetDemo}
            spotsRemaining={computed?.spotsRemaining}
            bookedSpots={competition?.bookedSpots}
          />

          {/* Toast Banner */}
          {toastMessage ? (
            <View style={styles.toastContainer}>
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          ) : null}

          {/* Screen Routing based on BottomNav activeTab */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={THEME.colors.primary} />
              <Text style={styles.loadingText}>Connecting to Feedants API...</Text>
            </View>
          ) : !competition && activeTab === 'contests' ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="cloud-offline-outline" size={40} color={THEME.colors.rose} />
              <Text style={[styles.loadingText, { color: THEME.colors.rose, marginTop: 10 }]}>
                Unable to reach Backend API (:5000)
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  loadData();
                }}
                style={styles.retryBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.retryBtnText}>Retry Connection</Text>
              </TouchableOpacity>
            </View>
          ) : activeTab === 'home' ? (
            <HomeScreen
              activeUser={activeUser}
              competition={competition}
              onGoToContest={() => setActiveTab('contests')}
              onSelectCategory={(cat) => {
                setActiveTab('browse');
                showToast(`Browsing ${cat}`);
              }}
              language={language}
            />
          ) : activeTab === 'browse' ? (
            <BrowseScreen
              onGoToContest={() => setActiveTab('contests')}
              language={language}
            />
          ) : activeTab === 'profile' ? (
            <ProfileScreen
              activeUser={activeUser}
              users={users}
              onSelectUser={handleSelectUser}
              onShowToast={showToast}
              onGoToContest={() => setActiveTab('contests')}
              language={language}
            />
          ) : (
            /* Default: Full Competition Details Screen */
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* 1. Hero Card */}
              <HeroCard competition={competition} computed={computed} language={language} />

              {/* 2. Judge Card */}
              <JudgeCard
                judge={competition?.judge}
                onPlayVideo={(url, name) => handlePlayVideo(url, `Judge: ${name}`)}
                language={language}
              />

              {/* 3. Live Countdown Banner */}
              <CountdownBanner
                targetDate={competition?.registrationDeadline}
                language={language}
              />

              {/* 4. Important Dates */}
              <ImportantDatesCard competition={competition} language={language} />

              {/* 5. Previous Winners */}
              <PreviousWinners
                winners={competition?.previousWinners}
                onPlayVideo={handlePlayVideo}
                language={language}
              />

              {/* 6. Tabs (About, Judging, Rules) */}
              <TabsSection competition={competition} language={language} />

              {/* 7. Rewards List */}
              <RewardsList rewards={competition?.rewards} language={language} />

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
              />

              {/* 9. Referral Card */}
              <ReferralCard user={activeUser} onShowToast={showToast} language={language} />

              {/* 10. Feedback & Ad */}
              <UserFeedbackBanner
                onFeedbackPress={() =>
                  showToast('Feedants reviews: 4.8/5 based on 1,200+ dancers.')
                }
                language={language}
              />
            </ScrollView>
          )}

          {/* Sticky Action CTA Button (active when on Competition Details on Mobile) */}
          {!loading && activeTab === 'contests' && (
            <BottomBar
              competition={competition}
              computed={computed}
              onRegisterPress={handleRegisterPress}
              onSubmitPress={handleSubmitPress}
              loading={actionLoading}
              language={language}
            />
          )}

          {/* Mobile Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            activeUser={activeUser}
            language={language}
          />
        </View>
      )}

        {/* Interactive Modals */}
        <VideoModal
          visible={videoModal.visible}
          videoUrl={videoModal.url}
          title={videoModal.title}
          onClose={() => setVideoModal({ visible: false, url: '', title: '' })}
        />

        <SubmissionModal
          visible={submissionModalVisible}
          onClose={() => setSubmissionModalVisible(false)}
          onSubmit={handleConfirmSubmission}
          loading={actionLoading}
          initialData={computed?.userState?.submission}
          language={language}
        />

        <PaymentModal
          visible={paymentModalVisible}
          onClose={() => setPaymentModalVisible(false)}
          onConfirm={handleConfirmPayment}
          entryFee={competition?.entryFee}
          spotsRemaining={computed?.spotsRemaining}
          loading={actionLoading}
        />

        <CreateModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreateSuccess={(newTitle) => showToast(`Created: ${newTitle}`)}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100vh',
    backgroundColor: '#F5F7FA',
    overflow: 'hidden',
  },
  desktopMainView: {
    flex: 1,
    height: '100vh',
    backgroundColor: '#F5F7FA',
    overflow: 'hidden',
  },
  desktopTwoColContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
    overflow: 'hidden',
  },
  desktopLeftScroll: {
    flex: 1.6,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  desktopLeftScrollContent: {
    padding: 24,
    paddingBottom: 64,
    gap: 16,
    maxWidth: 850,
    alignSelf: 'center',
    width: '100%',
  },
  desktopRightScroll: {
    width: 380,
    flexShrink: 0,
    backgroundColor: '#F5F7FA',
  },
  desktopRightScrollContent: {
    padding: 20,
    paddingBottom: 64,
    gap: 16,
  },
  retryBtn: {
    marginTop: 16,
    backgroundColor: '#0A7075',
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
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#F5F7FA',
    ...Platform.select({
      web: {
        boxShadow: '0 0 30px rgba(0,0,0,0.06)',
        height: '100vh',
        minHeight: '100vh',
      },
    }),
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: '#0A7075',
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    top: 54,
    left: 20,
    right: 20,
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
    zIndex: 9999,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
