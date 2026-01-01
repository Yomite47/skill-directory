import Head from 'next/head';
import Header from '../components/Header';
import SkillCard from '../components/SkillCard';
import SectorCard from '../components/SectorCard';
import AnimatedCharacter from '../components/AnimatedCharacter';
import Footer from '../components/Footer';
import skillsData from '../data/skills.json';
import sectorsData from '../data/sectors.json';

export default function Home() {
  return (
    <>
      <Head>
        <title>Skill Learning Directory</title>
        <meta name="description" content="Find the best resources to learn any skill" />
      </Head>
      
      <Header />
      
      <main className="container">
        <section className="hero">
          <AnimatedCharacter />
          <h1>Learn Any Skill, Find Best Resources</h1>
          <p className="subtitle">
            This directory guides you to the best people, resources, and learning paths for each skill. 
            Click on any skill to explore recommended accounts, courses, and step-by-step guides.
          </p>
        </section>
        
        <section className="skills-grid">
          <h2>Available Skills</h2>
          <div className="grid">
            {skillsData.skills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
            {sectorsData.sectors.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
