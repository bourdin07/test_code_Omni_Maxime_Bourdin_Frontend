import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Row, Button, Form as FormBS } from "react-bootstrap";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";

const MyForm = ({ }) => {
  const [isShownExtraFieldMaritalStatus, setIsShownExtraFieldMaritalStatus] = useState(false);
  const [isShownExtraFieldSocialInsuranceNumber, setIsShownExtraFieldSocialInsuranceNumber] = useState(false);
  const [isShownExtraFieldNumberChildren, setIsShownExtraFieldNumberChildren] = useState(false);
  const [isShownExtraFieldWorkingHours, setIsShownExtraFieldWorkingHours] = useState(false);

  const [minimumAllowance, setMinimumAllowance] = useState(0);
  const [maximumAllowance, setMaximumAllowance] = useState(99999999);

  const [fieldRequiredMaritalStatus, setFieldRequiredMaritalStatus] = useState(Yup.string());
  const [fieldRequiredSocialInsuranceNumber, setFieldRequiredSocialInsuranceNumber] = useState(Yup.string());
  const [fieldRequiredNumberChildren, setFieldRequiredNumberChildren] = useState(Yup.number());
  const [fieldRequiredWorkingHours, setFieldRequiredWorkingHours] = useState(Yup.number());

  const listCountryOfWork = [
    { label: "Brazil", value: "BR" },
    { label: "France", value: "FR" },
    { label: "Ghana ", value: "GH" },
    { label: "Spain", value: "SP" },
    { label: "United Kingdom", value: "UK" },
    { label: "United States", value: "US" },
  ];

  const listMaritalStatus = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
  ]

  return (
    <Formik
      // Initiales values
      initialValues={{
        countryOfWork: "BR",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        holidayAllowance: 0,

        maritalStatus: "single",
        socialInsuranceNumber: "",
        numberChildren: 0,
        workingHours: 0,
      }}

      // Checks fields
      validationSchema={() => Yup.object().shape({
        countryOfWork: Yup.string().required("Please select the country of work"),
        firstName: Yup.string().required("Please type your first name"),
        lastName: Yup.string().required("Please type your last name"),
        dateOfBirth: Yup.date().required("Please select your date of birth"),
        holidayAllowance: Yup.number()
          .min(minimumAllowance, `Minimum allowance is ${minimumAllowance} days`)
          .max(maximumAllowance, `Maximum allowance is ${maximumAllowance} days`)
          .required(""),

        maritalStatus: fieldRequiredMaritalStatus,
        socialInsuranceNumber: fieldRequiredSocialInsuranceNumber,
        numberChildren: fieldRequiredNumberChildren,
        workingHours: fieldRequiredWorkingHours,
      })}

      // Submitting
      onSubmit={async (values, actions) => {
        // Console log the values
        console.log(values);
      }}
    >
      {({ errors, touched, values, handleSubmit, handleChange, setFieldValue, setTouched, setFieldTouched, validateForm }) => (
        <Form>
          <Row>
            <FormBS.Group className="mb-3" controlId="countryOfWork">
              <FormBS.Label>Country of work</FormBS.Label>
              <FormBS.Control
                data-testid={"select-countryOfWork"}
                name="countryOfWork"
                as="select"
                onChange={(e: any) => {
                  let value: string = e.target.value;
                  // console.log(e.target.value);

                  setMinimumAllowance(0);
                  setMaximumAllowance(99999);

                  if (value === "SP") {
                    setMinimumAllowance(30);
                  }

                  if (value === "BR") {
                    setMaximumAllowance(40);
                  }

                  if (value === "SP" || value === "GH") {
                    setIsShownExtraFieldMaritalStatus(true);
                    setFieldRequiredMaritalStatus(Yup.string().required("Please select marital status"))
                  } else {
                    setIsShownExtraFieldMaritalStatus(false);
                    setFieldRequiredMaritalStatus(Yup.string());
                  }

                  if (value === "SP") {
                    setIsShownExtraFieldSocialInsuranceNumber(true);
                    setFieldRequiredSocialInsuranceNumber(Yup.string().required("Please type your social insurance number"));
                  } else {
                    setIsShownExtraFieldSocialInsuranceNumber(false);
                    setFieldRequiredSocialInsuranceNumber(Yup.string());
                  }

                  if (value === "GH") {
                    setIsShownExtraFieldNumberChildren(true);
                    setFieldRequiredNumberChildren(Yup.number().required("Please type the number of children"));
                  } else {
                    setIsShownExtraFieldNumberChildren(false);
                    setFieldRequiredNumberChildren(Yup.number());
                  }

                  if (value === "BR") {
                    setIsShownExtraFieldWorkingHours(true);
                    setFieldRequiredWorkingHours(Yup.number().required("Please type the number of working hours"));
                  } else {
                    setIsShownExtraFieldWorkingHours(false);
                    setFieldRequiredWorkingHours(Yup.number());
                  }

                  setFieldValue("countryOfWork", e.target.value);
                }}
                value={values.countryOfWork}
              >
                {listCountryOfWork.map((option: { value: string, label: string }, index) => {
                  return (
                    <option
                      key={`option-${index}`}
                      value={option.value}
                      data-testid="select-option-countryOfWork"
                    >
                      {option.label || option.value}
                    </option>
                  );
                })}
              </FormBS.Control>
              <FormBS.Control.Feedback type="invalid">
                <ErrorMessage data-testid="countryOfWorkError" name="countryOfWork" component="div" />
              </FormBS.Control.Feedback>
            </FormBS.Group>
          </Row>

          <Row>
            <Col>
              <FormBS.Group className="mb-3" controlId="firstName">
                <FormBS.Label>Firstname</FormBS.Label>
                <FormBS.Control
                  name="firstName"
                  type="text"
                  placeholder="Your first name..."
                  onChange={(e: any) => {
                    // console.log(e.target.value);
                    setFieldValue("firstName", e.target.value);
                  }}
                  value={values.firstName}
                  isInvalid={touched.firstName && !!errors.firstName}
                />
                <FormBS.Control.Feedback type="invalid">
                  <ErrorMessage data-testid="firstNameError" name="firstName" component="div" />
                </FormBS.Control.Feedback>
              </FormBS.Group>
            </Col>
            <Col>
              <FormBS.Group className="mb-3" controlId="lastName">
                <FormBS.Label>Last name</FormBS.Label>
                <FormBS.Control
                  name="lastName"
                  type="text"
                  placeholder="Your last name..."
                  onChange={(e: any) => {
                    // console.log(e.target.value);
                    setFieldValue("lastName", e.target.value);
                  }}
                  value={values.lastName}
                  isInvalid={touched.lastName && !!errors.lastName}
                />
                <FormBS.Control.Feedback type="invalid">
                  <ErrorMessage data-testid="lastNameError" name="lastName" component="div" />
                </FormBS.Control.Feedback>
              </FormBS.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormBS.Group className="mb-3" controlId="dateOfBirth">
                <FormBS.Label>Date Of Birth</FormBS.Label>
                <FormBS.Control
                  name="dateOfBirth"
                  type="date"
                  onChange={(e: any) => {
                    // console.log(e.target.value);
                    setFieldValue("dateOfBirth", e.target.value);
                  }}
                  value={values.dateOfBirth}
                  isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                />
                <FormBS.Control.Feedback type="invalid">
                  <ErrorMessage data-testid="dateOfBirthError" name="dateOfBirth" component="div" />
                </FormBS.Control.Feedback>
              </FormBS.Group>
            </Col>
            <Col>
              <FormBS.Group className="mb-3" controlId="holidayAllowance">
                <FormBS.Label>Holiday Allowance</FormBS.Label>
                <FormBS.Control
                  name="holidayAllowance"
                  min={0}
                  max={maximumAllowance}
                  type="number"
                  onChange={async (e: any) => {
                    let value: string = await e.target.value;
                    // console.log(e.target.value);

                    setFieldValue("holidayAllowance", value);
                    setFieldTouched("holidayAllowance", true, true);
                  }}
                  value={values.holidayAllowance}
                  isInvalid={touched.holidayAllowance && !!errors.holidayAllowance}
                />
                <FormBS.Control.Feedback type="invalid">
                  <ErrorMessage data-testid="holidayAllowanceError" name="holidayAllowance" component="div" />
                </FormBS.Control.Feedback>
              </FormBS.Group>
            </Col>
          </Row>

          {isShownExtraFieldMaritalStatus &&
            <Row>
              <Col>
                <FormBS.Group className="mb-3" controlId="maritalStatus">
                  <FormBS.Label data-testid="label-maritalStatus">Marital Status</FormBS.Label>
                  <FormBS.Control
                    name="maritalStatus"
                    as="select"
                    onChange={(e: any) => {
                      // console.log(e.target.value);
                      setFieldValue("maritalStatus", e.target.value);
                    }}
                    value={values.maritalStatus}
                  >
                    {listMaritalStatus.map((option: { value: string, label: string }, index) => {
                      return (
                        <option
                          key={`option-${index}`}
                          value={option.value}>
                          {option.label || option.value}
                        </option>
                      );
                    })}
                  </FormBS.Control>
                  <FormBS.Control.Feedback type="invalid">
                    <ErrorMessage data-testid="maritalStatusError" name="maritalStatus" component="div" />
                  </FormBS.Control.Feedback>
                </FormBS.Group>
              </Col>
            </Row>
          }

          {isShownExtraFieldSocialInsuranceNumber &&
            <Row>
              <Col>
                <FormBS.Group className="mb-3" controlId="socialInsuranceNumber">
                  <FormBS.Label>Social Insurance Number</FormBS.Label>
                  <FormBS.Control
                    name="socialInsuranceNumber"
                    type="text"
                    placeholder="Your social insurance number..."
                    onChange={(e: any) => {
                      // console.log(e.target.value);
                      setFieldValue("socialInsuranceNumber", e.target.value);
                    }}
                    value={values.socialInsuranceNumber}
                    isInvalid={touched.socialInsuranceNumber && !!errors.socialInsuranceNumber}
                  />
                  <FormBS.Control.Feedback type="invalid">
                    <ErrorMessage data-testid="socialInsuranceNumberError" name="socialInsuranceNumber" component="div" />
                  </FormBS.Control.Feedback>
                </FormBS.Group>
              </Col>
            </Row>
          }

          {isShownExtraFieldNumberChildren &&
            <Row>
              <Col>
                <FormBS.Group className="mb-3" controlId="numberChildren">
                  <FormBS.Label>Number of Children</FormBS.Label>
                  <FormBS.Control
                    name="numberChildren"
                    min={0}
                    type="number"
                    onChange={(e: any) => {
                      // console.log(e.target.value);
                      setFieldValue("numberChildren", e.target.value);
                    }}
                    value={values.numberChildren}
                    isInvalid={touched.numberChildren && !!errors.numberChildren}
                  />
                  <FormBS.Control.Feedback type="invalid">
                    <ErrorMessage data-testid="numberChildrenError" name="numberChildren" component="div" />
                  </FormBS.Control.Feedback>
                </FormBS.Group>
              </Col>
            </Row>
          }

          {isShownExtraFieldWorkingHours &&
            <Row>
              <Col>
                <FormBS.Group className="mb-3" controlId="workingHours">
                  <FormBS.Label>Working Hours</FormBS.Label>
                  <FormBS.Control
                    name="workingHours"
                    min={1}
                    type="number"
                    onChange={(e: any) => {
                      // console.log(e.target.value);
                      setFieldValue("workingHours", e.target.value);
                    }}
                    value={values.workingHours}
                    isInvalid={touched.workingHours && !!errors.workingHours}
                  />
                  <FormBS.Control.Feedback type="invalid">
                    <ErrorMessage data-testid="workingHoursError" name="workingHours" component="div" />
                  </FormBS.Control.Feedback>
                </FormBS.Group>
              </Col>
            </Row>

          }

          <Row>
            <Col>
              <button
                type="submit"
                className="outline-info"
              >Submit</button>
            </Col>
          </Row>


        </Form>
      )}
    </Formik>
  )
}

export default MyForm;
