import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { updateDriver, getSingleDriver } from "../../stateManagement/driverSlice";
import styles from "../Form.module.css";
import ClipLoader from 'react-spinners/ClipLoader';

const EditDriver = ({ id, closeModal }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const drivers = useSelector((state) => state.driver.drivers);
  
    useEffect(() => {
      dispatch(getSingleDriver(id));
    }, [dispatch, id]);
  
    const driver = drivers.find((d) => d.id === id);
    const initialValues = {
      name: driver.name || "",
      phoneNo: driver.phoneNo || "",
      password: driver.password || "",
      license: driver.license || "",
      driverId: driver.driverId || "",
      code: driver.code || "",
      address: driver.address || "",
    };
  
    const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      phoneNo: Yup.string().required("Phone number is required"),
      license: Yup.string().required("License is required"),
      driverId: Yup.string().required("Driver ID is required"),
      code: Yup.string().required("Code is required"),
      address: Yup.string().required("Address is required"),
    });
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
          const response = await dispatch(updateDriver({ driverId: id, driverData: values }));
          if (response.error) {
            toast.error('Error Updating Driver');
          } else {
            toast.success('Driver updated successfully', {
              onClose: () => {
                closeModal();
              },
            });
          }
        } catch (error) {
          toast.error('Failed to update driver.');
        } finally {
          setIsLoading(false);
        }
      },
    });

    const override = {
        display: 'block',
        margin: '0 auto',
      };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Edit Driver Details</h3>
            <hr />
            <br />
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.gridContainer2}>
                    <div className={styles.gridItem}>
                        <label className={styles.label}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            className={styles.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className={styles.error}>{formik.errors.name}</div>
                        )}
                    </div>
                    <div className={styles.gridItem}>
                        <label className={styles.label}>Phone:</label>
                        <input
                            type="text"
                            name="phoneNo"
                            className={styles.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNo}
                        />
                        {formik.touched.phoneNo && formik.errors.phoneNo && (
                            <div className={styles.error}>{formik.errors.phoneNo}</div>
                        )}
                    </div>
                    <br />
                </div>
                <div className={styles.gridContainer2}>
                    <div className={styles.gridItem}>
                        <label className={styles.label}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            value={formik.values.password}
                            disabled
                        />
                    </div>
                    <div className={styles.gridItem}>
                        <label className={styles.label}>License:</label>
                        <input
                            type="text"
                            name="license"
                            className={styles.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.license}
                        />
                        {formik.touched.license && formik.errors.license && (
                            <div className={styles.error}>{formik.errors.license}</div>
                        )}
                    </div>
                    <br />
                </div>
                <div className={styles.gridContainer2}>
                    <div className={styles.gridItem}>
                        <label className={styles.label}>Driver ID:</label>
                        <input
                            type="text"
                            name="driverId"
                            className={styles.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.driverId}
                            disabled
                        />
                        {formik.touched.driverId && formik.errors.driverId && (
                            <div className={styles.error}>{formik.errors.driverId}</div>
                        )}
                    </div>
                    <div className={styles.gridItem}>
                        <label className={styles.label}>Code:</label>
                        <input
                            type="text"
                            name="code"
                            className={styles.input}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.code}
                        />
                        {formik.touched.code && formik.errors.code && (
                            <div className={styles.error}>{formik.errors.code}</div>
                        )}
                    </div>
                    <br />
                </div>
                <div>
                    <label className={styles.label}>Address:</label>
                    <textarea
                        type="text"
                        name="address"
                        className={styles.textarea}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <div className={styles.error}>{formik.errors.address}</div>
                    )}
                </div>
                <br />
                <button className={styles.button} type="submit" disabled={isLoading}>
              {isLoading ? <ClipLoader color={'#ffffff'} loading={isLoading} css={override} size={20} /> : 'Update'}
            </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditDriver;
