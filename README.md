# Car Info App Backend

Node.js Express server with a GraphQL API which uses MongoDB.
Provides user login/register, fetching and posting car models with various info, as well as pictures and reviews.

## Example queries/mutations

### Register

Provide username, nickname and password in the variables.

```
mutation Mutation($username: String!, $nickname: String!, $password: String!) {
  registerUser(username: $username, nickname: $nickname, password: $password) {
    id
    username
    nickname
    token
  }
}
```

### Login

Provide the created credentials (username and password) in the variables. An authentication token will be returned.

```
query Query($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    username
    nickname
    token
  }
}
```

### Get all cars

```
query Query {
  getAllCars {
    id
    fullModelName {
      id
      name
    }
    brand {
      id
      name
    }
    model
    year
    bodyStyles
    numbersOfDoors
    drivetrains
    variants {
      id
      fuelType
      engineDisplacement
      transmission
      powerHp
      acceleration0_100KmhS
      fuelConsumptionL100Km
      co2EmissionsGkm
    }
    defaultImageFilename
  }
}
```

### Get all brands

```
query Query {
  getAllBrands {
    id
    name
  }
}
```

### Get a car by its ID

Provide a car ID in the variables.

```
query Query($getCarByIdId: ID!) {
  getCarById(id: $getCarByIdId) {
    id
    fullModelName {
      id
      name
    }
    brand {
      id
      name
    }
    model
    year
    bodyStyles
    numbersOfDoors
    drivetrains
    variants {
      id
      fuelType
      engineDisplacement
      transmission
      powerHp
      acceleration0_100KmhS
      fuelConsumptionL100Km
      co2EmissionsGkm
    }
    defaultImageFilename
  }
}
```

### Get all reviews by car ID

Provide a car ID in the variables.

```
query Query($car: ID!) {
  getAllReviewsByCarId(car: $car) {
    id
    car {
      id
    }
    user {
      id
      nickname
    }
    text
  }
}
```

### Get all pictures

```
query Query {
  getAllPictures {
    id
    car {
      id
    }
    user {
      id
      nickname
    }
    imageFilename
    text
  }
}
```

### Add a car

Provide at least brand, model and year in the variables.
Requires authentication token.

```
mutation Mutation($brand: String!, $model: String!, $year: Int!, $bodyStyles: [String], $numbersOfDoors: [Int], $drivetrains: [String], $variants: [VariantInput], $defaultImageFilename: String) {
  addCar(brand: $brand, model: $model, year: $year, bodyStyles: $bodyStyles, numbersOfDoors: $numbersOfDoors, drivetrains: $drivetrains, variants: $variants, defaultImageFilename: $defaultImageFilename) {
    id
    fullModelName {
      id
      name
    }
    brand {
      id
      name
    }
    model
    year
    bodyStyles
    numbersOfDoors
    drivetrains
    variants {
      id
      fuelType
      engineDisplacement
      transmission
      powerHp
      acceleration0_100KmhS
      fuelConsumptionL100Km
      co2EmissionsGkm
    }
    defaultImageFilename
  }
}
```

### Modify a car

Provide car ID and any properties you want to modify in the variables.
Requires authentication token.

```
mutation Mutation($modifyCarId: ID, $brand: String, $model: String, $year: Int, $bodyStyles: [String], $numbersOfDoors: [Int], $drivetrains: [String], $variants: [VariantInput], $defaultImageFilename: String) {
  modifyCar(id: $modifyCarId, brand: $brand, model: $model, year: $year, bodyStyles: $bodyStyles, numbersOfDoors: $numbersOfDoors, drivetrains: $drivetrains, variants: $variants, defaultImageFilename: $defaultImageFilename) {
    id
    fullModelName {
      id
      name
    }
    brand {
      id
      name
    }
    model
    year
    bodyStyles
    numbersOfDoors
    drivetrains
    variants {
      id
      fuelType
      engineDisplacement
      transmission
      powerHp
      acceleration0_100KmhS
      fuelConsumptionL100Km
      co2EmissionsGkm
    }
    defaultImageFilename
  }
}
```

### Add a review

Provide car ID and text in the variables.
Requires authentication token.

```
mutation Mutation($car: ID!, $text: String!) {
  addReview(car: $car, text: $text) {
    id
    car {
      id
    }
    user {
      id
      nickname
    }
    text
  }
}
```

### Add a picture

Provide car ID, image filename and text in the variables.
Requires authentication token.

```
mutation Mutation($car: ID!, $imageFilename: String!, $text: String) {
  addPicture(car: $car, imageFilename: $imageFilename, text: $text) {
    id
    car {
      id
    }
    user {
      id
      nickname
    }
    imageFilename
    text
  }
}
```

### Add a like

Provide picture ID in the variables.
Requires authentication token.

```
mutation Mutation($picture: ID!) {
  addLike(picture: $picture) {
    id
    picture {
      id
      car {
        id
      }
      user {
        id
        nickname
      }
      imageFilename
      text
    }
  }
}
```

### Delete a review

Provide review ID in the variables.
Requires authentication token.

```
mutation Mutation($deleteMyReviewId: ID!) {
  deleteMyReview(id: $deleteMyReviewId) {
    id
  }
}
```

### Delete a picture

Provide picture ID in the variables.
Requires authentication token.

```
mutation Mutation($deleteMyPictureId: ID!) {
  deleteMyPicture(id: $deleteMyPictureId) {
    id
  }
}
```

### Delete a like

Provide picture ID in the variables.
Requires authentication token.

```
mutation Mutation($picture: ID!) {
  deleteMyLike(picture: $picture) {
    id
    picture {
      id
      car {
        id
      }
      user {
        id
        nickname
      }
      imageFilename
      text
    }
  }
}
```
