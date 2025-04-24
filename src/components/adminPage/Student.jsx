import React, { useState, useEffect } from "react";
import StudentsForm from './StudentsForm'; // Import the popup form
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  useTheme as useMuiTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import {
  bluePurple,
  SectionTitle,
  StyledButton,
  CardContainer,
  ContentCard,
  PageContainer
} from './AdminProfile';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Track which dropdown is open
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility
  const [currentStudent, setCurrentStudent] = useState(null); // Track current student data for editing
  const [loading, setLoading] = useState(true);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const toggleDropdown = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close it if already open
    } else {
      setOpenIndex(index); // Open the selected dropdown
    }
  };

  const openPopup = (index) => {
    setCurrentStudent({ ...students[index], index }); // Include index in student data
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setCurrentStudent(null);
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudents = [...students];
    updatedStudents[currentStudent.index] = { ...currentStudent };
    delete updatedStudents[currentStudent.index].index; // Remove index from student data
    setStudents(updatedStudents);
    closePopup();
  };

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:9999/api/private/student/getallstudent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      setStudents(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // fetch data when component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress sx={{ color: bluePurple.main }} />
      </Box>
    );
  }

  return (
    <PageContainer>
      {/* Page Title and Add Button */}
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <SectionTitle variant={isMobile ? "h5" : "h4"}>
          Students
        </SectionTitle>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentStudent(null); // Reset student data for new entry
            setIsPopupOpen(true);
          }}
          sx={{ mt: isMobile ? 1 : 0 }}
        >
          Add Student
        </StyledButton>
      </Box>

      {/* Main content */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardContainer>
            <ContentCard sx={{ p: { xs: 1, sm: 2 } }}>
              <TableContainer
                sx={{
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 180px)',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(106, 90, 205, 0.3)',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(106, 90, 205, 0.5)',
                    }
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    borderRadius: '4px',
                  },
                }}
              >
                <Table stickyHeader aria-label="students table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Enrollment ID</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Surname</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Firstname</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Middlename</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Mobile</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Email</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Gender</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>DOB</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Program</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Degree</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Degree Name</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Current Sem</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>Current Year</TableCell>
                      <TableCell sx={{
                        fontWeight: 'bold',
                        background: bluePurple.gradient,
                        color: 'white',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students && students.length > 0 ? (
                      students.map((student, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:nth-of-type(odd)': { bgcolor: bluePurple.lighter },
                            '&:hover': { bgcolor: 'rgba(106, 90, 205, 0.08)' },
                          }}
                        >
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.enrollmentId}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.surName}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.firstName}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.middleName}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.mobileNo}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.email}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Chip
                              label={student.gender}
                              size="small"
                              sx={{
                                color: student.gender === 'Male' ? bluePurple.dark : '#d32f2f',
                                borderColor: student.gender === 'Male' ? bluePurple.main : '#f44336',
                                backgroundColor: student.gender === 'Male' ? 'rgba(106, 90, 205, 0.1)' : 'rgba(244, 67, 54, 0.1)'
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.dateOfBirth}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.program}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.degree}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.degreeName}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.currentSem}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>{student.currentYear}</TableCell>
                          <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                            <Tooltip title="View">
                              <IconButton
                                size="small"
                                sx={{
                                  color: bluePurple.main,
                                  '&:hover': {
                                    backgroundColor: bluePurple.lighter,
                                  }
                                }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                sx={{
                                  color: bluePurple.dark,
                                  '&:hover': {
                                    backgroundColor: bluePurple.lighter,
                                  }
                                }}
                                onClick={() => openPopup(index)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                sx={{
                                  color: '#d32f2f',
                                  '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={14} sx={{ textAlign: 'center', py: 3 }}>
                          <Typography color="text.secondary">No students found.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </ContentCard>
          </CardContainer>
        </Grid>
      </Grid>

      {isPopupOpen && (
        <StudentsForm
          studentData={currentStudent}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closePopup}
          themeColor={bluePurple}
        />
      )}
    </PageContainer>
  );
};

export default Student;