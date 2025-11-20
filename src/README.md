# Embark Edge - Financial Literacy App

A financial literacy web application for high schoolers that gamifies learning about personal finances with a point-based reward system.

## ⚠️ Important Note About React Native

This application is built for **web browsers** using React. While we previously attempted a React Native conversion, this environment (Figma Make) is web-based and cannot run React Native applications.

**If you need a React Native/mobile version**, you'll need to:
1. Download the code to your local machine
2. Set up a local React Native development environment with Expo
3. Test on iOS Simulator, Android Emulator, or physical devices

**This current version runs in web browsers only.**

## Features

- **Interactive Learning Modules**: RESP Mastery, Budgeting and Saving, and Borrowing and Investing
- **Quiz-Based Learning**: Educational content followed by interactive quizzes
- **Point System**: Earn points for completing lessons with streak bonuses
- **RESP Dashboard**: Track savings, set goals, and view Canadian post-secondary programs
- **Rewards Store**: Redeem points for real-world rewards
- **Progress Tracking**: Monitor achievements and learning progress
- **Embark Branding**: Official purple/lavender theme with Embark logo

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS (via globals.css)
- Shadcn/ui components
- Lucide React icons
- Motion (Framer Motion) for animations
- Sonner for toast notifications

## Project Structure

```
/
├── App.tsx                          # Main app with tabs
├── components/
│   ├── LearningModule.tsx           # Learning modules list
│   ├── InteractiveLessonContent.tsx # Quiz interface
│   ├── EmbarkEdgeDashboard.tsx      # RESP dashboard
│   ├── EmbarkAccountConnect.tsx     # Account connection
│   ├── EmbarkUnlockCard.tsx         # Promotional card
│   ├── ProgressTracker.tsx          # Achievements
│   ├── LessonData.tsx               # Quiz questions
│   └── ui/                          # Shadcn components
├── styles/
│   └── globals.css                  # Global styles & Tailwind
└── package.json
```

## Key Features

### Learning Modules
- RESP Mastery (Canadian education savings)
- Budgeting and Saving
- Borrowing and Investing
- Educational content before each quiz
- Multiple question types (multiple choice, scenarios, true/false)

### Gamification
- Point-based rewards
- Streak bonuses for consecutive correct answers
- Time bonuses for quick responses
- Achievement system
- Rewards store with real gift cards

### RESP Dashboard
- Account balance tracking
- Contribution forms
- Savings goal setting
- Canadian post-secondary program costs
- Real-time progress visualization

## Color Scheme

- Primary Purple: `#8B5CF6`
- Secondary Indigo: `#6366F1`
- Lavender: `#E9D5FF`
- Success Green: `#10B981`
- Warning Orange: `#F97316`
- Gold: `#FBBF24`

## Embark Integration

- Official Embark logo from Storyblok CDN
- "Get Started Free" CTAs link to Embark landing page
- UTM tracking for lead generation
- Educational focus on RESP savings
- No collection of PII or sensitive data

## Development Notes

### Mobile Responsiveness
The app is designed mobile-first with a max-width container (`max-w-md`) to simulate a mobile experience in web browsers. All interactions are touch-friendly.

### Data Persistence
Currently uses React state (no backend). All progress is lost on page refresh. To add persistence:
- Add localStorage for client-side storage
- Integrate with Supabase or similar backend
- Connect to real Embark RESP APIs

### Lesson Content
All educational content and quiz questions are in `/components/LessonData.tsx`. Each lesson includes:
- Educational text with markdown-style formatting
- Multiple quiz questions
- Points allocation
- Explanations for each answer
- Scenario-based questions with consequences

## Future Enhancements

- [ ] LocalStorage for progress persistence
- [ ] Real RESP API integration
- [ ] More learning modules
- [ ] Social features (leaderboards)
- [ ] Parent dashboard
- [ ] Email notifications
- [ ] French language support
- [ ] Dark mode

## License

Proprietary - Embark Student Corp

---

## About React Native

The previous attempt to convert this to React Native failed because:

1. **Environment Limitation**: Figma Make is a web-based platform that cannot run React Native code
2. **Native Modules**: React Native requires native iOS/Android modules that don't exist in browsers
3. **Different Architecture**: React Native uses native components, not HTML/CSS

### To Run as React Native (External Setup)

If you want to run this as a mobile app:

1. **Setup Local Environment**:
   ```bash
   npm install -g expo-cli
   expo init embark-edge-mobile
   ```

2. **Convert Components**:
   - Replace `div`, `button`, etc. with `View`, `TouchableOpacity`
   - Convert CSS to StyleSheet
   - Replace lucide-react with @expo/vector-icons
   - Use React Navigation instead of web tabs

3. **Test**:
   - iOS: Use Xcode Simulator
   - Android: Use Android Studio Emulator
   - Physical Device: Use Expo Go app

4. **Deploy**:
   - Use EAS Build for production apps
   - Submit to App Store / Google Play

The web version you see here is the correct implementation for this browser-based environment.
