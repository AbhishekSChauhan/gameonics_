import React from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeftCircle,FiArrowRightCircle } from "react-icons/fi";

class SlickSlider extends React.Component {
    renderArrows = () => {
        return (
        <div>
            <button
            className="z-10 text-white text-2xl absolute inset-y-0 left-4"
            onClick={() => this.slider.slickPrev()}
            >
            <FiArrowLeftCircle />
            </button>
            <button
            className="z-10 text-white text-2xl absolute inset-y-0 right-4 float-right"
            onClick={() => this.slider.slickNext()}
            >
            <FiArrowRightCircle />
            </button>
        </div>
        );
    };

    render() {
        return (
            <div>
                <div className="relative ">
                    {this.renderArrows()}
                
                    <Slider
                        ref={c => (this.slider = c)}
                        dots={true}
                        arrows={false}
                        centerMode={true}
                        slidesToShow={1}
                        speed={500}
                        autoplay={false}
                    >
                        <Link to="/">
                        <img className="object-cover w-full max-h-96 border-2 border-transparent rounded-lg shadow-md transition duration-300 hover:border-purple-900 " 
                        src="https://sm.pcmag.com/t/pcmag_in/news/a/activision/activision-is-reducing-warzone-and-modern-warfare-file-sizes_7qmr.1920.png" alt="warzone" />
                        </Link>

                        <Link to="/">
                        <img className="object-cover w-full max-h-96 border-2 border-transparent rounded-lg shadow-md transition duration-300 hover:border-purple-900" 
                        src="https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-ii-key-art-wallpaper-desktop-image-block-01-ps4-us-04oct19?$1600px$" alt="last of us" />
                        </Link>

                        <Link to="/">
                        <img className="object-cover w-full max-h-96 border-2 border-transparent rounded-lg shadow-md transition duration-300 hover:border-purple-900" 
                        src="https://gmedia.playstation.com/is/image/SIEPDC/horizon-forbidden-west-desktop-01-wallpaper-04-en-18jun20?$1600px$" alt="horizon" />
                        </Link>

                        <Link to="/">
                        <img className="object-cover w-full max-h-96 border-2 border-transparent rounded-lg shadow-md transition duration-300 hover:border-purple-900" 
                        src="https://gmedia.playstation.com/is/image/SIEPDC/playstation-wallpapers_ghost-of-tsushima-keyart-4K-01-ps4-26jun20-en-us?$1600px--t$" alt="tsushima" />
                        </Link>
                    </Slider>
                </div>
            </div>
        );
     }
}


export default SlickSlider