// type ShippingParameters = {
//   distance: number; // Distance from the distribution point
//   weight: number; // Weight of the item
//   itemCount: number;
// };

// TODO: Utilize a 'determine distance' function which accepts the current user's location, determined from their cookie, using some geolocation api, to the center of Cape Town

export default function calculateShippingCost() {
  const baseCost = 2; // Sativa base cost
  // const distanceFactor = params.distance > 100 ? 1.2 : 1; // distance factor
  // const weightFactor = params.weight > 10 ? 1.5 : 1; // weight factor

  const shippingCost = baseCost;

  return shippingCost;
}
