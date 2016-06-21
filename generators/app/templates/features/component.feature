Feature: <%= appname %> management
  In order to set <%= appname %> configs
  As a user
  I want to submit config data

  Scenario: User sees config information at the first time
    Given a user
    When user sees this component at the first time
    Then show config information to user

  Scenario: User submit config setting
    Given a user
    When user updates config
    Then user submit updated config data
