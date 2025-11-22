import type { Person } from "../types/person";

/**
 * Person Dummy Data
 * Mock data containing sample user profiles for the networking app
 * Each profile includes professional information, interests, and location
 * Used for demo/development purposes
 */
export const personDummyData: Person[] = [
  // Profile 1: Product Designer from San Francisco
  {
    id: 1,
    name: "Sarah Chen",
    age: 28,
    bio: "Product designer passionate about sustainable tech. Always looking to collaborate on meaningful projects!",
    occupation: "Senior Product Designer",
    interests: ["UX Design", "Sustainability", "Hiking", "Photography"],
    location: "San Francisco, CA",
    profileImage: "https://i.pravatar.cc/300?img=1" // Using pravatar.cc for placeholder profile images
  },
  // Profile 2: Software Engineer from Austin
  {
    id: 2,
    name: "Marcus Johnson",
    age: 32,
    bio: "Full-stack developer and startup enthusiast. Let's build something amazing together!",
    occupation: "Software Engineer",
    interests: ["Web Development", "AI/ML", "Basketball", "Coffee"],
    location: "Austin, TX",
    profileImage: "https://i.pravatar.cc/300?img=12"
  },
  // Profile 3: Marketing Manager from New York
  {
    id: 3,
    name: "Emily Rodriguez",
    age: 26,
    bio: "Marketing strategist with a love for creative campaigns. Always networking and exploring new ideas.",
    occupation: "Marketing Manager",
    interests: ["Digital Marketing", "Content Creation", "Travel", "Yoga"],
    location: "New York, NY",
    profileImage: "https://i.pravatar.cc/300?img=5"
  },
  // Profile 4: Startup Founder from Seattle
  {
    id: 4,
    name: "David Kim",
    age: 30,
    bio: "Entrepreneur building the next big thing in fintech. Looking for co-founders and advisors!",
    occupation: "Startup Founder",
    interests: ["Entrepreneurship", "Fintech", "Networking", "Reading"],
    location: "Seattle, WA",
    profileImage: "https://i.pravatar.cc/300?img=14"
  },
  // Profile 5: Data Scientist from Boston
  {
    id: 5,
    name: "Jasmine Patel",
    age: 29,
    bio: "Data scientist turning numbers into insights. Love connecting with fellow tech enthusiasts!",
    occupation: "Data Scientist",
    interests: ["Machine Learning", "Analytics", "Rock Climbing", "Cooking"],
    location: "Boston, MA",
    profileImage: "https://i.pravatar.cc/300?img=9"
  },
  // Profile 6: Creative Technologist from Los Angeles
  {
    id: 6,
    name: "Alex Thompson",
    age: 27,
    bio: "Creative developer bridging art and technology. Let's create something beautiful!",
    occupation: "Creative Technologist",
    interests: ["Creative Coding", "Art", "Music Production", "Gaming"],
    location: "Los Angeles, CA",
    profileImage: "https://i.pravatar.cc/300?img=13"
  },
  // Profile 7: Business Consultant from Chicago
  {
    id: 7,
    name: "Olivia Martinez",
    age: 31,
    bio: "Business consultant helping startups scale. Always happy to share insights over coffee!",
    occupation: "Business Consultant",
    interests: ["Strategy", "Startups", "Public Speaking", "Running"],
    location: "Chicago, IL",
    profileImage: "https://i.pravatar.cc/300?img=10"
  },
  // Profile 8: Junior Developer from Portland
  {
    id: 8,
    name: "Ryan Lee",
    age: 25,
    bio: "Junior developer eager to learn and grow. Looking for mentors and interesting projects!",
    occupation: "Junior Software Engineer",
    interests: ["Programming", "Open Source", "Gaming", "Anime"],
    location: "Portland, OR",
    profileImage: "https://i.pravatar.cc/300?img=15"
  }
];
