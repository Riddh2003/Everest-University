import React, { useState, useEffect } from "react";
import useTheme, { ThemeProvider } from "../../context/NewContext";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Stack,
  Chip
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";

const API_URL = "http://localhost:9999/api/private/admin";

const AdmissionsRequest = () => {
  const [admissionRequests, setAdmissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();

  // Fetch admission requests from backend
  const fetchAdmissionRequests = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/adminlogin");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/getalladmissionsrequest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data);
      if (response.data.success) {
        setAdmissionRequests(response.data.data); // Store fetched data
      } else {
        toast.error(response.data.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
      toast.error("Error fetching admissions");
    } finally {
      setLoading(false);
    }
  };

  // Approve or Reject Admission with full data
  const handleAdmissionAction = async (request, action) => {
    if (!request) {
      toast.error("Invalid admission data");
      return;
    }

    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/${action}`,
        request, // Send full request data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`${action} Response:`, response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAdmissionRequests(); // Refresh data after action
      } else {
        throw new Error(response.data.message || `Failed to ${action} admission`);
      }
    } catch (error) {
      console.error(`${action} Error:`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} admission`);
    } finally {
      setActionLoading(false);
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchAdmissionRequests();
  }, []);

  return (
    <ThemeProvider>
      <Box
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s ease',
          ml: isOpenForSideBar ? '240px' : '70px',
        }}
      >
        <ToastContainer position="top-center" autoClose={3000} transition={Flip} />
        <Box sx={{ bgcolor: 'background.default', p: 3, minHeight: '100vh' }}>
          <Container maxWidth="xl">
            <Typography
              variant="h4"
              align="center"
              color="primary"
              fontWeight="bold"
              sx={{ mb: 4 }}
            >
              Admission Requests
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
              </Box>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  maxWidth: '100%',
                  mx: 'auto'
                }}
              >
                <TableContainer sx={{ maxHeight: '70vh' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
                        <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
                        <TableCell align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Program</TableCell>
                        <TableCell align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>State</TableCell>
                        <TableCell align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {admissionRequests.length > 0 ? (
                        admissionRequests.map((request) => (
                          <TableRow
                            key={request.registrationId}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                              {`${request.firstName} ${request.middleName} ${request.surName}`}
                            </TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                              {request.email}
                            </TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                              {request.mobileNo}
                            </TableCell>
                            <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                              <Chip
                                label={request.program}
                                color="primary"
                                variant="outlined"
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                              <Chip
                                label={request.state}
                                color={request.state === "Pending" ? "warning" : "success"}
                                variant="outlined"
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                              >
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  startIcon={<CheckCircleIcon />}
                                  onClick={() => handleAdmissionAction(request, "approve")}
                                  disabled={actionLoading}
                                  sx={{ whiteSpace: 'nowrap' }}
                                >
                                  {actionLoading ? "Processing..." : "Approve"}
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  startIcon={<CancelIcon />}
                                  onClick={() => handleAdmissionAction(request, "reject")}
                                  disabled={actionLoading}
                                  sx={{ whiteSpace: 'nowrap' }}
                                >
                                  {actionLoading ? "Processing..." : "Reject"}
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">
                              No admission requests found
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdmissionsRequest;
