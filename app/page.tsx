import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import { getPortfolioData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { hero, about, skills, experience, projects, contact } = await getPortfolioData();

  return (
    <>
      <Navbar name={hero?.name} />
      <main>
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <SkillsSection data={skills} />
        <ExperienceSection data={experience} />
        <ProjectsSection data={projects} />
        <ContactSection data={contact} />
      </main>
      <Footer
        name={hero?.name}
        githubUrl={hero?.githubUrl}
        linkedinUrl={hero?.linkedinUrl}
        email={hero?.email}
      />
    </>
  );
}
