// B-MO Complete Data from Catalog
// Agrément BCEAO : B00/SSMP/00369-2022
// IFU: 3201710041944

export const companyInfo = {
  name: "B-MO",
  fullName: "BESTCASH MONEY",
  parentCompany: "EMMANUEL LA GRACE SA",
  capital: "500 000 000 FCFA",
  agreement: "B00/SSMP/00369-2022",
  ifu: "3201710041944",
  ussd: "*890#",
  phone: "+229 0160 60 87 88",
  altPhones: ["+229 0197840404", "+229 0196042827"],
  email: "info@bestcash.me",
  websites: ["https://www.bmo.bj", "https://www.bestcash.me"],
  address: "Fidjrossè, route des pêches, à 300 mètres après la direction GOZEM en quittant Fidjrossè fin pavé, Cotonou - Bénin",
};

export const vision = "Devenir le leader sur le marché des solutions de monnaie électronique et des monétiques en facilitant l'inclusion financière et en simplifiant les transactions numériques pour tous. Nous travaillons à faciliter les transactions financières pour toutes les populations en Afrique en utilisant des cartes prépayées Visa et des services de paiement mobiles.";

export const mission = "Nous offrons des services de monnaie électronique et monétique sécurisés, rapides et abordables qui connectent les individus et les entreprises à des opportunités financières mondiales, tout en innovant constamment pour répondre aux besoins en évolution de nos clients.";

export const values = [
  {
    title: "Accessibilité",
    description: "Nous permettons à chacun d'accéder facilement aux services financiers quel que soit son emplacement ou son statut économique."
  },
  {
    title: "Transparence",
    description: "Nous nous engageons à être transparents dans nos opérations, nos frais et nos politiques. Nos clients doivent se sentir informés et guidés à chaque étape de leur interaction avec nos services."
  },
  {
    title: "Sécurité",
    description: "Nous garantissons la protection des transactions et des données de nos utilisateurs. Nous utilisons des mesures de sécurité avancées pour protéger vos informations personnelles et financières."
  },
  {
    title: "Collaboration",
    description: "Nous croyons en la force du travail d'équipe et des partenariats. En collaborant avec d'autres entreprises, startups et organisations, nous pouvons élargir notre portée et enrichir notre offre de services."
  }
];

export const regulatoryCompliance = [
  {
    authority: "BCEAO",
    description: "Agrément pour la distribution de monnaie électronique",
    reference: "B00/SSMP/00369-2022"
  },
  {
    authority: "APDP",
    description: "Conformité aux normes de protection des données personnelles",
    benefits: [
      "Gestion sécurisée des données clients",
      "Prévention contre les risques de fuite de données et de cybercriminalité",
      "Traçabilité complète des transactions"
    ]
  },
  {
    authority: "ARCEP",
    description: "Reconnaissance et attribution du code USSD (*890#)",
    benefits: [
      "Interopérabilité totale avec les opérateurs télécoms (MTN, MOOV, CELTIIS)"
    ]
  },
  {
    authority: "ASIN",
    description: "Conformité aux standards technologiques et de cybersécurité",
    benefits: [
      "Solution technologique fiable",
      "Solution sécurisée, évolutive et compatible avec les infrastructures numériques nationales"
    ]
  },
  {
    authority: "DGSF",
    description: "Validation du modèle économique par le Ministère de l'Économie et des Finances",
    benefits: [
      "Confiance accrue pour les partenaires",
      "Facilité d'intégration dans le secteur financier"
    ]
  }
];

