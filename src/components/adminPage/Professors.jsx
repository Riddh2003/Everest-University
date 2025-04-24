import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../context/NewContext';
import ProfessorsForm from './ProfessorsForm';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  IconButton,
  Avatar,
  Checkbox,
  CircularProgress,
  Pagination,
  Container,
  Toolbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

function Professors() {
  const { isOpenForSideBar } = useTheme();
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "All Departments",
    role: "All Roles",
    status: "All Status",
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchFaculty = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please login first');
        navigate('/adminlogin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:9999/api/private/profile/getallfaculty', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        if (response.data) {
          // Correctly access the data array from response
          setProfessors(response.data || []);
        } else {
          throw new Error(response.data.message || 'Failed to fetch faculty data');
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again');
          localStorage.removeItem('token');
          navigate('/adminlogin');
        } else {
          toast.error(error.response?.data?.message || 'Error fetching faculty data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [navigate]);

  // Update the openPopup function to handle both edit and add
  const openPopup = (index = null) => {
    if (index !== null) {
      setCurrentProfessor({ ...professors[index] });
    } else {
      setCurrentProfessor(null); // For adding new faculty
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setCurrentProfessor(null);
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfessor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your update logic here
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filteredFaculty = professors.filter((faculty) => {
    const matchesSearch = faculty.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filters.department === "All Departments" || faculty.department === filters.department;
    const matchesRole = filters.role === "All Roles" || faculty.role === filters.role;
    const matchesStatus = filters.status === "All Status" || faculty.status === filters.status;

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedFaculty = filteredFaculty.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredFaculty.length / rowsPerPage);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        transition: 'margin 0.3s ease',
        ml: isOpenForSideBar ? '240px' : '70px',
      }}
    >
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6" color="primary" fontWeight="medium">
                  Faculty Records
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <TextField
                    placeholder="Search faculty..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => openPopup()}
                  >
                    Add Faculty
                  </Button>

                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Bulk Actions</InputLabel>
                    <Select
                      label="Bulk Actions"
                      defaultValue=""
                    >
                      <MenuItem value="">
                        <em>Select Action</em>
                      </MenuItem>
                      <MenuItem value="delete">Delete Selected</MenuItem>
                      <MenuItem value="update">Update Status</MenuItem>
                      <MenuItem value="export">Export Data</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Filters */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={filters.department}
                    label="Department"
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  >
                    <MenuItem value="All Departments">All Departments</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Arts">Arts</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={filters.role}
                    label="Role"
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  >
                    <MenuItem value="All Roles">All Roles</MenuItem>
                    <MenuItem value="Professor">Professor</MenuItem>
                    <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                    <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                    <MenuItem value="Lecturer">Lecturer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    label="Status"
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <MenuItem value="All Status">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="On Leave">On Leave</MenuItem>
                    <MenuItem value="Retired">Retired</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Table */}
          <TableContainer sx={{ maxHeight: '60vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Profile</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Qualification</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedFaculty.map((faculty, index) => (
                  <TableRow
                    key={faculty.id || index}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{faculty.name}</TableCell>
                    <TableCell>{faculty.email}</TableCell>
                    <TableCell>********</TableCell>
                    <TableCell>
                      {faculty.profilePicture ? (
                        <Avatar
                          src={faculty.profilePicture}
                          alt={faculty.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      ) : (
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          {faculty.name ? faculty.name.charAt(0) : 'F'}
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell>{faculty.role}</TableCell>
                    <TableCell>{faculty.qualification}</TableCell>
                    <TableCell>
                      <Chip
                        label={faculty.status}
                        size="small"
                        color={faculty.status === "Active" ? "success" : "warning"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{faculty.department}</TableCell>
                    <TableCell>{faculty.createdAt}</TableCell>
                    <TableCell>{faculty.updatedAt}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => openPopup(startIndex + index)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedFaculty.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography color="text.secondary">No faculty found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              Showing {paginatedFaculty.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredFaculty.length)} of {filteredFaculty.length} faculty members
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </Paper>
      </Container>

      {isPopupOpen && (
        <ProfessorsForm
          facultyData={currentProfessor}
          onClose={closePopup}
        />
      )}
    </Box>
  );
}

export default Professors;