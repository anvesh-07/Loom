// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   Video,
//   Camera,
//   Share2,
//   Sparkles,
//   MessageSquare,
//   BarChart3,
//   Zap,
//   CheckCircle2,
//   ChevronRight,
//   Play,
//   Pause,
//   Send,
// } from "lucide-react";
// import Image from "next/image";

// export default function Page() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("record");
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
//     null
//   );
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [isSent, setIsSent] = useState(false);

//   // Mock function to start recording
//   const startRecording = () => {
//     setIsRecording(true);
//     setRecordingTime(0);

//     // Start timer
//     const interval = setInterval(() => {
//       setRecordingTime((prev) => prev + 1);
//     }, 1000);

//     setTimerInterval(interval);

//     // In a real implementation, we would use MediaRecorder API
//     console.log("Recording started...");
//   };

//   // Mock function to stop recording
//   const stopRecording = () => {
//     setIsRecording(false);

//     // Clear timer
//     if (timerInterval) {
//       clearInterval(timerInterval);
//       setTimerInterval(null);
//     }

//     // In a real implementation, we would stop MediaRecorder and process the video
//     // For demo purposes, we'll just set a placeholder video
//     setRecordedVideo("/placeholder.svg?key=f741m");
//     setActiveTab("enhance");

//     console.log("Recording stopped...");
//   };

//   // Mock function to enhance video with AI
//   const enhanceVideo = () => {
//     console.log("Enhancing video with AI...");
//     // In a real implementation, this would send the video to an AI service
//     setTimeout(() => {
//       setActiveTab("share");
//     }, 1500);
//   };

//   // Mock function to share video
//   const shareVideo = () => {
//     setIsSending(true);

//     // Simulate sending process
//     setTimeout(() => {
//       setIsSending(false);
//       setIsSent(true);

//       // Reset after 3 seconds
//       setTimeout(() => {
//         setIsSent(false);
//         setEmail("");
//         setMessage("");
//         setActiveTab("record");
//         setRecordedVideo(null);
//       }, 3000);
//     }, 2000);
//   };

//   // Format seconds to MM:SS
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Hero Section */}
//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center">
//         <div className="absolute inset-0 z-0 overflow-hidden">
//           <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
//           <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-20"></div>
//           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-20"></div>
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto">
//           <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
//             New Feature
//           </Badge>
//           <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
//             Record & Share Videos <br />
//             <span className="text-blue-600">Powered by AI</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//             Create professional-looking videos instantly. Our AI enhances your
//             recordings and helps you connect with prospects more effectively.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
//             <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
//               Get Started <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//             <Button size="lg" variant="outline">
//               Watch Demo <Play className="ml-2 h-4 w-4" />
//             </Button>
//           </div>

//           <div className="relative mx-auto max-w-4xl rounded-xl shadow-2xl overflow-hidden">
//             <Image
//               src="/placeholder.png"
//               alt="Video recording app dashboard"
//               className="w-full h-auto"
//               width={120}
//               height={100}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
//               <div className="p-6 text-white text-left">
//                 <h3 className="text-2xl font-bold">
//                   AI-Enhanced Video Messaging
//                 </h3>
//                 <p className="text-gray-200">
//                   Connect with your audience through smart, professional videos
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* App Demo Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
//               Try It Now
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Record, enhance, and share videos in three simple steps
//             </p>
//           </div>

