import React, { createContext, useState } from "react";
export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
  const [shipmentAlternatives, setShipmentAlternatives] = useState([]);

  const [validationInputs, setValidationInputs] = useState({
    address: {
      value: "",
      error: false,
    },
    zipcode: {
      value: "",
      error: false,
    },
    city: {
      value: "",
      error: false,
    },
    phoneNr: {
      value: "",
      error: false,
    },
    choosenShipment: {
      value: "DHL",
      error: false,
    },
  });

  const getShipmentCost = () => {
    const shipment = shipmentAlternatives.filter((currentShipment) => {
      return (
        currentShipment.alternative === validationInputs.choosenShipment.value
      );
    });

    if (!shipmentAlternatives.length == 0) {
      return shipment[0].cost;
    }
  };

  const validateInputFields = () => {
    let shouldProgress = true;
    const inputArray = Object.entries(validationInputs);
    let updatedList = { ...validationInputs };

    inputArray.forEach((input) => {
      if (
        (input[0] === "address" && input[1].value.length < 1) ||
        (input[0] === "zipcode" && input[1].value.length < 5) ||
        (input[0] === "city" && input[1].value.length < 1) ||
        (input[0] === "phoneNr" && input[1].value.length < 9)
      ) {
        updatedList[input[0]].error = true;
        shouldProgress = false;
      }
    });
    if (!shouldProgress) {
      setErrorToInput(updatedList);
    }
    return shouldProgress;
  };

  const setErrorToInput = (updatedList) => {
    setValidationInputs(updatedList);
  };

  const checkErrorsInInfo = () => {
    return validationInputs.address.error;
  };

  const setInputToState = (input, id, valid) => {
    setValidationInputs({
      ...validationInputs,
      [id]: {
        value: input,
        error: !valid,
      },
    });
  };

  const validateInputs = (value, letter) => {
    if (letter) {
      if (value.match(/^[A-ZÅÄÖa-zåäö]+$/)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (value.match(/^\d+$/)) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        validationInputs,
        shipmentAlternatives,
        getShipmentCost,

        validateInputFields,
        checkErrorsInInfo,
        setInputToState,
        validateInputs,
        setShipmentAlternatives,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
