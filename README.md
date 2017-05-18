# future-glam-backend



#### Models

USER
|-firstName: String (non-null)
|-lastName: String (non-null)
|-username: String (non-null)
|-email: String (unique / non-null)
|-password: String
|-avatar: String
|-clients: [array of email addresses]
|-isArtist: Boolean

LIST
|-occasion: String
|-listItems (array of objects)

List Items Object Detail
|-product name
|-affiliateLink (Amazon & Sephora)
|-price
|-instructions

#### Supported Features

- [x] Express
- [x] Eslint
- [x] Babel
- [x] Webpack
- [x] Mocha & Chai(unit testing)
- [x] Travis Cl(continuous integration)
- [x] Mock API
- [x] Automated build script
