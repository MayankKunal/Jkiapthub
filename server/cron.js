const cron = require('cron');
const https = require('https');
const backendUrl = 'https://jkiapthubbackend.onrender.com';

// Create a new cron job to run every 14 minutes
const job = new cron.CronJob('*/14 * * * *', function () {
    // This function will be executed every 14 minutes.
    console.log('Restarting server');
    
    // Perform an HTTPS GET request to hit any backend API.
    https.get(backendUrl, (res) => {
        if (res.statusCode === 200) { // Use === for comparison
            console.log('Server restarted');
        } else {
            console.error(`Failed to restart server with status code: ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.error('Error during Restart:', err.message);
    });
});

// Export the cron job
module.exports = job;
