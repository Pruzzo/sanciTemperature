import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';

function Loading(props) {
    return (
        <Box key={`load-container-${props.index}`}
            className="home-panel"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <CircularProgress sx={{
                margin: "20px auto",
                width: "70%",
                height: "auto",
                color: "var(--rrcolor-secondary-dark)"
            }} />
            <Typography variant="h5">
                Caricamento
            </Typography>
        </Box>
    );
}

export default Loading;