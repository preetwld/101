"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Hash, ChevronLeft, ChevronRight, Mic, Zap, MessageSquare, RefreshCw, Paperclip } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentAd, setCurrentAd] = useState(0)
  const [visibleAchievements, setVisibleAchievements] = useState(0)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)

  const ads = [
    {
      title: "Introducing Sign-Sync",
      description: "NLP-powered, multi-language sign language platform offering continuous word-level translation, note-taking, and collaborative sessions for comprehensive ISL communication.",
      cta: "Get Started with Sign-Sync"
    },
    {
      title: "Introducing Elastica",
      description: "pata chal jaega"
    }
  ]

  const achievements = [
    {
      icon: <Mic className="h-8 w-8 mb-4" />,
      title: "Real-time Sign Gestures to Text & Speech",
      description: "Convert sign language to text and speech instantly."
    },
    {
      icon: <Zap className="h-8 w-8 mb-4" />,
      title: "Blazing Fast Text to Sign Gesture Rendering",
      description: "Transform text into sign language gestures at lightning speed."
    },
    {
      icon: <MessageSquare className="h-8 w-8 mb-4" />,
      title: "Keep a Record of Your Chats",
      description: "Store and access your conversation history securely."
    },
    {
      icon: <RefreshCw className="h-8 w-8 mb-4" />,
      title: "Convert Any Medium to Your Preference",
      description: "Seamlessly transform text, video, and audio to your desired format."
    }
  ]

  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % ads.length)
    }, 10000)

    const achievementInterval = setInterval(() => {
      setVisibleAchievements((prev) => (prev < achievements.length ? prev + 1 : prev))
    }, 1000)

    return () => {
      clearInterval(adInterval)
      clearInterval(achievementInterval)
    }
  }, [achievements.length, ads.length])

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setAttachedFile(file)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Hash className="h-6 w-6" />
              <span className="text-lg font-bold">Hash Monks</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
              <Link href="/research" className="text-sm font-medium hover:underline">Research</Link>
              <Link href="/partners" className="text-sm font-medium hover:underline">Partners</Link>
              <Link href="/contribute" className="text-sm font-medium hover:underline">Contribute</Link>
            </div>
            <div>
              <Link href="/login?mode=login">
                <Button variant="outline" className="mr-2">Log In</Button>
              </Link>
              <Link href="/login?mode=signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="relative bg-muted rounded-lg p-8 mb-8">
            <div className="relative h-64 overflow-hidden">
              {ads.map((ad, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-all duration-500 ${
                    index === currentAd ? 'top-0 opacity-100' : 'top-full opacity-0'
                  }`}
                >
                  <h2 className="text-3xl font-bold mb-4">{ad.title}</h2>
                  <p className="text-lg mb-6">{ad.description}</p>
                  <Link href="/mainpage">
                    <Button size="lg">{ad.cta}</Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentAd((prevAd) => (prevAd - 1 + ads.length) % ads.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentAd((prevAd) => (prevAd + 1) % ads.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-background p-6 rounded-lg shadow-md transition-all duration-500 ${
                    index < visibleAchievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {achievement.icon}
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Feedback & Contributions</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Share your thoughts, suggestions, or requests..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="query-type">Query Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a query type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="request">Feature Request</SelectItem>
                    <SelectItem value="contribution">Contribution</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Paperclip className="h-6 w-6" />
                  <span className="sr-only">Attach file</span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileAttachment}
                />
                <span>{attachedFile ? attachedFile.name : 'No file attached'}</span>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Contribute
              </Button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 Hash Monks. All rights reserved.
        </div>
      </footer>
    </div>
  )
}