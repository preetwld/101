"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Settings, Share2, Users, Save, Volume2, Upload, Mic, Download, Copy, RefreshCw } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QRCodeSVG } from 'qrcode.react'
import { Chat, ShareLinkInfo, ChatType } from '@/app/types/chat'
import Image from 'next/image';

export default function SignSyncApp() {
  const [functionality, setFunctionality] = useState<ChatType>("gesture-to-text")
  const [recognizedText, setRecognizedText] = useState("")
  const [inputText, setInputText] = useState("")
  const [saveTitle, setSaveTitle] = useState("")
  const [saveDescription, setSaveDescription] = useState("")
  const [savedChats, setSavedChats] = useState<Chat[]>([
    { id: "1", title: "Greeting", content: "Hello, how are you?" },
    { id: "2", title: "Weather", content: "It's a sunny day today." },
    { id: "3", title: "Meeting", content: "The meeting is at 2 PM." },
    { id: "4", title: "Lunch", content: "I'm having pizza for lunch." },
    { id: "5", title: "Goodbye", content: "See you later!" },
  ])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [shareLinkInfo, setShareLinkInfo] = useState<ShareLinkInfo>({ link: "", qrCode: "" })

  const handleSave = () => {
    if (saveTitle && saveDescription) {
      const newChat: Chat = { id: Date.now().toString(), title: saveTitle, content: saveDescription }
      setSavedChats([newChat, ...savedChats])
      setSaveTitle("")
      setSaveDescription("")
      setShowSaveDialog(false)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0].name)
    }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0].name)
    }
  }, [])

  const generateShareLink = useCallback(() => {
    const randomString = Math.random().toString(36).substring(2, 15)
    const newLink = `https:.com/share/${randomString}`
    setShareLinkInfo({ link: newLink, qrCode: newLink })
  }, [])

  useEffect(() => {
    generateShareLink()
  }, [generateShareLink])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLinkInfo.link)
      alert("Link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Image src="/logo.png" alt="Sign Sync Logo" width={32} height={32} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Saved Chats</DialogTitle>
                </DialogHeader>
                <div className="flex h-[400px]">
                  <ScrollArea className="w-1/3 border-r pr-4">
                    {savedChats.map((chat) => (
                      <Button
                        key={chat.id}
                        variant="ghost"
                        className="w-full justify-start mb-2 px-2 py-1 h-auto"
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="text-left">
                          <div className="font-semibold truncate">{chat.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{chat.content}</div>
                        </div>
                      </Button>
                    ))}
                  </ScrollArea>
                  <div className="w-2/3 pl-4">
                    {selectedChat ? (
                      <div>
                        <h3 className="font-semibold mb-2">{selectedChat.title}</h3>
                        <p className="text-sm">{selectedChat.content}</p>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        Select a chat to view details
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <h1 className="text-xl font-bold">Sign Sync</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={functionality} onValueChange={(value: ChatType) => setFunctionality(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select functionality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gesture-to-text">Sign gestures to text</SelectItem>
                <SelectItem value="text-to-sign">Text/speech to sign</SelectItem>
                <SelectItem value="upload-file">Upload file</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Live Translation</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <QRCodeSVG value={shareLinkInfo.qrCode} size={200} />
                  <div className="flex w-full">
                    <Input value={shareLinkInfo.link} readOnly className="flex-grow" />
                    <Button onClick={copyToClipboard} className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={generateShareLink}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {functionality === "gesture-to-text" ? (
            <>
              {/* Camera Feed */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Camera Feed
                </div>
              </div>

              {/* Recognized Text */}
              <div className="bg-muted rounded-lg p-4 flex flex-col">
                <div className="flex justify-between mb-4">
                  <Button variant="ghost" size="icon">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Save className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Chat</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={saveTitle}
                            onChange={(e) => setSaveTitle(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={saveDescription}
                            onChange={(e) => setSaveDescription(e.target.value)}
                            className="col-span-3 min-h-[100px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSave}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  className="flex-grow resize-none bg-transparent border-none focus:outline-none"
                  placeholder="Recognized text will appear here"
                  value={recognizedText}
                  onChange={(e) => setRecognizedText(e.target.value)}
                />
              </div>
            </>
          ) : functionality === "text-to-sign" ? (
            <>
              {/* Text Input */}
              <div className="bg-muted rounded-lg p-4 flex flex-col">
                <div className="flex justify-between mb-4">
                  <Button variant="ghost" size="icon">
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
                <Textarea
                  className="flex-grow resize-none bg-transparent border-none focus:outline-none"
                  placeholder="Enter text or speak to convert to sign language"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              {/* Sign Language Output */}
              <div className="bg-muted rounded-lg p-4 flex flex-col">
                <div className="flex justify-end mb-4">
                  <Button variant="ghost" size="icon">
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex-grow">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sign Language Animation
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-2">
              {/* Upload File Section */}
              <div 
                className={`border-2 border-dashed rounded-lg p-10 text-center ${
                  dragActive ? 'border-primary' : 'border-muted-foreground'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-semibold mb-2">Drag and drop a file or upload file</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                </Label>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2023 Sign Sync. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="underline">Documentation</a> | <a href="#" className="underline">Support</a>
          </p>
        </div>
      </footer>
    </div>
  )
}