// Services Particuliers
export const servicesParticuliers = [
  {
    id: "transfers",
    title: "Transferts",
    icon: "ArrowLeftRight",
    description: "Envoyez de l'argent vers tous les portefeuilles Mobile Money et comptes B-MO",
    features: [
      "Vers MTN MoMo",
      "Vers Moov Money",
      "Vers Celtiis Cash",
      "Vers compte B-MO",
      "Transfert planifié"
    ],
    ussdSteps: [
      "Tapez *890#",
      "Sélectionnez 1 - Client",
      "Choisissez Transferts",
      "Sélectionnez le type de transfert",
      "Entrez le numéro du bénéficiaire",
      "Saisissez le montant",
      "Validez avec votre code PIN"
    ],
    appSteps: [
      "Connectez-vous à l'application B-MO",
      "Cliquez sur Transferts",
      "Choisissez Wallet Mobile puis National",
      "Saisissez le numéro du bénéficiaire",
      "Entrez le montant, nom et prénom du bénéficiaire",
      "Choisissez la raison du transfert",
      "Validez avec votre code PIN"
    ]
  },
  {
    id: "bills",
    title: "Paiement Factures",
    icon: "Receipt",
    description: "Payez vos factures SBEE et réabonnements Canal+ en toute simplicité",
    features: [
      "Facture SBEE Prépayée",
      "Facture SBEE Postpayée",
      "Réabonnement Canal+"
    ],
    ussdSteps: [
      "Composez *890#",
      "Sélectionnez 1 - Client",
      "Rendez-vous dans le menu 7 - Facture",
      "Sélectionnez: 1 - Prépayé SBEE ou 2 - Postpayé SBEE",
      "Renseignez les informations du compteur",
      "Entrez votre mot de passe pour valider"
    ],
    appSteps: [
      "Connectez-vous à l'application B-MO",
      "Cliquez sur Factures SBEE",
      "Saisissez le numéro de compteur et le montant",
      "Faites le récapitulatif et confirmez",
      "Entrez votre code PIN pour valider"
    ]
  },
  {
    id: "airtime",
    title: "Crédits & Forfaits",
    icon: "Wifi",
    description: "Achetez du crédit de communication et des forfaits internet sur tous les réseaux",
    features: [
      "Crédit d'appel MTN/Moov/Celtiis",
      "Forfait Internet",
      "Forfait Mixte",
      "Achat pour soi-même ou pour un tiers"
    ],
    ussdSteps: [
      "Composez *890#",
      "Sélectionnez 1 - Client",
      "Choisissez 5 - Crédit/Forfait",
      "Sélectionnez le type (Crédit, Forfait, Mixte)",
      "Choisissez Pour moi-même ou Pour un tiers",
      "Sélectionnez l'offre souhaitée",
      "Saisissez votre mot de passe pour valider"
    ],
    appSteps: [
      "Connectez-vous à l'application B-MO",
      "Cliquez sur Crédits et Forfaits",
      "Choisissez le type (Crédit d'appel, Forfait internet, Mixte)",
      "Sélectionnez le bénéficiaire",
      "Choisissez l'offre et validez avec votre code PIN"
    ]
  },
  {
    id: "withdrawal",
    title: "Retrait GAB UBA",
    icon: "Banknote",
    description: "Retirez de l'argent aux guichets automatiques UBA partout au Bénin",
    features: [
      "Retrait sans carte bancaire",
      "Code ATM à 6 chiffres",
      "30+ GAB disponibles"
    ],
    ussdSteps: [
      "Tapez *890#",
      "Choisissez 1 - Client",
      "Sélectionnez 8 - Retrait GAB",
      "Mettez le montant et un code à 4 chiffres de votre choix",
      "Cliquez sur Générer puis entrez votre code PIN",
      "Recevez par SMS le code ATM à 6 chiffres",
      "Allez au guichet, choisissez Retrait Mobile Money",
      "Entrez le code ATM et le montant, validez"
    ],
    appSteps: [
      "Connectez-vous à l'application B-MO",
      "Cliquez sur Transfert",
      "Sélectionnez Retrait ATM",
      "Entrez le montant souhaité",
      "Générez le code ATM",
      "Présentez-vous au GAB UBA avec le code reçu"
    ]
  },
  {
    id: "pushpull",
    title: "Push & Pull Bancaire",
    icon: "ArrowUpDown",
    description: "Transférez des fonds entre votre compte B-MO et votre compte UBA ou carte prépayée",
    features: [
      "Virement de UBA vers B-MO (Pull)",
      "Virement de B-MO vers UBA (Push)",
      "Liaison compte bancaire",
      "Liaison carte prépayée"
    ],
    linkingMethods: {
      automatic: {
        title: "Liaison Automatique",
        description: "Pour les utilisateurs ayant le même numéro B-MO que celui associé au compte UBA",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transferts",
          "Cliquez sur Push & Pull",
          "Cliquez sur Liaison de compte bancaire et carte prépayée",
          "Cochez Compte bancaire ou Carte prépayée",
          "Renseignez votre numéro de compte ou identifiant client",
          "Entrez les 4 derniers chiffres de votre carte prépayée"
        ]
      },
      manual: {
        title: "Liaison Manuelle",
        description: "En agence, pour les utilisateurs avec un numéro B-MO différent",
        steps: [
          "Rendez-vous dans une agence UBA",
          "Munissez-vous d'une pièce d'identité valide",
          "Remplissez le formulaire de souscription auprès du CSO"
        ]
      }
    }
  },
  {
    id: "international",
    title: "Transfert International",
    icon: "Globe",
    description: "Recevez des fonds depuis Western Union, MoneyGram et autres services internationaux",
    features: [
      "Réception Western Union",
      "Réception MoneyGram",
      "Zone UEMOA",
      "Zone CEMAC",
      "International (USA, Europe, Canada, Inde, UK, Émirats, Nigeria, Cameroun)"
    ]
  }
];

