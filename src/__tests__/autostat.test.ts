import { autoStat } from '../autostat';

describe('autoStat', () => {
  const sampleSalesData = [
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-05", onSale: true },
    { product: "oranges", price: 1.50, quantity: 8, date: "2024-10-05", onSale: false },
    { product: "apples", price: 1.00, quantity: 12, date: "2024-10-06", onSale: true },
    { product: "oranges", price: 1.50, quantity: 6, date: "2024-10-06", onSale: false },
  ];

  it('should generate statistics with default parameters', () => {
    const results = autoStat(sampleSalesData);
    
    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
    
    // Check for presence of different types of statistical sentences
    const meanSentence = results.some(sentence => 
      sentence.includes('average'));
    expect(meanSentence).toBeTruthy();

    const stdDevSentence = results.some(sentence => 
      sentence.includes('standard deviation'));
    expect(stdDevSentence).toBeTruthy();

    const probabilitySentence = results.some(sentence => 
      sentence.includes('probability'));
    expect(probabilitySentence).toBeTruthy();
  });

  it('should use custom objectsNamePlural and outcomeUnit with at least two metrics', () => {
    const results = autoStat(
      sampleSalesData,
      [{
        label: 'Product Name',
        property: 'product'
      },{
        label: 'Price',
        property: 'price'
      }],
      'sales records',
      ' dollars'
    );

    expect(results.some(sentence => 
      sentence.includes('sales records'))).toBeTruthy();
    expect(results.some(sentence => 
      sentence.includes('dollars'))).toBeTruthy();
  });

  it('should work with custom metrics', () => {
    const customMetrics = [
      { label: 'Product Type', property: 'product' as const },
      { label: 'Sale Price', property: 'price' as const }
    ];

    const results = autoStat(sampleSalesData, customMetrics);
    
    expect(results.some(sentence => 
      sentence.includes('Product Type') && sentence.includes('Sale Price')))
      .toBeTruthy();
  });

  it('should handle empty array input', () => {
    expect(() => autoStat([])).toThrow();
  });

  it('should handle single item array', () => {
    const singleItem = [{
      product: "apples",
      price: 1.00,
      quantity: 10,
      date: "2024-10-05"
    }];

    const results = autoStat(singleItem);
    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should generate correct statistics for numeric values', () => {
    const results = autoStat(sampleSalesData);

    // Check for price statistics
    const priceStats = results.filter(sentence => 
      sentence.toLowerCase().includes('price'));
    expect(priceStats.some(stat => 
      stat.includes('1') || stat.includes('1.5'))).toBeTruthy();
    
    // Check for quantity statistics
    const quantityStats = results.filter(sentence => 
      sentence.toLowerCase().includes('quantity'));
    expect(quantityStats.some(stat => 
      stat.includes('10') || stat.includes('8'))).toBeTruthy();
  });

  it('should generate correct statistics for string values', () => {
    const results = autoStat(sampleSalesData);
    
    // Check for product statistics
    const productStats = results.filter(sentence => 
      sentence.toLowerCase().includes('product'));
    expect(productStats.some(stat => 
      stat.includes('apples'))).toBeTruthy();
    expect(productStats.some(stat =>
      stat.includes('oranges'))).toBeTruthy();
  });

  it('should mention that non-numeric typed properties have no numeric data available', () => {
    const results = autoStat(sampleSalesData, [{
      label: 'Was on Sale',
      property: 'onSale'
    }]);
    expect(results.some(stat =>
      stat.includes('No numeric data available'))).toBeTruthy();
  });
}); 