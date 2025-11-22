import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Camera } from 'lucide-react';
import type { Profile } from '../App';

interface ProfileSetupProps {
  onComplete: (profile: Profile) => void;
}

const AVAILABLE_INTERESTS = [
  'AI',
  'Design',
  'Startups',
  'Data',
  'ML',
  'Web3',
  'Growth',
  'Content',
  'Sales',
  'Developer Tools',
  'Open Source',
  'Psychology',
  'Research',
  'Marketing',
  'Product',
];

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
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

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = () => {
    if (name && role && selectedInterests.length >= 3) {
      onComplete({
        id: '1',
        name,
        role,
        interests: selectedInterests,
        lookingFor,
        profileImage,
      });
    }
  };

  const isValid = name && role && selectedInterests.length >= 3;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 bg-white rounded-2xl p-8 shadow-lg">
        <div>
          <h2 className="text-gray-900">Create Your Profile</h2>
          <p className="text-gray-600 mt-2">Tell us a bit about yourself</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Profile Photo</Label>
            <p className="text-gray-600">Take a quick photo so others can recognize you</p>
            
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
                className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-500">Take Photo</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCameraClick}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Retake Photo
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">What do you do?</Label>
            <Input
              id="role"
              placeholder="e.g. Product Designer, Software Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Select 3-5 interests</Label>
            <p className="text-gray-600">
              {selectedInterests.length}/5 selected
            </p>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_INTERESTS.map(interest => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lookingFor">What are you looking for?</Label>
            <Textarea
              id="lookingFor"
              placeholder="e.g. Looking for a technical co-founder, seeking mentorship, exploring job opportunities..."
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
          size="lg"
        >
          Join Room
        </Button>
      </div>
    </div>
  );
}