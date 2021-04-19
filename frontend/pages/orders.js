import { useQuery } from "@apollo/client";
import gql from "graphql-tag"
import styled from "styled-components";
import OrderStyles from '../components/styles/OrderStyles';
import Head from 'next/head';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import Link from 'next/Link';
import formatMoney from "../lib/formatMoney";

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY {
        allOrders {
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

const OrderUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
    return order.items.reduce((tally, item) => tally + item.quantity, 0)
}

export default function OrdersPage({ query }) {
    const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
    if(loading) return <p>Loading...</p>;
    if(error) return <DisplayError error={error} />;
    const { allOrders } = data;
    return (
        <div>
            <Head>
                <title>
                    Your Orders ({allOrders.length})
                </title>
            </Head>
            <h2>You have {allOrders.length} orders!</h2>
            <OrderUl>
                {allOrders.map(order => <OrderItemStyles>
                    <Link href={`/order/${order.id}`}>
                        <a>
                        <div className="order-meta">
                            <p>{countItemsInAnOrder(order)}Items</p>
                            <p>{order.items.length} Products {order.items.length === 1 ? '' : 's'}</p>
                            <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                            {order.items.map(item => (
                                <img 
                                    key={`image-${item.id}`} 
                                    src={item.photo?.image?.publicUrlTransformed} 
                                    alt={item.name} 
                                />
                            ))}
                        </div>
                        </a>
                    </Link>
                </OrderItemStyles>)}
            </OrderUl>
        </div>
    );
}