import React from 'react';

export default function Sidebar() {
  return (
    <>
      <div className="catalog__sidebar-content">
        <ul className="catalog__sidebar-menu catalog__sidebar-menu--hide-children catalog__sidebar-menu--top-level hidden-xs">
          <li className="catalog__sidebar-menu__item pf-py-4 catalog__sidebar-menu__item--active">
            <a href="https://www.dropshippy.com/products-catalog/mens-clothing">
              Men's clothing
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 'auto' }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/mens/shirts">
                  All shirts
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/t-shirts">
                      T-shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/all-over-shirts">
                      All-over shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/polo-shirts">
                      Polo shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/tank-tops">
                      Tank tops
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/3-4-sleeve-shirts">
                      3/4 sleeve shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/long-sleeve-shirts">
                      Long sleeve shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/embroidered-shirts">
                      Embroidered shirts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/mens/jackets">
                  Jackets
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/mens/hoodies-sweatshirts">
                  All hoodies &amp; sweatshirts
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/hoodies">
                      Hoodies
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/sweatshirts">
                      Sweatshirts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/mens/bottoms">
                  Bottoms
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/sweatpants-joggers">
                      Sweatpants &amp; joggers
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/leggings">
                      Leggings
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/mens/shorts">
                      Shorts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <li className="catalog__sidebar-menu__item pf-py-4">
            <a href="https://www.dropshippy.com/products-catalog/womens-clothing">
              Women's clothing
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 0 }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/shirts">
                  All shirts
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/t-shirts">
                      T-shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/all-over-shirts">
                      All-over shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/tank-tops">
                      Tank tops
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/crop-tops">
                      Crop tops
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/embroidered-shirts">
                      Embroidered shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/3-4-sleeve-shirts">
                      3/4 sleeve shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/long-sleeve-shirts">
                      Long sleeve shirts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/hoodies-sweatshirts">
                  All hoodies &amp; sweatshirts
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/hoodies">
                      Hoodies
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/sweatshirts">
                      Sweatshirts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/jackets">
                  Jackets
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/bottoms">
                  Bottoms
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/sweatpants-joggers">
                      Sweatpants &amp; joggers
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/leggings">
                      Leggings
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/skirts">
                      Skirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/womens/shorts">
                      Shorts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/dresses">
                  Dresses
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/swimwear">
                  Swimwear
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/womens/sports-bras">
                  Sports bras
                </a>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <li className="catalog__sidebar-menu__item pf-py-4">
            <a href="https://www.dropshippy.com/products-catalog/kids-teen-clothing">
              Kids &amp; youth clothing
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 0 }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/kids-teen/shirts">
                  All shirts
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/kids-teen/t-shirts">
                      T-shirts
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/kids-teen/all-over-shirts">
                      All-over shirts
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/kids-teen/hoodies">
                  Hoodies
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/kids-teen/baby-bibs">
                  Baby bibs
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/kids-teen/leggings">
                  Leggings
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/kids-teen/baby-bodysuits">
                  Baby bodysuits
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/kids-teen/swimwear">
                  Swimwear
                </a>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <li className="catalog__sidebar-menu__item pf-py-4">
            <a href="https://www.dropshippy.com/products-catalog/hats">
              Hats
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 0 }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/embroidered/hats">
                  Embroidered hats
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/dad-hats">
                      Dad hats / Baseball caps
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/snapbacks">
                      Snapbacks
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/trucker-hats">
                      Trucker hats
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/5-panel-hats">
                      5-panel hats
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/mesh-hats">
                      Mesh hats
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/beanies">
                      Beanies
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/bucket-hats">
                      Bucket hats
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/embroidered/visors">
                      Visors
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <li className="catalog__sidebar-menu__item pf-py-4">
            <a href="https://www.dropshippy.com/products-catalog/accessories">
              Accessories
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 0 }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/bags/personalized">
                  Bags
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/bags/totes">
                      Tote bags
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/bags/laptop-cases">
                      Laptop cases
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/bags/drawstring">
                      Drawstring bags
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/bags/fanny-packs">
                      Fanny packs
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/bags/backpacks">
                      Backpacks
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/phone-cases/personalized">
                  Phone cases
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/phone-cases/iphone">
                      iPhone cases
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/phone-cases/samsung-galaxy">
                      Samsung cases
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/engraved/jewelry">
                  Jewelry
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/engraved/bracelets">
                      Bracelets
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/engraved/necklaces">
                      Necklaces
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/engraved/earrings">
                      Earrings
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/shoes/flip-flops">
                  Flip flops
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/socks/personalized">
                  Socks
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/face-masks/fabric">
                  Face masks
                </a>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <li className="catalog__sidebar-menu__item pf-py-4">
            <a href="https://www.dropshippy.com/products-catalog/home-living">
              Home &amp; living
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 0 }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/mugs/personalized">
                  Coffee mugs
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/stickers/die-cut">
                  Stickers
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/pillows/decorative">
                  Pillows
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/pillows/throw">
                      Throw pillows
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/pillows/cases">
                      Pillow cases
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/wall-art/personalized">
                  Wall art
                </a>
                <ul className="catalog__sidebar-menu">
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/wall-art/posters">
                      Posters
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/wall-art/framed-posters">
                      Framed posters
                    </a>
                  </li>
                  <li className="catalog__sidebar-menu__item pf-py-4">
                    <a href="https://www.dropshippy.com/products-catalog/wall-art/canvas-prints">
                      Canvas prints
                    </a>
                  </li>
                  <div className="catalog__sidebar-menu__current-item" />
                </ul>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/towels/beach">
                  Beach towels
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/bean-bags/personalized">
                  Bean bags
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/aprons/personalized">
                  Embroidered aprons
                </a>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <li className="catalog__sidebar-menu__item pf-py-4">
            <a href="https://www.dropshippy.com/products-catalog/collections">
              Collections
              <span className="catalog__sidebar-menu__item__arrow" />
            </a>
            <ul
              className="catalog__sidebar-menu"
              style={{ height: 0 }}
            >
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/new">
                  New products
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/sportswear">
                  Sportswear
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/workwear">
                  Workwear
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/streetwear">
                  Streetwear
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/beachwear">
                  Beachwear
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/eco-friendly">
                  Eco-friendly
                </a>
              </li>
              <li className="catalog__sidebar-menu__item pf-py-4">
                <a href="https://www.dropshippy.com/products-catalog/collections/gifts">
                  Gifts
                </a>
              </li>
              <div className="catalog__sidebar-menu__current-item" />
            </ul>
          </li>
          <div className="catalog__sidebar-menu__current-item" />
        </ul>
        <div />
      </div>
    </>
  );
}
