import Feed from '../feeds/index';
import Header from '../../component/header';
import Footer from '../../component/footer';

function Layout_base() {
    return (
        <>
            <Header />
            <main>
                <Feed />
            </main>
            <Footer />
        </>
    );
}

export default Layout_base;