export interface FinancialItem {
  id: number;
  name: string;
  value: number;
}

export interface FinancialData {
  assets: {
    cashAndInvestments: FinancialItem[];
    property: FinancialItem[];
    otherAssets: FinancialItem[];
  };
  liabilities: {
    shortTerm: FinancialItem[];
    longTerm: FinancialItem[];
  };
}