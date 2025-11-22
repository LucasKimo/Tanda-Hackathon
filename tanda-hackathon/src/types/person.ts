/**
 * Person Interface
 * Defines the structure of a user profile in the networking app
 */
export interface Person {
  /** Unique identifier for the person */
  id: number;

  /** Full name of the person */
  name: string;

  /** Age in years */
  age: number;

  /** Short biography or personal pitch (what they do, what they're looking for) */
  bio: string;

  /** Current job title or professional role */
  occupation: string;

  /** Array of interests, hobbies, or professional skills */
  interests: string[];

  /** City and state/country where the person is located */
  location: string;

  /** URL to profile picture (can be remote URL or data URI) */
  profileImage: string;
}