// Services Business
export const servicesBusiness = [
  {
    id: "mass-payment",
    title: "Paiement de Masse",
    icon: "Users",
    description: "Transférez directement les fonds vers les comptes B-MO de vos bénéficiaires",
    characteristics: [
      "Paiement instantané en temps réel",
      "Accessible via application et USSD (*890#)",
      "Sécurisé et traçable",
      "Flexibilité d'utilisation (paiements, retraits, transferts)"
    ],
    advantages: [
      "Paiement instantané et accessible partout",
      "Solution digitale sans manipulation d'espèces",
      "Traçabilité complète et meilleure gestion comptable",
      "Adapté aux travailleurs, étudiants, retraités et prestataires",
      "Automatisation réduisant les charges administratives",
      "Gain de temps et réduction des coûts"
    ],
    useCases: [
      "Salaires des employés",
      "Bourses étudiantes",
      "Pensions retraités",
      "Paiement des prestataires"
    ]
  },
  {
    id: "collection",
    title: "Collecte B-MO Pay",
    icon: "Wallet",
    description: "Solution sécurisée pour collecter les paiements de vos clients et membres",
    characteristics: [
      "Technologie avancée et sécurisée",
      "Collecte fluide et transparente",
      "Rapidité dans le traitement des transactions"
    ],
    steps: [
      "Connectez-vous à votre compte partenaire B-MO",
      "Cliquez sur B-MO Pay",
      "Saisissez le numéro collect",
      "Entrez l'agence collect",
      "Entrez le nom du déposant",
      "Sélectionnez le motif",
      "Sélectionnez le type de pièces",
      "Entrez le numéro de la pièce et sa date d'expiration",
      "Cliquez sur ajouter un produit",
      "Entrez le(s) produit et le(s) montant puis validez"
    ]
  },
  {
    id: "tpe",
    title: "TPE B-MO",
    icon: "CreditCard",
    description: "Terminaux de paiement électronique pour les marchands B-MO",
    model: "FEITIAN F20",
    features: [
      "Services à valeur ajoutée",
      "Collecte des paiements",
      "Commissions sur transactions",
      "Compatible avec tous les terminaux acceptant les cartes bancaires"
    ]
  },
  {
    id: "university",
    title: "Inscription Universitaire",
    icon: "GraduationCap",
    description: "Paiement sécurisé des droits d'inscription universitaire",
    features: [
      "Paiement sécurisé",
      "Expérience fluide",
      "Sans tracas pour les étudiants"
    ]
  },
  {
    id: "cmacgm",
    title: "Paiement CMACGM",
    icon: "Ship",
    description: "Solution pour les transitaires pour payer leurs factures dans la caisse CMACGM",
    features: [
      "Paiement simplifié",
      "Sécurisé",
      "Intégration caisse CMACGM"
    ]
  },
  {
    id: "scheduled",
    title: "Transfert Planifié",
    icon: "Calendar",
    description: "Automatisez vos paiements réguliers et à échéances spécifiques",
    useCases: [
      "Loyer mensuel",
      "Abonnements",
      "Frais de scolarité",
      "Paiements récurrents"
    ]
  }
];

