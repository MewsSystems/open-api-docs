# Availability blocks

Availability blocks are fixed sets of inventory set aside from public availability for private groups such as wedding parties, travel agencies or corporate clients. If you have access to these private blocks, you can use them in the API. To use an availability block, you will need to obtain its `availabilityBlockId`.

## How to obtain availability block ID

You can obtain a unique availability block ID from the Availability Blocks screen in __Mews Operations__, under 'Booking engine link'. Multiple IDs can be created, in case you have multiple booking engine instances.

> Note: This functionality requires the property to have an *Enterprise subscription*.

## How to work with availability blocks

Use [Get availability blocks](../operations/availability-blocks.md#get-availability-blocks) to fetch details about your availability block. Check that the current date is between `StartUtc` and `EndUtc` to see if the availability block is valid, or the block has expired. Then you can supply `availabilityBlockId` into all the API operations that accept it (see below). To get the appropriate rate, filter [Rates](../operations/hotels.md#rate) with the `rateId` from the fetched availability block details. Only this rate should be available and bookable for this booking engine session.

### Endpoints accepting availability block ID

- [Get availability](../operations/hotels.md#get-availability)
- [Get reservations pricing](../operations/reservations.md#get-reservations-pricing)
- [Create reservation group](../operations/reservation-groups.md#create-reservation-group)

## Further information

For more information about availability blocks, the following guide may be helpful. You can also use the Search function to find other suitable content in the Mews Help system.

- [Creating availability blocks](https://help.mews.com/s/article/Creating-availability-blocks-in-Mews?language=en_US)
