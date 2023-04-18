import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const InquiryForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    studentId: "",
    inquiryType: "",
    subject: "",
    email: "",
    contactNo: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    axios
      .post(`http://localhost:8080/student/student-inquiries`, formValues)
      .then((res) => {
        console.log("Inquory Added");
      })
      .catch((err) => {
        console.log("Error adding inquiry");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        style={{ marginTop: "20px" }}
        fullWidth
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
      />
      <TextField
        style={{ marginTop: "20px" }}
        fullWidth
        label="Student ID"
        name="studentId"
        value={formValues.studentId}
        onChange={handleChange}
      />
      <FormControl style={{ marginTop: "20px" }} fullWidth>
        <InputLabel id="inquiry-type-label">Inquiry Type</InputLabel>
        <Select
          labelId="inquiry-type-label"
          id="inquiry-type"
          name="inquiryType"
          value={formValues.inquiryType}
          onChange={handleChange}
        >
          <MenuItem value="Admissions">Admissions</MenuItem>
          <MenuItem value="Academics">Academics</MenuItem>
          <MenuItem value="Financial Aid">Financial Aid</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        style={{ marginTop: "20px" }}
        fullWidth
        label="Subject"
        name="subject"
        value={formValues.subject}
        onChange={handleChange}
      />
      <TextField
        style={{ marginTop: "20px" }}
        fullWidth
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <TextField
        style={{ marginTop: "20px" }}
        fullWidth
        label="Contact No"
        name="contactNo"
        value={formValues.contactNo}
        onChange={handleChange}
      />
      <TextField
        style={{ marginTop: "20px" }}
        fullWidth
        label="Message"
        name="message"
        multiline
        rows={4}
        value={formValues.message}
        onChange={handleChange}
      />
      <Button
        style={{ marginTop: "20px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </form>
  );
};

export default InquiryForm;
