import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState();
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

  const handleSearch = () => {
    const newInquiries = inquiries.filter(
      (inquiry) => inquiry.name === searchTerm
    );
    setInquiries(newInquiries);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/student/student-inquiries/${id}`)
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
    const jsonInquiry = JSON.stringify({ ...selectedInquiry });
    axios
      .put(
        `http://localhost:8080/student/student-inquiries/${selectedInquiry.id}`,
        jsonInquiry,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log("Inquiry updated");
      })
      .catch((err) => {
        console.log("Updation did not work");
      });
    console.log(
      `http://localhost:8080/student/student-inquiries/${selectedInquiry.id}`
    );
    console.log(jsonInquiry);
  };
  const inquiryFormatter = (inquiries) => {
    return (
      <>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid black" }}>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Student ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Inquiry Type
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Subject
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Contact No
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Message
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Edit
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} style={{ borderBottom: "1px solid black" }}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.name}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.studentId}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.inquiryType}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.subject}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.email}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.contactNo}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {inquiry.message}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <a
                    style={{ marginRight: "20px" }}
                    onClick={() => {
                      handleEdit(inquiry);
                    }}
                    href="#"
                  >
                    Edit
                  </a>
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <a
                    style={{ color: "red" }}
                    onClick={() => {
                      handleDelete(inquiry.id);
                    }}
                    href="#"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
                  <InputLabel id="inquiry-type-label">Inquiry Type</InputLabel>
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
  };

  if (!inquiries) {
    return (
      <>
        <h1>Loading.....</h1>
      </>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "200px",
            height: "100vh",
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{ margin: "10px 0", fontSize: "18px", fontWeight: "bold" }}
            >
              Menu
            </li>
            <li style={{ margin: "10px 0" }}>Home</li>
            <li style={{ margin: "10px 0" }}>About</li>
            <li style={{ margin: "10px 0" }}>Contact</li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              height: "90vh",
              margin: "100px 80px 0 80px",
            }}
          >
            <div style={{ display: "flex", marginBottom: "40px" }}>
              <TextField
                sx={{ width: "600px" }}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Button
                title="Search"
                type="submit"
                onClick={() => {
                  handleSearch();
                }}
              >
                Search
              </Button>
            </div>
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
        </div>
      </div>
    );
  }
}

export default Dashboard;
