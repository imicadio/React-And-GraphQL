import Link from 'next/Link';
import Nav from './Nav';

export default function Header() {
    return (
        <header>
            <div className="bar">
                <Link href="/">Stick fits</Link>
            </div>
            <div className="sub-bar">
                <p>search</p>
            </div>
            <Nav />
        </header>
    );
}