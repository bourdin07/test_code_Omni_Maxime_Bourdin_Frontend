## Info

The project use React and use TypeScript.
`npx create-react-app frontend --template typescript`

- To build the form I used "Formik", and validates data with "Yup".
- Every field present in the Form are mandatory, if the field doesn't meet requirement an error message is displayed.
- The extra fields are displayed according the country, and managed with useState(true) or useState(false)
  - for instance if the country selected is "BR" for Brazil
  - I update the state `isShownExtraFieldWorkingHours` with `setIsShownExtraFieldWorkingHours(true)` otherwise `setIsShownExtraFieldWorkingHours(false)`
- To check the number of Holiday Allowance, I implemented inside onChange.

If the form is valid, I displayed the values of the Form in the console.

I didn't have time to make a lot of test

## NPM packages used

- Formik
- Yup
- Bootstrap
- Bootstrap for React
