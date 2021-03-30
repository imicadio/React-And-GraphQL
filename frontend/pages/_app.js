import NProgress from 'nprogress';
import Router from 'next/router';
import Page from "../components/Page";
import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo}) {
    return (
        <ApolloProvider client={apollo}>
            <Page>
                <Component {...pageProps} />
            </Page>
        </ApolloProvider>
    );
}

MyApp.getInitialProps = async function({ Component, ctx }) {
    let pagePros = {};
    if(Component.getInitialProps) {
        pagePros = await Component.getInitialProps(ctx);
    }
    pagePros.query = ctx.query;
    return { pagePros };
}

export default withData(MyApp);