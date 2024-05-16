Feature: Ecommerce Validation

    @Regression
    Scenario Outline: Placing The Order
        Given When I login to the Ecommerce application with "<Username>" and "<Password>"
        When I add product "<Product>"
        Then I verify "<Product>" is displayed succesfully for "<Country>"
        When Enter valid details "<Username>" and placed the order
        Then I verify the order is present in the order history for "<Username>"

        Examples:
            | Username          | Password    | Product     | Country |
            | anshika@gmail.com | Iamking@000 | ZARA COAT 3 | Canada  |
            | anshika@gmail.com | Iamking@000 | ZARA COAT 4 | Canada  |