import { useState } from 'react';
function UserCart() {

    const [cart, setCart] = useState(null);

    const renderLineItem = (lineItem) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={lineItem.bookItemModel.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={lineItem.bookItemModel.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{lineItem.bookItemModel.bookModel.title}</div>
                        <div className="product-description">{lineItem.bookItemModel.bookModel.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{lineItem.bookItemModel.bookModel.category}</span>
                        <ProgressBar value={50} className="m-2"></ProgressBar>
                        <Rating value={5} stars={5} cancel={false} className="m-3" />
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${lineItem.bookItemModel.exportedPrice}</span>
                        <Link to={`/bookitem/show/${lineItem.bookItemModel.id}`} className="block w-full">
                            <Button label='More' className="p-button-outlined p-button-info w-full"></Button>
                        </Link>
                        <span className="product-badge">Hello</span>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div>

        </div>
    );
}

export default UserCart;