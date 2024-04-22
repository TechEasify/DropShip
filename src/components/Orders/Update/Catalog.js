import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Icon } from '@shopify/polaris';
import { ArrowLeftIcon, ArrowRightIcon } from '@shopify/polaris-icons';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';
import Isotope from 'isotope-layout';

export default function Catalog(props) {
  const history = useHistory();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const flickityRef = useRef(null);
  const isotopeRef = useRef(null);

  useEffect(() => {
    flickityRef.current = new Flickity('.carousel', {
      imagesLoaded: true,
      percentPosition: false
    });
  
    isotopeRef.current = new Isotope('.card-direction', {
      itemSelector: '.card-direction',
      layoutMode: 'fitRows'
    });
  
    return () => {
      flickityRef.current.destroy();
      isotopeRef.current.destroy();
    };
  }, []);

  const images = [
    {
      name: 'All',
      category: 'all',
      image:
        'https://naturescure-all.com/cdn/shop/files/Shop_By_Scent_1570x.jpg?v=1700478987',
    },
    {
      name: 'Personal Hygiene',
      category: 'personal',
      image:
        'https://naturescure-all.com/cdn/shop/files/PERSONAL_HYGEINE_1570x.jpg?v=1700478985',
    },
    {
      name: 'Supplements',
      category: 'supplements',
      image:
        'https://naturescure-all.com/cdn/shop/files/Supplements_1570x.jpg?v=1700478986',
    },
    {
      name: 'Skin care',
      category: 'skin',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
    },
    {
      name: 'Hair care',
      category: 'hair',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
    },
    {
      name: 'Aromatherapy',
      category: 'aromatherapy',
      image:
        'https://naturescure-all.com/cdn/shop/files/AROMATHERAPY_1570x.jpg?v=1700478933',
    },
  ];

  // const handlePrevClick = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleNextClick = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  const handleSliderChange = (index) => {
    setCurrentImageIndex(index);
    if (isotopeRef.current) {
      const filterValue = index === 0 ? '*' : `.${images[index].category}`;
      isotopeRef.current.arrange({ filter: filterValue });
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <div className="row">
              <div className="catalog-heading">
                <h2 className="pf-h2 pf-my-40">Product Catalog</h2>
              </div>

              <div
                className="carousel"
                data-flickity='{ "imagesLoaded": true, "percentPosition": false }'
              >
                {images.map((image, index) => (
                  <>
                  <div
                    key={index}
                    className="carousel-cell"
                    onClick={() => handleSliderChange(index)}
                  >
                    <img src={image.image} alt={`Slide ${index + 1}`} />
                    <br/>
                    <div className="card-lable">
                      <h6 style={{ fontWeight: 800 }}>{image.name}</h6>
                    </div>
                  </div>
                  </>
                ))}
              </div>

                <div className="card-direction">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`card-direction ${image.category}`}
                    >
                      <Card
                        sx={{ maxWidth: 350, margin: 1 }}
                        className="card-detail"
                      >
                        <div className="cardmedia">
                          <CardMedia
                            className="cardimg-mui"
                            component="img"
                            alt="Product Image"
                            height="200"
                            image={image.image}
                            onClick={() => history.push('/orders/shipping')}
                          />
                          <CardContent>
                            <h5>{image.name}</h5>
                            <div className="card-inner">
                              <div className="card-alltext">
                                <div className="card-pay">
                                  <h6 style={{ marginBottom: '10px' }}>
                                    You Pay: $11.40
                                  </h6>
                                  <h6 style={{ marginBottom: '10px' }}>
                                    Shipping charges: $5
                                  </h6>
                                  <p style={{ marginBottom: '10px' }}>
                                    You sell: $37
                                  </p>
                                </div>
                                <div className="card-profit">
                                  <h6>Profit: </h6>
                                  <h6 style={{ color: 'green' }}>$20.60</h6>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <div className="card-button">
                            <div className="addtoproduct">
                              <Button
                                className="product-btn"
                                onClick={() => history.push('template/1')}
                              >
                                Customise your product
                              </Button>
                            </div>
                            <div className="shopping-cart">
                              <Button
                                className="product-btn"
                                onClick={() => history.push('/template')}
                              >
                                Select Product
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

              {/* <div className="catalog-container">
                <div className="card-slider">
                  <button className="prev" onClick={handlePrevClick}>
                    <Icon source={ArrowLeftIcon} tone="base" />
                  </button>
                  <button className="next" onClick={handleNextClick}>
                    <Icon source={ArrowRightIcon} tone="base" />
                  </button>
                  <div className="image-container">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="image-wrapper"
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <label
                          className={
                            index === currentImageIndex ? 'active' : ''
                          }
                        >
                          <img src={image.image} alt={`Slide ${index + 1}`} />
                        </label>
                        <hr />
                        <div className="card-lable">
                          <h6>{image.name}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
              {/* <div className="card-catalog">
                <div className="card-direction">
                  <Card
                    sx={{ maxWidth: 350, margin: 1 }}
                    className="card-detail"
                  >
                    <div className="cardmedia">
                      <CardMedia
                        className="cardimg-mui"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"
                        onClick={() => history.push('/orders/shipping')}
                      />
                      <CardContent>
                        <h5>Liquid Foundation - Mahogany</h5>
                        <div className="card-inner">
                          <div className="card-alltext">
                            <div className="card-pay">
                              <h6 style={{ marginBottom: '10px' }}>
                                You Pay: $11.40
                              </h6>
                              <h6 style={{ marginBottom: '10px' }}>
                                Shipping charges: $5
                              </h6>
                              <p style={{ marginBottom: '10px' }}>
                                You sell: $37
                              </p>
                            </div>
                            <div className="card-profit">
                              <h6>Profit: </h6>
                              <h6 style={{ color: 'green' }}>$20.60</h6>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="card-button">
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('template/1')}
                          >
                            Custommise your product
                          </Button>
                        </div>
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/template')}
                          >
                            Select Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="card-direction">
                  <Card
                    sx={{ maxWidth: 350, margin: 1 }}
                    className="card-detail"
                  >
                    <div className="cardmedia">
                      <CardMedia
                        className="cardimg-mui"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"
                        onClick={() => history.push('/orders/shipping')}
                      />
                      <CardContent>
                        <h5>Liquid Foundation - Mahogany</h5>
                        <div className="card-inner">
                          <div className="card-alltext">
                            <div className="card-pay">
                              <h6 style={{ marginBottom: '10px' }}>
                                You Pay: $11.40
                              </h6>
                              <h6 style={{ marginBottom: '10px' }}>
                                Shipping charges: $5
                              </h6>
                              <p style={{ marginBottom: '10px' }}>
                                You sell: $37
                              </p>
                            </div>
                            <div className="card-profit">
                              <h6>Profit: </h6>
                              <h6 style={{ color: 'green' }}>$20.60</h6>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="card-button">
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('template/1')}
                          >
                            Custommise your product
                          </Button>
                        </div>
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/template')}
                          >
                            Select Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="card-direction">
                  <Card
                    sx={{ maxWidth: 350, margin: 1 }}
                    className="card-detail"
                  >
                    <div className="cardmedia">
                      <CardMedia
                        className="cardimg-mui"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"
                        onClick={() => history.push('/orders/shipping')}
                      />
                      <CardContent>
                        <h5>Liquid Foundation - Mahogany</h5>
                        <div className="card-inner">
                          <div className="card-alltext">
                            <div className="card-pay">
                              <h6 style={{ marginBottom: '10px' }}>
                                You Pay: $11.40
                              </h6>
                              <h6 style={{ marginBottom: '10px' }}>
                                Shipping charges: $5
                              </h6>
                              <p style={{ marginBottom: '10px' }}>
                                You sell: $37
                              </p>
                            </div>
                            <div className="card-profit">
                              <h6>Profit: </h6>
                              <h6 style={{ color: 'green' }}>$20.60</h6>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="card-button">
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('template/1')}
                          >
                            Custommise your product
                          </Button>
                        </div>
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/template')}
                          >
                            Select Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="card-direction">
                  <Card
                    sx={{ maxWidth: 350, margin: 1 }}
                    className="card-detail"
                  >
                    <div className="cardmedia">
                      <CardMedia
                        className="cardimg-mui"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"
                        onClick={() => history.push('/orders/shipping')}
                      />
                      <CardContent>
                        <h5>Liquid Foundation - Mahogany</h5>
                        <div className="card-inner">
                          <div className="card-alltext">
                            <div className="card-pay">
                              <h6 style={{ marginBottom: '10px' }}>
                                You Pay: $11.40
                              </h6>
                              <h6 style={{ marginBottom: '10px' }}>
                                Shipping charges: $5
                              </h6>
                              <p style={{ marginBottom: '10px' }}>
                                You sell: $37
                              </p>
                            </div>
                            <div className="card-profit">
                              <h6>Profit: </h6>
                              <h6 style={{ color: 'green' }}>$20.60</h6>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="card-button">
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('template/1')}
                          >
                            Custommise your product
                          </Button>
                        </div>
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/template')}
                          >
                            Select Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="card-direction">
                  <Card
                    sx={{ maxWidth: 350, margin: 1 }}
                    className="card-detail"
                  >
                    <div className="cardmedia">
                      <CardMedia
                        className="cardimg-mui"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"
                        onClick={() => history.push('/orders/shipping')}
                      />
                      <CardContent>
                        <h5>Liquid Foundation - Mahogany</h5>
                        <div className="card-inner">
                          <div className="card-alltext">
                            <div className="card-pay">
                              <h6 style={{ marginBottom: '10px' }}>
                                You Pay: $11.40
                              </h6>
                              <h6 style={{ marginBottom: '10px' }}>
                                Shipping charges: $5
                              </h6>
                              <p style={{ marginBottom: '10px' }}>
                                You sell: $37
                              </p>
                            </div>
                            <div className="card-profit">
                              <h6>Profit: </h6>
                              <h6 style={{ color: 'green' }}>$20.60</h6>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="card-button">
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('template/1')}
                          >
                            Custommise your product
                          </Button>
                        </div>
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/template')}
                          >
                            Select Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="card-direction">
                  <Card
                    sx={{ maxWidth: 350, margin: 1 }}
                    className="card-detail"
                  >
                    <div className="cardmedia">
                      <CardMedia
                        className="cardimg-mui"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image="https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png"
                        onClick={() => history.push('/orders/shipping')}
                      />
                      <CardContent>
                        <h5>Liquid Foundation - Mahogany</h5>
                        <div className="card-inner">
                          <div className="card-alltext">
                            <div className="card-pay">
                              <h6 style={{ marginBottom: '10px' }}>
                                You Pay: $11.40
                              </h6>
                              <h6 style={{ marginBottom: '10px' }}>
                                Shipping charges: $5
                              </h6>
                              <p style={{ marginBottom: '10px' }}>
                                You sell: $37
                              </p>
                            </div>
                            <div className="card-profit">
                              <h6>Profit: </h6>
                              <h6 style={{ color: 'green' }}>$20.60</h6>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="card-button">
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('template/1')}
                          >
                            Custommise your product
                          </Button>
                        </div>
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/template')}
                          >
                            Select Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
