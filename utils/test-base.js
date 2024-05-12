const base = require("@playwright/test");

exports.customTestFixture =  base.test.extend(
    {
        testDataOrder:
        {
            email: "creativestrikers@gmail.com",
            password: "Abcd@1234",
            productName: "ZARA COAT 3",
            countryName: "Can"

        }
    }

)