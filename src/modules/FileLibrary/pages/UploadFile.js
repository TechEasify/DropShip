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
} from '@shopify/polaris';
import { useLocation } from 'react-router-dom';

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
  console.log(location.pathname, "location");
  const orders = [
    {
      id: '1020',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/07b/4f1/85-/original/natural-daily-moisturizer.png',
      vendorId: '#2020',
      productName: 'Natural Daily Moisturizer',
      productType: 'Label',
    },
    {
      id: '1019',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/fb5/9e9/3b-/original/FLLF8-2.png',
      vendorId: '#2019',
      productName: 'FLLF8-2',
      productType: 'FLLF8-2',
    },
    {
      id: '1018',
      order:
        'https://d46qqg0b6pc82.cloudfront.net/listing_variation_images/attachments/598/a30/86-/original/FLLSP2.png',
      vendorId: '#2018',
      productName: 'FLLSP2',
      productType: 'Logo',
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
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
    ...(location.pathname === "/admin/library" ? [{ title: 'Vendor ID' }] : []),
    { title: 'Product Label' },
    { title: 'Product Type' },
    { title: 'Action' }
  ];

  const rowMarkup = orders.map(
    ({ id, order, vendorId, productName, productType }, index) => (
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
        {
          location.pathname === "/admin/library" &&
          <IndexTable.Cell>{vendorId}</IndexTable.Cell>
        }
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

  return (
    <>
      <div className="file-upload">
        <div className="file-head">
          <h2 className="pf-h2">File library</h2>
        </div>
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

        <div className="upload-img">
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
          </LegacyCard>
        </div>
      </div>
    </>
  );
}
