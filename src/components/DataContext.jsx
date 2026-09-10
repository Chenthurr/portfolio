import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialAchievements,
  initialCertifications,
  initialEducation,
  initialSettings,
} from '../data/initialData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('ck-profile', initialProfile);
  const [projects, setProjects] = useLocalStorage('ck-projects', initialProjects);
  const [skills, setSkills] = useLocalStorage('ck-skills', initialSkills);
  const [experience, setExperience] = useLocalStorage('ck-experience', initialExperience);
  const [achievements, setAchievements] = useLocalStorage('ck-achievements', initialAchievements);
  const [certifications, setCertifications] = useLocalStorage('ck-certifications', initialCertifications);
  const [education, setEducation] = useLocalStorage('ck-education', initialEducation);
  const [settings, setSettings] = useLocalStorage('ck-settings', initialSettings);
  const [adminPassword, setAdminPassword] = useLocalStorage('ck-admin-password', 'Chen@1234#');
  const [isAdmin, setIsAdmin] = useLocalStorage('ck-admin-session', false);
  const [resumeDataUrl, setResumeDataUrl] = useLocalStorage('ck-resume-dataurl', null);
  const [portraitDataUrl, setPortraitDataUrl] = useLocalStorage('ck-portrait-dataurl', null);

  const value = {
    profile, setProfile,
    projects, setProjects,
    skills, setSkills,
    experience, setExperience,
    achievements, setAchievements,
    certifications, setCertifications,
    education, setEducation,
    settings, setSettings,
    adminPassword, setAdminPassword,
    isAdmin, setIsAdmin,
    resumeDataUrl, setResumeDataUrl,
    portraitDataUrl, setPortraitDataUrl,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
