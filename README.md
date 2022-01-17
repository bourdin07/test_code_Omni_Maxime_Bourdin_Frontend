## Info

The project uses React 17.0.2 and written in TypeScript 4.5.4.
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

- Formik `^2.2.9`
- Yup `^0.32.11`
- Bootstrap `^5.1.3` 
- Bootstrap for React `^2.1.1`
