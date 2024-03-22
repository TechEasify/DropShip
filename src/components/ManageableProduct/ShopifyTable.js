import React, { useCallback, useState } from 'react'
import {
    TextField,
    IndexTable,
    LegacyCard,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    ChoiceList,
    RangeSlider,
    Badge,
    IndexFiltersProps,
    useBreakpoints,
    TabProps,
    Button
} from '@shopify/polaris';

function ShopifyTable({ rows, newCategory, setNewCategory, handleEdit }) {
    const [itemStrings, setItemStrings] = useState([
        'All',
        'Unpaid',
        'Open',
        'Closed',
        'Local delivery',
        'Local pickup',
    ]);
    const orders = [
        {
            id: '1020',
            order: (
                <Text as="span" variant="bodyMd" fontWeight="semibold">
                    #1020
                </Text>
            ),
            date: 'Jul 20 at 4:34pm',
            customer: 'Jaydon Stanton',
            total: '$969.44',
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: '1019',
            order: (
                <Text as="span" variant="bodyMd" fontWeight="semibold">
                    #1019
                </Text>
            ),
            date: 'Jul 20 at 3:46pm',
            customer: 'Ruben Westerfelt',
            total: '$701.19',
            paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: '1018',
            order: (
                <Text as="span" variant="bodyMd" fontWeight="semibold">
                    #1018
                </Text>
            ),
            date: 'Jul 20 at 3.44pm',
            customer: 'Leo Carder',
            total: '$798.24',
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
    ];
    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(orders);
    const [sortSelected, setSortSelected] = useState(['order asc']);
    const { mode, setMode } = useSetIndexFiltersMode();
    const onHandleCancel = () => { };
    const [selected, setSelected] = useState(0);
    const [accountStatus, setAccountStatus] = useState(
        undefined,
    );
    const [moneySpent, setMoneySpent] = useState(
        undefined,
    );
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState('');

    const handleAccountStatusChange = useCallback(
        (value) => setAccountStatus(value),
        [],
    );
    const handleMoneySpentChange = useCallback(
        (value) => setMoneySpent(value),
        [],
    );
    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handleAccountStatusRemove = useCallback(
        () => setAccountStatus(undefined),
        [],
    );
    const handleMoneySpentRemove = useCallback(
        () => setMoneySpent(undefined),
        [],
    );
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleFiltersClearAll = useCallback(() => {
        handleAccountStatusRemove();
        handleMoneySpentRemove();
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [
        handleAccountStatusRemove,
        handleMoneySpentRemove,
        handleQueryValueRemove,
        handleTaggedWithRemove,
    ]);
    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const deleteView = (index) => {
        const newItemStrings = [...itemStrings];
        newItemStrings.splice(index, 1);
        setItemStrings(newItemStrings);
        setSelected(0);
    };

    const duplicateView = async (name) => {
        setItemStrings([...itemStrings, name]);
        setSelected(itemStrings.length);
        await sleep(1);
        return true;
    };

    const tabs = itemStrings.map((item, index) => ({
        content: item,
        index,
        onAction: () => { },
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions:
            index === 0
                ? []
                : [
                    {
                        type: 'rename',
                        onAction: () => { },
                        onPrimaryAction: async (value) => {
                            const newItemsStrings = tabs.map((item, idx) => {
                                if (idx === index) {
                                    return value;
                                }
                                return item.content;
                            });
                            await sleep(1);
                            setItemStrings(newItemsStrings);
                            return true;
                        },
                    },
                    {
                        type: 'duplicate',
                        onPrimaryAction: async (value) => {
                            await sleep(1);
                            duplicateView(value);
                            return true;
                        },
                    },
                    {
                        type: 'edit',
                    },
                    {
                        type: 'delete',
                        onPrimaryAction: async () => {
                            await sleep(1);
                            deleteView(index);
                            return true;
                        },
                    },
                ],
    }));

    const onCreateNewView = async (value) => {
        await sleep(500);
        setItemStrings([...itemStrings, value]);
        setSelected(itemStrings.length);
        return true;
    };
    const sortOptions = [
        { label: 'Order', value: 'order asc', directionLabel: 'Ascending' },
        { label: 'Order', value: 'order desc', directionLabel: 'Descending' },
        { label: 'Customer', value: 'customer asc', directionLabel: 'A-Z' },
        { label: 'Customer', value: 'customer desc', directionLabel: 'Z-A' },
        { label: 'Date', value: 'date asc', directionLabel: 'A-Z' },
        { label: 'Date', value: 'date desc', directionLabel: 'Z-A' },
        { label: 'Total', value: 'total asc', directionLabel: 'Ascending' },
        { label: 'Total', value: 'total desc', directionLabel: 'Descending' },
    ];

    const onHandleSave = async () => {
        await sleep(1);
        return true;
    };

    const primaryAction =
        selected === 0
            ? {
                type: 'save-as',
                onAction: onCreateNewView,
                disabled: false,
                loading: false,
            }
            : {
                type: 'save',
                onAction: onHandleSave,
                disabled: false,
                loading: false,
            };


    const filters = [
        {
            key: 'accountStatus',
            label: 'Account status',
            filter: (
                <ChoiceList
                    title="Account status"
                    titleHidden
                    choices={[
                        { label: 'Enabled', value: 'enabled' },
                        { label: 'Not invited', value: 'not invited' },
                        { label: 'Invited', value: 'invited' },
                        { label: 'Declined', value: 'declined' },
                    ]}
                    selected={accountStatus || []}
                    onChange={handleAccountStatusChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
        {
            key: 'taggedWith',
            label: 'Tagged with',
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            ),
            shortcut: true,
        },
        {
            key: 'moneySpent',
            label: 'Money spent',
            filter: (
                <RangeSlider
                    label="Money spent is between"
                    labelHidden
                    value={moneySpent || [0, 500]}
                    prefix="$"
                    output
                    min={0}
                    max={2000}
                    step={1}
                    onChange={handleMoneySpentChange}
                />
            ),
        },
    ];

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'moneySpent':
                return `Money spent is between $${value[0]} and $${value[1]}`;
            case 'taggedWith':
                return `Tagged with ${value}`;
            case 'accountStatus':
                return (value).map((val) => `Customer ${val}`).join(', ');
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }

    const appliedFilters = [];
    if (accountStatus && !isEmpty(accountStatus)) {
        const key = 'accountStatus';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, accountStatus),
            onRemove: handleAccountStatusRemove,
        });
    }
    if (moneySpent) {
        const key = 'moneySpent';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, moneySpent),
            onRemove: handleMoneySpentRemove,
        });
    }
    if (!isEmpty(taggedWith)) {
        const key = 'taggedWith';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, taggedWith),
            onRemove: handleTaggedWithRemove,
        });
    }
    return (
        <>
            <div className='product-table'>
                <div className='category-head'>
                    <h1 className='product-heading'>Products</h1>
                    <Button size="large" className='category-btn' onClick={() => setNewCategory(true)}>New Product</Button>
                </div>
                <LegacyCard>
                    <IndexFilters
                        sortOptions={sortOptions}
                        sortSelected={sortSelected}
                        queryValue={queryValue}
                        queryPlaceholder="Searching in all"
                        onQueryChange={handleFiltersQueryChange}
                        onQueryClear={() => setQueryValue('')}
                        onSort={setSortSelected}
                        primaryAction={primaryAction}
                        cancelAction={{
                            onAction: onHandleCancel,
                            disabled: false,
                            loading: false,
                        }}
                        tabs={tabs}
                        selected={selected}
                        onSelect={setSelected}
                        canCreateNewView
                        onCreateNewView={onCreateNewView}
                        filters={filters}
                        appliedFilters={appliedFilters}
                        onClearAll={handleFiltersClearAll}
                        mode={mode}
                        setMode={setMode}
                    />
                    <IndexTable
                        condensed={useBreakpoints().smDown}
                        resourceName={resourceName}
                        itemCount={orders.length}
                        selectedItemsCount={
                            allResourcesSelected ? 'All' : selectedResources.length
                        }
                        onSelectionChange={handleSelectionChange}
                        headings={[
                            { title: 'id' },
                            { title: 'image' },
                            { title: 'name' },
                            { title: 'price' },
                            { title: 'shippingprice' },
                            { title: 'price to dropshipping' },
                            { title: 'quantity' },
                            { title: 'feature' },
                            { title: 'type' },
                            { title: 'status' },
                            { title: 'retail' },
                            { title: 'stock' },
                            { title: 'Action' }
                        ]}
                    >
                        {rows.map(
                            (
                                { id, image, name, price, shippingprice, pricetodropshipping, quantity, feature, type, status, retail, stock },
                                index,
                            ) => (
                                <IndexTable.Row
                                    id={id}
                                    key={id}
                                    selected={selectedResources.includes(id)}
                                    position={index}
                                >
                                    <IndexTable.Cell>
                                        <Text variant="bodyMd" fontWeight="bold" as="span">
                                            {id}
                                        </Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">
                                        <img src={image} alt="Product" style={{ width: '50px', height: 'auto' }} />
                                    </Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{name}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{price}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{shippingprice}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{pricetodropshipping}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{quantity}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{feature}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{type}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{retail}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                    <Text variant="bodyMd" as="span">{stock}</Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                        <span class="Polaris-Badge Polaris-Badge--toneSuccess"><span class="Polaris-Text--root Polaris-Text--bodySm">{status}</span></span>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell>
                                        <Button className="edit-product" onClick={() => handleEdit(rows[index])}>Edit</Button>
                                    </IndexTable.Cell>
                                </IndexTable.Row>
                            ))}
                    </IndexTable>
                </LegacyCard>
            </div>
        </>
    )
}

export default ShopifyTable