import { useState, useEffect} from "react";
import { BASE_API } from "../../constants/api";
import AccommodationItem from "./AccommodationItem";
import Spinner from "react-bootstrap/Spinner";

const url = BASE_API + "wp/v2/accommodations?per_page=10&page=1&_embed";

export default function AccomodationList() {

  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    async function getData() {
      try {
        const response = await fetch(url);

        if(response.ok) {
          const json = await response.json();
          console.log(json);
          setAccommodation(json);
        }
        else {
          setError("An error occured");
        }
      }

      catch (error) {
        setError("An error occured");
      }

      finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <div class="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
  }

  if (error) {
    return <div>An error occured</div>
  }

  return (
    <div className="featured-container">
      {accommodation.map(function (accommodation) {
        const { id, image, title, rating, excerpt, acf } = accommodation;
        return <AccommodationItem
          key={id}
          id={id}
          title={title}
          image={image}
          rating={rating}
          excerpt={excerpt}
          acf={acf}
        />;
      })}
    </div>
  );
}
