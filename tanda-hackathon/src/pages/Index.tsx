import React, { useState } from "react";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { QRScanScreen } from "../components/QRScanScreen";
import { UserInfoForm } from "../components/UserInfoForm";
import type { UserData } from "../components/UserInfoForm";
import { MatchScreen } from "../components/MatchScreen";

type Screen = "welcome" | "qr-scan" | "user-info" | "match";

const Index: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleStart = () => {
    setCurrentScreen("qr-scan");
  };

  const handleScanComplete = () => {
    setCurrentScreen("user-info");
  };

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("match");
  };

  const handleReset = () => {
    setUserData(null);
    setCurrentScreen("welcome");
  };

  const handleBack = () => {
    if (currentScreen === "qr-scan") {
      setCurrentScreen("welcome");
    } else if (currentScreen === "user-info") {
      setCurrentScreen("qr-scan");
    }
  };

  return (
    <>
      {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}

      {currentScreen === "qr-scan" && (
        <QRScanScreen onScanComplete={handleScanComplete} onBack={handleBack} />
      )}

      {currentScreen === "user-info" && (
        <UserInfoForm onSubmit={handleFormSubmit} onBack={handleBack} />
      )}

      {currentScreen === "match" && userData && (
        <MatchScreen userData={userData} onReset={handleReset} />
      )}
    </>
  );
};

export default Index;