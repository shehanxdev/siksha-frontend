import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function Dashboard() {
  const [inquiries, setInquiries] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedinquiry] = useState();
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
    setSelectedinquiry(inquiry);
    setDialogOpen(true);
  };

  const handleDelete = () => {};

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleChange = (event) => {
    setSelectedinquiry({
      ...selectedInquiry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    axios.put(
      `http://localhost:8080/student/student-inquiries/${selectedInquiry.id}`,
      { selectedInquiry }
    );
    console.log(selectedInquiry.id);
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
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  name="name"
                  value={selectedInquiry.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Student ID"
                  name="studentId"
                  value={selectedInquiry.studentId}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Inquiry Type"
                  name="inquiryType"
                  value={inquiry.inquiryType}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Subject"
                  name="subject"
                  value={inquiry.subject}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Email"
                  name="email"
                  value={inquiry.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Contact No"
                  name="contactNo"
                  value={inquiry.contactNo}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Message"
                  name="message"
                  value={inquiry.message}
                  onChange={handleChange}
                  fullWidth
                />
              </DialogContent>
              <CardActions>
                <Button style={{ color: "black" }} onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button style={{ color: "blue" }} onClick={handleSave}>
                  save
                </Button>
              </CardActions>
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
        {inquiryFormatter(inquiries)}
      </div>
    );
  }
}

export default Dashboard;
