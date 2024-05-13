Feature: Ecommerce Validation

    Scenario: Placing The Order
        Given When I login to the Ecommerce application with "username" and "password"
        When I add product "ZARA COAT 3"
        Then I verify "ZARA COAT 3" is displayed succesfully
        When Enter valid details and placed the order
        Then I verify the order is present in the order history
        