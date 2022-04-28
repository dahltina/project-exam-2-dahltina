import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { BASE_API } from "../../constants/api";
import Heading from "../typography/Heading";
import Paragraph from "../typography/Paragraph";
import Footer from "../layout/Footer";
import BookingForm from "../forms/BookingForm";

const url = BASE_API + "wp/v2/accommodations/";

export default function AccomodationDetails() {

  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate.push("/");
  }

  const api = url + id;

  useEffect(function() {
    async function getData() {

      try {
        const response = await fetch(api);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setAccommodation(json);
        }
      }

      catch (error) {
        setError(error.toString())
      }

      finally {
        setLoading(false);
      }
    }
    getData()
  }, [])

  if (loading) {
    return <div>Loading..</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex flex-column col-8 mb-5">
            <Image src={accommodation.acf.img_1} />
          </Col>
          <Col className="d-flex flex-column col-4 mb-5">
            <Image src={accommodation.acf.img_2} className="mb-3" />
            <Image src={accommodation.acf.img_3} />
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column col-12 col-md-7">
            <Heading Tag="h1" title={accommodation.title.rendered} />
            <Heading Tag="h5" title={accommodation.acf.location} />
            <Paragraph Tag="p" content={accommodation.content.rendered} />
            <Heading Tag="h3" title="Facilities" />
            <Paragraph Tag="p" content={accommodation.acf.facilities} />
          </Col>
          <Col className="d-flex align-items-end flex-column">
            <BookingForm />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

// <Image src={accommodation.acf.rating} width="150px"/>
