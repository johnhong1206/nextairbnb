import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";

function Banner() {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src={img1} alt="" />
        </div>
        <div>
          <img loading="lazy" src={img2} alt="" />
        </div>
        <div>
          <img loading="lazy" src={img3} alt="" />
        </div>
        <div>
          <img loading="lazy" src={img4} alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
