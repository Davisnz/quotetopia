import '@styles/globals.css';
import Footer from '@components/Footer';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Quotetopia",
    description: "Discover & Share AI Prompts",
    icons: {
        icon: '/favicon.png',
    },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body className="relative"> 
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app pb-16">
                    <Nav />
                    {children}
                </main>

                <Footer />
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout