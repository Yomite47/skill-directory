import Link from 'next/link';

export default function SectorCard({ sector }) {
  return (
    <Link href={`/sectors/${sector.slug}`}>
      <div className="skill-card" style={{minHeight:120, display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <h3 style={{marginBottom:6}}>{sector.title}</h3>
        <p style={{color:'var(--text-light)',fontSize:14}}>{sector.intro}</p>
      </div>
    </Link>
  );
}
