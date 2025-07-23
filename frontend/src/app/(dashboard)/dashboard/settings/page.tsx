"use client";

import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Save,
  User,
  Mail,
  Hash,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    getUser(username: $username) {
      id
      name
      email
      username
      bio
      skills
      interests
      devpost
      github
      linkedin
      website
      createdAt
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      username
      bio
      skills
      interests
      devpost
      github
      linkedin
      website
    }
  }
`;

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function SettingsPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [devpost, setDevpost] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  // New item inputs
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    setUsername(getCookie("username"));
  }, []);

  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { username },
    skip: !username,
    fetchPolicy: "network-only",
  });

  const [updateUser] = useMutation(UPDATE_USER_PROFILE);

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (data?.getUser) {
      const user = data.getUser;
      setName(user.name || "");
      setEmail(user.email || "");
      setUserUsername(user.username || "");
      setBio(user.bio || "");
      setSkills(user.skills || []);
      setInterests(user.interests || []);
      setDevpost(user.devpost || "");
      setGithub(user.github || "");
      setLinkedin(user.linkedin || "");
      setWebsite(user.website || "");
    }
  }, [data]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const handleSaveChanges = async () => {
    if (!data?.getUser) return;

    setIsSaving(true);
    try {
      console.log("Updating user with data:", {
        id: data.getUser.id,
        input: {
          name,
          username: userUsername,
          bio,
          skills,
          interests,
          devpost,
          github,
          linkedin,
          website,
        },
      });

      const result = await updateUser({
        variables: {
          id: data.getUser.id,
          input: {
            name,
            username: userUsername,
            bio,
            skills,
            interests,
            devpost,
            github,
            linkedin,
            website,
          },
        },
      });

      console.log("Update result:", result);

      toast.success("Profile updated successfully!", {
        description: "Your profile information has been saved.",
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Update error:", error);
      console.error("Error details:", error.graphQLErrors);
      console.error("Network error:", error.networkError);

      let errorMessage = "Please try again.";
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMessage = error.graphQLErrors[0].message;
      } else if (error.networkError) {
        errorMessage = error.networkError.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error("Failed to update profile", {
        description: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original data
    if (data?.getUser) {
      const user = data.getUser;
      setName(user.name || "");
      setUserUsername(user.username || "");
      setBio(user.bio || "");
      setSkills(user.skills || []);
      setInterests(user.interests || []);
      setDevpost(user.devpost || "");
      setGithub(user.github || "");
      setLinkedin(user.linkedin || "");
      setWebsite(user.website || "");
    }
    setIsEditing(false);
  };

  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="text-xl mb-4">Please Log In</CardTitle>
          <CardDescription className="mb-6">
            You need to be logged in to view your settings
          </CardDescription>
          <Button onClick={() => router.push("/login")} className="w-full">
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        <Card className="w-full max-w-md p-8 text-center border-0 shadow-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <CardTitle className="text-xl mb-3">Loading Profile</CardTitle>
          <CardDescription>
            Fetching your profile information...
          </CardDescription>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-neutral-900 dark:to-red-900">
        <Card className="w-full max-w-md p-8 text-center border-red-200 dark:border-red-800">
          <CardTitle className="text-red-600 dark:text-red-400">
            Something went wrong
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
            {error.message}
          </CardDescription>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="destructive"
            className="mt-6"
          >
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const user = data?.getUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Account Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your profile and preferences
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={userUsername}
                      onChange={(e) => setUserUsername(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} disabled />
                  <p className="text-sm text-gray-500">
                    Email cannot be changed here.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Social Links
                </CardTitle>
                <CardDescription>
                  Add your social media and portfolio links.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="devpost" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Devpost
                    </Label>
                    <Input
                      id="devpost"
                      value={devpost}
                      onChange={(e) => setDevpost(e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://devpost.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills & Interests Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <Hash className="h-5 w-5 mr-2 text-purple-600" />
                  Skills
                </CardTitle>
                <CardDescription>
                  Showcase your technical expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1 flex items-center"
                    >
                      {skill}
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 p-0 text-purple-600 hover:bg-purple-200 dark:text-purple-400 dark:hover:bg-purple-800"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove skill</span>
                        </Button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button onClick={handleAddSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center text-xl">
                  <Mail className="h-5 w-5 mr-2 text-orange-600" />
                  Interests
                </CardTitle>
                <CardDescription>Share what excites you.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 flex items-center"
                    >
                      {interest}
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 p-0 text-orange-600 hover:bg-orange-200 dark:text-orange-400 dark:hover:bg-orange-800"
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove interest</span>
                        </Button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                    />
                    <Button onClick={handleAddInterest} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
