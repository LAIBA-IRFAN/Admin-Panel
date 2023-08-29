import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addDriver} from "../../stateManagement/driverSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "../Form.module.css";
import { useNavigate } from "react-router-dom";

const AddNewDriver = ({closeModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNo: "",
      password: "",
      license: "",
      driverId: "",
      code: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phoneNo: Yup.string().required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      license: Yup.string().required("License is required"),
      driverId: Yup.string().required("Driver ID is required"),
      code: Yup.string().required("Code is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await dispatch(addDriver(values));   
        if(response.error){
            toast.error(response.error.message)
            setIsLoading(false); 
            return
        }
        toast.success("Driver added successfully" , {
            onClose: () => {
              closeModal()
            },
        });
        setIsLoading(false); 
        formik.resetForm()
      } catch (error) {
        setError(error);
        toast.error("Failed to add driver. Please try again.");
        setIsLoading(false); 
      }
    },
  });

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className={styles.container}>
      <h3 style={{ color: "#770043", textAlign: "center" }}>Add New Driver</h3>
      <hr />
      <br />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label}>
              Name:
            </label>
            <input
              className={styles.input}
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label} htmlFor="phoneNo">
              Phone:
            </label>
            <input
              className={styles.input}
              type="text"
              id="phoneNo"
              name="phoneNo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
            />
            {formik.touched.phoneNo && formik.errors.phoneNo && (
              <div className={styles.error}>{formik.errors.phoneNo}</div>
            )}
          </div>
        </div>
        <br />
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label} htmlFor="license">
              License:
            </label>
            <input
              className={styles.input}
              type="text"
              id="license"
              name="license"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.license}
            />
            {formik.touched.license && formik.errors.license && (
              <div className={styles.error}>{formik.errors.license}</div>
            )}
          </div>
        </div>
        <br />
        <div className={styles.gridContainer2}>
          <div className={styles.gridItem}>
            <label className={styles.label} htmlFor="driverId">
              Driver ID:
            </label>
            <input
              className={styles.input}
              type="text"
              id="driverId"
              name="driverId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.driverId}
            />
            {formik.touched.driverId && formik.errors.driverId && (
              <div className={styles.error}>{formik.errors.driverId}</div>
            )}
          </div>
          <div className={styles.gridItem}>
            <label className={styles.label} htmlFor="code">
              Code:
            </label>
            <input
              className={styles.input}
              type="text"
              id="code"
              name="code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
            {formik.touched.code && formik.errors.code && (
              <div className={styles.error}>{formik.errors.code}</div>
            )}
          </div>
        </div>
        <br />
        <div>
          <label className={styles.label} htmlFor="address">
            Address:
          </label>
          <textarea
            className={styles.textarea}
            id="address"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          ></textarea>
          {formik.touched.address && formik.errors.address && (
            <div className={styles.error}>{formik.errors.address}</div>
          )}
        </div>
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader color={"#ffffff"} loading={isLoading} css={override} size={20} />
          ) : (
            "Submit"
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddNewDriver;
