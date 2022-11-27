const Services = () => {
  return (
    <>
      <section className="services-section">
        <div className="services-container">
          <div className="services-division">
            <ion-icon name="airplane-outline" style={{ fontSize: "4rem", transform: "rotate(315deg)", color: "#1864ab" }}></ion-icon>
            <div>
              <span> <strong>Trusted Countries</strong></span>
              <br />
              <span style={{ color: "#7C7C7C" }}>we ship nationwide</span>
            </div>

          </div>
          <div className="services-division">
            <ion-icon name="repeat-outline" style={{ fontSize: "4rem", color: "#1864ab" }}></ion-icon>
            <div>
              <span> <strong>7 Days Replacement</strong></span>
              <br />
              <span style={{ color: "#7C7C7C" }}>if manufacturer defective</span>
            </div>
          </div>
          <div className="services-division">
            <ion-icon name="card-outline" style={{ fontSize: "4rem", color: "#1864ab" }}></ion-icon>
            <div>
              <span> <strong>Best Prices</strong></span>
              <br />
              <span style={{ color: "#7C7C7C" }}>huge selections of items</span>
            </div>
          </div>
          <div className="services-division">
            <ion-icon name="chatbubbles-outline" style={{ fontSize: "4rem", color: "#1864ab" }}></ion-icon>
            <div>
              <span> <strong>Trusted Store</strong></span>
              <br />
              <span style={{ color: "#7C7C7C" }}>Tons of positive feedbacks</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services