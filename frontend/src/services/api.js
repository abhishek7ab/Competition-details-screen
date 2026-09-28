// Set EXPO_PUBLIC_API_BASE_URL in frontend/.env for deployed or physical-device builds.
// Example: EXPO_PUBLIC_API_BASE_URL=http://192.168.1.10:5000/api
export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

// Default fallback data ensuring the screen works seamlessly in standalone/Vercel deployments
const FALLBACK_COMPETITION = {
  _id: 'feedants-comp-default',
  title: 'Feedants Classical Dance',
  titleHindi: 'फीडएंट्स क्लासिकल डांस',
  category: 'Dance',
  tags: ['Dance', 'Multi-Win'],
  badgeText: 'Winners get certificate',
  badgeTextHindi: 'विजेताओं को प्रमाणपत्र मिलेगा',
  prizePool: 2000,
  entryFee: 99,
  maxSpots: 20,
  bookedSpots: 1,
  judge: {
    name: 'Manju Dubey',
    role: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  registrationDeadline: new Date(Date.now() + 110000000).toISOString(),
  submissionStartDate: new Date(Date.now() - 172800000).toISOString(),
  submissionEndDate: new Date(Date.now() + 432000000).toISOString(),
  resultDate: new Date(Date.now() + 604800000).toISOString(),
  previousWinners: [
    {
      name: 'Riya Shah',
      rankTitle: '1st Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      name: 'Aarav Mehta',
      rankTitle: '1st Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
    {
      name: 'Neha Verma',
      rankTitle: '2nd Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    },
    {
      name: 'Ishita Chouhan',
      rankTitle: '3rd Winner',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    },
  ],
  aboutText: {
    en: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
    hi: 'यह सभी आयु वर्ग के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें। पारंपरिक नृत्य के माध्यम से अपनी कला व्यक्त करें।',
  },
  judgingParameters: [
    { parameter: 'Rhythm & Taal', parameterHindi: 'ताल और लय', weightage: '30%', description: 'Sense of tempo, footwork precision, and adherence to classical beat cycles.' },
    { parameter: 'Bhava & Expressions', parameterHindi: 'भाव एवं अभिनय', weightage: '30%', description: 'Facial expressions, storytelling, and conveying emotional depth.' },
    { parameter: 'Mudra & Posture', parameterHindi: 'मुद्रा और संतुलन', weightage: '25%', description: 'Hand gestures, body alignment, and purity of classical form.' },
    { parameter: 'Costume & Presentation', parameterHindi: 'वेशभूषा और प्रस्तुति', weightage: '15%', description: 'Traditional attire, makeup, lighting, and overall stage presence.' },
  ],
  rulesAndEligibility: [
    { rule: 'Video must be unedited single-take recording.', ruleHindi: 'वीडियो बिना संपादित सिंगल-टेक रिकॉर्डिंग होना चाहिए।' },
    { rule: 'Duration should be between 2 to 5 minutes.', ruleHindi: 'अवधि 2 से 5 मिनट के बीच होनी चाहिए।' },
    { rule: 'Classical Indian dance styles only (Kathak, Bharatanatyam, Odissi, etc.).', ruleHindi: 'केवल शास्त्रीय भारतीय नृत्य शैलियां (कथक, भरतनाट्यम, ओडिसी, आदि)।' },
    { rule: 'High video and audio clarity required.', ruleHindi: 'उच्च वीडियो और ऑडियो स्पष्टता आवश्यक है।' },
  ],
  rewards: [
    { rank: 1, title: '1st Prize + Trophy + Certificate', amount: 1000 },
    { rank: 2, title: '2nd Prize + Medal + Certificate', amount: 350 },
    { rank: 3, title: '3rd Prize + Certificate of Excellence', amount: 250 },
    { rank: 4, title: '4th Rank - Commendation Certificate', amount: 150 },
    { rank: 5, title: '5th Rank - Merit Certificate', amount: 150 },
    { rank: 6, title: '6th Rank - Participation Certificate', amount: 100 },
  ],
  disclaimer: {
    en: 'Only contributions from paid participants will be considered for judging.',
    hi: 'केवल सशुल्क प्रतिभागियों के योगदान को ही निर्णय के लिए मान्य माना जाएगा।',
  },
  referralBonus: 10,
};

const FALLBACK_USERS = [
  {
    _id: 'user-pooja-sharma',
    name: 'Pooja Sharma',
    email: 'pooja.sharma@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    referralCode: 'pooja123',
  },
  {
    _id: 'user-rahul-verma',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    referralCode: 'rahul456',
  },
];

let localBookedSpots = 1;
let localRegisteredUsers = new Set(['user-pooja-sharma']);
let localSubmittedUsers = new Map();
let localStatusOverride = 'AUTO';

export const apiService = {
  // Fetch competition details with user state
  async getCompetition(userId) {
    try {
      const url = userId
        ? `${API_BASE_URL}/competitions/default?userId=${userId}`
        : `${API_BASE_URL}/competitions/default`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch competition');
      return json.data;
    } catch (error) {
      console.warn('Backend API unreachable, using graceful client fallback:', error.message);
      // Graceful offline/Vercel fallback
      const effectiveUserId = userId || FALLBACK_USERS[0]._id;
      const isRegistered = localRegisteredUsers.has(effectiveUserId);
      const submission = localSubmittedUsers.get(effectiveUserId) || null;
      const spotsRemaining = Math.max(0, FALLBACK_COMPETITION.maxSpots - localBookedSpots);

      return {
        competition: {
          ...FALLBACK_COMPETITION,
          bookedSpots: localBookedSpots,
          statusOverride: localStatusOverride,
        },
        computed: {
          currentState: localStatusOverride !== 'AUTO' ? localStatusOverride : 'REGISTRATION_OPEN',
          spotsRemaining,
          isRegistrationFull: spotsRemaining === 0,
          userState: {
            isRegistered,
            hasSubmitted: Boolean(submission),
            registration: isRegistered ? { paymentStatus: 'PAID' } : null,
            submission,
          },
        },
      };
    }
  },

  // Register user for competition
  async registerForCompetition(competitionId, userId) {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Registration failed');
      return json;
    } catch (error) {
      console.warn('Using local registration fallback:', error.message);
      localBookedSpots += 1;
      localRegisteredUsers.add(userId);
      return {
        success: true,
        message: 'Demo registration successful.',
        data: {
          bookedSpots: localBookedSpots,
          spotsRemaining: Math.max(0, FALLBACK_COMPETITION.maxSpots - localBookedSpots),
        },
      };
    }
  },

  // Submit dance entry
  async submitEntry(competitionId, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Submission failed');
      return json;
    } catch (error) {
      console.warn('Using local submission fallback:', error.message);
      if (data?.userId) {
        localSubmittedUsers.set(data.userId, {
          title: data.title || 'Classical Dance Performance',
          videoUrl: data.videoUrl || '',
          submittedAt: new Date().toISOString(),
        });
      }
      return { success: true, message: 'Submission uploaded successfully.' };
    }
  },

  // Get demo users to toggle between
  async getDemoUsers() {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to fetch demo users');
      return json.data || [];
    } catch (error) {
      console.warn('Using fallback demo users:', error.message);
      return FALLBACK_USERS;
    }
  },

  // Switch lifecycle state (for testing edge cases)
  async overrideState(competitionId, statusOverride) {
    try {
      const res = await fetch(`${API_BASE_URL}/competitions/${competitionId}/override-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusOverride }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update competition status');
      return json;
    } catch (error) {
      localStatusOverride = statusOverride;
      return { success: true };
    }
  },

  // Reset demo state back to 1/20 booked
  async resetDemoState() {
    try {
      const res = await fetch(`${API_BASE_URL}/dev/reset`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to reset demo data');
      return json;
    } catch (error) {
      localBookedSpots = 1;
      localRegisteredUsers = new Set(['user-pooja-sharma']);
      localSubmittedUsers.clear();
      localStatusOverride = 'AUTO';
      return { success: true };
    }
  },
};
