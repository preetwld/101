"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthPageComponent() {
  const [isSignup, setIsSignup] = useState(true)

  const toggleForm = () => setIsSignup(!isSignup)

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="user" className="text-lg py-3">User</TabsTrigger>
          <TabsTrigger value="contributor" className="text-lg py-3">Contributor</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <div className="space-y-8 bg-card p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center cursor-pointer" onClick={toggleForm}>
              {isSignup ? "Sign Up" : "Login"}
            </h1>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required className="text-lg py-3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-lg">Password</Label>
                  <Input id="password" type="password" placeholder={isSignup ? "Create password" : "Enter password"} required className="text-lg py-3" />
                </div>
                {isSignup && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-lg">Age</Label>
                      <Input id="age" type="number" placeholder="Enter your age" required className="text-lg py-3" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-lg">Gender</Label>
                      <RadioGroup defaultValue="male">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="user-role" className="text-lg">User Role</Label>
                      <Select>
                        <SelectTrigger id="user-role" className="text-lg py-3">
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deaf">Deaf</SelectItem>
                          <SelectItem value="mute">Mute</SelectItem>
                          <SelectItem value="deaf-mute">Both Deaf and Mute</SelectItem>
                          <SelectItem value="partially-disabled">Partially Disabled</SelectItem>
                          <SelectItem value="normal">Normal User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
              <Button type="submit" className="w-full text-lg py-6">
                {isSignup ? "Sign Up" : "Login"}
              </Button>
            </form>
            <p className="text-center text-lg">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span className="cursor-pointer text-primary hover:underline" onClick={toggleForm}>
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </TabsContent>
        <TabsContent value="contributor">
          <div className="space-y-8 bg-card p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center">Contributor {isSignup ? "Sign Up" : "Login"}</h1>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contributor-email" className="text-lg">Email</Label>
                  <Input id="contributor-email" type="email" placeholder="Enter your email" required className="text-lg py-3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contributor-password" className="text-lg">Password</Label>
                  <Input id="contributor-password" type="password" placeholder={isSignup ? "Create password" : "Enter password"} required className="text-lg py-3" />
                </div>
                {isSignup && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="organization" className="text-lg">Organization</Label>
                    <Input id="organization" placeholder="Enter your organization name" required className="text-lg py-3" />
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full text-lg py-6">
                {isSignup ? "Sign Up" : "Login"} as Contributor
              </Button>
            </form>
            <p className="text-center text-lg">
              {isSignup ? "Already have a contributor account? " : "Don't have a contributor account? "}
              <span className="cursor-pointer text-primary hover:underline" onClick={toggleForm}>
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}