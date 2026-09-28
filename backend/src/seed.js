const Competition = require('./models/Competition');
const User = require('./models/User');
const Registration = require('./models/Registration');

const seedDatabase = async () => {
  // Demo accounts and their simulated PAID registration must never enter production.
  if (process.env.NODE_ENV === 'production') {
    console.log('[Seed] Skipping demo seed data in production.');
    return;
  }

  try {
    const existingComp = await Competition.findOne();
    if (existingComp) {
      console.log('[Seed] Database already initialized with competition data.');
      return;
    }

    console.log('[Seed] Initializing seed data with Feedants Classical Dance...');

    // 1. Create Demo Users
    const user1 = await User.create({
      name: 'Pooja Sharma',
      email: 'pooja.sharma@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      referralCode: 'pooja123',
    });

    const user2 = await User.create({
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      referralCode: 'rahul456',
    });

    // 2. Set dates (registration countdown is active ~1 day 6 hours from now for real countdown feeling, or August 2026)
    const now = new Date();
    // Default countdown set to 1 day, 6 hours, 28 minutes, 32 seconds from now to match the screenshot badge!
    const registrationDeadline = new Date(now.getTime() + (1 * 86400 + 6 * 3600 + 28 * 60 + 32) * 1000);
    const submissionStartDate = new Date(now.getTime() - 2 * 86400 * 1000);
    const submissionEndDate = new Date(now.getTime() + 5 * 86400 * 1000);
    const resultDate = new Date(now.getTime() + 7 * 86400 * 1000);

    // 3. Create Competition
    const competition = await Competition.create({
      title: 'Feedants Classical Dance',
      titleHindi: 'फीडएंट्स क्लासिकल डांस',
      category: 'Dance',
      tags: ['Dance', 'Multi-Win'],
      badgeText: 'Winners get certificate',
      badgeTextHindi: 'विजेताओं को प्रमाणपत्र मिलेगा',
      prizePool: 1500,
      entryFee: 99,
      maxSpots: 20,
      bookedSpots: 1, // Matches "1 / 20 Booked" and "Only 19 spots left"
      judge: {
        name: 'Manju Dubey',
        role: 'Professional Kathak Dancer',
        experience: '12+ Years of Experience',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      },
      registrationDeadline,
      submissionStartDate,
      submissionEndDate,
      resultDate,
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
        {
          parameter: 'Rhythm & Taal',
          parameterHindi: 'ताल और लय',
          weightage: '30%',
          description: 'Sense of tempo, footwork precision, and adherence to classical beat cycles.',
        },
        {
          parameter: 'Bhava & Expressions',
          parameterHindi: 'भाव एवं अभिनय',
          weightage: '30%',
          description: 'Facial expressions, storytelling, and conveying emotional depth.',
        },
        {
          parameter: 'Mudra & Posture',
          parameterHindi: 'मुद्रा और संतुलन',
          weightage: '25%',
          description: 'Hand gestures, body alignment, and purity of classical form.',
        },
        {
          parameter: 'Costume & Presentation',
          parameterHindi: 'वेशभूषा और प्रस्तुति',
          weightage: '15%',
          description: 'Traditional attire, makeup, lighting, and overall stage presence.',
        },
      ],
      rulesAndEligibility: [
        {
          rule: 'Open to all age groups across India and internationally.',
          ruleHindi: 'भारत और अंतरराष्ट्रीय स्तर पर सभी आयु वर्ग के लिए खुला है।',
        },
        {
          rule: 'Video submission length must be between 2 to 5 minutes.',
          ruleHindi: 'वीडियो प्रस्तुति की अवधि 2 से 5 मिनट के बीच होनी चाहिए।',
        },
        {
          rule: 'Classical dance styles recognized: Kathak, Bharatanatyam, Odissi, Kuchipudi, Kathakali, Mohiniyattam, Manipuri, Sattriya.',
          ruleHindi: 'मान्यता प्राप्त शास्त्रीय नृत्य: कथक, भरतनाट्यम, ओडिसी, कुचिपुड़ी, आदि।',
        },
        {
          rule: 'Uncut, continuous performance video is recommended for genuine judging.',
          ruleHindi: 'उचित निर्णय के लिए निरंतर और अनकट प्रदर्शन वीडियो की अनुशंसा की जाती है।',
        },
        {
          rule: 'Only entries from verified paid registrations will be submitted to the judge.',
          ruleHindi: 'केवल सत्यापित सशुल्क पंजीकरणों को ही निर्णायक मंडल को भेजा जाएगा।',
        },
      ],
      rewards: [
        { rank: 1, title: '1st Winner', amount: 550 },
        { rank: 2, title: '2nd Winner', amount: 300 },
        { rank: 3, title: '3rd Winner', amount: 240 },
        { rank: 4, title: '4th Winner', amount: 200 },
        { rank: 5, title: '5th Winner', amount: 130 },
        { rank: 6, title: '6th Winner', amount: 80 },
      ],
      disclaimer: {
        en: 'Only contributions from paid participants will be considered for judging.',
        hi: 'केवल सशुल्क प्रतिभागियों के योगदान को ही निर्णय के लिए मान्य माना जाएगा।',
      },
      referralBonus: 10,
    });

    // 4. Register user1 to match screenshot state ("Registered" badge + "Upload Submission")
    await Registration.create({
      userId: user1._id,
      competitionId: competition._id,
      paymentStatus: 'PAID',
      amountPaid: 99,
      paymentId: 'pay_feedants_initial_01',
    });

    console.log('[Seed] Database seeded successfully!');
    console.log(`[Seed] Seeded Competition ID: ${competition._id}`);
    console.log(`[Seed] Registered User ID: ${user1._id} (${user1.name})`);
    console.log(`[Seed] Unregistered User ID: ${user2._id} (${user2.name})`);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
