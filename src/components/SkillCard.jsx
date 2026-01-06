import Link from 'next/link';
import { Bot, Clapperboard, Film, TrendingUp, PenTool, BookOpen } from 'lucide-react';

export default function SkillCard({ skill }) {
  function getIcon(slug) {
    if (slug === 'ai-automation') return <Bot size={40} color="#4f46e5" />;
    if (slug === 'video-editing') return <Clapperboard size={40} color="#4f46e5" />;
    if (slug === 'animation') return <Film size={40} color="#4f46e5" />;
    if (slug === 'technical-analysis') return <TrendingUp size={40} color="#4f46e5" />;
    if (slug === 'content-creation-writing') return <PenTool size={40} color="#4f46e5" />;
    return <BookOpen size={40} color="#4f46e5" />;
  }

  return (
    <Link href={`/skills/${skill.slug}`}>
      <div className="skill-card">
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.5rem'}}>
          <div className="card-icon">{getIcon(skill.slug)}</div>
          <h3 style={{marginBottom:0}}>{skill.skillTitle}</h3>
        </div>
        <p style={{color:'var(--text-light)',fontSize:14,marginBottom:'1rem'}}>
          {skill.skillIntro.substring(0, 150)}...
        </p>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <span className="btn btn-primary">Explore</span>
        </div>
      </div>
    </Link>
  );
}
