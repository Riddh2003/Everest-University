import React, { useState } from 'react';
import useTheme from '../../context/NewContext';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Pagination,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

function Courses() {
  const { isOpenForSideBar } = useTheme();
  const [filters, setFilters] = useState({
    course: 'All Courses',
    year: 'All Years',
    status: 'All Status'
  });
  const [page, setPage] = useState(1);

  // Sample data - in a real app, this would come from an API
  const students = [
    {
      id: 'STU001',
      name: 'Alex Johnson',
      age: 20,
      course: 'Computer Science',
      year: 'Second Year',
      status: 'Active',
      avatar: 'https://avatar.iran.liara.run/public'
    },
    {
      id: 'STU002',
      name: 'Sarah Williams',
      age: 19,
      course: 'Engineering',
      year: 'First Year',
      status: 'On Leave',
      avatar: 'https://avatar.iran.liara.run/public'
    }
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: 'background.default',
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
                  Student Records
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    placeholder="Search students..."
                    size="small"
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
                  >
                    Add Student
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
                      <MenuItem value="export">Export Selected</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Filters */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Course</InputLabel>
                  <Select
                    name="course"
                    value={filters.course}
                    label="Course"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="All Courses">All Courses</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Year</InputLabel>
                  <Select
                    name="year"
                    value={filters.year}
                    label="Year"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="All Years">All Years</MenuItem>
                    <MenuItem value="First Year">First Year</MenuItem>
                    <MenuItem value="Second Year">Second Year</MenuItem>
                    <MenuItem value="Third Year">Third Year</MenuItem>
                    <MenuItem value="Fourth Year">Fourth Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={filters.status}
                    label="Status"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="All Status">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="On Leave">On Leave</MenuItem>
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
                  <TableCell padding="checkbox" sx={{ bgcolor: 'primary.main', color: 'white' }}>
                    <Checkbox size="small" sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />
                  </TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Student ID</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Year</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student.id}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={student.avatar} alt={student.name} sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2">{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        size="small"
                        color={student.status === "Active" ? "success" : student.status === "Inactive" ? "error" : "warning"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
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
              Showing 1 to 10 of 97 students
            </Typography>

            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Courses;