import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Card,
    CardContent,
    Button,
    Typography,
    TextField,
    Grid,
    Box,
    Avatar,
    Paper,
    Divider,
    CircularProgress,
    styled,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Mail, Phone, Person, School, Edit, Save, Cancel } from '@mui/icons-material';

// Blue-purple color theme 
export const bluePurple = {
    main: '#6a5acd', // SlateBlue (blue-purple)
    dark: '#483d8b', // DarkSlateBlue (darker blue-purple)
    light: '#8a7cdf', // Lighter blue-purple
    lighter: '#e8e6ff', // Very light blue-purple
    gradient: 'linear-gradient(135deg, #5e60ce 0%, #7b68ee 100%)', // Gradient from blue to purple
};

// Styled components for consistent UI
export const CardContainer = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    color: bluePurple.dark,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    position: 'relative',
    paddingLeft: theme.spacing(1.5),
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '10%',
        height: '80%',
        width: '4px',
        backgroundColor: bluePurple.main,
        borderRadius: theme.shape.borderRadius,
    }
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: '8px 20px',
    transition: 'all 0.3s ease',
    textTransform: 'none',
    fontWeight: 600,
    boxShadow: 'none',
    '&.MuiButton-contained': {
        background: bluePurple.gradient,
        '&:hover': {
            background: `linear-gradient(135deg, ${bluePurple.dark} 0%, ${bluePurple.main} 100%)`,
            boxShadow: '0 4px 10px rgba(106,90,205,0.3)',
        }
    },
    '&.MuiButton-outlined': {
        borderColor: bluePurple.main,
        color: bluePurple.main,
        '&:hover': {
            backgroundColor: bluePurple.lighter,
            borderColor: bluePurple.dark,
        }
    }
}));

export const ContentCard = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
}));

export const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3, 0),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 0),
    },
    width: '100%',
    height: '100%',
}));

// Styled components for better UI
const ProfileCard = styled(Card)(({ theme }) => ({
    background: bluePurple.gradient,
    color: '#fff',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 10px 20px rgba(106,90,205,0.2)',
    height: '100%',
}));

const InfoCard = styled(CardContainer)(({ theme }) => ({
    height: '100%',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    border: `4px solid #fff`,
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        width: 100,
        height: 100,
    },
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '& > *:first-of-type': {
            marginBottom: theme.spacing(1),
        },
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    marginRight: theme.spacing(2),
    color: bluePurple.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bluePurple.lighter,
    padding: theme.spacing(1),
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: theme.spacing(1),
    },
}));

const FileInputWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        '& input': {
            fontSize: '0.875rem',
        }
    }
}));

const InfoSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(0.5),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
}));

