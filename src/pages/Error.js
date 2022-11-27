import Banner from '../components/Banner.js'

export default function Error() {

  const data = {
    title: "404 - Not Found",
    content: "The page you are looking for cannot be found.",
    destination: "/",
    label: "Back Home"
  }

  console.log(data)
  return (
    <Banner bannerProp={data} />
  )
}