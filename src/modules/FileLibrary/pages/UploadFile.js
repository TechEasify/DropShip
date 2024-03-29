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
} from '@shopify/polaris';

export default function UploadFile() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const items = [];
  const appliedFilters = [];
  const filters = [];
  const resourceName = {
    singular: 'file',
    plural: 'files',
  };

  const filterControl = (
    <LegacyFilters
      disabled={!items.length}
      queryValue=""
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={() => undefined}
      onQueryChange={() => undefined}
      onQueryClear={() => undefined}
    />
  );

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newUploadedFilesArray = [...uploadedFiles, ...files];
    setUploadedFiles(newUploadedFilesArray);

    // Create an array of URLs for the newly uploaded images
    const newImageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      newImageUrls.push(imageUrl);
    }

    // Append the new image URLs to the existing list
    const updatedImageUrls = [...uploadedImages, ...newImageUrls];
    setUploadedImages(updatedImageUrls);
  };

  const handleClick = () => {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const emptyStateMarkup =
    !appliedFilters.length && uploadedFiles.length === 0 ? (
      <EmptyState
        heading="Upload a file to get started"
        action={{ content: 'Upload files', onAction: handleClick }}
        image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
      >
        <p>You can use the Files section to upload images</p>
      </EmptyState>
    ) : (
      <></>
    );

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState({
      selectedItems: uploadedFiles.map((_, index) => index),
      resourceName: resourceName,
      idForItem: (item, index) => index,
    });

  const rowMarkup = uploadedFiles.map((file, index) => (
    <IndexTable.Row
      key={`file-${index}`}
      selected={selectedResources.includes(index)}
    >
      <IndexTable.Cell>
        <div className="file-preview">
          <img
            src={uploadedImages[index]}
            alt={file.name}
            className="file-thumbnail"
          />
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className="file-preview">
          <span className="file-name">{file.name}</span>
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <span>{file.type}</span>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className="action-row">
          <Button onClick={() => handleDownload(file)}>Download</Button>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  console.log(uploadedFiles, 'uploadedFiles');

  return (
    <>
      <div className="file-upload">
        <div className="file-head">
          <h2 className="pf-h2">File library</h2>
        </div>
        <div className="upload-img">
          <Layout>
            <Layout.Section>
              <LegacyCard>
                <ResourceList
                  emptyState={uploadedFiles.length === 0 && emptyStateMarkup}
                  items={uploadedFiles.map((file, index) => ({
                    id: `file-${index}`,
                    name: file.name,
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
                        <Button onClick={handleClick}>Upload more files</Button>
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
        </div>
      </div>
    </>
  );
}
