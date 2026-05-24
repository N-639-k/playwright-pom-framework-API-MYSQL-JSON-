Feature: Login Feature

    Scenario: Successful Login

        Given User launches application

        When User enters valid username and password

        Then User should login successfully

    Scenario: Account creation with API and DB validation

        Given User has account creation data

        When User creates an account using the API

        Then The account should exist in the database