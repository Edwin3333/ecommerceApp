import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const Contact = () => {
  return (
    <>
      <section>
        <h4 className="contact__title">Contact us</h4>
        <div>
          {/* Contact Form */}
          <div className='contact__form'>
            <Form>
              <Form.Group className="mb-3" controlId="supportType">
                <Form.Label>Subject</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="Customer service">Customer service</option>
                  <option value="Technical support">Technical support</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Label>Attachment</Form.Label><span style={{ fontSize: "13px", color: "#868e96" }}>&nbsp;(optional)</span>

              <br />

              <FloatingLabel controlId="issueComment" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>



              <br />
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </div>

        </div>
      </section>
    </>
  )
}

export default Contact