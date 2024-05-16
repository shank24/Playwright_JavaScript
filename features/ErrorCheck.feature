Feature: Ecommerce Validation

    @Validations
    Scenario Outline: Verifying Error Message
        Given When I login to the Ecommerce2 application with "<Username>" and "<Password>"
        Then Verify Error message is diplayed

        Examples:
            | Username          | Password    |
            | anshika@gmail.com | Iamking@000 |
            | abc@gmail.com | Iamking@000 |