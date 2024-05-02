import React from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const JobCard = ({ job }) => {
   return (
      <>
         <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  {job.title}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  <p>Company: {job.company}</p>
                  <p>Location: {job.location}</p>
                  <p>Work Loc: {job.workLoc}</p>
                  <p>Tech stack: {job.techStack.join(', ')}
                  </p>
                  <p>Experience Required: {job.experience}</p>
                  <p>Pay: Rs.{job.basePay}</p>
                  <p>Description: {job.description}</p>
               </Typography>
            </CardContent>
            <CardActions className='d-flex justify-content-center m-2'>
               <Button variant="contained" color="success" size="medium">Apply</Button>
            </CardActions>
         </Card>
      </>
   );
}

export default JobCard;
