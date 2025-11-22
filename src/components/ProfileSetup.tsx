import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Camera } from 'lucide-react';
import type { Profile } from '../AttendeeApp';

interface ProfileSetupProps {
  onComplete: (profile: Profile) => void;
}

const AVAILABLE_SKILLS = [
  'Frontend Development',
  'Backend Development',
  'Full Stack',
  'UI/UX Design',
  'Product Design',
  'AI/ML',
  'Data Science',
  'DevOps',
  'Mobile Development',
  'Blockchain',
  'Cloud Architecture',
  'Product Management',
  'Business Strategy',
  'Marketing',
  'Content Creation',
  'Pitching/Presentation',
  'Project Management',
  'Research',
];

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    const input = document.getElementById('camera-input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleSubmit = () => {
    if (name && skills.trim()) {
      onComplete({
        id: '1',
        name,
        role: skills.split(',')[0]?.trim() || skills.substring(0, 50), // Use first skill or truncated skills as role
        interests: skills.split(',').map(s => s.trim()).filter(Boolean), // Convert comma-separated skills to array for compatibility
        lookingFor,
        profileImage,
        skillsDescription: skills, // Store the full description
      });
    }
  };

  const isValid = name && skills.trim();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="max-w-lg w-full space-y-8 glass-card rounded-3xl p-8 shadow-2xl">
        <div>
          <h2 className="neon-text bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">Create Your Profile</h2>
          <p className="text-white mt-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Tell us a bit about yourself</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-indigo-300">Profile Photo</Label>
            <p className="text-indigo-400/60">Take a quick photo so others can recognize you</p>
            
            <input
              id="camera-input"
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {!profileImage ? (
              <div 
                onClick={handleCameraClick}
                className="w-32 h-32 mx-auto neon-border rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-purple-500/10 transition-all"
              >
                <Camera className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-indigo-300">Take Photo</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover neon-border shadow-2xl"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCameraClick}
                  className="border-purple-400/30 text-indigo-300 hover:bg-purple-500/10"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Retake Photo
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-indigo-300">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-900/50 border-purple-400/30 text-indigo-100 placeholder:text-indigo-400/40"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-indigo-300">Your Skills</Label>
            <p className="text-indigo-400/60">
              Enter your skills separated by commas
            </p>
            <Input
              id="skills"
              placeholder="e.g. Frontend Development, Backend Development, UI/UX Design"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="bg-slate-900/50 border-purple-400/30 text-indigo-100 placeholder:text-indigo-400/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lookingFor" className="text-indigo-300">What I'm looking for</Label>
            <Textarea
              id="lookingFor"
              placeholder="e.g. Looking for frontend and design teammates to build an AI app..."
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              rows={3}
              className="bg-slate-900/50 border-purple-400/30 text-indigo-100 placeholder:text-indigo-400/40"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 border border-purple-400/30"
          size="lg"
        >
          Join Room
        </Button>
      </div>
    </div>
  );
}