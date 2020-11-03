import classNames from "classnames"


export const addInputClasses = (error?: string, touched?: boolean) => {
  return classNames({
    "is-invalid": touched && error,
    "is-valid": touched && !error
  });
}
