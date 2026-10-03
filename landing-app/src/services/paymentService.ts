import { MERCHANT_CODES, calculateSplit } from "../config/payments";

// FIXED - getUSSD inside here now, not imported
const getUSSD = {
  mtn: (amount: number, phoneOrCode?: string) => {
    const merchant = phoneOrCode || MERCHANT_CODES.MTN.PLATFORM_NUMBER;
    return `*165*3*1*${merchant}*${amount}%23`;
  },
  airtel: (amount: number, phoneOrCode?: string) => {
    const merchant = phoneOrCode || MERCHANT_CODES.AIRTEL.PLATFORM_NUMBER;
    return `*185*3*1*${merchant}*${amount}%23`;
  }
};

export const paymentService = {
  payOrder: (totalAmount: number, method: 'MTN' | 'AIRTEL') => {
    const split = calculateSplit(totalAmount);
    const ussd = method === 'MTN' ? getUSSD.mtn(totalAmount) : getUSSD.airtel(totalAmount);
    
    console.log(`Transporter 80%: ${split.transporterAmount}`);
    console.log(`Platform 15%: ${split.platformAmount}`);
    console.log(`USSD: ${ussd}`);
    
    window.location.href = `tel:${ussd}`;
    return split;
  },

  disburseFunds: async (orderId: string, totalAmount: number) => {
    const split = calculateSplit(totalAmount);
    if (!split.isReadyForAutoSplit) {
      return { status: "manual", message: "Manual MoMo for now", split };
    }
    return { status: "auto", message: "Auto-disbursed", split };
  }
};