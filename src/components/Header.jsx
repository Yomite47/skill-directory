import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="header">
      <div className="container" style={{display:'flex',alignItems:'center',gap:'1rem',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
          <Link href="/">
            <h1 className="logo">Skill Directory</h1>
          </Link>
          <nav style={{display:'flex',gap:'0.75rem',alignItems:'center'}}>
            <Link href="/">Home</Link>
          </nav>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
