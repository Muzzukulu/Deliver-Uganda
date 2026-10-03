// payments.ts - PLACEHOLDER FOR MERCHANT CODES
// You will get these codes from MTN / Airtel after business registration

export const MERCHANT_CODES = {
  // --- MTN MoMo ---
  MTN: {
    PLATFORM: "REPLACE_WITH_MTN_PLATFORM_CODE", // Deliver Uganda main - gets 15%
    // Transporters will have their own codes saved in DB, not here
    // Example: transporter.mtnMerchantCode = "MTN_12345"
  },
  // --- Airtel Money ---
  AIRTEL: {
    PLATFORM: "REPLACE_WITH_AIRTEL_PLATFORM_CODE", // Deliver Uganda main
  },
  // --- Future: Flutterwave / Pesapal for cards ---
  FLUTTERWAVE: {
    PLATFORM: "REPLACE_WITH_FLW_CODE",
  }
};

// HOW SPLIT WILL WORK ONCE CODES ARE READY
export const SPLIT_RULES = {
  transporter: 80, // %
  platform: 15,    // %
  fees: 5         // % for telecom charges
};

// This is where money will auto-split later
export const calculateSplit = (total: number) => {
  return {
    transporterAmount: Math.round(total * SPLIT_RULES.transporter / 100),
    platformAmount: Math.round(total * SPLIT_RULES.platform / 100),
    feesAmount: Math.round(total * SPLIT_RULES.fees / 100),
    total
  };
};