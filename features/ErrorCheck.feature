Feature: Ecommerce Validation

@Validations
    Scenario: Placing The Order
        Given When I login to the Ecommerce2 application with "anshika@gmail.com" and "Iamking@000"
        Then Verify Error message is diplayed