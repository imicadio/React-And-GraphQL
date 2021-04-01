import Link from 'next/Link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
            <Link href="/products">Products</Link>            
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
        </NavStyles>
    );
}