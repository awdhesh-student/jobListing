import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import './App.css';
import jobListingsData from './jobListings.json';
import { Container } from '@mui/material';

function App() {

  ///////////////all state variables////////////////
  const [jobListings, setJobListings] = useState([]);
  const [filterMinExperience, setFilterMinExperience] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRemote, setFilterRemote] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterMinBasePay, setFilterMinBasePay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleJobCount, setVisibleJobCount] = useState(6);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);


  /////////to render initial cards
  useEffect(() => {
    setJobListings(jobListingsData.slice(0, visibleJobCount));
  }, [visibleJobCount]);


  ///////////to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        !allJobsLoaded &&
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 &&
        !isLoading
      ) {
        loadMoreJobListings();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, allJobsLoaded]);

  const loadMoreJobListings = () => {
    setIsLoading(true);

    setTimeout(() => {
      const nextVisibleJobCount = visibleJobCount + 3;
      if (nextVisibleJobCount >= jobListingsData.length) {
        setAllJobsLoaded(true);
      }
      setJobListings(jobListingsData.slice(0, nextVisibleJobCount));
      setVisibleJobCount(nextVisibleJobCount);
      setIsLoading(false);
    }, 1000);
  };


  ///////////filtering jobs by search bar and category buttons
  const filteredJobListings = jobListings.filter(job => {
    const minExperienceMatch = filterMinExperience === '' || parseInt(job.experience) >= parseInt(filterMinExperience);
    const companyMatch = filterCompany === '' || job.company.toLowerCase().includes(filterCompany.toLowerCase());
    const locationMatch = filterLocation === '' || job.location.toLowerCase().includes(filterLocation.toLowerCase());
    const remoteMatch = filterRemote === '' || (filterRemote === 'remote' ? job.workLoc === 'remote' : job.workLoc === 'onsite');
    const roleMatch = filterRole === '' || job.role.toLowerCase().includes(filterRole.toLowerCase());
    const minBasePayMatch = filterMinBasePay === '' || parseInt(job.basePay) >= parseInt(filterMinBasePay);

    return (
      minExperienceMatch &&
      companyMatch &&
      locationMatch &&
      remoteMatch &&
      roleMatch &&
      minBasePayMatch
    );
  });

  return (
    <Container className="App my-4">
      <h1>Job Listings</h1>
      <div className="filter-container my-4">
        <p className="mt-3">Filter By: </p>
        <input
          type="number"
          placeholder="Min Experience"
          value={filterMinExperience}
          onChange={(e) => setFilterMinExperience(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        <select value={filterRemote} onChange={(e) => setFilterRemote(e.target.value)}>
          <option value="">All</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
        </select>
        <input
          type="text"
          placeholder="Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Base Pay"
          value={filterMinBasePay}
          onChange={(e) => setFilterMinBasePay(e.target.value)}
        />
      </div>
      <div className="job-listings">
        {filteredJobListings.map(job => (
          <JobCard className='card' key={job.id} job={job} />
        ))}
        {isLoading && <p className="loader">Loading...</p>}
      </div>
    </Container>
  );
}

export default App;
