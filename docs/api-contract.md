# API for SafeWheels

## Endpoints

### 1. Get Car Listings
**Endpoint:** `GET /api/cars`  
**Description:** Retrieve a list of available cars.  
**Request:**
```json
{
  "filters": {
    "priceRange": [min, max],
    "location": "string",
    "brand": "string"
  }
}
