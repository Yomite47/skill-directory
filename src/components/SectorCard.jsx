import Link from 'next/link';
import { Bot, Clapperboard, Film, TrendingUp, PenTool, BookOpen } from 'lucide-react';

export default function SectorCard({ sector }) {
  function getIcon(slug) {
    if (slug === 'ai-automation') return <Bot size={40} color="#4f46e5" />;
    if (slug === 'video-editing') return <Clapperboard size={40} color="#4f46e5" />;
    if (slug === 'animation') return <Film size={40} color="#4f46e5" />;
    if (slug === 'technical-analysis') return <TrendingUp size={40} color="#4f46e5" />;
    if (slug === 'content-creation-writing') return <PenTool size={40} color="#4f46e5" />;
    return <BookOpen size={40} color="#4f46e5" />;
  }

  return (
    <Link href={`/sectors/${sector.slug}`}>
      <div className="skill-card" style={{minHeight:180, display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.5rem'}}>
          <div className="card-icon">{getIcon(sector.slug)}</div>
          <h3 style={{marginBottom:0}}>{sector.title}</h3>
        </div>
        <p style={{color:'var(--text-light)',fontSize:14,marginBottom:'1rem'}}>{sector.intro}</p>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <span className="btn btn-primary">Explore</span>
        </div>
      </div>
    </Link>
  );
}
