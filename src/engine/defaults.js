// Demo data. FX rates are PLACEHOLDERS, not market data: live feeds replace them in production.
export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', decimals: 2, perUsd: 1 },
  { code: 'GBP', name: 'British Pound', symbol: '£', decimals: 2, perUsd: 0.76 },
  { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, perUsd: 0.88 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', decimals: 2, perUsd: 7.1 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', decimals: 2, perUsd: 3.6725 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', decimals: 2, perUsd: 4.4 },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', decimals: 2, perUsd: 71 },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', decimals: 0, perUsd: 590 },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', decimals: 0, perUsd: 8650 },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', decimals: 2, perUsd: 25 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', decimals: 2, perUsd: 11 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', decimals: 2, perUsd: 1500 }
];

export const COUNTRIES = [
  { code: 'GM', name: 'The Gambia', currency: 'GMD', tz: 'Africa/Banjul', dial: '+220', lang: 'en' },
  { code: 'SN', name: 'Senegal', currency: 'XOF', tz: 'Africa/Dakar', dial: '+221', lang: 'fr' },
  { code: 'ML', name: 'Mali', currency: 'XOF', tz: 'Africa/Bamako', dial: '+223', lang: 'fr' },
  { code: 'GW', name: 'Guinea-Bissau', currency: 'XOF', tz: 'Africa/Bissau', dial: '+245', lang: 'pt' },
  { code: 'GN', name: 'Guinea', currency: 'GNF', tz: 'Africa/Conakry', dial: '+224', lang: 'fr' },
  { code: 'ZM', name: 'Zambia', currency: 'ZMW', tz: 'Africa/Lusaka', dial: '+260', lang: 'en' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', tz: 'Europe/London', dial: '+44', lang: 'en' },
  { code: 'US', name: 'United States', currency: 'USD', tz: 'America/New_York', dial: '+1', lang: 'en' },
  { code: 'CN', name: 'China', currency: 'CNY', tz: 'Asia/Shanghai', dial: '+86', lang: 'zh' },
  { code: 'DE', name: 'Germany', currency: 'EUR', tz: 'Europe/Berlin', dial: '+49', lang: 'de' },
  { code: 'FR', name: 'France', currency: 'EUR', tz: 'Europe/Paris', dial: '+33', lang: 'fr' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', tz: 'Asia/Dubai', dial: '+971', lang: 'en' }
];

const H = { open: '08:30', close: '17:30', days: [1, 2, 3, 4, 5, 6] };
const b = (id, country, name, city, extra = {}) => ({
  id, country, name, city, type: 'OWN', commissionBps: 0, active: true, hours: H, ...extra
});
export const BRANCHES = [
  b('GM-SKD', 'GM', 'Serrekunda Main', 'Serrekunda'),
  b('GM-BJL', 'GM', 'Banjul Central', 'Banjul'),
  b('GM-BRK', 'GM', 'Brikama Counter', 'Brikama', { type: 'AGENT', commissionBps: 80 }),
  b('SN-DKR', 'SN', 'Dakar Plateau', 'Dakar'),
  b('SN-ZIG', 'SN', 'Ziguinchor Counter', 'Ziguinchor', { type: 'AGENT', commissionBps: 80 }),
  b('ML-BKO', 'ML', 'Bamako Centre', 'Bamako'),
  b('GW-BSS', 'GW', 'Bissau Central', 'Bissau'),
  b('GN-CKY', 'GN', 'Conakry Madina', 'Conakry'),
  b('ZM-LUN', 'ZM', 'Lusaka Cairo Road', 'Lusaka'),
  b('ZM-KIT', 'ZM', 'Kitwe Counter', 'Kitwe', { type: 'AGENT', commissionBps: 80 }),
  b('GB-LDN', 'GB', 'London Southwark', 'London'),
  b('GB-MAN', 'GB', 'Manchester', 'Manchester'),
  b('US-NYC', 'US', 'New York Bronx', 'New York'),
  b('US-ATL', 'US', 'Atlanta', 'Atlanta'),
  b('CN-GZH', 'CN', 'Guangzhou Xiaobei', 'Guangzhou'),
  b('CN-YIW', 'CN', 'Yiwu Trade Hub', 'Yiwu'),
  b('DE-BER', 'DE', 'Berlin', 'Berlin'),
  b('FR-PAR', 'FR', 'Paris', 'Paris'),
  b('AE-DXB', 'AE', 'Dubai Deira', 'Dubai', { hours: { open: '09:00', close: '19:00', days: [1, 2, 3, 4, 5, 6] } })
];

export const DEFAULT_SETTINGS = {
  codeExpiryDays: 30,
  rateLockMinutes: 30,
  maxPinAttempts: 3,
  maxLoginAttempts: 5,
  lockoutMinutes: 15,
  idleTimeoutMin: 15,
  enforceOperatingHours: true,
  graceMin: 10,
  autoClockIn: true,
  nameMatchPass: 0.92,
  nameMatchReview: 0.8,
  lowFloatUsd: 3000,
  fxMarginBps: 150,
  marginOverridesBps: {},
  domesticFeeFactor: 0.5,
  minFeeUsd: 1,
  feeBandsUsd: [
    { upTo: 100, fee: 3 }, { upTo: 500, fee: 5 }, { upTo: 2000, fee: 8 }, { upTo: null, fee: 12 }
  ],
  tiers: {
    C1: { perTxUsd: 650, per30dUsd: 1950, per12mUsd: null },
    C2: { perTxUsd: 2600, per30dUsd: 7800, per12mUsd: 32500 },
    C3: { perTxUsd: 13000, per30dUsd: null, per12mUsd: null }
  },
  hardMaxTxUsd: 13000,
  highValueUsd: 10000,
  coSignAboveUsd: 1500,
  idPhotoAboveUsd: 200,
  varianceToleranceUsd: 7,
  allowSelfRedeem: false,
  velocity: { tx24h: 3, tx7d: 8, m2oSenders7d: 6, o2mRecipients7d: 5, structuringCount: 3, structuringPct: 90 },
  // Demo lists only. Production uses licensed screening data (OFSI/OFAC/UN/EU) via API.
  watchlist: ['Test Sanctioned Person', 'Blocked Entity Demo'],
  pepList: ['Demo Politically Exposed']
};
