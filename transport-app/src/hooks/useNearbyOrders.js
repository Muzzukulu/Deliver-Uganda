import { canSeeOrder } from "../utils/coverage";

export function filterNearbyOrders(allOrders, myRider) {
  return allOrders.filter(order => {
    const isNearby = canSeeOrder(myRider, { lat: order.lat, lng: order.lng }, 5);
    return isNearby; // beyond = never sees
  });
}