export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  date: string;
  riskScore: number;
  status: 'flagged' | 'cleared' | 'under_review';
  rules: string[];
  type: string;
  country: string;
  sourceAccount: string;
  destinationAccount: string;
  swiftCode?: string;
  routingNumber?: string;
  description: string;
  ipAddress: string;
  deviceInfo: string;
  location: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo: string;
  transactionId: string;
  customer: string;
  amount: string;
  rules: string[];
}

export const mockTransactions: Transaction[] = [
  // HIGH VALUE TRANSACTION transactions
  {
    id: 'TX-2024-001',
    customer: 'Ahmed Hassan',
    amount: 125000,
    date: '2024-01-15 14:32',
    riskScore: 98,
    status: 'flagged',
    rules: ['HIGH VALUE TRANSACTION', 'Sanctions List', 'Layering'],
    type: 'Wire Transfer',
    country: 'UAE',
    sourceAccount: '****8901',
    destinationAccount: '****2345',
    swiftCode: 'EBILAEAD',
    description: 'Business investment transfer',
    ipAddress: '185.45.67.123',
    deviceInfo: 'Chrome 118.0 on Windows 11',
    location: 'Dubai, UAE'
  },
  {
    id: 'TX-2024-016',
    customer: 'Marcus Johnson',
    amount: 87500,
    date: '2024-01-15 11:45',
    riskScore: 89,
    status: 'flagged',
    rules: ['HIGH VALUE TRANSACTION'],
    type: 'Wire Transfer',
    country: 'USA',
    sourceAccount: '****3421',
    destinationAccount: '****7865',
    routingNumber: '021000021',
    description: 'Real estate purchase',
    ipAddress: '192.168.2.105',
    deviceInfo: 'Safari 17.1 on macOS',
    location: 'Miami, FL, USA'
  },
  {
    id: 'TX-2024-017',
    customer: 'Elena Rodriguez',
    amount: 156000,
    date: '2024-01-14 16:22',
    riskScore: 91,
    status: 'flagged',
    rules: ['HIGH VALUE TRANSACTION', 'PEP'],
    type: 'Wire Transfer',
    country: 'Spain',
    sourceAccount: '****9876',
    destinationAccount: '****4321',
    swiftCode: 'BBVAESMM',
    description: 'Investment portfolio transfer',
    ipAddress: '85.45.123.67',
    deviceInfo: 'Firefox 120.0 on Windows 11',
    location: 'Madrid, Spain'
  },

  // AML DEVIATION transactions
  {
    id: 'TX-2024-018',
    customer: 'David Kim',
    amount: 45000,
    date: '2024-01-15 09:15',
    riskScore: 85,
    status: 'flagged',
    rules: ['AML DEVIATION', 'Geographic Risk'],
    type: 'Cash Deposit',
    country: 'South Korea',
    sourceAccount: '****5432',
    destinationAccount: '****8765',
    description: 'Multiple structured deposits',
    ipAddress: '211.45.78.90',
    deviceInfo: 'Samsung Internet 22.0 on Android 13',
    location: 'Seoul, South Korea'
  },
  {
    id: 'TX-2024-019',
    customer: 'Rachel Adams',
    amount: 23500,
    date: '2024-01-14 13:30',
    riskScore: 78,
    status: 'flagged',
    rules: ['AML DEVIATION'],
    type: 'Wire Transfer',
    country: 'Canada',
    sourceAccount: '****6789',
    destinationAccount: '****1234',
    description: 'Unusual transaction pattern',
    ipAddress: '142.34.56.78',
    deviceInfo: 'Chrome 118.0 on iOS 17',
    location: 'Vancouver, BC, Canada'
  },

  // HIGH RISK CUSTOMER TRANSACTION transactions
  {
    id: 'TX-2024-004',
    customer: 'Robert Chen',
    amount: 45000,
    date: '2024-01-15 11:22',
    riskScore: 92,
    status: 'flagged',
    rules: ['HIGH RISK CUSTOMER TRANSACTION', 'Geographic Risk', 'PEP'],
    type: 'Wire Transfer',
    country: 'China',
    sourceAccount: '****4567',
    destinationAccount: '****8901',
    swiftCode: 'ICBKCNBJ',
    description: 'International trade payment',
    ipAddress: '114.55.78.234',
    deviceInfo: 'Firefox 120.0 on Ubuntu 22.04',
    location: 'Shanghai, China'
  },
  {
    id: 'TX-2024-020',
    customer: 'Vladimir Petrov',
    amount: 78000,
    date: '2024-01-14 15:45',
    riskScore: 94,
    status: 'flagged',
    rules: ['HIGH RISK CUSTOMER TRANSACTION', 'Sanctions List'],
    type: 'Wire Transfer',
    country: 'Russia',
    sourceAccount: '****7890',
    destinationAccount: '****3456',
    swiftCode: 'SABRRUMM',
    description: 'Energy sector payment',
    ipAddress: '185.125.67.89',
    deviceInfo: 'Yandex Browser 23.0 on Windows 10',
    location: 'Moscow, Russia'
  },

  // GL TO CUSTOMER transactions
  {
    id: 'TX-2024-021',
    customer: 'Corporate Banking Ltd',
    amount: 35000,
    date: '2024-01-15 08:30',
    riskScore: 65,
    status: 'flagged',
    rules: ['GL TO CUSTOMER'],
    type: 'Internal Transfer',
    country: 'USA',
    sourceAccount: 'GL-001',
    destinationAccount: '****5678',
    description: 'General Ledger to customer account transfer',
    ipAddress: '10.0.0.1',
    deviceInfo: 'Internal System',
    location: 'New York, NY, USA'
  },
  {
    id: 'TX-2024-022',
    customer: 'Tech Solutions Inc',
    amount: 18500,
    date: '2024-01-14 14:15',
    riskScore: 58,
    status: 'flagged',
    rules: ['GL TO CUSTOMER'],
    type: 'Internal Transfer',
    country: 'USA',
    sourceAccount: 'GL-002',
    destinationAccount: '****9012',
    description: 'GL adjustment transfer',
    ipAddress: '10.0.0.2',
    deviceInfo: 'Internal System',
    location: 'San Francisco, CA, USA'
  },

  // DEPOSIT IN DORMANT transactions
  {
    id: 'TX-2024-023',
    customer: 'Margaret Wilson',
    amount: 12000,
    date: '2024-01-15 16:45',
    riskScore: 82,
    status: 'flagged',
    rules: ['DEPOSIT IN DORMANT'],
    type: 'Cash Deposit',
    country: 'USA',
    sourceAccount: '****3456',
    destinationAccount: '****7890',
    description: 'Deposit to dormant account',
    ipAddress: '172.16.45.123',
    deviceInfo: 'Edge 119.0 on Windows 11',
    location: 'Chicago, IL, USA'
  },
  {
    id: 'TX-2024-024',
    customer: 'James Thompson',
    amount: 8750,
    date: '2024-01-14 12:30',
    riskScore: 75,
    status: 'flagged',
    rules: ['DEPOSIT IN DORMANT'],
    type: 'Wire Transfer',
    country: 'UK',
    sourceAccount: '****6543',
    destinationAccount: '****2109',
    swiftCode: 'BARCGB22',
    description: 'Transfer to inactive account',
    ipAddress: '87.45.123.67',
    deviceInfo: 'Chrome 119.0 on macOS',
    location: 'London, UK'
  },

  // MULTI BRANCH CUSTOMER TRANSACTION transactions
  {
    id: 'TX-2024-025',
    customer: 'Sarah Martinez',
    amount: 15500,
    date: '2024-01-15 13:20',
    riskScore: 69,
    status: 'flagged',
    rules: ['MULTI BRANCH CUSTOMER TRANSACTION'],
    type: 'Wire Transfer',
    country: 'USA',
    sourceAccount: '****4567',
    destinationAccount: '****8901',
    routingNumber: '121000248',
    description: 'Cross-branch customer transaction',
    ipAddress: '192.168.1.150',
    deviceInfo: 'Chrome 118.0 on Windows 11',
    location: 'Los Angeles, CA, USA'
  },
  {
    id: 'TX-2024-026',
    customer: 'Michael O\'Connor',
    amount: 22000,
    date: '2024-01-14 10:45',
    riskScore: 71,
    status: 'flagged',
    rules: ['MULTI BRANCH CUSTOMER TRANSACTION', 'Velocity Check'],
    type: 'Wire Transfer',
    country: 'Ireland',
    sourceAccount: '****6789',
    destinationAccount: '****3456',
    swiftCode: 'BOFIIE2D',
    description: 'Multi-branch business transaction',
    ipAddress: '87.45.123.67',
    deviceInfo: 'Chrome 119.0 on macOS',
    location: 'Dublin, Ireland'
  },

  // Existing transactions with updated rule names
  {
    id: 'TX-2024-002',
    customer: 'John Anderson',
    amount: 15000,
    date: '2024-01-15 13:45',
    riskScore: 85,
    status: 'flagged',
    rules: ['Structuring', 'HIGH VALUE TRANSACTION'],
    type: 'Wire Transfer',
    country: 'USA',
    sourceAccount: '****1234',
    destinationAccount: '****5678',
    routingNumber: '021000021',
    description: 'Property payment',
    ipAddress: '192.168.1.100',
    deviceInfo: 'Safari 17.1 on macOS',
    location: 'New York, NY, USA'
  },
  {
    id: 'TX-2024-003',
    customer: 'Maria Gonzalez',
    amount: 9850,
    date: '2024-01-15 12:18',
    riskScore: 72,
    status: 'flagged',
    rules: ['Structuring', 'Velocity Check'],
    type: 'Cash Deposit',
    country: 'Mexico',
    sourceAccount: '****3456',
    destinationAccount: '****7890',
    description: 'Cash deposit - business revenue',
    ipAddress: '201.45.123.89',
    deviceInfo: 'Chrome 119.0 on Android 14',
    location: 'Mexico City, Mexico'
  },
  {
    id: 'TX-2024-005',
    customer: 'Sarah Williams',
    amount: 8750,
    date: '2024-01-15 10:55',
    riskScore: 58,
    status: 'flagged',
    rules: ['Velocity Check'],
    type: 'Card Payment',
    country: 'Canada',
    sourceAccount: '****5678',
    destinationAccount: '****9012',
    description: 'Multiple card transactions',
    ipAddress: '142.34.56.78',
    deviceInfo: 'Chrome 118.0 on iOS 17',
    location: 'Toronto, ON, Canada'
  },
  {
    id: 'TX-2024-006',
    customer: 'Viktor Petrov',
    amount: 78000,
    date: '2024-01-15 09:33',
    riskScore: 88,
    status: 'flagged',
    rules: ['Geographic Risk', 'HIGH VALUE TRANSACTION', 'Sanctions List'],
    type: 'Wire Transfer',
    country: 'Russia',
    sourceAccount: '****6789',
    destinationAccount: '****3456',
    swiftCode: 'SABRRUMM',
    description: 'Energy sector payment',
    ipAddress: '185.125.67.89',
    deviceInfo: 'Yandex Browser 23.0 on Windows 10',
    location: 'Moscow, Russia'
  },
  {
    id: 'TX-2024-007',
    customer: 'Lisa Thompson',
    amount: 9900,
    date: '2024-01-14 16:45',
    riskScore: 75,
    status: 'flagged',
    rules: ['Structuring', 'HIGH VALUE TRANSACTION'],
    type: 'Cash Deposit',
    country: 'USA',
    sourceAccount: '****7890',
    destinationAccount: '****1234',
    description: 'Cash deposit - retail business',
    ipAddress: '172.16.45.123',
    deviceInfo: 'Edge 119.0 on Windows 11',
    location: 'Los Angeles, CA, USA'
  },
  {
    id: 'TX-2024-008',
    customer: 'Omar Al-Rashid',
    amount: 156000,
    date: '2024-01-14 15:22',
    riskScore: 95,
    status: 'flagged',
    rules: ['HIGH VALUE TRANSACTION', 'PEP', 'Geographic Risk'],
    type: 'Wire Transfer',
    country: 'Saudi Arabia',
    sourceAccount: '****8901',
    destinationAccount: '****5678',
    swiftCode: 'RIBLSARI',
    description: 'Oil industry transaction',
    ipAddress: '109.45.123.67',
    deviceInfo: 'Chrome 118.0 on macOS',
    location: 'Riyadh, Saudi Arabia'
  },
  {
    id: 'TX-2024-009',
    customer: 'Jennifer Kim',
    amount: 12500,
    date: '2024-01-14 14:18',
    riskScore: 68,
    status: 'flagged',
    rules: ['Velocity Check', 'Geographic Risk'],
    type: 'Wire Transfer',
    country: 'South Korea',
    sourceAccount: '****9012',
    destinationAccount: '****6789',
    swiftCode: 'HNBNKRSE',
    description: 'Technology services payment',
    ipAddress: '211.45.78.90',
    deviceInfo: 'Samsung Internet 22.0 on Android 13',
    location: 'Seoul, South Korea'
  },
  {
    id: 'TX-2024-010',
    customer: 'Mohammed Ibrahim',
    amount: 89000,
    date: '2024-01-14 13:55',
    riskScore: 91,
    status: 'flagged',
    rules: ['HIGH VALUE TRANSACTION', 'Sanctions List', 'PEP'],
    type: 'Wire Transfer',
    country: 'Iran',
    sourceAccount: '****3456',
    destinationAccount: '****7890',
    swiftCode: 'BMJIIRTH',
    description: 'Commercial trade payment',
    ipAddress: '5.45.67.123',
    deviceInfo: 'Firefox 119.0 on Linux',
    location: 'Tehran, Iran'
  },
  {
    id: 'TX-2024-011',
    customer: 'Carlos Rodriguez',
    amount: 9750,
    date: '2024-01-14 12:30',
    riskScore: 69,
    status: 'flagged',
    rules: ['Structuring', 'Velocity Check'],
    type: 'Cash Deposit',
    country: 'Colombia',
    sourceAccount: '****4567',
    destinationAccount: '****8901',
    description: 'Multiple cash deposits',
    ipAddress: '181.45.123.89',
    deviceInfo: 'Chrome 118.0 on Android 12',
    location: 'Bogotá, Colombia'
  },
  {
    id: 'TX-2024-012',
    customer: 'Elena Volkov',
    amount: 67000,
    date: '2024-01-14 11:15',
    riskScore: 84,
    status: 'flagged',
    rules: ['Geographic Risk', 'HIGH VALUE TRANSACTION'],
    type: 'Wire Transfer',
    country: 'Ukraine',
    sourceAccount: '****5678',
    destinationAccount: '****9012',
    swiftCode: 'PBANUA2X',
    description: 'Humanitarian aid transfer',
    ipAddress: '91.45.67.234',
    deviceInfo: 'Opera 104.0 on Windows 10',
    location: 'Kyiv, Ukraine'
  },
  {
    id: 'TX-2024-013',
    customer: 'Michael O\'Connor',
    amount: 25000,
    date: '2024-01-14 10:45',
    riskScore: 78,
    status: 'flagged',
    rules: ['HIGH VALUE TRANSACTION', 'Velocity Check'],
    type: 'Wire Transfer',
    country: 'Ireland',
    sourceAccount: '****6789',
    destinationAccount: '****3456',
    swiftCode: 'BOFIIE2D',
    description: 'Business acquisition payment',
    ipAddress: '87.45.123.67',
    deviceInfo: 'Chrome 119.0 on macOS',
    location: 'Dublin, Ireland'
  },
  {
    id: 'TX-2024-014',
    customer: 'Fatima Al-Zahra',
    amount: 34000,
    date: '2024-01-14 09:20',
    riskScore: 82,
    status: 'flagged',
    rules: ['PEP', 'Geographic Risk', 'HIGH VALUE TRANSACTION'],
    type: 'Wire Transfer',
    country: 'Lebanon',
    sourceAccount: '****7890',
    destinationAccount: '****1234',
    swiftCode: 'BLBLLBBX',
    description: 'Real estate transaction',
    ipAddress: '185.45.89.123',
    deviceInfo: 'Chrome 118.0 on Windows 11',
    location: 'Beirut, Lebanon'
  },
  {
    id: 'TX-2024-015',
    customer: 'David Park',
    amount: 9825,
    date: '2024-01-13 18:30',
    riskScore: 71,
    status: 'flagged',
    rules: ['Structuring', 'Velocity Check'],
    type: 'Cash Deposit',
    country: 'USA',
    sourceAccount: '****8901',
    destinationAccount: '****5678',
    description: 'Restaurant chain deposits',
    ipAddress: '192.168.45.67',
    deviceInfo: 'Safari 17.0 on iOS 17',
    location: 'San Francisco, CA, USA'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-2024-001',
    title: 'High-Risk Wire Transfer - Sanctions Alert',
    description: 'Large transaction from sanctioned country with PEP involvement',
    severity: 'high',
    timestamp: '2024-01-15 14:32:15',
    status: 'open',
    assignedTo: 'Sarah Johnson',
    transactionId: 'TX-2024-001',
    customer: 'Ahmed Hassan',
    amount: '$125,000',
    rules: ['HIGH VALUE TRANSACTION', 'Sanctions List', 'Layering']
  },
  {
    id: 'ALT-2024-002',
    title: 'Structuring Pattern Detected',
    description: 'Multiple transactions just below reporting threshold',
    severity: 'high',
    timestamp: '2024-01-15 13:45:22',
    status: 'investigating',
    assignedTo: 'Michael Chen',
    transactionId: 'TX-2024-002',
    customer: 'John Anderson',
    amount: '$15,000',
    rules: ['Structuring', 'HIGH VALUE TRANSACTION']
  },
  {
    id: 'ALT-2024-003',
    title: 'Cash Structuring - Velocity Alert',
    description: 'Suspicious cash deposit pattern detected',
    severity: 'medium',
    timestamp: '2024-01-15 12:18:45',
    status: 'investigating',
    assignedTo: 'Lisa Rodriguez',
    transactionId: 'TX-2024-003',
    customer: 'Maria Gonzalez',
    amount: '$9,850',
    rules: ['Structuring', 'Velocity Check']
  },
  {
    id: 'ALT-2024-004',
    title: 'Geographic Risk - PEP Match',
    description: 'High-risk jurisdiction with politically exposed person',
    severity: 'high',
    timestamp: '2024-01-15 11:22:33',
    status: 'open',
    assignedTo: 'David Kim',
    transactionId: 'TX-2024-004',
    customer: 'Robert Chen',
    amount: '$45,000',
    rules: ['HIGH RISK CUSTOMER TRANSACTION', 'Geographic Risk', 'PEP']
  },
  {
    id: 'ALT-2024-005',
    title: 'Card Velocity Alert',
    description: 'Rapid card usage across multiple locations',
    severity: 'medium',
    timestamp: '2024-01-15 10:55:12',
    status: 'resolved',
    assignedTo: 'Emily Watson',
    transactionId: 'TX-2024-005',
    customer: 'Sarah Williams',
    amount: '$8,750',
    rules: ['Velocity Check']
  },
  {
    id: 'ALT-2024-006',
    title: 'Sanctions List Match - Energy Sector',
    description: 'Transaction involving sanctioned entity in energy sector',
    severity: 'high',
    timestamp: '2024-01-15 09:33:45',
    status: 'open',
    assignedTo: 'Robert Martinez',
    transactionId: 'TX-2024-006',
    customer: 'Viktor Petrov',
    amount: '$78,000',
    rules: ['Geographic Risk', 'HIGH VALUE TRANSACTION', 'Sanctions List']
  },
  {
    id: 'ALT-2024-007',
    title: 'Retail Business Structuring',
    description: 'Cash deposit pattern suggesting structuring activity',
    severity: 'medium',
    timestamp: '2024-01-14 16:45:18',
    status: 'investigating',
    assignedTo: 'Amanda Lee',
    transactionId: 'TX-2024-007',
    customer: 'Lisa Thompson',
    amount: '$9,900',
    rules: ['Structuring', 'HIGH VALUE TRANSACTION']
  },
  {
    id: 'ALT-2024-008',
    title: 'PEP Alert - Oil Industry',
    description: 'Large transaction involving politically exposed person',
    severity: 'high',
    timestamp: '2024-01-14 15:22:55',
    status: 'open',
    assignedTo: 'James Thompson',
    transactionId: 'TX-2024-008',
    customer: 'Omar Al-Rashid',
    amount: '$156,000',
    rules: ['HIGH VALUE TRANSACTION', 'PEP', 'Geographic Risk']
  },
  {
    id: 'ALT-2024-009',
    title: 'Cross-Border Velocity Alert',
    description: 'Rapid cross-border transactions from high-risk region',
    severity: 'medium',
    timestamp: '2024-01-14 14:18:33',
    status: 'investigating',
    assignedTo: 'Grace Park',
    transactionId: 'TX-2024-009',
    customer: 'Jennifer Kim',
    amount: '$12,500',
    rules: ['Velocity Check', 'Geographic Risk']
  },
  {
    id: 'ALT-2024-010',
    title: 'Sanctions Alert - Iran Trade',
    description: 'Commercial transaction with sanctioned Iranian entity',
    severity: 'high',
    timestamp: '2024-01-14 13:55:44',
    status: 'open',
    assignedTo: 'Hassan Ahmed',
    transactionId: 'TX-2024-010',
    customer: 'Mohammed Ibrahim',
    amount: '$89,000',
    rules: ['HIGH VALUE TRANSACTION', 'Sanctions List', 'PEP']
  }
];

