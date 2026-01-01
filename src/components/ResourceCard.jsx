function getTypeIcon(type) {
  switch(type) {
    case 'twitter': return '🐦';
    case 'youtube': return '▶️';
    case 'free': return '🆓';
    case 'paid': return '💰';
    default: return '📚';
  }
}

export default function ResourceCard({ title, link, description, type, logo }) {
  return (
    <div className="resource-card">
      <div>
        <div className="card-icon" style={type === 'youtube' ? { color: '#ff0000' } : {}}>
          {logo || getTypeIcon(type)}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="card-actions">
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn">Open</a>
      </div>
    </div>
  );
}
