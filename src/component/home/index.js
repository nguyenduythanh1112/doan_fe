import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

const Home = () => {

    const [images, setImages] = useState(null)

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        setImages([
            {
                itemImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria4.jpg",
                thumbnailImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria4.jpg"
            },
            {
                itemImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria1.jpg",
                thumbnailImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria1.jpg"
            },
            {
                itemImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria2.jpg",
                thumbnailImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria2.jpg"
            },
            {
                itemImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria3.jpg",
                thumbnailImageSrc: "https://www.primefaces.org/primereact/images/galleria/galleria3.jpg"
            },
        ])
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div>
            <div className="card">
                <Galleria value={images}
                    className="w-full"
                    responsiveOptions={responsiveOptions}
                    numVisible={5} circular
                    showItemNavigators
                    showThumbnails={false}
                    showItemNavigatorsOnHover
                    showIndicators
                    item={itemTemplate}
                    thumbnail={thumbnailTemplate}
                    autoPlay
                />
            </div>
        </div>
    );
}

export default Home;