export const ruleCategories = [
  {
    id: 'AML',
    name: 'Anti-Money Laundering',
    rules: [
      {
        id: 'AML-001',
        name: 'HIGH VALUE TRANSACTION',
        description: 'Flags transactions over $10,000',
        enabled: true,
        riskLevel: 'high',
        category: 'AML',
        threshold: 10000
      },
      {
        id: 'AML-002',
        name: 'Structuring',
        description: 'Detects multiple transactions just under reporting thresholds',
        enabled: true,
        riskLevel: 'high',
        category: 'AML',
        threshold: 9500
      },
      {
        id: 'AML-003',
        name: 'Geographic Risk',
        description: 'Monitors transactions from high-risk jurisdictions',
        enabled: true,
        riskLevel: 'medium',
        category: 'AML',
        threshold: null
      },
      {
        id: 'AML-004',
        name: 'Layering',
        description: 'Detects complex layering patterns in transactions',
        enabled: true,
        riskLevel: 'high',
        category: 'AML',
        threshold: null
      },
      {
        id: 'AML-005',
        name: 'AML DEVIATION',
        description: 'Detects deviations from AML compliance patterns',
        enabled: true,
        riskLevel: 'high',
        category: 'AML',
        threshold: null
      }
    ]
  },
  {
    id: 'FRAUD',
    name: 'Fraud Detection',
    rules: [
      {
        id: 'FRAUD-001',
        name: 'Velocity Check',
        description: 'Monitors rapid transactions across different locations',
        enabled: true,
        riskLevel: 'medium',
        category: 'Fraud',
        threshold: 5
      },
      {
        id: 'FRAUD-002',
        name: 'Suspicious Pattern',
        description: 'Identifies unusual transaction patterns',
        enabled: true,
        riskLevel: 'high',
        category: 'Fraud',
        threshold: null
      },
      {
        id: 'FRAUD-003',
        name: 'HIGH RISK CUSTOMER TRANSACTION',
        description: 'Flags transactions from high-risk customer profiles',
        enabled: true,
        riskLevel: 'high',
        category: 'Fraud',
        threshold: null
      }
    ]
  },
  {
    id: 'SANCTIONS',
    name: 'Sanctions Screening',
    rules: [
      {
        id: 'SANCTIONS-001',
        name: 'PEP',
        description: 'Screens against Politically Exposed Persons database',
        enabled: true,
        riskLevel: 'high',
        category: 'Sanctions',
        threshold: null
      },
      {
        id: 'SANCTIONS-002',
        name: 'Sanctions List',
        description: 'Checks against international sanctions lists',
        enabled: true,
        riskLevel: 'high',
        category: 'Sanctions',
        threshold: null
      }
    ]
  },
  {
    id: 'INTERNAL',
    name: 'Internal Controls',
    rules: [
      {
        id: 'INTERNAL-001',
        name: 'GL TO CUSTOMER',
        description: 'Monitors General Ledger to customer transfers',
        enabled: true,
        riskLevel: 'medium',
        category: 'Internal',
        threshold: null
      },
      {
        id: 'INTERNAL-002',
        name: 'DEPOSIT IN DORMANT',
        description: 'Flags deposits into dormant accounts',
        enabled: true,
        riskLevel: 'high',
        category: 'Internal',
        threshold: null
      },
      {
        id: 'INTERNAL-003',
        name: 'MULTI BRANCH CUSTOMER TRANSACTION',
        description: 'Monitors cross-branch customer activities',
        enabled: true,
        riskLevel: 'medium',
        category: 'Internal',
        threshold: null
      }
    ]
  }
];
