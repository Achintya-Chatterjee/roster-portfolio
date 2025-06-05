import type { ProfileData, Video } from "@/types/profile";

// Mock API function to simulate portfolio data extraction
export async function mockExtractPortfolioData(
  url: string
): Promise<ProfileData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock different responses based on URL
  if (url.includes("sonuchoudhary")) {
    return {
      username: "sonu",
      firstName: "Sonu",
      lastName: "Choudhary",
      title: "Creative Director & Video Editor",
      summary:
        "Passionate creative professional with 5+ years of experience in video editing, motion graphics, and brand storytelling. I help brands create compelling visual narratives that engage audiences and drive results.",
      location: "Mumbai, India",
      originalUrl: url,
      employers: [
        {
          id: "1",
          name: "Netflix",
          jobTitle: "Senior Video Editor",
          duration: "Jan 2023 - Present",
          employmentType: "contract",
          summary:
            "Lead video editor for original content series, responsible for post-production workflow and creative direction.",
          videos: [
            {
              id: "1",
              title: "Netflix Original Series Trailer",
              url: "/placeholder.svg?height=200&width=300",
              thumbnail: "/placeholder.svg?height=200&width=300",
              duration: "2:30",
            },
            {
              id: "2",
              title: "Documentary Feature Edit",
              url: "/placeholder.svg?height=200&width=300",
              thumbnail: "/placeholder.svg?height=200&width=300",
              duration: "1:45",
            },
          ],
        },
        {
          id: "2",
          name: "Adobe Creative",
          jobTitle: "Motion Graphics Designer",
          duration: "Jun 2021 - Dec 2022",
          employmentType: "full-time",
          summary:
            "Created motion graphics and animations for marketing campaigns, resulting in 40% increase in engagement.",
          videos: [
            {
              id: "3",
              title: "Product Launch Animation",
              url: "/placeholder.svg?height=200&width=300",
              thumbnail: "/placeholder.svg?height=200&width=300",
              duration: "1:20",
            },
          ],
        },
      ],
      skills: [], // Add this line
    };
  } else if (url.includes("dellinzhang")) {
    return {
      username: "dellin",
      firstName: "Dellin",
      lastName: "Zhang",
      title: "Video Editor & Content Creator",
      summary:
        "Specialized in creating engaging video content for social media and digital platforms. Expert in storytelling through visual media.",
      location: "Los Angeles, CA",
      originalUrl: url,
      employers: [
        {
          id: "1",
          name: "YouTube Creators",
          jobTitle: "Freelance Video Editor",
          duration: "Mar 2022 - Present",
          employmentType: "freelance",
          summary:
            "Edit videos for top YouTube creators with combined 10M+ subscribers, focusing on retention and engagement.",
          videos: [
            {
              id: "1",
              title: "Viral YouTube Video Edit",
              url: "/placeholder.svg?height=200&width=300",
              thumbnail: "/placeholder.svg?height=200&width=300",
              duration: "8:45",
            },
            {
              id: "2",
              title: "Brand Collaboration Video",
              url: "/placeholder.svg?height=200&width=300",
              thumbnail: "/placeholder.svg?height=200&width=300",
              duration: "3:20",
            },
          ],
        },
      ],
      skills: [], // Add this line
    };
  }

  // Default response for unknown URLs
  return {
    username: "creative-pro",
    firstName: "Creative",
    lastName: "Professional",
    title: "Creative Professional",
    summary:
      "Passionate about creating amazing visual content and telling stories through media.",
    location: "Remote",
    originalUrl: url,
    employers: [],
    skills: [],
  };
}

// Mock API functions for CRUD operations
export async function updateProfile(
  profileData: ProfileData
): Promise<ProfileData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return profileData;
}

export async function addEmployer(
  profileId: string,
  employer: any
): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ...employer, id: Date.now().toString() };
}

export async function updateEmployer(
  employerId: string,
  employer: any
): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return employer;
}

export async function deleteEmployer(employerId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export async function addVideo(
  employerId: string,
  video: Omit<Video, "id">
): Promise<Video> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ...video, id: Date.now().toString() };
}

export async function updateVideo(
  videoId: string,
  video: Video
): Promise<Video> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return video;
}

export async function deleteVideo(videoId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export async function mockExtractSkillsFromText(
  text: string
): Promise<string[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 500 + 500)
  ); // Simulate 0.5-1s delay

  if (!text || text.trim() === "") {
    return [];
  }

  const predefinedSkills = [
    "Video Editing",
    "Motion Graphics",
    "Graphic Design",
    "UI/UX Design",
    "Illustration",
    "Photography",
    "Copywriting",
    "Content Creation",
    "Social Media Marketing",
    "Project Management",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "Data Analysis",
    "Brand Strategy",
    "SEO Optimization",
    "Adobe Creative Suite",
    "Final Cut Pro",
    "DaVinci Resolve",
    "Figma",
    "Sketch",
    "Canva",
  ];

  const lowerText = text.toLowerCase();
  const extractedSkills = new Set<string>();

  predefinedSkills.forEach((skill) => {
    if (lowerText.includes(skill.toLowerCase())) {
      extractedSkills.add(skill);
    }
  });

  return Array.from(extractedSkills);
}
