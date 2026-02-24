export type Bank = {
  name: string;
  domain: string;
};

export const FRENCH_BANKS: Bank[] = [
  // Banques traditionnelles
  { name: "BNP Paribas", domain: "bnpparibas.com" },
  { name: "Crédit Agricole", domain: "credit-agricole.fr" },
  { name: "Société Générale", domain: "societegenerale.fr" },
  { name: "LCL", domain: "lcl.fr" },
  { name: "Caisse d'Épargne", domain: "caisse-epargne.fr" },
  { name: "Banque Populaire", domain: "banquepopulaire.fr" },
  { name: "CIC", domain: "cic.fr" },
  { name: "Crédit Mutuel", domain: "creditmutuel.fr" },
  { name: "La Banque Postale", domain: "labanquepostale.fr" },
  { name: "HSBC France", domain: "hsbc.fr" },
  { name: "Crédit du Nord", domain: "credit-du-nord.fr" },
  { name: "AXA Banque", domain: "axabanque.fr" },

  // Néobanques & banques en ligne
  { name: "Boursorama", domain: "boursorama.com" },
  { name: "Hello bank!", domain: "hellobank.fr" },
  { name: "Fortuneo", domain: "fortuneo.fr" },
  { name: "Monabanq", domain: "monabanq.com" },
  { name: "Orange Bank", domain: "orangebank.fr" },
  { name: "Revolut", domain: "revolut.com" },
  { name: "N26", domain: "n26.com" },
  { name: "Lydia", domain: "lydia-app.com" },
  { name: "Qonto", domain: "qonto.com" },
  { name: "Shine", domain: "shine.fr" },

  // Autre
  { name: "Autre banque", domain: "bank.com" },
];
