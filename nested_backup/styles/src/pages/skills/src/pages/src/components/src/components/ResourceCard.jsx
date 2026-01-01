export default function ResourceCard({ title, link, description, type }) {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'twitter': return '🐦';
      case 'youtube': return '▶️';
      case 'free': return '🆓';
      case 'paid': return '💰';
      default: return '📚';
    }
  };
  
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="resource-card"
    >
      <div className="card-icon">{getTypeIcon(type)}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="external-link">Open →</span>
    </a>
  );
}