// Tarifs
export const tarifsUEMOA = {
  title: "Grille Tarifaire UEMOA",
  description: "Frais pour les transferts et retraits dans la zone UEMOA",
  data: [
    { min: 1, max: 500, fraisRetrait: 40, minEnvoi: 1, maxEnvoi: 5000, fraisEnvoi: 150 },
    { min: 501, max: 5000, fraisRetrait: 95, minEnvoi: 5001, maxEnvoi: 20000, fraisEnvoi: 350 },
    { min: 5001, max: 10000, fraisRetrait: 170, minEnvoi: 20001, maxEnvoi: 50000, fraisEnvoi: 750 },
    { min: 10001, max: 20000, fraisRetrait: 325, minEnvoi: 50001, maxEnvoi: 75000, fraisEnvoi: 1000 },
    { min: 20001, max: 50000, fraisRetrait: 650, minEnvoi: 75001, maxEnvoi: 100000, fraisEnvoi: 1300 },
    { min: 50001, max: 100000, fraisRetrait: 950, minEnvoi: 100001, maxEnvoi: 200000, fraisEnvoi: 1800 },
    { min: 100001, max: 200000, fraisRetrait: 1900, minEnvoi: 200001, maxEnvoi: 300000, fraisEnvoi: 2800 },
    { min: 200001, max: 300000, fraisRetrait: 2800, minEnvoi: 300001, maxEnvoi: 400000, fraisEnvoi: 3500 },
    { min: 300001, max: 500000, fraisRetrait: 3250, minEnvoi: 400001, maxEnvoi: 500000, fraisEnvoi: 4000 },
    { min: 500001, max: 750000, fraisRetrait: 4500, minEnvoi: 500001, maxEnvoi: 750000, fraisEnvoi: 5800 },
    { min: 750001, max: 1000000, fraisRetrait: 5500, minEnvoi: 750001, maxEnvoi: 1500000, fraisEnvoi: 10000 },
    { min: 1000001, max: 1500000, fraisRetrait: 7500, minEnvoi: 1500001, maxEnvoi: 2000000, fraisEnvoi: 13000 },
    { min: 1500001, max: 2000000, fraisRetrait: 8000 }
  ]
};

export const tarifsSenegal = {
  title: "Grille Tarifaire Sénégal",
  description: "Frais pour les envois vers le Sénégal",
  data: [
    { min: 1, max: 5000, frais: 200, minEnvoi: 1, maxEnvoi: 20000, fraisEnvoi: 1200 },
    { min: 5001, max: 20000, frais: 300 },
    { min: 20001, max: 50000, frais: 750, minEnvoi: 20001, maxEnvoi: 50000, fraisEnvoi: 1500 },
    { min: 50001, max: 75000, frais: 1125, minEnvoi: 50001, maxEnvoi: 100000, fraisEnvoi: 2000 },
    { min: 75001, max: 100000, frais: 1500, minEnvoi: 100001, maxEnvoi: 200000, fraisEnvoi: 2500 },
    { min: 100001, max: 200000, frais: 3000, minEnvoi: 200001, maxEnvoi: 500000, fraisEnvoi: 5000 },
    { min: 200001, max: 300000, frais: 4000, minEnvoi: 500001, maxEnvoi: 750000, fraisEnvoi: 6000 },
    { min: 300001, max: 400000, frais: 6500 },
    { min: 400001, max: 500000, frais: 7500, minEnvoi: 750001, maxEnvoi: 1000000, fraisEnvoi: 7500 },
    { min: 500001, max: 750000, frais: 11250, minEnvoi: 1000001, maxEnvoi: 1500000, fraisEnvoi: 8500 },
    { min: 750001, max: 1500000, frais: 22500 },
    { min: 1500001, max: 2000000, frais: 30000, minEnvoi: 1500001, maxEnvoi: 2000000, fraisEnvoi: 10000 }
  ]
};

export const tarifsCEMAC = {
  title: "Grille Tarifaire CEMAC",
  description: "Frais pour les envois vers la zone CEMAC",
  data: [
    { min: 1, max: 20000, fraisEnvoi: 1200 },
    { min: 20001, max: 50000, fraisEnvoi: 2000 },
    { min: 50001, max: 100000, fraisEnvoi: 2500 },
    { min: 100001, max: 200000, fraisEnvoi: 3500 },
    { min: 200001, max: 300000, fraisEnvoi: 4000 },
    { min: 300001, max: 400000, fraisEnvoi: 4500 },
    { min: 400001, max: 500000, fraisEnvoi: 5000 },
    { min: 500001, max: 750000, fraisEnvoi: 6500 },
    { min: 750001, max: 1000000, fraisEnvoi: 7500 },
    { min: 1000001, max: 1500000, fraisEnvoi: 8500 },
    { min: 1500001, max: 2000000, fraisEnvoi: 10000 }
  ]
};

export const tarifsMobileMoney = {
  title: "Transfert Mobile Money",
  description: "Frais pour les transferts entre B-MO et les autres réseaux Mobile Money",
  data: [
    { min: 1, max: 2000, fraisBmoVersAutres: 200 },
    { min: 2001, max: 5000, fraisBmoVersAutres: 225 },
    { min: 5001, max: 40000, fraisBmoVersAutres: 300, fraisAutresVersBmo: "0,2%" },
    { min: 40001, max: 75000, fraisBmoVersAutres: 350 },
    { min: 75001, max: 400000, fraisBmoVersAutres: 400 },
    { min: 400001, max: 1000000, fraisBmoVersAutres: 450 },
    { min: 1000001, max: 2000000, fraisBmoVersAutres: 500 }
  ]
};

