import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
   <Box bgcolor={'black'} padding={'20px'}>
    <Typography variant="body1" fontWeight={'bold'} color="white" align="center">
        {'Copyright @ 2024 , Made By mootaz '}
    </Typography>
   </Box>
  )
}

export default Footer