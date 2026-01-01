import Link from 'next/link';

export default function SkillCard({ skill }) {
  return (
    <Link href={`/skills/${skill.slug}`}>
      <div className="skill-card">
        <h3>{skill.skillTitle}</h3>
        <p>{skill.skillIntro.substring(0, 100)}...</p>
        <span className="learn-more">Learn more →</span>
      </div>
    </Link>
  );
}
