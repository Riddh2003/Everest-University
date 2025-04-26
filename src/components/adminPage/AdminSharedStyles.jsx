import {
    Card,
    CardContent,
    Button,
    Typography,
    Box,
    styled
} from '@mui/material';

// Blue-purple color theme 
export const bluePurple = {
    main: '#4500e2', // New primary blue color
    dark: '#3700b3', // Darker version
    light: '#6e29ff', // Lighter version
    lighter: '#e8e6ff', // Very light blue-purple
    gradient: 'linear-gradient(135deg, #4500e2 0%, #6e29ff 100%)', // Gradient using the new color
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
        background: 'linear-gradient(135deg, #4500e2 0%, #6e29ff 100%)',
        '&:hover': {
            background: `linear-gradient(135deg, #3700b3 0%, #4500e2 100%)`,
            boxShadow: '0 4px 10px rgba(69,0,226,0.3)',
        }
    },
    '&.MuiButton-outlined': {
        borderColor: '#4500e2',
        color: '#4500e2',
        '&:hover': {
            backgroundColor: bluePurple.lighter,
            borderColor: '#3700b3',
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