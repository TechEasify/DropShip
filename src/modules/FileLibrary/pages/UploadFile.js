import React, { useState } from 'react';
import './UploadFile.scss';
import {
  LegacyFilters,
  EmptyState,
  Layout,
  LegacyCard,
  ResourceList,
  IndexTable,
  useIndexResourceState,
  Button,
  Modal,
  Badge,
  Text,
  Avatar,
  Pagination,
  Select,
  TextField,
  Icon,
} from '@shopify/polaris';
import { useLocation } from 'react-router-dom';
import { SearchIcon } from '@shopify/polaris-icons';

export default function UploadFile() {
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [uploadedImages, setUploadedImages] = useState([]);
  // const [active, setActive] = useState(false);
  // const [buttonType, setButtonType] = useState('');
  // const items = [];
  // const appliedFilters = [];
  // const filters = [];
  // const resourceName = {
  //   singular: 'file',
  //   plural: 'files',
  // };

  // const filterControl = (
  //   <LegacyFilters
  //     disabled={!items.length}
  //     queryValue=""
  //     filters={filters}
  //     appliedFilters={appliedFilters}
  //     onClearAll={() => undefined}
  //     onQueryChange={() => undefined}
  //     onQueryClear={() => undefined}
  //   />
  // );

  // const handleChange = () => {
  //   setActive(!active);
  // };

  // const handleFileUpload = (event) => {
  //   const files = Array.from(event.target.files);

  //   const newUploadedFilesArray = files.map((file) => ({
  //     id: file.name,
  //     file: file,
  //     buttonType: buttonType,
  //   }));

  //   setUploadedFiles(newUploadedFilesArray);
  //   setActive(false);

  //   const newImageUrls = files.map((file) => URL.createObjectURL(file));
  //   setUploadedImages(newImageUrls);
  // };

  // const handleClick = (buttonType) => {
  //   const fileInput = document.getElementById('file-input');
  //   fileInput.click();

  //   setButtonType(buttonType);
  //   setActive(true);
  // };

  // const handleDownload = (file) => {
  //   const url = URL.createObjectURL(file);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = file.name;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  // const emptyStateMarkup =
  //   !appliedFilters.length && uploadedFiles.length === 0 ? (
  //     <EmptyState
  //       heading="Upload a file to get started"
  //       action={{ content: 'Upload files', onAction: handleChange }}
  //       image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
  //     >
  //       <p>You can use the Files section to upload images</p>
  //     </EmptyState>
  //   ) : undefined;

  // const { selectedResources, allResourcesSelected, handleSelectionChange } =
  //   useIndexResourceState(uploadedFiles, {
  //     resourceIdResolver: (resource) => resource.id,
  //   });

  // const rowMarkup = uploadedFiles.map(
  //   (file, index) => (
  //     console.log(file.buttonType, 'file'),
  //     (
  //       <IndexTable.Row
  //         id={`file-${index}`}
  //         key={`file-${index}`}
  //         selected={selectedResources.includes(file.id)}
  //         position={index}
  //         onSelect={() => handleSelectionChange(file.id)}
  //       >
  //         <IndexTable.Cell>
  //           <div className="file-preview">
  //             <img
  //               src={uploadedImages[index]}
  //               alt={file.file.name}
  //               className="file-thumbnail"
  //             />
  //           </div>
  //         </IndexTable.Cell>
  //         <IndexTable.Cell>
  //           <div className="file-preview">
  //             <span className="file-name">{file.file.name}</span>
  //           </div>
  //         </IndexTable.Cell>
  //         <IndexTable.Cell>
  //           <span>{file.buttonType}</span>
  //         </IndexTable.Cell>
  //         <IndexTable.Cell>
  //           <div className="action-row">
  //             <Button onClick={() => handleDownload(file.file)}>
  //               Download
  //             </Button>
  //           </div>
  //         </IndexTable.Cell>
  //       </IndexTable.Row>
  //     )
  //   )
  // );

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const maxItemsPerPage = 100;
  const orders = [
    {
      id: '1020',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      venderImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2020',
      vendorName: 'FLLF812',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1019',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      venderImage:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2019',
      vendorName: 'FLLF8',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1018',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      venderImage:
        'https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2018',
      vendorName: 'FLL',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
    {
      id: '1017',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      venderImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2017',
      vendorName: 'FLLF812',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1016',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      venderImage:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2016',
      vendorName: 'FLLF8',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1015',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      venderImage:
        'https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2015',
      vendorName: 'FLL',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
    {
      id: '1014',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      venderImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2014',
      vendorName: 'FLLF812',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1013',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      venderImage:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2013',
      vendorName: 'FLLF8',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1012',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      venderImage:
        'https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2012',
      vendorName: 'FLL',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
    {
      id: '1011',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      venderImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2013',
      vendorName: 'FLLF812',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1010',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      venderImage:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2012',
      vendorName: 'FLLF8',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1009',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      venderImage:
        'https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2011',
      vendorName: 'FLL',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
    {
      id: '1008',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      venderImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2010',
      vendorName: 'FLLF812',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1007',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      venderImage:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2009',
      vendorName: 'FLLF8',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1006',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      venderImage:
        'https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2008',
      vendorName: 'FLL',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
    {
      id: '1005',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      venderImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2007',
      vendorName: 'FLLF812',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1004',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      venderImage:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2006',
      vendorName: 'FLLF8',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1003',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      venderImage:
        'https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww',
      vendorId: '#2005',
      vendorName: 'FLL',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  // filter order
  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //Handle item per page
  const handleItemsPerPageChange = (selectedValue) => {
    const newItemsPerPage = parseInt(selectedValue, 10);
    setItemsPerPage(Math.min(newItemsPerPage, maxItemsPerPage));
    setCurrentPage(1);
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const handleDownload = async (url) => {
    try {
      const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(corsAnywhereUrl + url);
      const blob = await response.blob();
      const filename = url.substring(url.lastIndexOf('/') + 1);
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const headings = [
    { title: 'Order' },
    ...(location.pathname === '/admin/library'
      ? [
          { title: 'Vendor Image' },
          { title: 'Vendor ID' },
          { title: 'Vendor Name' },
        ]
      : []),
    { title: 'Product Label' },
    { title: 'Product Type' },
    { title: 'Action' },
  ];

  const rowMarkup = filteredOrders
    .slice(startIndex, endIndex)
    .map(
      (
        {
          id,
          order,
          vendorId,
          venderImage,
          vendorName,
          productName,
          productType,
        },
        index
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <div className="file-preview">
              <img src={order} alt={order} className="file-thumbnail" />
            </div>
          </IndexTable.Cell>
          {location.pathname === '/admin/library' && (
            <>
              <IndexTable.Cell>
                <div className="file-preview">
                  <img
                    src={venderImage}
                    alt={venderImage}
                    className="file-thumbnail"
                  />
                </div>
              </IndexTable.Cell>
              <IndexTable.Cell>{vendorId}</IndexTable.Cell>
              <IndexTable.Cell>{vendorName}</IndexTable.Cell>
            </>
          )}
          <IndexTable.Cell>{productName}</IndexTable.Cell>
          <IndexTable.Cell>{productType}</IndexTable.Cell>
          <IndexTable.Cell>
            <div className="action-row">
              <Button onClick={() => handleDownload(order)}>Download</Button>
            </div>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ];

  return (
    <>
      {/* <div className="upload-img">
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <ResourceList
                emptyState={emptyStateMarkup}
                items={uploadedFiles.map((file, index) => ({
                  id: `file-${index}`,
                  name: file.file.name,
                  imageUrl: uploadedImages[index],
                }))}
                renderItem={() => null}
                resourceName={resourceName}
                filterControl={filterControl}
              />
              {uploadedFiles.length > 0 && (
                <div className="table-upload">
                  <div className="upload-more">
                    <div className="uploadtable-head">
                      <h4>Files</h4>
                    </div>
                    <div className="uploadmore-btn">
                      <Button onClick={handleChange}>Update files</Button>
                    </div>
                  </div>
                  <IndexTable
                    resourceName={resourceName}
                    itemCount={uploadedFiles.length}
                    selectedItemsCount={
                      allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                      { title: 'File' },
                      { title: 'Product Label' },
                      { title: 'Type' },
                      { title: 'Action' },
                    ]}
                  >
                    {rowMarkup}
                  </IndexTable>
                </div>
              )}
            </LegacyCard>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </Layout.Section>
        </Layout>

        <div className="popup-banner">
          <div>
            <Modal
              open={active}
              onClose={handleChange}
              title="Upload Logo or Label"
              primaryAction={{
                content: 'Upload Logo',
                onAction: () => handleClick('Logo'),
              }}
              secondaryActions={[
                {
                  content: 'Upload Label',
                  onAction: () => handleClick('Label'),
                },
              ]}
            />
          </div>
        </div>
      </div> */}
      <div className="file-upload">
        <div className="file-head">
          <h2 className="pf-h2">File library</h2>
          <div className="search-file">
            <TextField
              autoComplete="off"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="filesearch-icon">
              <Icon source={SearchIcon} tone="base" />
            </div>
          </div>
        </div>

        <div className="upload-img">
          {filteredOrders.length !== 0 ? (
            <>
              <LegacyCard>
                <IndexTable
                  resourceName={resourceName}
                  itemCount={orders.length}
                  selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                  headings={headings}
                >
                  {rowMarkup}
                </IndexTable>
                <div
                  style={{
                    marginBottom: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <div className="label-perpage">
                      <p>Row per page:- </p>
                    </div>
                    <Select
                      options={options}
                      value={itemsPerPage.toString()}
                      onChange={handleItemsPerPageChange}
                    />
                  </div>
                  <div
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    <Pagination
                      onPrevious={() => handlePageChange(currentPage - 1)}
                      onNext={() => handlePageChange(currentPage + 1)}
                      hasPrevious={currentPage > 1}
                      hasNext={endIndex < orders.length}
                      label={`${currentPage}-${Math.min(
                        endIndex,
                        orders.length
                      )} of ${orders.length} orders`}
                    />
                  </div>
                </div>
              </LegacyCard>
            </>
          ) : (
            <div className="not-found">
              <div className="result-not">
                <h2 className="category-heading">No Results Found!</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
