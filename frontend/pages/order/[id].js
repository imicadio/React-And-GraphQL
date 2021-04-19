import { useQuery } from "@apollo/client";
import gql from "graphql-tag"
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        order: Order(where: { id: $id }) {
            id
            charge
            total
            user {
                id
            }
            items {
                id
                name
                description
                price
                quantity
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`;

export default function SingleOrderPage({ query }) {
    const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
        variables: { id: query.id }
    });
    if(loading) return <p>Loading...</p>
    if(error) return <DisplayError error={error} />
    const { order } = data;
    return (
        <OrderStyles>
            <Head>
                <title>Sick Fits - {order.id}</title>
            </Head>
            <p>
                <span>Order Id:</span>
                <spand>{order.id}</spand>
            </p>
            <p>
                <span>Charge:</span>
                <spand>{order.charge}</spand>
            </p>
            <p>
                <span>Order Total:</span>
                <spand>{formatMoney(order.total)}</spand>
            </p>
            <p>
                <span>Item Count:</span>
                <spand>{order.items.length}</spand>
            </p>
            <div className="items">
                {order.items.map(item => (
                    <div className="order-item" key={item.id}>
                        <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {formatMoney(item.price)}</p>
                            <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>                            
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </OrderStyles>
    );
}