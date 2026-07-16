/**
 * Firestore schema (Lakdi Ki Taal)
 *
 * users/{uid}
 *   role: customer | vendor
 *   name, email, phone, createdAt, updatedAt
 *   addresses/{addressId}: label, line1, landmark?, city, state, pincode, isDefault, createdAt
 *
 * vendors/{vendorId}  (vendorId === ownerUid for onboarded vendors)
 *   ownerUid, ownerName, phone, email, businessName, shopType,
 *   businessAddress, city, state, pincode, woodTypes[], dailyStockCapacity, experience,
 *   status: pending | verified | rejected | suspended,
 *   pricePerQuintal, deliveryCharge, deliveryTime, vehicleType, payment, area,
 *   rating, reviews, verified, recommended, iconType, stock, distance, save,
 *   documents: { shopPhoto, gst?, addressProof, identityProof },
 *   location: { lat?, lng?, label? }, createdAt, updatedAt
 *
 * woodTypes/{key}: key, label, sortOrder, active
 *
 * orders/{orderId}
 *   customerUid, status: requested|quoted|confirmed|delivered|completed|cancelled
 *   woodTypes[{key,label}], quantity, unit, purpose, deliveryPreference, deliveryDate?,
 *   notes, address, contact, selectedVendorId?, selectedQuoteId?,
 *   paymentMethod, subtotal, deliveryCharge, loadingCharges, platformFee, grandTotal,
 *   createdAt, updatedAt, placedAt?
 *
 * quotes/{quoteId}
 *   orderId, vendorId, vendorName, status: pending|accepted|rejected|expired,
 *   pricePerQuintal, deliveryCharge, total, deliveryTime, distance?, rating?, area?,
 *   recommended?, stock, vehicleType, payment, save, iconType, verified, createdAt
 *
 * Storage: vendors/{uid}/shopPhoto|gst|addressProof|identityProof
 */
export {}