//           <Card className="p-6 shadow-lg">
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsList className="grid grid-cols-3 mb-8">
//                 <TabsTrigger value="record" disabled={isRecording}>
//                   <Camera className="mr-2 h-4 w-4" /> Record
//                 </TabsTrigger>
//                 <TabsTrigger value="enhance" disabled={!recordedVideo}>
//                   <Sparkles className="mr-2 h-4 w-4" /> Enhance
//                 </TabsTrigger>
//                 <TabsTrigger value="share" disabled={!recordedVideo}>
//                   <Share2 className="mr-2 h-4 w-4" /> Share
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="record" className="space-y-4">
//                 <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
//                   {recordedVideo ? (
//                     <video
//                       ref={videoRef}
//                       src={recordedVideo}
//                       controls
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="text-center p-8">
//                       <Video className="h-16 w-16 mx-auto text-gray-400 mb-4" />
//                       <h3 className="text-xl font-medium text-gray-700 mb-2">
//                         Ready to Record
//                       </h3>
//                       <p className="text-gray-500 mb-6">
//                         Click the button below to start recording your video
//                         message
//                       </p>

//                       {isRecording && (
//                         <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center">
//                           <span className="animate-pulse mr-2 h-3 w-3 bg-white rounded-full"></span>
//                           Recording: {formatTime(recordingTime)}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-center">
//                   {!isRecording ? (
//                     <Button
//                       onClick={startRecording}
//                       className="bg-red-600 hover:bg-red-700"
//                       size="lg"
//                     >
//                       <Camera className="mr-2 h-5 w-5" /> Start Recording
//                     </Button>
//                   ) : (
//                     <Button
//                       onClick={stopRecording}
//                       variant="outline"
//                       className="border-red-600 text-red-600 hover:bg-red-50"
//                       size="lg"
//                     >
//                       <Pause className="mr-2 h-5 w-5" /> Stop Recording
//                     </Button>
//                   )}
//                 </div>
//               </TabsContent>

//               <TabsContent value="enhance" className="space-y-4">
//                 <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
//                   {recordedVideo && (
//                     <video
//                       src={recordedVideo}
//                       className="w-full h-full object-cover"
//                       controls
//                     />
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                   <Card className="p-4 border border-blue-100 bg-blue-50">
//                     <CheckCircle2 className="h-6 w-6 text-blue-600 mb-2" />
//                     <h4 className="font-medium text-gray-900">
//                       Background Noise Removal
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       AI cleans up audio for professional sound
//                     </p>
//                   </Card>

//                   <Card className="p-4 border border-purple-100 bg-purple-50">
//                     <CheckCircle2 className="h-6 w-6 text-purple-600 mb-2" />
//                     <h4 className="font-medium text-gray-900">
//                       Lighting Correction
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       Automatically adjusts lighting for best appearance
//                     </p>
//                   </Card>

//                   <Card className="p-4 border border-green-100 bg-green-50">
//                     <CheckCircle2 className="h-6 w-6 text-green-600 mb-2" />
//                     <h4 className="font-medium text-gray-900">Auto Captions</h4>
//                     <p className="text-sm text-gray-600">
//                       Generates accurate captions for accessibility
//                     </p>
//                   </Card>
//                 </div>

//                 <div className="flex justify-center">
//                   <Button
//                     onClick={enhanceVideo}
//                     className="bg-blue-600 hover:bg-blue-700"
//                     size="lg"
//                   >
//                     <Sparkles className="mr-2 h-5 w-5" /> Enhance with AI
//                   </Button>
//                 </div>
//               </TabsContent>

//               <TabsContent value="share" className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
//                       {recordedVideo && (
//                         <video
//                           src={recordedVideo}
//                           className="w-full h-full object-cover"
//                           controls
//                         />
//                       )}
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-medium text-gray-900 mb-2">
//                         Video Analytics
//                       </h4>
//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                         <span>Video Length:</span>
//                         <span className="font-medium">
//                           00:{recordingTime.toString().padStart(2, "0")}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                         <span>Quality:</span>
//                         <span className="font-medium">HD (720p)</span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm text-gray-600">
//                         <span>AI Enhancements:</span>
//                         <span className="font-medium">3 Applied</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-xl font-medium text-gray-900 mb-4">
//                       Share with Prospect
//                     </h3>

