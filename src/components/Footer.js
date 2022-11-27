const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="footer-container">
          <div>
            <p className="footer-title">Store Information</p>
            <div>
              <div className="footer-category">
                <ion-icon name="location-outline" style={{ fontSize: "2rem", color: "#fff" }}></ion-icon>
                <span>
                  13th Street 47 W 13th St, New York, NY 10011, USA
                </span>
              </div>

            </div>
          </div>
          <div>
            <p className="footer-title">Our Company</p>
            <div>
              <div className="footer-category">

                <p>
                  Terms and conditions of use
                </p>
              </div>

            </div>
          </div>
          <div className="footer-category">
            <p>your Account</p>
            <div>
              <p>
                13th Street 47 W 13th St, New York, NY 10011, USA
              </p>
            </div>
          </div>
          <div className="footer-category">
            <p>News Letter</p>
            <div>
              <p>
                13th Street 47 W 13th St, New York, NY 10011, USA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer