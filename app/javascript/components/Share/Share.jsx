import React from 'react'
import { 
    FacebookShareButton, 
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    EmailShareButton,
    PinterestShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton,
    
    TelegramIcon,
    PinterestIcon,
    EmailIcon,
    LinkedinIcon,    
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    FacebookMessengerIcon
  } from 'react-share'
  import { useLocation } from "react-router-dom";


const Share = ({
    // url,
    title,
    shareImage,
    size = "2.5rem"
}) => {
    let location = useLocation();

    const url = window.location.href
    console.log('url location', window.location.href)
    return (
        <div className="flex flex-row lg:flex-col mx-auto ml-10 lg:ml-0">
            {/* <div class="w-full bg-white rounded-lg shadow-lg lg:w-1/3">
                <ul class="divide-y-2 divide-gray-100">
                    <li class="p-3 hover:bg-blue-600 hover:text-blue-200"> */}
                    <FacebookShareButton
                    className="network__share-button"
                    url={"https://morning-anchorage-15866.herokuapp.com" + location.pathname}
                    quote={title}
                    image={shareImage}
                    hashtag="#gameonics"
                    >
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    {/* </li>
                    <li class="p-3 hover:bg-blue-600 hover:text-blue-200"> */}
                    <TwitterShareButton
                    className="network__share-button"
                    url={"https://morning-anchorage-15866.herokuapp.com" + location.pathname}
                    title={title}
                    hashtag="#gameonics"
                    >
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>

                    
                    <PinterestShareButton
                    className="network__share-button"
                    url={"https://morning-anchorage-15866.herokuapp.com" + location.pathname}
                    media={shareImage}
                    description={title}
                    >
                        <PinterestIcon size={32} round={true} />
                    </PinterestShareButton>

                    <TelegramShareButton
                    className="network__share-button"
                    url={"https://morning-anchorage-15866.herokuapp.com" + location.pathname}
                    image={shareImage}
                    title={title}
                    >
                        <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>

                    <WhatsappShareButton
                    className="network__share-button"
                    url = {"https://morning-anchorage-15866.herokuapp.com" + location.pathname}
                    image = {shareImage}
                    separator=" :: "
                    title={title}
                    >
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>

                    
                    {/* </li>
                </ul>
            </div> */}
            
        </div>
    )
}

export default Share
