window.API = {
  baseUrl: 'http://localhost:3001/api',
  user: null, // Store logged in user here
  selectedJob: null, // passing data
  
  async request(endpoint, method = 'GET', data = null) {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (data) options.body = JSON.stringify(data);
    try {
      const res = await fetch(this.baseUrl + endpoint, options);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Network error' };
    }
  },

  login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  },

  register(name, email, password, role) {
    return this.request('/auth/register', 'POST', { name, email, password, role });
  },

  getJobs() {
    return this.request('/jobs');
  },

  createJob(job) {
    return this.request('/jobs', 'POST', job);
  },

  apply(userId, jobId, score) {
    return this.request('/applications', 'POST', { userId, jobId, matchScore: score });
  },
  
  getApplications(userId) {
    return this.request('/applications/' + userId);
  }
};
