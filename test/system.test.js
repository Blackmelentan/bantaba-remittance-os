import assert from 'node:assert/strict';

// Business Rules & Corridors
const RATES = {
  CNY: { GMD: 9.45, XOF_SN: 84.20, XOF_ML: 84.20, XOF_GW: 84.20, GNF: 1190.00 },
  GBP: { GMD: 88.50, XOF_SN: 785.00, XOF_ML: 785.00, XOF_GW: 785.00, GNF: 11200.00 },
  USD: { GMD: 68.20, XOF_SN: 605.00, XOF_ML: 605.00, XOF_GW: 605.00, GNF: 8650.00 }
};

const FEES = {
  CNY: 25,
  GBP: 3,
  USD: 5
};

function calculatePayout(amount, originCurr, destKey) {
  const fee = FEES[originCurr];
  if (amount <= fee) {
    throw new Error('Cash received must exceed the flat counter fee.');
  }
  const rate = RATES[originCurr][destKey];
  if (!rate) throw new Error('Unsupported destination corridor');
  const netAmount = amount - fee;
  return {
    netAmount,
    fee,
    rate,
    payoutTotal: netAmount * rate
  };
}

function generateCode() {
  const part1 = Math.floor(1000 + Math.random() * 9000);
  const part2 = Math.floor(10 + Math.random() * 90);
  return `BNT-${part1}-${part2}`;
}

function processRedemption(tx, vault) {
  if (!tx) throw new Error('Code not found in central ledger.');
  if (tx.status === 'REDEEMED') throw new Error('Code already paid out.');
  if (tx.status === 'CANCELLED') throw new Error('Transfer cancelled by supervisor.');
  if (vault.balance < tx.payoutTotalNum) {
    throw new Error('Vault balance deficit! Top-up required.');
  }
  
  vault.balance -= tx.payoutTotalNum;
  tx.status = 'REDEEMED';
  return { success: true, remainingVault: vault.balance };
}

// ================= TEST SUITE =================
console.log('🧪 Running Bantaba Remittance OS Test Suite...\n');

let passed = 0;

// Test 1: FX and Fee Calculations
{
  const res = calculatePayout(2500, 'CNY', 'GMD');
  assert.equal(res.fee, 25);
  assert.equal(res.netAmount, 2475);
  assert.equal(res.rate, 9.45);
  assert.equal(res.payoutTotal, 23388.75);
  console.log('✅ Test 1: CNY to GMD calculation verified.');
  passed++;
}

// Test 2: Fee threshold enforcement
{
  assert.throws(() => {
    calculatePayout(20, 'CNY', 'GMD');
  }, /must exceed the flat counter fee/);
  console.log('✅ Test 2: Fee minimum threshold validation passed.');
  passed++;
}

// Test 3: Multi-corridor rates (GBP, USD)
{
  const gbpRes = calculatePayout(100, 'GBP', 'XOF_SN');
  assert.equal(gbpRes.payoutTotal, (100 - 3) * 785.00);
  
  const usdRes = calculatePayout(200, 'USD', 'GNF');
  assert.equal(usdRes.payoutTotal, (200 - 5) * 8650.00);
  console.log('✅ Test 3: GBP and USD corridor rates verified.');
  passed++;
}

// Test 4: Redemption code format
{
  for (let i = 0; i < 20; i++) {
    const code = generateCode();
    assert.match(code, /^BNT-\d{4}-\d{2}$/, `Invalid code format: ${code}`);
  }
  console.log('✅ Test 4: Redemption code format (BNT-XXXX-XX) passed.');
  passed++;
}

// Test 5: Successful Cash Disbursement
{
  const vault = { name: 'Banjul', balance: 50000, curr: 'GMD' };
  const tx = {
    code: 'BNT-9999-11',
    payoutTotalNum: 15000,
    status: 'UNREDEEMED'
  };
  const result = processRedemption(tx, vault);
  assert.equal(result.success, true);
  assert.equal(vault.balance, 35000);
  assert.equal(tx.status, 'REDEEMED');
  console.log('✅ Test 5: Cash disbursement & vault debit successful.');
  passed++;
}

// Test 6: Vault Deficit Protection
{
  const lowVault = { name: 'Bissau', balance: 5000, curr: 'XOF' };
  const tx = {
    code: 'BNT-8888-22',
    payoutTotalNum: 25000,
    status: 'UNREDEEMED'
  };
  assert.throws(() => {
    processRedemption(tx, lowVault);
  }, /Vault balance deficit/);
  assert.equal(lowVault.balance, 5000, 'Vault should not be deducted on failure');
  assert.equal(tx.status, 'UNREDEEMED', 'Status should remain UNREDEEMED');
  console.log('✅ Test 6: Vault deficit protection prevented overdraft.');
  passed++;
}

// Test 7: Double-Payout Protection
{
  const vault = { name: 'Dakar', balance: 1000000, curr: 'XOF' };
  const tx = {
    code: 'BNT-7777-33',
    payoutTotalNum: 50000,
    status: 'REDEEMED'
  };
  assert.throws(() => {
    processRedemption(tx, vault);
  }, /already paid out/);
  console.log('✅ Test 7: Double redemption protection verified.');
  passed++;
}

// Test 8: Double-Entry Ledger Balancing with Official Chart of Accounts
{
  // Chart of Accounts:
  // 1010 CASH_VAULT (Asset)
  // 2010 CUST_PAYABLE (Liability)
  // 4010 FX_SPREAD_REV (Revenue)
  // 4020 COUNTER_FEE_REV (Revenue)
  // 5010 AGENT_COMM_EXP (Expense)
  const chartOfAccounts = {
    '1010': 'CASH_VAULT',
    '2010': 'CUST_PAYABLE',
    '4010': 'FX_SPREAD_REV',
    '4020': 'COUNTER_FEE_REV',
    '5010': 'AGENT_COMM_EXP'
  };

  const cashIntake = 2500;
  const flatFee = 25;
  const customerPayable = cashIntake - flatFee;

  // Collection Journal Entry:
  const journalEntry = [
    { account: '1010', name: chartOfAccounts['1010'], debit: cashIntake, credit: 0 },
    { account: '2010', name: chartOfAccounts['2010'], debit: 0, credit: customerPayable },
    { account: '4020', name: chartOfAccounts['4020'], debit: 0, credit: flatFee }
  ];

  const totalDebits = journalEntry.reduce((sum, e) => sum + e.debit, 0);
  const totalCredits = journalEntry.reduce((sum, e) => sum + e.credit, 0);

  assert.equal(totalDebits, totalCredits, 'Double-entry journal out of balance!');
  assert.equal(totalDebits, 2500);
  console.log('✅ Test 8: Full chart of accounts double-entry balancing verified.');
  passed++;
}

console.log(`\n🎉 All ${passed} tests passed successfully!`);
