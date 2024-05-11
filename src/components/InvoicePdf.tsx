import { Image, Page, Text, View, Document } from '@react-pdf/renderer';
import { iInvoice } from '../types/types';
import logo from "../assets/bambu-logo.png"

const InvoicePdf = ({ invoice }: { invoice: iInvoice }) => {
  
  return (
    <Document>
      <Page size="A4">
        <View>
          <Image src={logo} />
          <Text>Invoice</Text>
        </View>
        <View>
          <Text>Customer: {invoice.user.name} {invoice.user.lastname}</Text>
        <Text>Products: {invoice.products.map(product => product.name).join(', ')}</Text>
          <Text>Amount: {invoice.total}</Text>
        </View>
      </Page>
    </Document>
  )
}


export default InvoicePdf
