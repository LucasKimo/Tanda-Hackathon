// import { useState } from "react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { ArrowLeft, Sparkles } from "lucide-react";
// // at the top of UserInfoForm.tsx
// import type React from "react"; // ✅ if you're using automatic JSX runtime
// // or, more simply:
// import React from "react";

// interface UserInfoFormProps {
//   onSubmit: (data: UserData) => void;
//   onBack: () => void;
// }

// export interface UserData {
//   name: string;
//   interests: string;
//   lookingFor: string;
// }

// export const UserInfoForm = ({ onSubmit, onBack }: UserInfoFormProps) => {
//   const [formData, setFormData] = useState<UserData>({
//     name: "",
//     interests: "",
//     lookingFor: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.name && formData.interests && formData.lookingFor) {
//       onSubmit(formData);
//     }
//   };

//   const isValid = formData.name && formData.interests && formData.lookingFor;

//   return (
//     <div className="min-h-screen bg-background flex flex-col animate-fade-in">
//       {/* Header */}
//       <div className="p-4 flex items-center gap-3 border-b border-border/50">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={onBack}
//           className="rounded-full"
//         >
//           <ArrowLeft className="w-5 h-5" />
//         </Button>
//         <h2 className="text-lg font-display font-semibold">Tell us about you</h2>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
//         <div className="max-w-md mx-auto space-y-6">
//           {/* Header Card */}
//           <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-slide-up">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
//                 <Sparkles className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-semibold text-sm">Quick Setup</p>
//                 <p className="text-xs text-muted-foreground">Just a few details</p>
//               </div>
//             </div>
//           </div>

//           {/* Name Input */}
//           <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//             <Label htmlFor="name" className="text-sm font-semibold">
//               What's your name? *
//             </Label>
//             <Input
//               id="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="h-12 rounded-xl border-2 focus:border-primary"
//               required
//             />
//           </div>

//           {/* Interests Input */}
//           <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//             <Label htmlFor="interests" className="text-sm font-semibold">
//               What are you into? *
//             </Label>
//             <Input
//               id="interests"
//               placeholder="e.g., Tech, Design, Music"
//               value={formData.interests}
//               onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
//               className="h-12 rounded-xl border-2 focus:border-primary"
//               required
//             />
//             <p className="text-xs text-muted-foreground">
//               Helps us find your perfect match
//             </p>
//           </div>

//           {/* Looking For Input */}
//           <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
//             <Label htmlFor="lookingFor" className="text-sm font-semibold">
//               What brings you here? *
//             </Label>
//             <Input
//               id="lookingFor"
//               placeholder="e.g., Networking, Collaboration"
//               value={formData.lookingFor}
//               onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
//               className="h-12 rounded-xl border-2 focus:border-primary"
//               required
//             />
//           </div>
//         </div>
//       </form>

//       {/* Fixed Bottom CTA */}
//       <div className="p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
//         <Button
//           type="submit"
//           variant="vibrant"
//           size="touch"
//           className="w-full"
//           disabled={!isValid}
//           onClick={handleSubmit}
//         >
//           Find My Match
//         </Button>
//       </div>
//     </div>
//   );
// };

// src/components/UserInfoForm.tsx
// src/components/UserInfoForm.tsx
import React, { useState, type FormEvent } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface UserData {
  name: string;
  interests: string;
  lookingFor: string;
}

interface UserInfoFormProps {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    interests: "",
    lookingFor: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.interests && formData.lookingFor) {
      onSubmit(formData);
    }
  };

  const isValid = Boolean(
    formData.name && formData.interests && formData.lookingFor
  );

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-border/50">
        <Button
          onClick={onBack}
          className="rounded-full p-2"
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-display font-semibold">
          Tell us about you
        </h2>
      </div>

      {/* Form (wraps content + CTA) */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-between"
      >
        {/* Main content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Header Card */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-slide-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Quick Setup</p>
                  <p className="text-xs text-muted-foreground">
                    Just a few details
                  </p>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Label htmlFor="name" className="text-sm font-semibold">
                What's your name? *
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-12 rounded-xl border-2 focus:border-primary"
                required
              />
            </div>

            {/* Interests Input */}
            <div
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Label htmlFor="interests" className="text-sm font-semibold">
                What are you into? *
              </Label>
              <Input
                id="interests"
                placeholder="e.g., Tech, Design, Music"
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                className="h-12 rounded-xl border-2 focus:border-primary"
                required
              />
              <p className="text-xs text-muted-foreground">
                Helps us find your perfect match
              </p>
            </div>

            {/* Looking For Input */}
            <div
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Label htmlFor="lookingFor" className="text-sm font-semibold">
                What brings you here? *
              </Label>
              <Input
                id="lookingFor"
                placeholder="e.g., Networking, Collaboration"
                value={formData.lookingFor}
                onChange={(e) =>
                  setFormData({ ...formData, lookingFor: e.target.value })
                }
                className="h-12 rounded-xl border-2 focus:border-primary"
                required
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
          <Button
            type="submit"
            className="w-full py-4 text-lg font-semibold"
            disabled={!isValid}
          >
            Find My Match
          </Button>
        </div>
      </form>
    </div>
  );
};
