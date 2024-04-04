import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import * as React from 'react';
import styled from '@mui/material/styles/styled';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

const gradientBackground = `linear-gradient(to bottom, #f88080, #daf6008a)`;

// Define texture pattern
const texturePattern = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAADXSiBfAAAAeUlEQVQImWP4//8/w3BgYGBgYEYDZWgGJUYa2GZUYioIVX0BMAwdEHcYgcMwnDoSoyYoYG5iGGJYxgYAWAKMIZRYlh3jIJGx0BoRogmICyloZpMhAPjChLgW8EDAAjAiyg7IsKjAAA4jA9UJoUAExVPEMEwNz5QRnYagDEgFgQGKEmMFqh0AAAAASUVORK5CYII=")`;

const cardPrimaryStyles = {
  backgroundImage: `${gradientBackground}, ${texturePattern}`,
    color: 'white', // Text color
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#f88080', // Default background color
        color: 'white', // Default text color
    },
}));
const StyledBadgeWhite = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'white', // Default background color
        color: 'black', // Default text color
    },
}));

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }}  gutterBottom>
                Visitors
            </Typography>
            <Typography variant="h4" component="div">
                30,794
            </Typography>
            <Typography variant="h4" component="div">
           <StyledBadge badgeContent="+221%" className="ml-5"></StyledBadge>
            </Typography>
        </CardContent>
    </React.Fragment>
);

const cardPrimary = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }}  gutterBottom>
                Visitors
            </Typography>
            <Typography variant="h4" component="div">
                30,794
            </Typography>
            <Typography variant="h4" component="div">
           <StyledBadgeWhite badgeContent="+221%" className="ml-5"></StyledBadgeWhite>
            </Typography>
        </CardContent>
    </React.Fragment>
);
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <Grid className="overflow-hidden shadow-sm sm:rounded-lg" container>
                            <Grid item xs={5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Card style={cardPrimaryStyles}>{cardPrimary} </Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                        <Card >{card}</Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                        <Card >{card}</Card>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                        <Card >{card}</Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                <div className="p-6 text-gray-900 ">
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="p-6 text-gray-900">
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="p-6 text-gray-900">
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
