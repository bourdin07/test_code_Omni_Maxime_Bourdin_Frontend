# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Info

- To build the form I used "Formik", because it's very easy to check inputs dans validates data with "Yup".
- Every field present in the Form are mandatory, if the field doesn't meet requirement an error message is displayed.
- The extra fields are displayed according the country, and managed with useState(true) or useState(false)
  - for instance if the country selected is "BR" for Brazil
  - I update the state `isShownExtraFieldWorkingHours` with `setIsShownExtraFieldWorkingHours(true)` otherwise `setIsShownExtraFieldWorkingHours(false)`
- To check the number of Holiday Allowance, I implemented inside onChange.

If the form is valid, I displayed the values of the Form in the console.

I didn't have time to make a lot of test
