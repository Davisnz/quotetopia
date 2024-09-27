import Feed from "@components/Feed";
import Footer from "@components/Footer";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share 
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> The Best Quotes</span>
        </h1>
        <p className="desc text-center">
            Quotetopia is an open-source tool for modern world to discover, create and share inspiring quotes.
        </p>

        <Feed />


    </section>
  )
}

export default Home