export const tarifsInternational = {
  title: "Transferts Internationaux",
  description: "Destinations: États-Unis, Europe, Canada, Inde, Royaume-Uni, Émirats Arabes Unis, Nigeria, Cameroun",
  note: "Contactez-nous pour les tarifs spécifiques par destination"
};

// Réseau
export const microfinances = [
  { name: "AFRICA FINANCES", agencies: 20 },
  { name: "COWEC", agencies: 13 },
  { name: "COMUBA", agencies: 28 },
  { name: "MDB", agencies: 14 },
  { name: "SIAN'SON", agencies: 30 },
  { name: "RENACA", agencies: 39 },
  { name: "LE DEFIS", agencies: 14 }
];

export const distributeurs = [
  { name: "SAK-SERVICES", location: "Godomey Togoudo - Allegléta - Womey", phone: "01 97 70 73 73" },
  { name: "RÈGNE DE L'ÉTERNEL", location: "Porto-Novo", phone: "01 97 33 95 23" },
  { name: "NETSHOP", location: "Ikpinlè Tankpè - Parana - Bidossessi - Sos - Ganvié", phone: "01 96 73 92 72 / 01 96 20 92 09" },
  { name: "ALAKHBAAR SERVICE", location: "1er - 4ième arrondissement", phone: "01 97 97 02 91 / 01 90 56 56 56" },
  { name: "EXPERT COMMUNICATION", location: "Aguégué - Adjohoun - Dangbo - Bonou - Akpro Missérété - Adjarra - Avrankou", phone: "01 96 64 92 83" },
  { name: "DON DE DIEU SALEM", location: "Glo - Zè - Tori - Allada - Toffo", phone: "01 97 27 67 91" },
  { name: "KR BUSINESS CENTER", location: "Parakou - Tchaourou", phone: "01 97 35 49 46" },
  { name: "NOUROU DISTRIBUTION & SERVICES", location: "Natitingou", phone: "01 44 71 74 88 / 01 95 77 86 61" }
];

export const gabUBA = {
  cotonou: [
    "Agence Principale ATM 1 - Carrefour Trois Banques",
    "Cocotiers ATM 1",
    "Agence Principale ATM 2",
    "Fidjrossè ATM 2",
    "Commissariat Central - Bénin Petro",
    "Patte d'Oie",
    "Agence Dantokpa ATM",
    "Erevan",
    "CABI SCBERMAP",
    "Patte d'Oie ATM",
    "GAB Jéricho Dantokpa",
    "Stade de l'Amitié",
    "Abattoir ATM 1 - Face Imprimerie Toundé",
    "Houdegbé ATM 2"
  ],
  abomeyCalavi: ["Cocotomey ATM"],
  bohicon: ["Bohicon ATM 1 - Quartier Gankon"],
  zogbodomey: ["GAB Nocibe Massi"],
  ouidah: ["Ouidah ATM"],
  come: ["Comé Branch - Quartier Hongodé"],
  portoNovo: ["Porto-Novo ATM 1 - Face Toffa"],
  parakou: ["Parakou ATM 1 - Banikouara", "Université de Parakou"]
};

export const partenaires = [
  { name: "UBA", category: "Banque", description: "Africa's Global Bank - Partenaire bancaire principal" },
  { name: "BCEAO", category: "Régulateur", description: "Banque Centrale des États de l'Afrique de l'Ouest" },
  { name: "TERRA PAY", category: "Transfert", description: "Partenaire transfert international" },
  { name: "AGL", category: "Logistique", description: "Africa Global Logistics" },
  { name: "CANAL+", category: "Médias", description: "Partenaire réabonnement TV" },
  { name: "SBEE", category: "Énergie", description: "Société Béninoise d'Énergie Électrique" },
  { name: "CMA CGM", category: "Maritime", description: "Partenaire paiement transitaires" },
  { name: "UNICEF", category: "Institution", description: "Fonds des Nations Unies pour l'enfance" },
  { name: "MFS", category: "Fintech", description: "Mobile Financial Services" },
  { name: "ONAFRIQ", category: "Fintech", description: "Réseau de paiement africain" },
  { name: "APSFD", category: "Association", description: "Association Professionnelle des Systèmes Financiers Décentralisés" }
];

// Inscription
export const inscriptionUSSD = {
  title: "Créer son compte avec le code USSD",
  steps: [
    "Tapez *890#",
    "Choisissez Client",
    "Choisissez Inscription",
    "Entrez votre prénom",
    "Puis votre nom",
    "Vous recevrez une notification avec un code à 6 chiffres (mot de passe par défaut)"
  ]
};

export const inscriptionApp = {
  title: "Créer son compte avec l'application",
  steps: [
    "Allez sur Play Store",
    "Recherchez BESTCASH",
    "Téléchargez l'application",
    "Entrez votre numéro de téléphone",
    "Mettez votre nom",
    "Puis votre prénom",
    "Saisissez votre adresse",
    "Entrez votre email",
    "Cliquez sur Inscription",
    "Vous recevrez une notification avec un code à 6 chiffres"
  ]
};

// Stats
export const stats = {
  microfinances: 7,
  agencies: 158,
  distributors: 8,
  gabCount: 30,
  operators: 3 // MTN, Moov, Celtiis
};

// Blog Categories
export const blogCategories = [
  "Tous",
  "Actualités",
  "Guides",
  "Partenariats",
  "Innovation",
  "Événements"
];

// Blog Posts
export const blogPosts = [
  {
    id: 1,
    slug: "lancement-retrait-gab-uba",
    title: "B-MO lance le retrait sans carte aux GAB UBA",
    excerpt: "Une innovation majeure permettant aux utilisateurs B-MO de retirer de l'argent aux guichets automatiques UBA sans avoir besoin d'une carte bancaire.",
    category: "Innovation",
    date: "25 Jan 2025",
    readTime: "3 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 2,
    slug: "partenariat-sbee-paiement-factures",
    title: "Partenariat SBEE : Payez vos factures d'électricité avec B-MO",
    excerpt: "B-MO simplifie le paiement de vos factures SBEE. Découvrez comment régler vos factures prépayées et postpayées en quelques clics.",
    category: "Partenariats",
    date: "18 Jan 2025",
    readTime: "4 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 3,
    slug: "guide-transfert-mobile-money",
    title: "Guide complet : Transférer vers MTN MoMo et Moov Money",
    excerpt: "Apprenez à effectuer des transferts vers tous les opérateurs Mobile Money du Bénin depuis votre compte B-MO.",
    category: "Guides",
    date: "10 Jan 2025",
    readTime: "5 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 4,
    slug: "expansion-reseau-microfinances",
    title: "158 agences partenaires : B-MO étend son réseau",
    excerpt: "Avec 7 microfinances partenaires et plus de 158 agences, B-MO est désormais accessible dans toutes les régions du Bénin.",
    category: "Actualités",
    date: "5 Jan 2025",
    readTime: "3 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 5,
    slug: "securite-transactions-bmo",
    title: "Comment B-MO protège vos transactions",
    excerpt: "Découvrez les mesures de sécurité avancées mises en place pour protéger vos données et transactions financières.",
    category: "Innovation",
    date: "28 Dec 2024",
    readTime: "4 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 6,
    slug: "inscription-ussd-890",
    title: "Créer son compte B-MO en 2 minutes avec *890#",
    excerpt: "Pas besoin de smartphone ! Suivez notre guide pour créer votre compte B-MO simplement avec le code USSD *890#.",
    category: "Guides",
    date: "20 Dec 2024",
    readTime: "2 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 7,
    slug: "forum-inclusion-financiere-2024",
    title: "B-MO au Forum de l'Inclusion Financière 2024",
    excerpt: "Retour sur notre participation au Forum National de l'Inclusion Financière et nos engagements pour démocratiser l'accès aux services financiers.",
    category: "Événements",
    date: "15 Dec 2024",
    readTime: "4 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 8,
    slug: "paiement-masse-entreprises",
    title: "Solution de paiement de masse pour les entreprises",
    excerpt: "Simplifiez le versement des salaires, bourses et pensions avec notre solution de paiement de masse B-MO.",
    category: "Innovation",
    date: "8 Dec 2024",
    readTime: "5 min",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 9,
    slug: "application-bmo-nouvelle-version",
    title: "Nouvelle version de l'application B-MO disponible",
    excerpt: "Interface repensée, nouvelles fonctionnalités et performances améliorées. Mettez à jour votre application dès maintenant.",
    category: "Actualités",
    date: "1 Dec 2024",
    readTime: "3 min",
    content: "Contenu détaillé de l'article..."
  }
];
