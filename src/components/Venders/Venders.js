import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Button, Icon, Pagination, Select, TextField } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';

function Venders() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  const data = [
    {
      id: 1,
      title: 'Liquid Foundation',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 2,
      title: 'Another Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 3,
      title: 'moisturizer',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 4,
      title: 'daily Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 5,
      title: 'Liquid daily',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 6,
      title: 'natural Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 7,
      title: 'Liquid Foundation',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 8,
      title: 'Another Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 9,
      title: 'Liquid Foundation',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 10,
      title: 'Another Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 11,
      title: 'Liquid Foundation',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 12,
      title: 'Another Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 13,
      title: 'moisturizer',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 14,
      title: 'daily Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 15,
      title: 'Liquid daily',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 16,
      title: 'natural Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 17,
      title: 'Liquid Foundation',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 18,
      title: 'Another Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
    {
      id: 19,
      title: 'Liquid Foundation',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      description: 'Description of product 1...',
    },
    {
      id: 20,
      title: 'Another Product',
      image:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      description: 'Description of product 2...',
    },
  ];

  useEffect(() => {
    const total = Math.ceil(data.length / cardsPerPage);
    if (currentPage > total) {
      setCurrentPage(1);
    }
  }, [data, cardsPerPage, currentPage]);

  const filteredCards = data.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const handleChange = (newValue) => setSearchQuery(newValue);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handlePerPageChange = (value) => {
    const newPerPage = parseInt(value, 10);
    setCardsPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="vender-main">
        <div className="vender-head">
          <h2 className="category-heading">Manage Vendor</h2>
          <div className="filter-search-vender">
            <TextField
              autoComplete="off"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChange}
            />
            <div className="search-icon">
              <Icon source={SearchIcon} tone="base" />
            </div>
          </div>
        </div>
        {filteredCards.length !== 0 ? (
          <>
            <div className="venders-card">
              {filteredCards.slice(indexOfFirstCard, indexOfLastCard).map(
                (card, index) => (
                  console.log(card, 'card'),
                  (
                    <Card key={index} sx={{ width: '30%', marginBottom: 2 }}>
                      <CardMedia
                        sx={{ height: 350 }}
                        image={card.image}
                        title={card.title}
                        className="card-venderImg"
                        onClick={() => history.push('/admin/vendor/detail')}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                      </CardContent>
                      <div className="card-button">
                        <div className="shopping-cart">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/admin/vendor/#')}
                          >
                            Link
                          </Button>
                        </div>
                        <div className="addtoproduct">
                          <Button
                            className="product-btn"
                            onClick={() => history.push('/admin/vendor/detail')}
                          >
                            Products
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                )
              )}
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: '10px',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                }}
              >
                <div className="label-perpage">
                  <p>Row per page:- </p>
                </div>
                <Select
                  options={options}
                  value={cardsPerPage.toString()}
                  onChange={handlePerPageChange}
                />
              </div>
              <Pagination
                onPrevious={() => handlePageChange(currentPage - 1)}
                onNext={() => handlePageChange(currentPage + 1)}
                hasPrevious={currentPage !== 1}
                hasNext={indexOfLastCard < filteredCards.length}
                label={`${indexOfFirstCard + 1}-${Math.min(
                  indexOfLastCard,
                  filteredCards.length
                )} of ${filteredCards.length} cards`}
              />
            </div>
          </>
        ) : (
          <div className="not-found">
            <div className="result-not">
              <h2 className="category-heading">No Results Found!</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Venders;
