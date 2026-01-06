import { Twitter, Youtube, Globe, DollarSign, BookOpen } from 'lucide-react';

function getTypeIcon(type) {
  switch(type) {
    case 'twitter': return <Twitter size={24} color="#1DA1F2" />;
    case 'youtube': return <Youtube size={24} color="#FF0000" />;
    case 'free': return <Globe size={24} />;
    case 'paid': return <DollarSign size={24} />;
    default: return <BookOpen size={24} />;
  }
}

export default function ResourceCard({ title, link, description, type }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="resource-card"
    >
      <div className="card-icon">
        {getTypeIcon(type)}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
