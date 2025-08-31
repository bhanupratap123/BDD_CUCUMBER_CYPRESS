Feature: Verify Dashboard of Open Cart Page
    As a user, I want to verify the functionality of the Open Cart Dashboard page

Scenario Outline: As a user, I should be able to see the correct title on the open cart page
  Given I open the dashboard page with username "<username>" and password "<password>"
  Then I should see the title "Swag Labs"
  Examples:
    | username      | password     |
    | standard_user | secret_sauce |

  Scenario Outline: As a user, I should be able to see the profile menu on the dashboard page
    Given I open the dashboard page with username "<username>" and password "<password>"
    When I should see the profile menu and click on it
    Then I should see the menu options:
      |  options         |
      | All Items        |
      | About            |
      | Logout           |
      | Reset App State  |
    Then I log out from the application
    Examples:
      | username      | password     |
      | standard_user | secret_sauce |

  Scenario Outline: As a user, I should be able to add multiple items to the cart
    Given I open the dashboard page with username "<username>" and password "<password>"
    When I add the following items to the cart:
      | Sauce Labs Backpack  |
      | Sauce Labs Bike Light|
      | Sauce Labs Bolt T-Shirt|
    Then I should see "3" items in the cart
    When I should see the profile menu and click on it
    Then I log out from the application
    Examples:
      | username      | password     |
      | standard_user | secret_sauce |
