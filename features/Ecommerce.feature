Feature: Ecommerce Validation

    @Regression
    Scenario: Placing The Order
        Given When I login to the Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When I add product "ZARA COAT 3"
        Then I verify "ZARA COAT 3" is displayed succesfully for "Canada"
        When Enter valid details "anshika@gmail.com" and placed the order
        Then I verify the order is present in the order history for "anshika@gmail.com"
        