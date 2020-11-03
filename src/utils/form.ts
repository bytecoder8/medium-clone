import classNames from "classnames"


export const addClasses = (error?: string, touched?: boolean) => {
  return classNames({
    "is-invalid": touched && error,
    "is-valid": touched && !error
  });
}
