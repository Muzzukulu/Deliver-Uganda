import { canSeeOrder } from "../utils/coverage";

export function filterNearbyOrders(allOrders, myTransporter) {
  return allOrders.filter(order => {
    const isNearby = canSeeOrder(myTransporter, { lat: order.lat, lng: order.lng }, 5);
    return isNearby; // beyond = never sees
  });
}