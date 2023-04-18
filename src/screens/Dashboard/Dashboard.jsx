import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const [inquiries, setInquiries] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState({
    name: "",
    studentId: "",
    inquiryType: "",
    subject: "",
    email: "",
    contactNo: "",
    message: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:8080/student/student-inquiries"
      );
      console.log(res);
      if (res) {
        setInquiries(res.data);
      }
    }

    fetchData();
  }, []);
  const handleEdit = (inquiry) => {
    setSelectedInquiry({ ...inquiry });
    setDialogOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:8080/student/student-inquiries/${selectedInquiry.id}`
      )
      .then((res) => {
        console.log("Deletion complete");
      })
      .catch((err) => {
        console.log("error deleting " + err);
      });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleChange = (event) => {
    setSelectedInquiry({
      ...selectedInquiry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8080/student/student-inquiries/${selectedInquiry.id}`,
        { selectedInquiry }
      )
      .then((res) => {
        console.log("Inquiry updated");
      })
      .catch((err) => {
        console.log("Updation did not work");
      });
    console.log(selectedInquiry);
  };
  const inquiryFormatter = (inquiries) => {
    return inquiries.map((inquiry) => {
      return (
        <>
          <Card
            sx={{ width: "50%", marginBottom: "20px", marginTop: "10px" }}
            elevation={18}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                Inquiry Details
              </Typography>
              <Typography variant="body2" component="p">
                Name: {inquiry.name}
              </Typography>
              <Typography variant="body2" component="p">
                Student ID: {inquiry.studentId}
              </Typography>
              <Typography variant="body2" component="p">
                Inquiry Type: {inquiry.inquiryType}
              </Typography>
              <Typography variant="body2" component="p">
                Subject: {inquiry.subject}
              </Typography>
              <Typography variant="body2" component="p">
                Email: {inquiry.email}
              </Typography>
              <Typography variant="body2" component="p">
                Contact No: {inquiry.contactNo}
              </Typography>
              <Typography variant="body2" component="p">
                Message: {inquiry.message}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleEdit(inquiry)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(inquiry.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          {selectedInquiry && (
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Edit Inquiry</DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    label="Name"
                    name="name"
                    value={selectedInquiry.name}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    label="Student ID"
                    name="studentId"
                    value={selectedInquiry.studentId}
                    onChange={handleChange}
                  />
                  <FormControl style={{ marginTop: "20px" }} fullWidth>
                    <InputLabel id="inquiry-type-label">
                      Inquiry Type
                    </InputLabel>
                    <Select
                      labelId="inquiry-type-label"
                      id="inquiry-type"
                      name="inquiryType"
                      value={selectedInquiry.inquiryType}
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
                    value={selectedInquiry.subject}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    label="Email"
                    name="email"
                    value={selectedInquiry.email}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    label="Contact No"
                    name="contactNo"
                    value={selectedInquiry.contactNo}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ marginTop: "20px" }}
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={selectedInquiry.message}
                    onChange={handleChange}
                  />
                  <Button
                    style={{ marginTop: "20px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    });
  };

  if (!inquiries) {
    return (
      <>
        <h1>Loading.....</h1>
      </>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>
          <Button
            onClick={() => {
              navigate("../add");
            }}
          >
            Add new inquiry
          </Button>
        </h1>
        {inquiryFormatter(inquiries)}
      </div>
    );
  }
}

export default Dashboard;
