# API Operations

This section describes all operations supported by the API, organised by theme.

## Availability

| <div style="width:200px">Operation or Endpoint</div> | Description |
| :-- | :-- |
| [Get availability](hotels.md#get-availability) | Get availability and pricing options for the specified hotel for the specified date interval |
| [Get availability blocks](availability-blocks.md#get-availability-blocks) | Get details of the availability blocks for the given hotel. |

## Configuration

| <div style="width:200px">Operation or Endpoint</div> | Description |
| :-- | :-- |
| [Get configuration](configuration.md#get-configuration) | Get configuration data for the specified booking engine instances; this operation can be called initially to fetch data which may be important during the booking workflow |
| [Get hotels](hotels.md#get-hotels) | Get hotels data for a single specified hotel; this operation can be called initially to fetch data which may be important during the booking workflow |
| [Get payment configuration](hotels.md#get-payment-configuration) | Fetch payment configuration parameters for the specified hotel |

## Payment cards

| <div style="width:200px">Operation or Endpoint</div> | Description |
| :-- | :-- |
| [Get payment cards](payment-cards.md#get-payment-cards) | Fetch details about the listed payment cards, in particular the Authorization state |
| [Authorize payment card](payment-cards.md#authorize-payment-card) | Request authorization of the specified payment card |

## Reservations

| <div style="width:200px">Operation or Endpoint</div> | Description |
| :-- | :-- |
| [Get reservations pricing](reservations.md#get-reservations-pricing) | Get a price quotation for a specific hotel, date interval, room category and person count |
| [Get reservation price](reservations.md#get-reservation-price) | Get final price of the specified reservations |
| [Create reservation group](reservation-groups.md#create-reservation-group) | Create a group of one or more reservations, i.e. make a reservation |
| [Get reservation group](reservation-groups.md#get-reservation-group) | Fetch details of the specified reservation group |


## Services

| <div style="width:200px">Operation or Endpoint</div> | Description |
| :-- | :-- |
| [Get services availability](services.md#get-services-availability) | Get availability for the specified service for each time unit in the specified date interval |
| [Get services pricing](services.md#get-services-pricing) |Get pricing for the specified service for each time unit in the specified date interval |

## Vouchers

| <div style="width:200px">Operation or Endpoint</div> | Description |
| :-- | :-- |
| [Validate voucher](vouchers.md#validate-voucher) | Determine if the specified voucher code is valid or not |