//                     <div className="space-y-4">
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Recipient Email
//                         </label>
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="prospect@company.com"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="message"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Message (Optional)
//                         </label>
//                         <Textarea
//                           id="message"
//                           placeholder="Add a personal message to go with your video..."
//                           rows={4}
//                           value={message}
//                           onChange={(e) => setMessage(e.target.value)}
//                         />
//                       </div>

//                       <Button
//                         onClick={shareVideo}
//                         className="w-full bg-blue-600 hover:bg-blue-700"
//                         disabled={!email || isSending || isSent}
//                       >
//                         {isSending ? (
//                           <>
//                             <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
//                             Sending...
//                           </>
//                         ) : isSent ? (
//                           <>
//                             <CheckCircle2 className="mr-2 h-4 w-4" />
//                             Sent Successfully!
//                           </>
//                         ) : (
//                           <>
//                             <Send className="mr-2 h-4 w-4" />
//                             Send Video
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </Card>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
//               AI-Powered Features
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our intelligent technology enhances every aspect of your video
//               messaging
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card className="p-6">
//               <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
//                 <Sparkles className="h-6 w-6 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Smart Enhancement
//               </h3>
//               <p className="text-gray-600">
//                 AI automatically enhances video quality, adjusts lighting, and
//                 removes background noise.
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
//                 <MessageSquare className="h-6 w-6 text-purple-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Auto Captioning
//               </h3>
//               <p className="text-gray-600">
//                 Generate accurate captions in multiple languages to make your
//                 videos accessible.
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
//                 <BarChart3 className="h-6 w-6 text-green-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Engagement Analytics
//               </h3>
//               <p className="text-gray-600">
//                 Track when prospects watch your videos and how they engage with
//                 your content.
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
//                 <Zap className="h-6 w-6 text-yellow-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Instant Sharing
//               </h3>
//               <p className="text-gray-600">
//                 Share videos via email, link, or embed them directly in your
//                 website or CRM.
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
//                 <Video className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Video Templates
//               </h3>
//               <p className="text-gray-600">
//                 Choose from AI-generated templates for different scenarios like
//                 sales, support, or training.
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
//                 <Share2 className="h-6 w-6 text-indigo-600" />
//               </div>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">
//                 Team Collaboration
//               </h3>
//               <p className="text-gray-600">
//                 Share videos with your team, collect feedback, and collaborate
//                 on improvements.
//               </p>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold sm:text-4xl mb-6">
//             Ready to Transform Your Video Communication?
//           </h2>
//           <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
//             Join thousands of professionals who use our platform to create
//             engaging, AI-enhanced videos that convert prospects into customers.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button
//               size="lg"
//               className="bg-white text-blue-600 hover:bg-blue-50"
//             >
//               Start Free Trial
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="text-blue-600 border-white hover:bg-blue-700"
//             >
//               Schedule Demo
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-white font-bold text-lg mb-4">VideoAI</h3>
//             <p className="text-sm">
//               AI-powered video recording and sharing platform for professionals.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-white font-medium mb-4">Product</h4>
//             <ul className="space-y-2 text-sm">
//               <li>Features</li>
//               <li>Pricing</li>
//               <li>Use Cases</li>
//               <li>Integrations</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white font-medium mb-4">Resources</h4>
//             <ul className="space-y-2 text-sm">
//               <li>Blog</li>
//               <li>Documentation</li>
//               <li>Support</li>
//               <li>API</li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white font-medium mb-4">Company</h4>
//             <ul className="space-y-2 text-sm">
//               <li>About Us</li>
//               <li>Careers</li>
//               <li>Contact</li>
//               <li>Privacy Policy</li>
//             </ul>
//           </div>
//         </div>

//         <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm text-center">
//           © {new Date().getFullYear()} VideoAI. All rights reserved.
//         </div>
//       </footer>
//     </main>
//   );
// }

import React from "react";

const Home = () => {
  return <div className="mt-56 items-center justify-center">Home</div>;
};

export default Home;
