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
                itemImageSrc: "https://truongquochoc.com/wp-content/uploads/2020/10/top-30-hinh-anh-canh-dong-hoa-dep-nhat-the-gioi-1.jpg",
                thumbnailImageSrc: "https://truongquochoc.com/wp-content/uploads/2020/10/top-30-hinh-anh-canh-dong-hoa-dep-nhat-the-gioi-1.jpg"
            },
            {
                itemImageSrc: "https://loanthehongnhan.vn/hinh-nen-dep-full-hd-1920x1080/imager_2_36260_700.jpg",
                thumbnailImageSrc: "https://loanthehongnhan.vn/hinh-nen-dep-full-hd-1920x1080/imager_2_36260_700.jpg"
            },
            {
                itemImageSrc: "https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-na_n-full-hd-1920-x-1080-aap-nhayt-1.jpg",
                thumbnailImageSrc: "https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-na_n-full-hd-1920-x-1080-aap-nhayt-1.jpg"
            },
            {
                itemImageSrc: "https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-na_n-full-hd-1920-x-1080-aap-nhayt-22.jpg",
                thumbnailImageSrc: "https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-na_n-full-hd-1920-x-1080-aap-nhayt-22.jpg"
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