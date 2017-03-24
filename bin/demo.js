/* eslint-disable quotes */

import fs from 'fs';
import makePDF from '../src/index';

const invoice = {
  number: "987654321",
  issue_date: "Mar 19, 2017",
  payment_terms: "Due Immediately",
  billing_id: "4321-3214-2143",
  account_number: "4321-3214-2143-1432",
  supplier: {
    name: "Docca",
    address: [
      "3 Bondi Cres",
      "Kewarra Beach",
      "Qld 4879"
    ],
    phone: "61 7 4079 5355",
    email: "support@docca.io",
    logo: "docca-logo-550.png"
  },
  customer: {
    name: "WidgetsRUs",
    attn: "John Smith",
    address: [
      "123 Sample St",
      "Beverly Hills",
      "90210"
    ]
  },
  items: [
    { description: "Red Widget", quantity: 5, price: 2495 },
    { description: "Blue Widget", quantity: 3, price: 2495 },
    { description: "Green Widget - a very special widget with a very special name description that is, in fact, too long to fit in the space provided so it has to wrap", quantity: 1, price: 17495 },
    { description: "Red Widget", quantity: 4, price: 2495 }
  ],
  currency: "AUD",
  tax_name: "GST",
  tax_percent: 10,
  tax_note: "The invoice amount is not subject to GST because the supply of services provided by a non-resident entity from outside of Australia is not connected with Australia.",
  payment_note: "You will be automatically charged for the amount due. No action is required on your part."
};

if (!process.env.DOCCA_API_KEY) {
  console.log('Please set your Docca API Key in console env. `$ export DOCCA_API_KEY=apikey_yourApiKey`');
  process.exit();
}
const writeStream = fs.createWriteStream('./demo-invoice.pdf');
const apiKey = process.env.DOCCA_API_KEY;

makePDF({ invoice, writeStream, apiKey })
.then(() => console.log('Complete!'))
.catch(error => console.log(error));
