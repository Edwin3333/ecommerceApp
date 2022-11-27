
import Showcase from "../components/Showcase";
// import Services from "../components/Services"
import Banner from "../components/Banner";
import AppNavbar from "../components/AppNavbar";

const Home = () => {
  const data = {
    title: "WELCOME TO WIN SHOP!",
    content: "“The best deals are just one click away”",
    destination: "/login"
    // label: "Shop now!"
  }

  return (
    <>

      <Banner bannerProp={data}/>
      <AppNavbar/>
      <div className="showcase-Container" >
        <Showcase style={{ fontSize: "2rem", color: "#fff" }} />
  

      </div>

    </>
  )
}

export default Home