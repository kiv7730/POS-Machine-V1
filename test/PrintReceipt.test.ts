import {ReceiptItem, Tag, generateReceiptItems, parseTags, printReceipt, renderReceipt} from '../src/PrintReceipt'

describe('printReceipt', () => {
  it('should print receipt with promotion when print receipt', () => {
    //given
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ]

    //when
    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`
    //then
    expect(printReceipt(tags)).toEqual(expectText)
  })
  it('should parse origin array to aggregation array', () => {
    //given
    const input = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ]
    //when

    const expectedOutput: Tag[] = [
      { barcode: 'ITEM000001', quantity: 2 },
      { barcode: 'ITEM000003', quantity: 2.5 },
      { barcode: 'ITEM000005', quantity: 3 }
    ]
    //then
    expect(parseTags(input)).toEqual(expectedOutput)
  })

  it('should generate correct ReceiptItem', ()=> {
    //given
    const input: Tag[] = [
      { barcode: 'ITEM000001', quantity: 3 },
      { barcode: 'ITEM000003', quantity: 2.5 },
      { barcode: 'ITEM000005', quantity: 3 }
    ]

    //when
    const expectedOutput: ReceiptItem[] =
    [
      {
        name: 'Sprite',
        quantity: { value: 3, quantifier: 'bottle' },
        unitPrice: 3.00,
        subtotal: 6.00,
        discountedPrice: 3.00
      },
      {
        name: 'Litchi',
        quantity: { value: 2.5, quantifier: 'pound' },
        unitPrice: 15.00,
        subtotal: 37.50,
        discountedPrice: 0
      },
      {
        name: 'Instant Noodles',
        quantity: { value: 3, quantifier: 'bag' },
        unitPrice: 4.50,
        subtotal: 9.00,
        discountedPrice: 4.50
      }
    ]
    //then
    expect(generateReceiptItems(input)).toEqual(expectedOutput)
  })

  it('should render a receipt correctly', () => {
    //given
    const receiptItems = [
      {
        name: 'Sprite',
        quantity: { value: 3, quantifier: 'bottle' },
        unitPrice: 3.00,
        subtotal: 6.00,
        discountedPrice: 3.00
      },
      {
        name: 'Litchi',
        quantity: { value: 2.5, quantifier: 'pound' },
        unitPrice: 15.00,
        subtotal: 37.50,
        discountedPrice: 0
      },
      {
        name: 'Instant Noodles',
        quantity: { value: 3, quantifier: 'bag' },
        unitPrice: 4.50,
        subtotal: 9.00,
        discountedPrice: 4.50
      }
    ]

    //when
    const expectedReceipt =
      "***<store earning no money>Receipt ***\n" +
      "Name：Sprite，Quantity：3 bottles，Unit：3.00(yuan)，Subtotal：6.00(yuan)\n" +
      "Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)\n" +
      "Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)\n" +
      "----------------------\n" +
      "Total：52.50(yuan)\n" +
      "Discounted prices：7.50(yuan)\n" +
      "**********************"

    //then
    expect(renderReceipt(receiptItems)).toEqual(expectedReceipt)
  })
})
