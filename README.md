# Product Documentation

This document contains **user, subcategory, and product information**.

---

## User Information

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "ADMIN"
}
category

{
  "name": "name hear"
}
Subcategory Information
json
Copy code
{
  "name": "Fruits Section",
  "parentId": "d588ac37-afa9-4ac7-8cef-6b7aa4e1ccc3"
}
Product Information
json
Copy code
{
  "name": "Whey Protein 1kg",
  "basePrice": 50.0,
  "salePrice": 45.0,
  "isActive": true,
  "description": "Premium muscle recovery protein.",
  "ingredients": "Whey, Lecithin, Cocoa",
  "nutritionInfo": {
    "calories": 120,
    "protein": 24,
    "carbs": 3,
    "fat": 1
  },
  "brand": "FitLife",
  "expiryDays": 365,
  "categoryId": "a9ef56c8-ad9f-439a-b284-3c1e3e36c2c6",
  "images": [
    {
      "url": "https://example.com/whey1.jpg",
      "isMain": true
    }
  ],
  "variants": [
    {
      "sku": "WHEY-CHOC-1",
      "price": 45.0,
      "stock": 100,
      "isDefault": true,
      "attributes": [
        {
          "attribute": "Flavor",
          "value": "Chocolate"
        },
        {
          "attribute": "Size",
          "value": "1kg"
        }
      ]
    }
  ]
}