import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

async function getData() {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const headers = { 'Content-Type': 'application/json' };

  const [hero, about, skills, experience, projects, contact] = await Promise.all([
    fetch(`${base}/api/hero`, { next: { revalidate: 60 }, headers }).then((r) => r.json()).catch(() => ({})),
    fetch(`${base}/api/about`, { next: { revalidate: 60 }, headers }).then((r) => r.json()).catch(() => ({})),
    fetch(`${base}/api/skills`, { next: { revalidate: 60 }, headers }).then((r) => r.json()).catch(() => []),
    fetch(`${base}/api/experience`, { next: { revalidate: 60 }, headers }).then((r) => r.json()).catch(() => []),
    fetch(`${base}/api/projects`, { next: { revalidate: 60 }, headers }).then((r) => r.json()).catch(() => []),
    fetch(`${base}/api/contact`, { next: { revalidate: 60 }, headers }).then((r) => r.json()).catch(() => ({})),
  ]);

  return { hero, about, skills, experience, projects, contact };
}

export default async function HomePage() {
  const { hero, about, skills, experience, projects, contact } = await getData();

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
