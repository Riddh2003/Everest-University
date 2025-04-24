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
  IconButton,
  Pagination,
  Stack,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

function Circulation() {
  const { isOpenForSideBar } = useTheme();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    location: 'All Locations',
    status: 'All Status'
  });

  // Example data for events
  const events = [
    {
      id: 'EVT001',
      name: 'Annual Tech Symposium',
      department: 'Computer Science Department',
      date: 'Mar 15, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Main Auditorium',
      capacity: 500,
      registered: 423,
      status: 'Scheduled',
    },
    {
      id: 'EVT002',
      name: 'Cultural Festival',
      department: 'Student Council',
      date: 'Mar 20, 2024',
      time: '10:00 AM - 8:00 PM',
      location: 'University Ground',
      capacity: 1000,
      registered: 756,
      status: 'Registration Open',
    },
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

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

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
                  Event Management
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    placeholder="Search events..."
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                    Add Event
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
                      <MenuItem value="export">Export Events</MenuItem>
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
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={filters.category}
                    label="Category"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="All Categories">All Categories</MenuItem>
                    <MenuItem value="Academic">Academic</MenuItem>
                    <MenuItem value="Cultural">Cultural</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Workshop">Workshop</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    value={filters.location}
                    label="Location"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="All Locations">All Locations</MenuItem>
                    <MenuItem value="Main Hall">Main Hall</MenuItem>
                    <MenuItem value="Auditorium">Auditorium</MenuItem>
                    <MenuItem value="Sports Complex">Sports Complex</MenuItem>
                    <MenuItem value="Conference Room">Conference Room</MenuItem>
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
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Event ID</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Event Name</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Capacity</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow
                    key={event.id}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{event.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {event.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.department}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {event.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.time}
                      </Typography>
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {event.capacity} seats
                      </Typography>
                      <Typography variant="caption" color="success.main" fontWeight="medium">
                        {event.registered} registered
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={event.status}
                        size="small"
                        color={event.status === "Scheduled" ? "info" : "warning"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
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

                {filteredEvents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: 'center', py: 3 }}>
                      <Typography color="text.secondary">No events found.</Typography>
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
              Showing 1 to {filteredEvents.length} of 24 events
            </Typography>

            <Pagination
              count={3}
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

export default Circulation;