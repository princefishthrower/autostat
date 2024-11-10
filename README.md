# autostat

A tool for generating text based statements for all possible statistical correlations of a repeating dataset of arbitrary shape. Essential for quality data used in RAG.

## Example

```
const sales = [
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-05" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-05" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-06" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-06" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-07" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-07" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-08" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-08" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-09" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-09" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-10" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-10" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-11" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-11" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-12" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-12" },
    { product: "apples", price: 1.00, quantity: 10, date: "2024-10-13" },
    { product: "oranges", price: 1.00, quantity: 10, date: "2024-10-13" },
]

const sentences = autostat(sales)

for (const sentence of sentences) {
    console.log(sentence)
}

// Output:


## Expected Output Sizes

A set of 100 objects with 10 properties each will generate 2^9 - 1 = 511 sentences.

That expands quickly;

1000 objects with 10 properties: 1023 sentences
1000 objects with 100 properties: 1267650600228229401496703205375 sentences

## Theory

Given a flat object O of n properties, the number of possible correlations is given by the formula:

```
C(n) = 2^(n-1) - 1
```

Single correlations, of some property x in O to some other property y in O, are given by the formula:

```
C(n) = 2
```


### Time

As in many physical systems, time is particularly tricky to handle. For temporal context, a time window is needed. 