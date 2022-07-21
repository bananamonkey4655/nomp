import "./eatery.css";
import { MapPin, Phone, Link, Clock, Star } from "phosphor-react";

import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Loader from "components/Loader";

import { useState, useEffect } from "react";
import { BACKEND_URL } from "config";

const Eatery = (props) => {
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [eateryDetails, setEateryDetails] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      const URL = `${BACKEND_URL}/eatery/match?id=${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.error) {
        console.log("Error from fetching...");
        console.log(`${data.error.code}: ${data.error.description}`);
      } else {
        setEateryDetails(data);
        console.log(data);
      }
    };
    fetchData(props.id);
  }, []);

  if (eateryDetails) {
    const {
      name,
      photos,
      display_phone,
      location,
      rating,
      review_count,
      categories,
      price,
      url,
      hours,
      coordinates,
    } = eateryDetails;

    // static image src
    const source =
      `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.latitude},${coordinates.longitude}` +
      "&zoom=17" +
      "&size=300x300" +
      "&scale=2" +
      "&maptype=roadmap" +
      `&markers=color:red%7Clabel:%7C${coordinates.latitude},${coordinates.longitude}` +
      "&key=AIzaSyDuSONcwph1O_HdU-iQ_giJcdUBrlKk31M";

    const renderTooltip = (props) => (
      <Tooltip id="badge-tooltip" {...props}>
        Review Count: {review_count}
      </Tooltip>
    );

    /** function calculatePrice(price) {
          const budget = price.length;
          //const budget = JSON.stringify(price)
          if (budget === 1) {
            return 5;
          }
          else if (budget === 2) {
            return 15;
          }
          else if (budget === 3) {
            return 50;
          }
          else if (budget === 4) {
            return 80;
          }
          else {
            return null;
          }
        } */

    return (
      <div className="more-details-wrapper d-flex flex-column">
        <h1 className="eatery-title fw-bold">{name}</h1>

        <div>
          {categories.map((category) => (
            <Badge
              bg="primary"
              text="dark"
              className="me-2 my-2 categories shadow"
            >
              {category.title}
            </Badge>
          ))}
        </div>

        <div className="carousel-wrapper">
          <Carousel>
            {photos.map((photo_url) => (
              <Carousel.Item>
                <img className="eatery-img" src={photo_url} alt={name} />
                <Carousel.Caption>
                  <h3 className="text-light bg-dark fs-6"> {name} </h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="budget-and-rating d-flex justify-content-between mb-3">
          {price ? (
            <Badge bg="light" text="dark" className="budget shadow my-2 border">
              {" "}
              {price}{" "}
            </Badge>
          ) : (
            <div> </div>
          )}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Badge bg="light" text="dark" className="rating shadow my-2 border">
              <div className="font-style fs-4">
                Rating: {rating}
                <Star
                  size={24}
                  color="#fae500"
                  weight="fill"
                  className="ms-1"
                />
              </div>
            </Badge>
          </OverlayTrigger>
        </div>

        <div className="opening-and-googleimage d-flex justify-content-between">
          <Card style={{ width: "18rem", height: "10rem" }}>
            <Card.Body>
              <Card.Title className="fw-bold font-style fs-4 text-center text-decoration-underline d-flex">
                <div className="me-3">
                  {" "}
                  <Clock size={32} color="#00bbfa" weight="duotone" />{" "}
                </div>
                <div> Opening Hours </div>
              </Card.Title>
            </Card.Body>

            <ListGroup variant="flush">
              {hours !== undefined ? (
                hours[0]?.open?.slice(0, 7).map((day, index) => (
                  <ListGroup.Item>
                    {index === 0 ? <div> Monday </div> : <></>}
                    {index === 1 ? <div> Tuesday </div> : <></>}
                    {index === 2 ? <div> Wednesday </div> : <></>}
                    {index === 3 ? <div> Thursday </div> : <></>}
                    {index === 4 ? <div> Friday </div> : <></>}
                    {index === 5 ? <div> Saturday </div> : <></>}
                    {index === 6 ? <div> Sunday </div> : <></>}
                    {day.start}
                    <span> - </span>
                    {day.end}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item> No Opening Hours Found </ListGroup.Item>
              )}
            </ListGroup>
          </Card>

          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={source} />
            <Card.Body>
              <Card.Title className="font-style fw-bold mb-4 text-center fs-4 text-decoration-underline">
                Eatery Details
              </Card.Title>
              <Card.Text>
                <div className="details-box d-flex">
                  <div>
                    <MapPin size={32} color="#bc1a1a" />
                  </div>
                  <div className="ms-4">
                    <div> {location.address1} </div>
                    <div> {location.address2} </div>
                    <div>{location.address3} </div>
                    <div> Singapore {location.zip_code} </div>
                  </div>
                </div>
              </Card.Text>
              <Card.Text>
                <div className="details-box d-flex">
                  <div>
                    <Phone size={32} color="#00bbfa" weight="fill" />
                  </div>
                  <div className="ms-4">
                    <div> {display_phone} </div>
                  </div>
                </div>
              </Card.Text>
              <Card.Text>
                <div className="details-box d-flex">
                  <div>
                    <Link size={32} color="#00bbfa" weight="fill" />
                  </div>
                  <div className="ms-4">
                    <a href={url}> Link to more details </a>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <h1>
      {" "}
      <Loader message="Loading" />{" "}
    </h1>
  );
};

export default Eatery;

/**name,
rating,
review_count,
categories,
image_url,
location: place,
display_phone,
price,
*/
