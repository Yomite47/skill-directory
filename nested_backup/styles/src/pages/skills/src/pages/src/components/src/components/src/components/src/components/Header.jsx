import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link href="/">
          <h1 className="logo">Skill Directory</h1>
        </Link>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  );
}