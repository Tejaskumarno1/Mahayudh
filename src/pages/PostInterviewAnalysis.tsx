import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  Download,
  Share2,
  ArrowLeft,
  Star,
  User,
  Calendar,
  Award,
  Zap,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Mic,
  Brain,
  Shield,
  Activity,
  PieChart,
  LineChart,
  Video,
  FileText,
  Users,
  Phone,
  Timer,
  TrendingDown
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { interviewDataStorage, type InterviewSession } from '@/utils/interviewDataStorage';

interface AnalysisData {
  overallScore: number;
  communicationScore: number;
  confidenceScore: number;
  bodyLanguageScore: number;
  emotionalStabilityScore: number;
  policyComplianceScore: number;
  contentQualityScore: number;
  behaviorConfidenceScore: number;
  integrityScore: number;
  strengths: string[];
  weaknesses: string[];
  coachingTips: string[];
  hiringRecommendation: 'Strong' | 'Moderate' | 'Low';
  processingTime: number;
  detailedAnalysis: {
    policyViolations: {
      phoneDetections: number;
      multiplePeopleDetections: number;
      violationTimestamps: Array<{
        type: 'phone' | 'multiplePeople';
        timestamp: Date;
        description: string;
      }>;
    };
    emotionAnalysis: {
      neutral: number;
      happy: number;
      surprised: number;
      sad: number;
      angry: number;
      fearful: number;
      disgusted: number;
      averageConfidence: number;
      emotionTimeline: Array<{
        timestamp: Date;
        dominant: string;
        confidence: number;
        scores: Record<string, number>;
      }>;
    };
    behaviorAnalysis: {
      eyeContactQuality: string;
      breaksInEyeContact: number;
      totalTimeLookingAway: number;
      handPositioning: string;
      postureQuality: string;
      poorPostureEvents: number;
      poorPostureDuration: number;
    };
    communicationAnalysis: {
      responseTime: number;
      messageCount: number;
      averageResponseLength: number;
      clarityScore: number;
      answerQualityScore: number;
      technicalTermUsage: number;
      relevanceScore: number;
    };
    audioAnalysis: {
      distinctVoicesDetected: number;
      backgroundNoiseLevel: string;
      audioQuality: string;
      speakingPace: string;
    };
    videoHighlights: {
      violationMoments: Array<{
        timestamp: Date;
        type: string;
        description: string;
        severity: 'low' | 'medium' | 'high';
      }>;
      bestMoments: Array<{
        timestamp: Date;
        description: string;
        score: number;
      }>;
      worstMoments: Array<{
        timestamp: Date;
        description: string;
        score: number;
      }>;
    };
  };
}

const PostInterviewAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        console.log('🔍 Loading interview analysis...');
        
        // First try to get current session
        let session = interviewDataStorage.getCurrentSession();
        console.log('📋 Current session:', session ? session.sessionId : 'None');
        
        // If no current session, try to get the most recent completed session
        if (!session) {
          const allSessions = interviewDataStorage.getAllSessions();
          console.log('📊 All sessions count:', allSessions.length);
          
          const completedSessions = allSessions.filter(s => s.isComplete);
          console.log('✅ Completed sessions count:', completedSessions.length);
          
          if (completedSessions.length > 0) {
            // Get the most recent completed session
            session = completedSessions.sort((a, b) => 
              new Date(b.endTime || 0).getTime() - new Date(a.endTime || 0).getTime()
            )[0];
            console.log('🎯 Most recent completed session:', session.sessionId);
          }
        }
        
        if (!session) {
          console.log('❌ No session found, creating demo analysis');
          // Create a demo session for testing
          const demoSession: InterviewSession = {
            sessionId: 'demo-session',
            candidateName: 'Demo Candidate',
            jobTitle: 'Software Engineer',
            duration: 15,
            aiBackend: 'gemini',
            startTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            endTime: new Date(),
            messages: [
              {
                role: 'hr',
                content: 'Tell me about yourself and your experience.',
                timestamp: new Date(Date.now() - 14 * 60 * 1000),
                messageId: 'demo-1'
              },
              {
                role: 'candidate',
                content: 'I am a software engineer with 3 years of experience in React and Node.js. I enjoy solving complex problems and working in collaborative teams.',
                timestamp: new Date(Date.now() - 13 * 60 * 1000),
                messageId: 'demo-2'
              },
              {
                role: 'hr',
                content: 'What are your strengths and weaknesses?',
                timestamp: new Date(Date.now() - 12 * 60 * 1000),
                messageId: 'demo-3'
              },
              {
                role: 'candidate',
                content: 'My strengths include strong problem-solving skills and attention to detail. I\'m working on improving my public speaking skills.',
                timestamp: new Date(Date.now() - 11 * 60 * 1000),
                messageId: 'demo-4'
              }
            ],
            emotions: [
              {
                dominant: 'neutral',
                confidence: 0.85,
                scores: { happy: 0.1, sad: 0.05, surprised: 0.1, neutral: 0.85, disgusted: 0, angry: 0, fearful: 0 },
                icon: '😐',
                timestamp: new Date(Date.now() - 13 * 60 * 1000)
              },
              {
                dominant: 'happy',
                confidence: 0.75,
                scores: { happy: 0.75, sad: 0.05, surprised: 0.1, neutral: 0.1, disgusted: 0, angry: 0, fearful: 0 },
                icon: '😊',
                timestamp: new Date(Date.now() - 11 * 60 * 1000)
              }
            ],
            behaviorAnalysis: [
              {
                handDetectionCounter: 5,
                handDetectionDuration: 3.2,
                notFacingCounter: 8,
                notFacingDuration: 4.5,
                badPostureDetectionCounter: 3,
                badPostureDuration: 2.1,
                handPresence: true,
                eyeContact: true,
                posture: 'good',
                timestamp: new Date(Date.now() - 13 * 60 * 1000)
              }
            ],
            objectDetections: [
              {
                class: 'person',
                score: 0.92,
                bbox: [0.1, 0.1, 0.8, 0.8],
                timestamp: new Date(Date.now() - 13 * 60 * 1000)
              }
            ],
            confidenceScore: 78,
            engagementScore: 82,
            attentivenessScore: 85,
            questionCount: 2,
            isComplete: true
          };
          
          setCurrentSession(demoSession);
          const analysis = generateDetailedAnalysis(demoSession);
          setAnalysisData(analysis);
          return;
        }

        console.log('✅ Session found, generating analysis...');
        setCurrentSession(session);
        
        // Generate comprehensive analysis
        const analysis = generateDetailedAnalysis(session);
        setAnalysisData(analysis);
        console.log('📈 Analysis generated successfully');
      } catch (error) {
        console.error('Error loading analysis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [navigate]);

  const generateDetailedAnalysis = (session: InterviewSession): AnalysisData => {
    const startTime = performance.now();

    // Calculate emotion distribution
    const emotionCounts = session.emotions.reduce((acc, emotion) => {
      acc[emotion.dominant] = (acc[emotion.dominant] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalEmotions = session.emotions.length;
    const emotionAnalysis = {
      neutral: (emotionCounts.neutral || 0) / totalEmotions * 100,
      happy: (emotionCounts.happy || 0) / totalEmotions * 100,
      surprised: (emotionCounts.surprised || 0) / totalEmotions * 100,
      sad: (emotionCounts.sad || 0) / totalEmotions * 100,
      angry: (emotionCounts.angry || 0) / totalEmotions * 100,
      fearful: (emotionCounts.fearful || 0) / totalEmotions * 100,
      disgusted: (emotionCounts.disgusted || 0) / totalEmotions * 100,
    };

    // Calculate average confidence and create emotion timeline
    const averageConfidence = session.emotions.reduce((sum, emotion) => sum + emotion.confidence, 0) / totalEmotions;
    const emotionTimeline = session.emotions.map(emotion => ({
      timestamp: emotion.timestamp,
      dominant: emotion.dominant,
      confidence: emotion.confidence,
      scores: emotion.scores
    }));

    // Calculate behavior metrics
    const behaviorAnalysis = {
      eyeContactQuality: session.behaviorAnalysis.length > 0 ? 
        session.behaviorAnalysis.filter(b => b.eyeContact).length / session.behaviorAnalysis.length > 0.8 ? 'Excellent' : 
        session.behaviorAnalysis.filter(b => b.eyeContact).length / session.behaviorAnalysis.length > 0.6 ? 'Good' : 'Poor' : 'Unknown',
      // Use the maximum recorded breaks counter rather than summing per-frame samples
      breaksInEyeContact: session.behaviorAnalysis.reduce((max, b) => Math.max(max, b.notFacingCounter), 0),
      totalTimeLookingAway: session.behaviorAnalysis.reduce((sum, b) => sum + b.notFacingDuration, 0),
      handPositioning: session.behaviorAnalysis.filter(b => !b.handPresence).length < session.behaviorAnalysis.length * 0.2 ? 'Optimal' : 'Needs Improvement',
      postureQuality: session.behaviorAnalysis.filter(b => b.posture === 'good').length / session.behaviorAnalysis.length > 0.7 ? 'Professional' : 'Needs Improvement',
      poorPostureEvents: session.behaviorAnalysis.reduce((sum, b) => sum + b.badPostureDetectionCounter, 0),
      poorPostureDuration: session.behaviorAnalysis.reduce((sum, b) => sum + b.badPostureDuration, 0),
    };

    // Calculate communication metrics with enhanced analysis
    const candidateMessages = session.messages.filter(m => m.role === 'candidate');
    const communicationAnalysis = {
      responseTime: session.duration / candidateMessages.length,
      messageCount: candidateMessages.length,
      averageResponseLength: candidateMessages.reduce((sum, m) => sum + m.content.length, 0) / candidateMessages.length,
      clarityScore: Math.min(100, candidateMessages.reduce((sum, m) => sum + Math.min(100, m.content.length * 2), 0) / candidateMessages.length),
      answerQualityScore: Math.min(100, candidateMessages.reduce((sum, m) => {
        // Simple NLP-based quality scoring
        const wordCount = m.content.split(' ').length;
        const sentenceCount = m.content.split(/[.!?]+/).length;
        const avgWordsPerSentence = wordCount / sentenceCount;
        const hasTechnicalTerms = /(algorithm|database|framework|api|deployment|optimization|scalability|architecture|testing|debugging)/i.test(m.content);
        
        let qualityScore = Math.min(100, wordCount * 2); // Base score from length
        if (avgWordsPerSentence > 5 && avgWordsPerSentence < 25) qualityScore += 20; // Good sentence structure
        if (hasTechnicalTerms) qualityScore += 15; // Technical knowledge
        if (wordCount > 20) qualityScore += 10; // Detailed responses
        
        return sum + qualityScore;
      }, 0) / candidateMessages.length),
      technicalTermUsage: candidateMessages.reduce((sum, m) => {
        const technicalTerms = m.content.match(/(algorithm|database|framework|api|deployment|optimization|scalability|architecture|testing|debugging)/gi);
        return sum + (technicalTerms ? technicalTerms.length : 0);
      }, 0),
      relevanceScore: Math.min(100, candidateMessages.reduce((sum, m) => {
        // Simple relevance scoring based on question-answer matching
        const questionKeywords = ['experience', 'skills', 'project', 'challenge', 'team', 'problem', 'solution'];
        const hasRelevantKeywords = questionKeywords.some(keyword => 
          m.content.toLowerCase().includes(keyword)
        );
        return sum + (hasRelevantKeywords ? 85 : 60);
      }, 0) / candidateMessages.length),
    };

    // AI-Driven Scoring System with weighted factors
    const contentQualityScore = Math.round(communicationAnalysis.answerQualityScore * 0.5 + 
      communicationAnalysis.relevanceScore * 0.3 + 
      communicationAnalysis.technicalTermUsage * 5);
    
    const behaviorConfidenceScore = Math.round(
      (emotionAnalysis.happy * 0.3) +
      (emotionAnalysis.neutral * 0.4) +
      (100 - emotionAnalysis.fearful * 2 - emotionAnalysis.sad * 1.5) * 0.3
    );
    
    const integrityScore = Math.max(0, 100 - (session.phoneWarningCount || 0) * 33 - (session.multiplePeopleWarningCount || 0) * 33);

    // Calculate scores
    const communicationScore = Math.min(100, Math.max(0, 
      (communicationAnalysis.clarityScore * 0.4) + 
      (Math.min(100, 100 - communicationAnalysis.responseTime * 10) * 0.3) +
      (Math.min(100, communicationAnalysis.averageResponseLength * 0.5) * 0.3)
    ));

    const confidenceScore = Math.min(100, Math.max(0,
      (emotionAnalysis.happy * 0.3) +
      (emotionAnalysis.neutral * 0.4) +
      (100 - emotionAnalysis.fearful * 2 - emotionAnalysis.sad * 1.5) * 0.3
    ));

    const bodyLanguageScore = Math.min(100, Math.max(0,
      (behaviorAnalysis.eyeContactQuality === 'Excellent' ? 100 : behaviorAnalysis.eyeContactQuality === 'Good' ? 75 : 50) * 0.4 +
      (behaviorAnalysis.handPositioning === 'Optimal' ? 100 : 60) * 0.3 +
      (behaviorAnalysis.postureQuality === 'Professional' ? 100 : 60) * 0.3
    ));

    const emotionalStabilityScore = Math.min(100, Math.max(0,
      (emotionAnalysis.neutral * 0.5) +
      (emotionAnalysis.happy * 0.3) +
      (100 - emotionAnalysis.angry * 2 - emotionAnalysis.fearful * 2) * 0.2
    ));

    // Policy compliance based on violations
    const phoneDetections = session.phoneWarningCount || 0;
    const multiplePeopleDetections = session.multiplePeopleWarningCount || 0;
    const totalViolations = phoneDetections + multiplePeopleDetections;
    const policyComplianceScore = Math.max(0, 100 - (phoneDetections * 15 + multiplePeopleDetections * 20));

    // Enhanced overall score with AI-driven weights
    const overallScore = Math.round(
      (contentQualityScore * 0.50) +      // Content Quality: 50%
      (behaviorConfidenceScore * 0.20) +  // Behavior & Confidence: 20%
      (integrityScore * 0.30)             // Integrity (no cheating): 30%
    );

    // Generate violation timestamps
    const violationTimestamps = [];
    if (phoneDetections > 0) {
      violationTimestamps.push({
        type: 'phone' as const,
        timestamp: session.startTime,
        description: `Phone detected ${phoneDetections} time(s) during interview`
      });
    }
    if (multiplePeopleDetections > 0) {
      violationTimestamps.push({
        type: 'multiplePeople' as const,
        timestamp: session.startTime,
        description: `Multiple people detected ${multiplePeopleDetections} time(s) during interview`
      });
    }

    // Generate video highlights
    const videoHighlights = {
      violationMoments: violationTimestamps.map(v => ({
        timestamp: v.timestamp,
        type: v.type,
        description: v.description,
        severity: v.type === 'phone' ? 'high' as const : 'medium' as const
      })),
      bestMoments: emotionTimeline
        .filter(e => e.confidence > 0.8 && ['happy', 'neutral'].includes(e.dominant))
        .slice(0, 3)
        .map(e => ({
          timestamp: e.timestamp,
          description: `High confidence ${e.dominant} emotion detected`,
          score: Math.round(e.confidence * 100)
        })),
      worstMoments: emotionTimeline
        .filter(e => e.confidence > 0.7 && ['sad', 'fearful', 'angry'].includes(e.dominant))
        .slice(0, 3)
        .map(e => ({
          timestamp: e.timestamp,
          description: `${e.dominant} emotion detected with high confidence`,
          score: Math.round(e.confidence * 100)
        }))
    };

    // Generate strengths and weaknesses
    const strengths = [];
    const weaknesses = [];
    const coachingTips = [];

    if (contentQualityScore > 80) strengths.push("Excellent content quality and technical knowledge");
    else if (contentQualityScore < 60) weaknesses.push("Needs improvement in content quality and technical depth");

    if (behaviorConfidenceScore > 80) strengths.push("High confidence and positive demeanor");
    else if (behaviorConfidenceScore < 60) weaknesses.push("Could benefit from confidence-building exercises");

    if (integrityScore > 80) strengths.push("Maintained high integrity throughout the interview");
    else if (integrityScore < 60) weaknesses.push("Policy violations detected - needs to follow interview guidelines");

    if (communicationScore > 80) strengths.push("Excellent verbal communication skills");
    else if (communicationScore < 60) weaknesses.push("Needs improvement in verbal communication");

    if (bodyLanguageScore > 80) strengths.push("Strong body language and professional posture");
    else if (bodyLanguageScore < 60) weaknesses.push("Body language needs improvement");

    if (emotionalStabilityScore > 80) strengths.push("Emotionally stable and composed");
    else if (emotionalStabilityScore < 60) weaknesses.push("May need to work on emotional regulation");

    if (behaviorAnalysis.eyeContactQuality === 'Excellent') strengths.push("Maintains excellent eye contact");
    else if (behaviorAnalysis.eyeContactQuality === 'Poor') weaknesses.push("Eye contact needs improvement");

    if (behaviorAnalysis.handPositioning === 'Optimal') strengths.push("Good hand positioning and gestures");
    else weaknesses.push("Could improve hand positioning and gestures");

    // Add coaching tips
    if (contentQualityScore < 70) coachingTips.push("Practice providing detailed, technical responses with specific examples");
    if (behaviorConfidenceScore < 70) coachingTips.push("Work on maintaining positive facial expressions and confident posture");
    if (integrityScore < 70) coachingTips.push("Ensure interview environment is free from distractions and follows guidelines");
    if (communicationScore < 70) coachingTips.push("Practice speaking clearly and at a measured pace");
    if (bodyLanguageScore < 70) coachingTips.push("Practice maintaining eye contact and professional posture");
    if (emotionalStabilityScore < 70) coachingTips.push("Practice stress management techniques before interviews");
    if (behaviorAnalysis.breaksInEyeContact > 10) coachingTips.push("Practice maintaining consistent eye contact during conversations");

    // Determine hiring recommendation
    let hiringRecommendation: 'Strong' | 'Moderate' | 'Low' = 'Moderate';
    if (overallScore >= 85) hiringRecommendation = 'Strong';
    else if (overallScore < 60) hiringRecommendation = 'Low';

    const processingTime = performance.now() - startTime;

    return {
      overallScore,
      communicationScore: Math.round(communicationScore),
      confidenceScore: Math.round(confidenceScore),
      bodyLanguageScore: Math.round(bodyLanguageScore),
      emotionalStabilityScore: Math.round(emotionalStabilityScore),
      policyComplianceScore: Math.round(policyComplianceScore),
      contentQualityScore,
      behaviorConfidenceScore,
      integrityScore,
      strengths: strengths.length > 0 ? strengths : ["Shows potential for growth"],
      weaknesses: weaknesses.length > 0 ? weaknesses : ["No major weaknesses identified"],
      coachingTips: coachingTips.length > 0 ? coachingTips : ["Continue practicing interview skills"],
      hiringRecommendation,
      processingTime: Math.round(processingTime),
      detailedAnalysis: {
        policyViolations: {
          phoneDetections,
          multiplePeopleDetections,
          violationTimestamps,
        },
        emotionAnalysis: {
          ...emotionAnalysis,
          averageConfidence,
          emotionTimeline,
        },
        behaviorAnalysis,
        communicationAnalysis,
        audioAnalysis: {
          distinctVoicesDetected: 1, // Assuming single candidate
          backgroundNoiseLevel: 'Low',
          audioQuality: 'Good',
          speakingPace: 'Normal',
        },
        videoHighlights,
      },
    };
  };

  const exportAnalysis = () => {
    if (!analysisData || !currentSession) return;
    
    const exportData = {
      session: currentSession,
      analysis: analysisData,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-analysis-${currentSession.sessionId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your interview performance...</p>
        </div>
      </div>
    );
  }

  if (!analysisData || !currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Interview Data Found</h2>
          <p className="text-gray-600 mb-4">Please complete an interview to view the analysis.</p>
          <Button onClick={() => navigate('/ai-interview-coach')}>
            Start New Interview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/ai-interview-coach')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Interview
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Post-Interview Analysis</h1>
              <p className="text-gray-600">Detailed performance evaluation and coaching feedback</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportAnalysis} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Overall Performance Score</CardTitle>
                <CardDescription>
                  Comprehensive evaluation based on communication, confidence, body language, emotional stability, and policy compliance
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">{analysisData.overallScore}</div>
                <div className="text-sm text-gray-500">out of 100</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analysisData.communicationScore}</div>
                <div className="text-sm text-gray-600">Communication</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analysisData.confidenceScore}</div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{analysisData.bodyLanguageScore}</div>
                <div className="text-sm text-gray-600">Body Language</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{analysisData.emotionalStabilityScore}</div>
                <div className="text-sm text-gray-600">Emotional Stability</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-scoring">AI Scoring</TabsTrigger>
          <TabsTrigger value="detection">Detection Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="highlights">Video Highlights</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisData.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisData.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Hiring Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Hiring Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={analysisData.hiringRecommendation === 'Strong' ? 'default' : 
                             analysisData.hiringRecommendation === 'Moderate' ? 'secondary' : 'destructive'}
                    className="text-lg px-4 py-2"
                  >
                    {analysisData.hiringRecommendation}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Based on overall performance score of {analysisData.overallScore}/100
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-scoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content Quality Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    Content Quality
                  </CardTitle>
                  <CardDescription>Technical knowledge and answer depth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{analysisData.contentQualityScore}</div>
                    <div className="text-sm text-gray-600 mb-4">out of 100</div>
                    <Progress value={analysisData.contentQualityScore} className="w-full" />
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex justify-between mb-1">
                        <span>Technical Terms Used</span>
                        <span>{analysisData.detailedAnalysis.communicationAnalysis.technicalTermUsage}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Answer Quality</span>
                        <span>{analysisData.detailedAnalysis.communicationAnalysis.answerQualityScore.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Relevance Score</span>
                        <span>{analysisData.detailedAnalysis.communicationAnalysis.relevanceScore.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Behavior & Confidence Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Behavior & Confidence
                  </CardTitle>
                  <CardDescription>Body language and emotional stability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{analysisData.behaviorConfidenceScore}</div>
                    <div className="text-sm text-gray-600 mb-4">out of 100</div>
                    <Progress value={analysisData.behaviorConfidenceScore} className="w-full" />
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex justify-between mb-1">
                        <span>Body Language</span>
                        <span>{analysisData.bodyLanguageScore}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Emotional Stability</span>
                        <span>{analysisData.emotionalStabilityScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidence</span>
                        <span>{analysisData.confidenceScore}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integrity Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Integrity Score
                  </CardTitle>
                  <CardDescription>Policy compliance and interview conduct</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">{analysisData.integrityScore}</div>
                    <div className="text-sm text-gray-600 mb-4">out of 100</div>
                    <Progress value={analysisData.integrityScore} className="w-full" />
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex justify-between mb-1">
                        <span>Phone Detections</span>
                        <span className="text-red-600">{analysisData.detailedAnalysis.policyViolations.phoneDetections}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Multiple People</span>
                        <span className="text-red-600">{analysisData.detailedAnalysis.policyViolations.multiplePeopleDetections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Policy Compliance</span>
                        <span>{analysisData.policyComplianceScore}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Scoring Weight Explanation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  AI-Driven Scoring System
                </CardTitle>
                <CardDescription>Weighted evaluation model for comprehensive assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">50%</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Content Quality</div>
                    <div className="text-xs text-gray-600">Technical knowledge, answer depth, and relevance</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">20%</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Behavior & Confidence</div>
                    <div className="text-xs text-gray-600">Body language, emotional stability, and confidence</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-2">30%</div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Integrity</div>
                    <div className="text-xs text-gray-600">Policy compliance and interview conduct</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detection" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detection Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-orange-600" />
                    Detection Summary
                  </CardTitle>
                  <CardDescription>Comprehensive overview of all detected violations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-red-600" />
                        <span className="font-medium">Phone Detections</span>
                      </div>
                      <Badge variant="destructive" className="text-lg px-3 py-1">
                        {analysisData.detailedAnalysis.policyViolations.phoneDetections}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Multiple People Detections</span>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {analysisData.detailedAnalysis.policyViolations.multiplePeopleDetections}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Policy Compliance Score</span>
                      </div>
                      <Badge className="text-lg px-3 py-1">
                        {analysisData.policyComplianceScore}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Violation Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Violation Timeline
                  </CardTitle>
                  <CardDescription>Timestamps of detected policy violations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.detailedAnalysis.policyViolations.violationTimestamps.length > 0 ? (
                      analysisData.detailedAnalysis.policyViolations.violationTimestamps.map((violation, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${violation.type === 'phone' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">{violation.description}</div>
                            <div className="text-xs text-gray-500">
                              {violation.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <p>No policy violations detected</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audio Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-blue-600" />
                  Audio Analysis
                </CardTitle>
                <CardDescription>Audio quality and voice detection metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysisData.detailedAnalysis.audioAnalysis.distinctVoicesDetected}</div>
                    <div className="text-sm text-gray-600">Distinct Voices</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysisData.detailedAnalysis.audioAnalysis.backgroundNoiseLevel}</div>
                    <div className="text-sm text-gray-600">Background Noise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analysisData.detailedAnalysis.audioAnalysis.audioQuality}</div>
                    <div className="text-sm text-gray-600">Audio Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analysisData.detailedAnalysis.audioAnalysis.speakingPace}</div>
                    <div className="text-sm text-gray-600">Speaking Pace</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Policy Violations */}
              <Card>
                <CardHeader>
                  <CardTitle>Policy Violations</CardTitle>
                  <CardDescription>Detected during the interview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phone Detections</span>
                      <Badge variant="destructive">{analysisData.detailedAnalysis.policyViolations.phoneDetections}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Multiple People Detections</span>
                      <Badge variant="destructive">{analysisData.detailedAnalysis.policyViolations.multiplePeopleDetections}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Policy Compliance Score</span>
                      <Badge>{analysisData.policyComplianceScore}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Emotion Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Emotion Analysis</CardTitle>
                  <CardDescription>Distribution of detected emotions during the interview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analysisData.detailedAnalysis.emotionAnalysis)
                      .filter(([key, value]) => typeof value === 'number' && !['averageConfidence', 'emotionTimeline'].includes(key))
                      .map(([emotion, percentage]) => (
                        <div key={emotion} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{emotion}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={percentage as number} className="w-20" />
                            <span className="text-sm font-medium">{(percentage as number).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Behavior Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Behavior Analysis</CardTitle>
                  <CardDescription>Body language and behavioral metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Eye Contact Quality</span>
                      <Badge variant="outline">{analysisData.detailedAnalysis.behaviorAnalysis.eyeContactQuality}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Breaks in Eye Contact</span>
                      <span className="text-sm font-medium">{analysisData.detailedAnalysis.behaviorAnalysis.breaksInEyeContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hand Positioning</span>
                      <Badge variant="outline">{analysisData.detailedAnalysis.behaviorAnalysis.handPositioning}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Posture Quality</span>
                      <Badge variant="outline">{analysisData.detailedAnalysis.behaviorAnalysis.postureQuality}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Communication Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Communication Analysis</CardTitle>
                <CardDescription>Verbal communication metrics and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysisData.detailedAnalysis.communicationAnalysis.messageCount}</div>
                    <div className="text-sm text-gray-600">Messages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysisData.detailedAnalysis.communicationAnalysis.averageResponseLength.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Avg. Response Length</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analysisData.detailedAnalysis.communicationAnalysis.responseTime.toFixed(1)}s</div>
                    <div className="text-sm text-gray-600">Avg. Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analysisData.detailedAnalysis.communicationAnalysis.clarityScore.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Clarity Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emotion Timeline Graph */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-purple-600" />
                  Emotion Timeline
                </CardTitle>
                <CardDescription>Emotional states throughout the interview with confidence levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Confidence: {analysisData.detailedAnalysis.emotionAnalysis.averageConfidence.toFixed(1)}%</span>
                    <span className="text-sm text-gray-500">{analysisData.detailedAnalysis.emotionAnalysis.emotionTimeline.length} data points</span>
                  </div>
                  
                  <div className="h-32 bg-gray-50 rounded-lg p-4 relative">
                    <div className="flex items-end justify-between h-full space-x-1">
                      {analysisData.detailedAnalysis.emotionAnalysis.emotionTimeline.slice(0, 20).map((emotion, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                          style={{ 
                            height: `${emotion.confidence * 100}%`,
                            minHeight: '4px'
                          }}
                          title={`${emotion.dominant} (${(emotion.confidence * 100).toFixed(0)}% confidence) - ${emotion.timestamp.toLocaleTimeString()}`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Start</span>
                      <span>End</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>High Confidence</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span>Medium Confidence</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      <span>Low Confidence</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Positive Emotions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="highlights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Violation Moments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Violation Moments
                  </CardTitle>
                  <CardDescription>Key moments where policy violations occurred</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.detailedAnalysis.videoHighlights.violationMoments.length > 0 ? (
                      analysisData.detailedAnalysis.videoHighlights.violationMoments.map((moment, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium">{moment.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-800">{moment.description}</div>
                            <Badge variant={moment.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                              {moment.severity} severity
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <p>No violations recorded</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Best Moments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Best Moments
                  </CardTitle>
                  <CardDescription>High-confidence positive emotional states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.detailedAnalysis.videoHighlights.bestMoments.length > 0 ? (
                      analysisData.detailedAnalysis.videoHighlights.bestMoments.map((moment, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">{moment.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-800">{moment.description}</div>
                            <Badge className="text-xs bg-green-100 text-green-700">
                              Score: {moment.score}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <p>No high-confidence positive moments</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Worst Moments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-orange-600" />
                    Areas for Improvement
                  </CardTitle>
                  <CardDescription>Moments with concerning emotional states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.detailedAnalysis.videoHighlights.worstMoments.length > 0 ? (
                      analysisData.detailedAnalysis.videoHighlights.worstMoments.map((moment, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-orange-600" />
                            <span className="text-sm font-medium">{moment.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-800">{moment.description}</div>
                            <Badge variant="secondary" className="text-xs">
                              Score: {moment.score}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <p>No concerning moments detected</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Playback Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  Video Playback & Timeline
                </CardTitle>
                <CardDescription>Navigate to specific moments in the interview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="sm">
                      <SkipBack className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm">
                      <SkipForward className="h-4 w-4 mr-1" />
                      Next
                    </Button>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Interview Timeline</div>
                    <div className="relative h-4 bg-gray-200 rounded-full">
                      <div className="absolute inset-0 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                      {analysisData.detailedAnalysis.videoHighlights.violationMoments.map((moment, index) => (
                        <div
                          key={index}
                          className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white -top-0.5 cursor-pointer"
                          style={{ left: `${(moment.timestamp.getTime() - currentSession.startTime.getTime()) / (currentSession.endTime.getTime() - currentSession.startTime.getTime()) * 100}%` }}
                          title={`${moment.description} - ${moment.timestamp.toLocaleTimeString()}`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{currentSession.startTime.toLocaleTimeString()}</span>
                      <span>{currentSession.endTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coaching" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Actionable Coaching Tips
                </CardTitle>
                <CardDescription>
                  Specific recommendations to improve your interview performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.coachingTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Processing Time */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Analysis processed in {analysisData.processingTime}ms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Interview Transcript
                </CardTitle>
                <CardDescription>
                  Complete conversation with timestamps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {currentSession.messages.map((message, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            message.role === 'hr' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {message.role === 'hr' ? 'Ava' : 'You'}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {message.role === 'hr' ? 'Ava Taylor' : 'Candidate'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PostInterviewAnalysis; 