const AdminProfile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        qualification: '',
        password: '',
        profilePicture: ''
    });

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login first');
                return;
            }

            const email = localStorage.getItem('email');
            if (!email) {
                toast.error('Admin email not found');
                return;
            }

            const response = await axios.get(`http://localhost:9999/api/private/admin/getadminbyemail?email=${email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setAdminData(response.data.data);
                setFormData({
                    name: response.data.data.name || '',
                    email: response.data.data.email || '',
                    phoneNumber: response.data.data.phoneNumber || '',
                    qualification: response.data.data.qualification || '',
                    password: '',
                    profilePicture: response.data.data.profilePicture || ''
                });
            } else {
                toast.error(response.data.message || 'Failed to fetch admin profile');
            }
        } catch (error) {
            console.error('Error fetching admin profile:', error);
            toast.error('Error fetching admin profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Target dimensions
                    const maxWidth = 800;
                    const maxHeight = 800;

                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress image
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

                    setFormData(prev => ({
                        ...prev,
                        profilePicture: compressedDataUrl
                    }));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phoneNumber) {
            toast.error('Name, email, and phone number are required');
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login first');
                return;
            }

            const updateData = {
                ...formData,
                adminId: adminData.id
            };

            // If password is empty, don't update it
            if (!updateData.password) {
                delete updateData.password;
            }

            const response = await axios.put(
                'http://localhost:9999/api/private/profile/updateadmin',
                updateData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success || response.status === 200) {
                toast.success('Profile updated successfully');
                setEditing(false);
                fetchAdminProfile(); // Reload data
            } else {
                toast.error(response.data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress sx={{ color: bluePurple.main }} />
            </Box>
        );
    }

    return (
        <PageContainer>
            {/* Page Title */}
            <Box mb={3}>
                <SectionTitle variant={isMobile ? "h5" : "h4"}>
                    Admin Profile
                </SectionTitle>
            </Box>

            {!editing ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <ProfileCard>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: { xs: 3, sm: 4 }
                            }}>
                                {adminData?.profilePicture ? (
                                    <ProfileAvatar src={adminData.profilePicture} alt="Profile" />
                                ) : (
                                    <ProfileAvatar>
                                        <Person sx={{ fontSize: isMobile ? 40 : 50 }} />
                                    </ProfileAvatar>
                                )}
                                <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 0.5, fontWeight: 'bold', textAlign: 'center' }}>
                                    {adminData?.name || 'Admin Name'}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>Admin</Typography>
                                <Typography variant="body1" sx={{ mt: 1, fontWeight: 500, textAlign: 'center', opacity: 0.95 }}>
                                    {adminData?.qualification || 'Not specified'}
                                </Typography>
                            </CardContent>
                        </ProfileCard>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <InfoCard>
                            <ContentCard>
                                <InfoSection>
                                    <Typography variant="h6" color={bluePurple.dark} sx={{ mb: 2, fontWeight: 600 }}>
                                        Contact Information
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />

                                    <InfoItem>
                                        <IconWrapper>
                                            <Mail fontSize={isMobile ? "small" : "medium"} />
                                        </IconWrapper>
                                        <Box>
                                            <InfoLabel>
                                                Email
                                            </InfoLabel>
                                            <InfoValue sx={{ wordBreak: 'break-word' }}>
                                                {adminData?.email || 'Not provided'}
                                            </InfoValue>
                                        </Box>
                                    </InfoItem>

                                    <InfoItem>
                                        <IconWrapper>
                                            <Phone fontSize={isMobile ? "small" : "medium"} />
                                        </IconWrapper>
                                        <Box>
                                            <InfoLabel>
                                                Phone
                                            </InfoLabel>
                                            <InfoValue>
                                                {adminData?.phoneNumber || 'Not provided'}
                                            </InfoValue>
                                        </Box>
                                    </InfoItem>
                                </InfoSection>

                                <InfoSection>
                                    <Typography variant="h6" color={bluePurple.dark} sx={{ mb: 2, fontWeight: 600 }}>
                                        Academic Information
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />

                                    <InfoItem>
                                        <IconWrapper>
                                            <School fontSize={isMobile ? "small" : "medium"} />
                                        </IconWrapper>
                                        <Box>
                                            <InfoLabel>
                                                Qualification
                                            </InfoLabel>
                                            <InfoValue>
                                                {adminData?.qualification || 'Not provided'}
                                            </InfoValue>
                                        </Box>
                                    </InfoItem>
                                </InfoSection>

                                <Box sx={{ mt: 'auto', pt: 2 }}>
                                    <StyledButton
                                        variant="contained"
                                        onClick={() => setEditing(true)}
                                        startIcon={<Edit />}
                                        size={isMobile ? "small" : "medium"}
                                    >
                                        Edit Profile
                                    </StyledButton>
                                </Box>
                            </ContentCard>
                        </InfoCard>
                    </Grid>
                </Grid>
            ) : (
                <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3, bgcolor: '#fff' }}>
                    <Typography variant="h6" color={bluePurple.dark} sx={{ mb: 3, fontWeight: 600 }}>
                        Edit Profile
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: bluePurple.main,
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: bluePurple.main,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: bluePurple.main,
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: bluePurple.main,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: bluePurple.main,
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: bluePurple.main,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    variant="outlined"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: bluePurple.main,
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: bluePurple.main,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="New Password (leave blank to keep current)"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: bluePurple.main,
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: bluePurple.main,
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: bluePurple.dark }}>
                                        Profile Picture
                                    </Typography>
                                    <FileInputWrapper>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{
                                                width: '100%',
                                                padding: isMobile ? '10px' : '12px',
                                                border: `1px solid #ddd`,
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </FileInputWrapper>
                                    {formData.profilePicture && (
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                            <Avatar
                                                src={formData.profilePicture}
                                                alt="Profile Preview"
                                                sx={{
                                                    width: isMobile ? 80 : 100,
                                                    height: isMobile ? 80 : 100,
                                                    border: `3px solid ${bluePurple.lighter}`,
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? 2 : 3,
                                    mt: 2,
                                    justifyContent: 'flex-end'
                                }}>
                                    <StyledButton
                                        fullWidth={isMobile}
                                        variant="outlined"
                                        onClick={() => setEditing(false)}
                                        disabled={loading}
                                        startIcon={<Cancel />}
                                        size={isMobile ? "small" : "medium"}
                                    >
                                        Cancel
                                    </StyledButton>

                                    <StyledButton
                                        fullWidth={isMobile}
                                        variant="contained"
                                        type="submit"
                                        disabled={loading}
                                        startIcon={<Save />}
                                        size={isMobile ? "small" : "medium"}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </StyledButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            )}
        </PageContainer>
    );
};

export default AdminProfile; 