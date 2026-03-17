export interface SecondaryMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth?: string;
  status: "vivant" | "décédé";
}

export interface Member {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneSecondary?: string;
  whatsapp?: string;
  campement: string;
  sousPrefecture: string;
  idType: string;
  idNumber: string;
  photo?: string;
  registrationDate: string;
  status: "actif" | "suspendu" | "décédé";
  adhesionPaid: boolean;
  secondaryMembers: SecondaryMember[];
  totalCoveredPersons: number;
  contributionStatus: "à_jour" | "en_retard";
}

export interface Death {
  id: string;
  deceasedName: string;
  deceasedMemberId: string;
  dateOfDeath: string;
  type: "principal" | "secondaire";
  payout: number;
  retained: number;
  totalExpectedContributions: number;
  totalCollected: number;
  status: "en_cours" | "clôturé";
}

export interface Contribution {
  id: string;
  memberId: string;
  memberName: string;
  deathId: string;
  amount: number;
  expectedAmount: number;
  paymentMethod: "especes" | "wave" | "orange" | "mtn" | "moov";
  status: "payé" | "non_payé" | "partiel" | "exonéré";
  date?: string;
}

export const mockMembers: Member[] = [
  {
    id: "1", memberId: "MSCB-25-001", firstName: "Jean", lastName: "KOUADIO",
    phone: "+225 07 01 23 45 67", campement: "Kouassikandro", sousPrefecture: "Daloa",
    idType: "CNI", idNumber: "CI-2024-001234", registrationDate: "2025-03-15",
    status: "actif", adhesionPaid: true, contributionStatus: "à_jour",
    totalCoveredPersons: 3,
    secondaryMembers: [
      { id: "s1", name: "Marie KOUADIO", relationship: "Épouse", status: "vivant" },
      { id: "s2", name: "Agnès KOUADIO", relationship: "Mère", status: "vivant" },
    ],
  },
  {
    id: "2", memberId: "MSCB-25-002", firstName: "Paul", lastName: "BROU",
    phone: "+225 05 98 76 54 32", campement: "Bédiala", sousPrefecture: "Daloa",
    idType: "Permis", idNumber: "P-2023-9876", registrationDate: "2025-04-02",
    status: "actif", adhesionPaid: true, contributionStatus: "en_retard",
    totalCoveredPersons: 2,
    secondaryMembers: [
      { id: "s3", name: "Awa BROU", relationship: "Épouse", status: "vivant" },
    ],
  },
  {
    id: "3", memberId: "MSCB-25-003", firstName: "Esther", lastName: "YAO",
    phone: "+225 01 23 45 67 89", campement: "Gboguhé", sousPrefecture: "Daloa",
    idType: "CNI", idNumber: "CI-2024-005678", registrationDate: "2025-04-10",
    status: "actif", adhesionPaid: true, contributionStatus: "à_jour",
    totalCoveredPersons: 1,
    secondaryMembers: [],
  },
  {
    id: "4", memberId: "MSCB-25-004", firstName: "Konan", lastName: "ASSI",
    phone: "+225 07 55 44 33 22", campement: "Issia", sousPrefecture: "Issia",
    idType: "CNI", idNumber: "CI-2023-009012", registrationDate: "2025-05-01",
    status: "actif", adhesionPaid: true, contributionStatus: "à_jour",
    totalCoveredPersons: 2,
    secondaryMembers: [
      { id: "s4", name: "Adjoua ASSI", relationship: "Épouse", status: "vivant" },
    ],
  },
  {
    id: "5", memberId: "MSCB-26-001", firstName: "Aimé", lastName: "KOFFI",
    phone: "+225 05 11 22 33 44", campement: "Vavoua", sousPrefecture: "Vavoua",
    idType: "Passeport", idNumber: "PA-2025-1111", registrationDate: "2026-01-15",
    status: "actif", adhesionPaid: true, contributionStatus: "à_jour",
    totalCoveredPersons: 3,
    secondaryMembers: [
      { id: "s5", name: "Claudine KOFFI", relationship: "Épouse", status: "vivant" },
      { id: "s6", name: "Berthe KOFFI", relationship: "Mère", status: "vivant" },
    ],
  },
  {
    id: "6", memberId: "MSCB-26-002", firstName: "Grâce", lastName: "N'GUESSAN",
    phone: "+225 01 99 88 77 66", campement: "Zoukougbeu", sousPrefecture: "Zoukougbeu",
    idType: "CNI", idNumber: "CI-2025-002345", registrationDate: "2026-02-01",
    status: "suspendu", adhesionPaid: true, contributionStatus: "en_retard",
    totalCoveredPersons: 1,
    secondaryMembers: [],
  },
];

export const mockDeaths: Death[] = [
  {
    id: "d1", deceasedName: "Yves TAPÉ", deceasedMemberId: "MSCB-25-010",
    dateOfDeath: "2026-02-20", type: "principal", payout: 300000, retained: 0,
    totalExpectedContributions: 14000, totalCollected: 10000, status: "en_cours",
  },
  {
    id: "d2", deceasedName: "Bernadette KONÉ", deceasedMemberId: "MSCB-25-005",
    dateOfDeath: "2026-01-10", type: "secondaire", payout: 250000, retained: 50000,
    totalExpectedContributions: 14000, totalCollected: 14000, status: "clôturé",
  },
];

export const mockContributions: Contribution[] = [
  { id: "c1", memberId: "MSCB-25-001", memberName: "Jean KOUADIO", deathId: "d1", amount: 3000, expectedAmount: 3000, paymentMethod: "especes", status: "payé", date: "2026-02-22" },
  { id: "c2", memberId: "MSCB-25-002", memberName: "Paul BROU", deathId: "d1", amount: 0, expectedAmount: 2000, paymentMethod: "especes", status: "non_payé" },
  { id: "c3", memberId: "MSCB-25-003", memberName: "Esther YAO", deathId: "d1", amount: 1000, expectedAmount: 1000, paymentMethod: "wave", status: "payé", date: "2026-02-23" },
  { id: "c4", memberId: "MSCB-25-004", memberName: "Konan ASSI", deathId: "d1", amount: 1000, expectedAmount: 2000, paymentMethod: "orange", status: "partiel", date: "2026-02-25" },
  { id: "c5", memberId: "MSCB-26-001", memberName: "Aimé KOFFI", deathId: "d1", amount: 3000, expectedAmount: 3000, paymentMethod: "mtn", status: "payé", date: "2026-02-21" },
  { id: "c6", memberId: "MSCB-26-002", memberName: "Grâce N'GUESSAN", deathId: "d1", amount: 0, expectedAmount: 1000, paymentMethod: "especes", status: "exonéré" },
];

export const treasurySummary = {
  totalBalance: 485000,
  totalContributionsCollected: 1250000,
  totalPayouts: 850000,
  retainedReserves: 85000,
  pendingContributions: 4000,
};

export const sousPrefectures = {
  Daloa: ["Daloa", "Bédiala", "Gboguhé", "Gonaté", "Zaïbo", "Zoukougbeu", "Tapeguiabékro", "Gadouan", "Daloably", "Gohouo-Zagna"],
  Issia: ["Issia", "Iboguhé", "Saïoua", "Sémien", "Nahio"],
  Vavoua: ["Vavoua", "Boguhé", "Kéibly", "Massala", "Tiébissou-Gare"],
  Zoukougbeu: ["Zoukougbeu", "Guibéroua"],
};
